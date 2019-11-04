"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! smooth-scroll v16.1.0 | (c) 2019 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/smooth-scroll */
window.Element && !Element.prototype.closest && (Element.prototype.closest = function (e) {
  var t,
      n = (this.document || this.ownerDocument).querySelectorAll(e),
      o = this;

  do {
    for (t = n.length; 0 <= --t && n.item(t) !== o;) {
      ;
    }
  } while (t < 0 && (o = o.parentElement));

  return o;
}), function () {
  if ("function" == typeof window.CustomEvent) return;

  function e(e, t) {
    t = t || {
      bubbles: !1,
      cancelable: !1,
      detail: void 0
    };
    var n = document.createEvent("CustomEvent");
    return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n;
  }

  e.prototype = window.Event.prototype, window.CustomEvent = e;
}(), function () {
  for (var r = 0, e = ["ms", "moz", "webkit", "o"], t = 0; t < e.length && !window.requestAnimationFrame; ++t) {
    window.requestAnimationFrame = window[e[t] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[t] + "CancelAnimationFrame"] || window[e[t] + "CancelRequestAnimationFrame"];
  }

  window.requestAnimationFrame || (window.requestAnimationFrame = function (e, t) {
    var n = new Date().getTime(),
        o = Math.max(0, 16 - (n - r)),
        a = window.setTimeout(function () {
      e(n + o);
    }, o);
    return r = n + o, a;
  }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (e) {
    clearTimeout(e);
  });
}(), function (e, t) {
  "function" == typeof define && define.amd ? define([], function () {
    return t(e);
  }) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = t(e) : e.SmoothScroll = t(e);
}("undefined" != typeof global ? global : "undefined" != typeof window ? window : void 0, function (q) {
  "use strict";

  var I = {
    ignore: "[data-scroll-ignore]",
    header: null,
    topOnEmptyHash: !0,
    speed: 500,
    speedAsDuration: !1,
    durationMax: null,
    durationMin: null,
    clip: !0,
    offset: 0,
    easing: "easeInOutCubic",
    customEasing: null,
    updateURL: !0,
    popstate: !0,
    emitEvents: !0
  },
      F = function F() {
    var n = {};
    return Array.prototype.forEach.call(arguments, function (e) {
      for (var t in e) {
        if (!e.hasOwnProperty(t)) return;
        n[t] = e[t];
      }
    }), n;
  },
      r = function r(e) {
    "#" === e.charAt(0) && (e = e.substr(1));

    for (var t, n = String(e), o = n.length, a = -1, r = "", i = n.charCodeAt(0); ++a < o;) {
      if (0 === (t = n.charCodeAt(a))) throw new InvalidCharacterError("Invalid character: the input contains U+0000.");
      1 <= t && t <= 31 || 127 == t || 0 === a && 48 <= t && t <= 57 || 1 === a && 48 <= t && t <= 57 && 45 === i ? r += "\\" + t.toString(16) + " " : r += 128 <= t || 45 === t || 95 === t || 48 <= t && t <= 57 || 65 <= t && t <= 90 || 97 <= t && t <= 122 ? n.charAt(a) : "\\" + n.charAt(a);
    }

    return "#" + r;
  },
      L = function L() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
  },
      x = function x(e) {
    return e ? (t = e, parseInt(q.getComputedStyle(t).height, 10) + e.offsetTop) : 0;
    var t;
  },
      H = function H(e, t, n, o) {
    if (t.emitEvents && "function" == typeof q.CustomEvent) {
      var a = new CustomEvent(e, {
        bubbles: !0,
        detail: {
          anchor: n,
          toggle: o
        }
      });
      document.dispatchEvent(a);
    }
  };

  return function (o, e) {
    var A,
        a,
        O,
        C,
        M = {};
    M.cancelScroll = function (e) {
      cancelAnimationFrame(C), C = null, e || H("scrollCancel", A);
    }, M.animateScroll = function (i, c, e) {
      M.cancelScroll();
      var s = F(A || I, e || {}),
          u = "[object Number]" === Object.prototype.toString.call(i),
          t = u || !i.tagName ? null : i;

      if (u || t) {
        var l = q.pageYOffset;
        s.header && !O && (O = document.querySelector(s.header));

        var n,
            o,
            a,
            m,
            r,
            d,
            f,
            h,
            p = x(O),
            g = u ? i : function (e, t, n, o) {
          var a = 0;
          if (e.offsetParent) for (; a += e.offsetTop, e = e.offsetParent;) {
            ;
          }
          return a = Math.max(a - t - n, 0), o && (a = Math.min(a, L() - q.innerHeight)), a;
        }(t, p, parseInt("function" == typeof s.offset ? s.offset(i, c) : s.offset, 10), s.clip),
            y = g - l,
            v = L(),
            w = 0,
            S = (n = y, a = (o = s).speedAsDuration ? o.speed : Math.abs(n / 1e3 * o.speed), o.durationMax && a > o.durationMax ? o.durationMax : o.durationMin && a < o.durationMin ? o.durationMin : parseInt(a, 10)),
            E = function E(e, t) {
          var n,
              o,
              a,
              r = q.pageYOffset;
          if (e == t || r == t || (l < t && q.innerHeight + r) >= v) return M.cancelScroll(!0), o = t, a = u, 0 === (n = i) && document.body.focus(), a || (n.focus(), document.activeElement !== n && (n.setAttribute("tabindex", "-1"), n.focus(), n.style.outline = "none"), q.scrollTo(0, o)), H("scrollStop", s, i, c), !(C = m = null);
        },
            b = function b(e) {
          var t, n, o;
          m || (m = e), w += e - m, d = l + y * (n = r = 1 < (r = 0 === S ? 0 : w / S) ? 1 : r, "easeInQuad" === (t = s).easing && (o = n * n), "easeOutQuad" === t.easing && (o = n * (2 - n)), "easeInOutQuad" === t.easing && (o = n < .5 ? 2 * n * n : (4 - 2 * n) * n - 1), "easeInCubic" === t.easing && (o = n * n * n), "easeOutCubic" === t.easing && (o = --n * n * n + 1), "easeInOutCubic" === t.easing && (o = n < .5 ? 4 * n * n * n : (n - 1) * (2 * n - 2) * (2 * n - 2) + 1), "easeInQuart" === t.easing && (o = n * n * n * n), "easeOutQuart" === t.easing && (o = 1 - --n * n * n * n), "easeInOutQuart" === t.easing && (o = n < .5 ? 8 * n * n * n * n : 1 - 8 * --n * n * n * n), "easeInQuint" === t.easing && (o = n * n * n * n * n), "easeOutQuint" === t.easing && (o = 1 + --n * n * n * n * n), "easeInOutQuint" === t.easing && (o = n < .5 ? 16 * n * n * n * n * n : 1 + 16 * --n * n * n * n * n), t.customEasing && (o = t.customEasing(n)), o || n), q.scrollTo(0, Math.floor(d)), E(d, g) || (C = q.requestAnimationFrame(b), m = e);
        };

        0 === q.pageYOffset && q.scrollTo(0, 0), f = i, h = s, u || history.pushState && h.updateURL && history.pushState({
          smoothScroll: JSON.stringify(h),
          anchor: f.id
        }, document.title, f === document.documentElement ? "#top" : "#" + f.id), "matchMedia" in q && q.matchMedia("(prefers-reduced-motion)").matches ? q.scrollTo(0, Math.floor(g)) : (H("scrollStart", s, i, c), M.cancelScroll(!0), q.requestAnimationFrame(b));
      }
    };

    var t = function t(e) {
      if (!e.defaultPrevented && !(0 !== e.button || e.metaKey || e.ctrlKey || e.shiftKey) && "closest" in e.target && (a = e.target.closest(o)) && "a" === a.tagName.toLowerCase() && !e.target.closest(A.ignore) && a.hostname === q.location.hostname && a.pathname === q.location.pathname && /#/.test(a.href)) {
        var t,
            n = r(a.hash);

        if ("#" === n) {
          if (!A.topOnEmptyHash) return;
          t = document.documentElement;
        } else t = document.querySelector(n);

        (t = t || "#top" !== n ? t : document.documentElement) && (e.preventDefault(), function (e) {
          if (history.replaceState && e.updateURL && !history.state) {
            var t = q.location.hash;
            t = t || "", history.replaceState({
              smoothScroll: JSON.stringify(e),
              anchor: t || q.pageYOffset
            }, document.title, t || q.location.href);
          }
        }(A), M.animateScroll(t, a));
      }
    },
        n = function n(e) {
      if (null !== history.state && history.state.smoothScroll && history.state.smoothScroll === JSON.stringify(A)) {
        var t = history.state.anchor;
        "string" == typeof t && t && !(t = document.querySelector(r(history.state.anchor))) || M.animateScroll(t, null, {
          updateURL: !1
        });
      }
    };

    M.destroy = function () {
      A && (document.removeEventListener("click", t, !1), q.removeEventListener("popstate", n, !1), M.cancelScroll(), C = O = a = A = null);
    };

    return function () {
      if (!("querySelector" in document && "addEventListener" in q && "requestAnimationFrame" in q && "closest" in q.Element.prototype)) throw "Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";
      M.destroy(), A = F(I, e || {}), O = A.header ? document.querySelector(A.header) : null, document.addEventListener("click", t, !1), A.updateURL && A.popstate && q.addEventListener("popstate", n, !1);
    }(), M;
  };
});
"use strict";

Vue.component('modal', {
  template: '#modal-template',
  props: ['show', 'project'],
  methods: {
    closeModal: function closeModal() {
      this.$emit('close');
    }
  },
  updated: function updated() {},
  mounted: function mounted() {
    var vm = this;
    document.addEventListener("keydown", function (e) {
      if (vm.show && e.keyCode == 27) {
        vm.closeModal();
      }
    });
  }
});
Vue.component('project', {
  template: '#project-template',
  props: ['project'],
  methods: {
    selectProject: function selectProject(project) {
      this.$emit('select', project);
    }
  }
});
new Vue({
  el: '#projects',
  data: {
    showModal: false,
    selectedProject: {
      name: '',
      imageUrl: '',
      url: '',
      gitUrl: '',
      tag: {
        text: '',
        color: ''
      },
      list: ''
    },
    projects: [{
      name: 'TMS-Light',
      imageUrl: 'img/tms-light-2.png',
      url: 'https://tms-light-demo.herokuapp.com/',
      gitUrl: 'https://github.com/chrisnorwood/tms-light-v1',
      tag: {
        text: 'React + Rails',
        color: '#2F3D88'
      },
      list: 'React, Redux, Rails 6 API, JWT, Heroku',
      desc: "This is a very basic \"Transportation Management System\" CRUD app, created to demonstrate a combined Rails API + React/Redux SPA. Both the API and React app are served together on a single Heroku dyno."
    }, {
      name: 'Spectre Air & Ground Freight',
      imageUrl: 'img/spectre-air-500.png',
      url: 'https://spectreair.com/',
      gitUrl: 'https://github.com/chrisnorwood/spectre-air',
      tag: {
        text: 'HTML5',
        color: '#F3AF5C'
      },
      list: 'HTML5, TailwindCSS, Gulp',
      desc: "This simple, responsive static-site was a redesign for a freight brokerage / 3PL logistics company."
    }, {
      name: 'Minesweeper',
      imageUrl: 'img/minesweeper.png',
      url: 'https://chrisnorwood.io/vue-minesweeper',
      gitUrl: 'https://github.com/chrisnorwood/vue-minesweeper',
      tag: {
        text: 'Vue.js',
        color: '#9CA6DD'
      },
      list: 'Vue.js, Webpack, CSS',
      desc: "This clone of the classic game, \"Minesweeper\", was built over a weekend using Vue.js 2.0. It features a timer, multiple difficulty settings, and tile-flagging."
    }, {
      name: 'Snake',
      imageUrl: 'img/snake.png',
      url: 'https://chrisnorwood.io/js-snake/',
      gitUrl: 'https://github.com/chrisnorwood/js-snake',
      tag: {
        text: 'Javascript',
        color: '#8BC34A'
      },
      list: 'ES6, OOP, jQuery',
      desc: "This recreation of the classic game \"Snake\" uses jQuery to connect the HTML grid with a javascript game object. It is responsive, and playable on the phone with buttons that pop up for < tablet-sized viewports."
    }, {
      name: 'Odinbook',
      imageUrl: 'img/odinbook.png',
      url: 'https://rails-odinbook.herokuapp.com/',
      gitUrl: 'https://github.com/chrisnorwood/odinbook',
      tag: {
        text: 'Rails',
        color: '#2F3D88'
      },
      list: 'Ruby on Rails, Bulma, Devise, OAuth, AWS S3, Heroku',
      desc: "This is a social-media-type application built as my final project for The Odin Project's Rails Course. It features user authentication with Devise, AWS S3 image uploading, and AJAX form actions with jQuery."
    }, {
      name: 'CLI Chess',
      imageUrl: 'img/ruby-chess.png',
      url: '',
      gitUrl: 'https://github.com/chrisnorwood/ruby-chess',
      tag: {
        text: 'Ruby',
        color: 'red'
      },
      list: 'Ruby, RSpec, OOP, Terminal',
      desc: "This is a command line chess game built in Ruby, tested thoroughly with RSpec."
    }, // { 
    //   name: 'Calculator',
    //   imageUrl: 'img/js-calc.png',
    //   url: 'http://chrisnorwood.io/js-calculator/',
    //   gitUrl: 'https://github.com/chrisnorwood/js-calculator',
    //   tag: { text: 'Javascript', color: '#8BC34A' },
    //   list: 'Vanilla Javascript, ES6'
    // },
    // { 
    //   name: 'Flight Booker',
    //   imageUrl: 'img/flight-booker.png',
    //   url: 'https://top-flight-booker.herokuapp.com/',
    //   gitUrl: 'https://github.com/chrisnorwood/odin-flight-booker',
    //   tag: { text: 'Rails', color: '#2F3D88' },
    //   list: 'Ruby on Rails, Foundation, Slim'
    // },
    {
      name: 'Connect Four',
      imageUrl: 'img/connect-four.png',
      url: '',
      gitUrl: 'https://github.com/chrisnorwood/connect-four',
      tag: {
        text: 'Ruby',
        color: 'red'
      },
      list: 'Ruby, RSpec, OOP',
      desc: "This is a command line \"Connect 4\" game built in Ruby, tested thoroughly with RSpec."
    }, {
      name: 'Word Guesser',
      imageUrl: 'img/word-guess.png',
      url: 'https://sinatra-guessing-game.herokuapp.com',
      gitUrl: 'https://github.com/chrisnorwood/wordguess-web',
      tag: {
        text: 'Sinatra',
        color: '#F3AF5C'
      },
      list: 'Ruby, Sinatra, File Parsing',
      desc: "This word-guessing game was built with Sinatra for The Odin Project. It's like hangman, but without the hanging man."
    }, {
      name: 'Flickr Feed',
      imageUrl: 'img/flickr-api.png',
      url: 'https://top-flickr-gallery.herokuapp.com',
      gitUrl: 'https://github.com/chrisnorwood/flickr-photofeeds',
      tag: {
        text: 'Rails',
        color: '#2F3D88'
      },
      list: 'Ruby on Rails, Bootstrap 4, API',
      desc: "This image gallery pulls photos from the Flickr API by user ID. It uses the flickraw gem to access the Flickr API."
    }]
  },
  methods: {
    displayModal: function displayModal() {
      this.showModal = true;
    },
    closeModal: function closeModal() {
      this.showModal = false;
    },
    selectProject: function selectProject(selected) {
      this.selectedProject = selected;
      this.displayModal();
    }
  }
});