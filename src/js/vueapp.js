Vue.component('modal', {
  template: '#modal-template',
  props: ['show', 'project'],
  methods: {
    closeModal: function() {
      this.$emit('close');
    },
  },
  mounted: function () {
    var vm = this;
    document.addEventListener("keydown", function(e) {
      console.log(e.keyCode);
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
      console.log(project);
      this.$emit('select', project);
    },
  },
});

new Vue({
  el: '#projects',
  data: {
    showModal: false,
    selectedProject: {},
    projects: [
      { name: 'Ruby Chess',  imageUrl: 'img/ruby-chess.png',  url: 'https://github.com/chrisnorwood/ruby-chess', description: 'This command-line implementation of chess is written in Ruby and test-driven with RSpec.' },
      { name: 'Odinbook',    imageUrl: 'img/odinbook.png',    url: 'https://rails-odinbook.herokuapp.com/',      description: 'This Rails project incorporates the main features of a social media website. It uses Devise & OAuth for login, with a Carrierwave/AWS S3 image uploader. A PostgreSQL database was used in development, and it is deployed on Heroku.' },
      { name: 'Minesweeper', imageUrl: 'img/minesweeper.png', url: 'https://vue-minesweeper.herokuapp.com/',     description: 'This Minesweeper game was created with Vue.js.  It is organized with single-file components, and Webpack for asset compiliation/bundling.' },
      { name: 'Javascript Snake',    imageUrl: 'img/snake.png',       url: 'http://chrisnorwood.io/js-snake/',           description: 'This remake of the classic game "Snake" is written in Object Oriented ES6 Javascript, with light jQuery for DOM-manipulation.'},
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
      console.log('we out here');
      this.selectedProject = selected;
      this.displayModal();
    },
  },
});