/* Bash landing pages: tracking, form and page behaviour.
   Everything the client or the ads team needs to fill in is in CONFIG below.
   Anything left as a placeholder is skipped safely, so the page still works. */

var BASH_CONFIG = {
  // Google Analytics 4 measurement ID, e.g. "G-ABC123XYZ"
  ga4Id: 'G-XXXXXXXXXX',

  // Google Ads account tag, e.g. "AW-1234567890"
  adsId: 'AW-XXXXXXXXXX',

  // Conversion action labels from Google Ads (Goals > Conversions > the action > Tag setup).
  // The label is the part after the slash in "AW-1234567890/AbCdEfGhIj".
  labels: {
    softServeLead: 'XXXXXXXXXX', // Lead form: Soft serve
    tablesLead: 'XXXXXXXXXX',    // Lead form: Tables & chairs
    callClick: 'XXXXXXXXXX',     // Click-to-call on the site (secondary)
    websiteCall: 'XXXXXXXXXX'    // Calls from website (Google forwarding number, 60s+)
  },

  phoneDisplay: '(954) 997-2251',
  phoneTel: '+19549972251',

  // Web3Forms access key: get one at web3forms.com using the inbox that should receive leads.
  web3formsKey: 'YOUR_WEB3FORMS_ACCESS_KEY',

  // Shown on the pages to filter out small budgets. null hides the line entirely.
  // Numbers only, e.g. 650
  softServeStationFrom: null,
  machineRentalFrom: null,
  tablesOrderMinimum: null,

  // Table & chair delivery: about 10 miles from 9402 NW 38th St, Coral Springs.
  // Bash must confirm this list before launch.
  deliveryZips: [
    '33063', '33064', '33065', '33066', '33067', '33068', '33069', '33071', '33073',
    '33076', '33093', '33309', '33311', '33313', '33319', '33321', '33351', '33441', '33442'
  ]
};

(function () {
  'use strict';
  var C = BASH_CONFIG;

  function isSet(v) {
    return v !== null && v !== undefined && v !== '' && !/X{4,}|YOUR_/.test(String(v));
  }
  function ls(fn) { try { return fn(); } catch (e) { return null; } }

  /* ---------- Google tag ---------- */
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  var tagId = isSet(C.adsId) ? C.adsId : (isSet(C.ga4Id) ? C.ga4Id : null);
  if (tagId) {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + tagId;
    document.head.appendChild(s);
    gtag('js', new Date());
    if (isSet(C.ga4Id)) gtag('config', C.ga4Id);
    if (isSet(C.adsId)) {
      gtag('config', C.adsId, { allow_enhanced_conversions: true });
      // Swaps the number on the page for a Google forwarding number for ad visitors,
      // so calls from the site count as conversions.
      if (isSet(C.labels.websiteCall)) {
        gtag('config', C.adsId + '/' + C.labels.websiteCall, { phone_conversion_number: C.phoneDisplay });
      }
    }
  }

  function adsConversion(labelKey, extra) {
    if (!isSet(C.adsId) || !isSet(C.labels[labelKey])) return;
    var params = { send_to: C.adsId + '/' + C.labels[labelKey] };
    for (var k in extra) params[k] = extra[k];
    gtag('event', 'conversion', params);
  }
  window.bashTrack = { adsConversion: adsConversion, isSet: isSet };

  /* ---------- Ad click IDs + UTMs ----------
     Stored for 90 days so a visitor who lands from an ad, leaves, and comes back
     later still carries the click ID into the form (used for offline conversion import). */
  var KEYS = ['gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  var params = new URLSearchParams(window.location.search);
  var now = Date.now();
  var TTL = 90 * 24 * 60 * 60 * 1000;
  KEYS.forEach(function (k) {
    var v = params.get(k);
    if (v) ls(function () { localStorage.setItem('bash_' + k, JSON.stringify({ v: v, t: now })); });
  });
  function stored(k) {
    var raw = ls(function () { return localStorage.getItem('bash_' + k); });
    if (!raw) return '';
    var o = ls(function () { return JSON.parse(raw); });
    if (!o || now - o.t > TTL) return '';
    return o.v;
  }

  document.addEventListener('DOMContentLoaded', function () {

    /* Phone numbers everywhere come from CONFIG */
    document.querySelectorAll('[data-phone]').forEach(function (a) {
      var num = a.querySelector('.num');
      if (num) num.textContent = C.phoneDisplay;
      else if (!a.children.length) a.textContent = C.phoneDisplay;
      a.setAttribute('href', 'tel:' + C.phoneTel);
    });

    /* Click-to-call tracking */
    document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
      a.addEventListener('click', function () {
        gtag('event', 'click_to_call', { event_category: 'Lead', page_type: document.body.dataset.page || '' });
        adsConversion('callClick', {});
      });
    });

    /* Minimum prices */
    document.querySelectorAll('[data-min]').forEach(function (el) {
      var v = C[el.getAttribute('data-min')];
      var wrap = el.closest('[data-min-wrap]') || el;
      if (isSet(v)) el.textContent = '$' + Number(v).toLocaleString('en-US');
      else wrap.hidden = true;
    });

    /* "Price a station" / "Price a machine" pre-select the form choice */
    document.querySelectorAll('[data-choose]').forEach(function (b) {
      b.addEventListener('click', function () {
        var want = b.getAttribute('data-choose') === 'machine' ? 'Machine rental only' : 'Full-service station';
        var r = document.querySelector('input[name="service"][value="' + want + '"]');
        if (r) r.checked = true;
      });
    });

    /* Audience tabs */
    var tabs = document.querySelectorAll('.split-tabs [role="tab"]');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) {
          var on = t === tab;
          t.setAttribute('aria-selected', on ? 'true' : 'false');
          document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
        });
        var sel = document.querySelector('select[name="event_type"]');
        if (sel && tab.dataset.eventType && !sel.value) sel.value = tab.dataset.eventType;
      });
    });

    /* Machine planner: ~70 servings per hour per machine (Bash: 60 to 75) */
    var range = document.getElementById('guests');
    if (range) {
      var out = function () {
        var g = Number(range.value);
        var machines = Math.max(1, Math.ceil(g / 70));
        var mins = Math.round(g / (machines * 70) * 60);
        document.getElementById('guests-val').textContent = g >= 600 ? '600+' : g;
        document.getElementById('machines').textContent = machines + (machines === 1 ? ' machine' : ' machines');
        document.getElementById('planner-note').textContent =
          'Serves all ' + (g >= 600 ? '600+' : g) + ' guests in about ' + Math.max(15, mins) +
          ' minutes, with no long line. Each machine pours one flavor, so two machines also means two flavors.';
        var hidden = document.querySelector('input[name="planner_estimate"]');
        if (hidden) hidden.value = g + ' guests / ' + machines + ' machines';
      };
      range.addEventListener('input', out);
      out();
    }

    /* Delivery zone check (tables & chairs) */
    var zip = document.getElementById('zip-check');
    if (zip) {
      var msg = document.getElementById('zip-msg');
      var check = function () {
        var z = (zip.value.match(/\d{5}/) || [''])[0];
        msg.className = 'zone-msg';
        if (!z) { msg.textContent = ''; return; }
        if (C.deliveryZips.indexOf(z) > -1) {
          msg.textContent = 'Good news: ' + z + ' is inside our delivery area.';
          msg.classList.add('ok');
        } else {
          msg.textContent = z + ' looks outside our 10-mile delivery area. Send the form anyway and we’ll tell you for sure.';
          msg.classList.add('warn');
        }
        var formZip = document.querySelector('input[name="delivery_zip"]');
        if (formZip && !formZip.value) formZip.value = z;
      };
      zip.addEventListener('input', check);
      document.getElementById('zip-btn').addEventListener('click', check);
    }

    /* Lead forms */
    document.querySelectorAll('form.lead-form').forEach(function (form) {
      var type = form.getAttribute('data-type');
      form.querySelector('input[name="access_key"]').value = C.web3formsKey;
      var thanks = new URL('thank-you/?type=' + type, new URL('../', window.location.href));
      form.querySelector('input[name="redirect"]').value = thanks.href;
      KEYS.forEach(function (k) {
        var f = form.querySelector('input[name="' + k + '"]');
        if (f) f.value = stored(k);
      });
      form.querySelector('input[name="landing_page"]').value = window.location.href.split('?')[0];

      if (!isSet(C.web3formsKey)) {
        var warn = document.createElement('p');
        warn.className = 'form-min';
        warn.textContent = 'Form not connected yet: add the Web3Forms key in bash.js. Call ' + C.phoneDisplay + ' in the meantime.';
        form.prepend(warn);
      }

      form.addEventListener('submit', function (e) {
        if (!isSet(C.web3formsKey)) { e.preventDefault(); return; }
        // Saved for Enhanced Conversions on the thank-you page, then cleared there.
        var email = (form.querySelector('[name="email"]') || {}).value || '';
        var phone = ((form.querySelector('[name="phone"]') || {}).value || '').replace(/\D/g, '');
        if (phone.length === 10) phone = '+1' + phone;
        else if (phone) phone = '+' + phone;
        ls(function () {
          sessionStorage.setItem('bash_ec', JSON.stringify({ email: email.trim().toLowerCase(), phone_number: phone }));
          sessionStorage.removeItem('bash_conv_done');
        });
        gtag('event', 'form_submit', { event_category: 'Lead', page_type: type });
      });
    });
  });
})();
