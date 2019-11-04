Vue.component('modal', {
  template: '#modal-template',
  props: ['show', 'project'],
  methods: {
    closeModal: function() {
      this.$emit('close');
    },
  },
  updated: function () {

  },
  mounted: function () {
    var vm = this;
    document.addEventListener("keydown", function(e) {
      if (vm.show && e.keyCode == 27) {
        vm.closeModal();
      }
    });
  },
});

Vue.component('project', {
  template: '#project-template',
  props: ['project'],
  methods: {
    selectProject: function(project) {
      this.$emit('select', project);
    },
  },
});

new Vue({
  el: '#projects',
  data: {
    showModal: false,
    selectedProject: { name: '', imageUrl: '', url: '', gitUrl: '', tag: { text: '', color: '' }, list: '' },
    projects: [
      { 
        name: 'TMS-Light',
        imageUrl: 'img/tms-light-2.png',
        url: 'https://tms-light-demo.herokuapp.com/',
        gitUrl: 'https://github.com/chrisnorwood/tms-light-v1',
        tag: { text: 'React + Rails', color: '#2F3D88' },
        list: 'React, Redux, Rails 6 API, JWT, Heroku',
        desc: `This is a very basic "Transportation Management System" CRUD app, created to demonstrate a combined Rails API + React/Redux SPA. Both the API and React app are served together on a single Heroku dyno.`
      },
      { 
        name: 'Spectre Air & Ground Freight',
        imageUrl: 'img/spectre-air-500.png',
        url: 'https://spectreair.com/',
        gitUrl: 'https://github.com/chrisnorwood/spectre-air',
        tag: { text: 'HTML5', color: '#F3AF5C' },
        list: 'HTML5, TailwindCSS, Gulp',
        desc: `This simple, responsive static-site was a redesign for a freight brokerage / 3PL logistics company.`
      },
      { 
        name: 'Minesweeper',
        imageUrl: 'img/minesweeper.png',
        url: 'https://chrisnorwood.io/vue-minesweeper',
        gitUrl: 'https://github.com/chrisnorwood/vue-minesweeper',
        tag: { text: 'Vue.js', color: '#9CA6DD' },
        list: 'Vue.js, Webpack, CSS',
        desc: `This clone of the classic game, "Minesweeper", was built over a weekend using Vue.js 2.0. It features a timer, multiple difficulty settings, and tile-flagging.`
      },
      { 
        name: 'Snake',
        imageUrl: 'img/snake.png',
        url: 'https://chrisnorwood.io/js-snake/',
        gitUrl: 'https://github.com/chrisnorwood/js-snake',
        tag: { text: 'Javascript', color: '#8BC34A' },
        list: 'ES6, OOP, jQuery',
        desc: `This recreation of the classic game "Snake" uses jQuery to connect the HTML grid with a javascript game object. It is responsive, and playable on the phone with buttons that pop up for < tablet-sized viewports.`
      },
      { 
        name: 'Odinbook',
        imageUrl: 'img/odinbook.png',
        url: 'https://rails-odinbook.herokuapp.com/',
        gitUrl: 'https://github.com/chrisnorwood/odinbook',
        tag: { text: 'Rails', color: '#2F3D88' },
        list: 'Ruby on Rails, Bulma, Devise, OAuth, AWS S3, Heroku',
        desc: `This is a social-media-type application built as my final project for The Odin Project's Rails Course. It features user authentication with Devise, AWS S3 image uploading, and AJAX form actions with jQuery.`
      },
      { 
        name: 'CLI Chess',
        imageUrl: 'img/ruby-chess.png',
        url: '',
        gitUrl: 'https://github.com/chrisnorwood/ruby-chess',
        tag: { text: 'Ruby', color: 'red' },
        list: 'Ruby, RSpec, OOP, TDD',
        desc: `This is a command line chess game built in Ruby, tested thoroughly with RSpec.`
      },
      // { 
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
        tag: { text: 'Ruby', color: 'red' },
        list: 'Ruby, RSpec, OOP, TDD',
        desc: `This is a command line "Connect 4" game built in Ruby, tested thoroughly with RSpec.`
      },
      { 
        name: 'Word Guesser',
        imageUrl: 'img/word-guess.png',
        url: 'https://sinatra-guessing-game.herokuapp.com',
        gitUrl: 'https://github.com/chrisnorwood/wordguess-web',
        tag: { text: 'Sinatra', color: '#F3AF5C' },
        list: 'Ruby, Sinatra, File Parsing',
        desc: `This word-guessing game was built with Sinatra for The Odin Project. It's like hangman, but without the hanging man.`
      },
      { 
        name: 'Flickr Feed',
        imageUrl: 'img/flickr-api.png',
        url: 'https://top-flickr-gallery.herokuapp.com',
        gitUrl: 'https://github.com/chrisnorwood/flickr-photofeeds',
        tag: { text: 'Rails', color: '#2F3D88' },
        list: 'Ruby on Rails, Bootstrap 4',
        desc: `This image gallery pulls photos from the Flickr API by user ID. It uses the flickraw gem to access the Flickr API.`
      },
    ],
  },
  methods: {
    displayModal: function() {
      this.showModal = true;
    },
    closeModal: function() {
      this.showModal = false;
    },
    selectProject: function(selected) {
      this.selectedProject = selected;
      this.displayModal();
    },
  },
});