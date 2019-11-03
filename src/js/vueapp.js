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
        imageUrl: 'img/tms-light.png',
        url: 'https://tms-light-demo.herokuapp.com/',
        gitUrl: 'https://github.com/chrisnorwood/tms-light-v1',
        tag: { text: 'React + Rails', color: '#2F3D88' },
        list: 'React, Redux, Rails 6 API, JWT'
      },
      { 
        name: 'Spectre Air & Ground Freight, Inc.',
        imageUrl: 'img/spectre-air-500.png',
        url: 'https://spectreair.com/',
        gitUrl: 'https://github.com/chrisnorwood/spectre-air',
        tag: { text: 'HTML5', color: '#F3AF5C' },
        list: 'HTML5, TailwindCSS, Gulp'
      },
      { 
        name: 'Minesweeper',
        imageUrl: 'img/minesweeper.png',
        url: 'https://vue-minesweeper.herokuapp.com/',
        gitUrl: 'https://github.com/chrisnorwood/vue-minesweeper',
        tag: { text: 'Vue.js', color: '#9CA6DD' },
        list: 'Vue.js, Webpack, CSS'
      },
      { 
        name: 'Snake',
        imageUrl: 'img/snake.png',
        url: 'http://chrisnorwood.io/js-snake/',
        gitUrl: 'https://github.com/chrisnorwood/js-snake',
        tag: { text: 'Javascript', color: '#8BC34A' },
        list: 'ES6, OOP, jQuery'
      },
      { 
        name: 'Odinbook',
        imageUrl: 'img/odinbook.png',
        url: 'https://rails-odinbook.herokuapp.com/',
        gitUrl: 'https://github.com/chrisnorwood/odinbook',
        tag: { text: 'Rails', color: '#2F3D88' },
        list: 'Ruby on Rails, Bulma, Devise, OAuth, AWS S3, Heroku'
      },
      { 
        name: 'CLI Chess',
        imageUrl: 'img/ruby-chess.png',
        url: '',
        gitUrl: 'https://github.com/chrisnorwood/ruby-chess',
        tag: { text: 'Ruby', color: 'red' },
        list: 'Ruby, RSpec, OOP, Terminal'
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
        list: 'Ruby, RSpec, OOP'
      },
      { 
        name: 'Word Guesser',
        imageUrl: 'img/word-guess.png',
        url: 'https://sinatra-guessing-game.herokuapp.com',
        gitUrl: 'https://github.com/chrisnorwood/wordguess-web',
        tag: { text: 'Sinatra', color: '#F3AF5C' },
        list: 'Ruby, Sinatra, File Parsing'
      },
      { 
        name: 'Flickr Feed',
        imageUrl: 'img/flickr-api.png',
        url: 'https://top-flickr-gallery.herokuapp.com',
        gitUrl: 'https://github.com/chrisnorwood/flickr-photofeeds',
        tag: { text: 'Rails', color: '#2F3D88' },
        list: 'Ruby on Rails, Bootstrap 4, API'
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