const m = require('mithril');
const PageOne = require('./components/page-one.js');
const PageTwo = require('./components/page-two.js');
const PageThree = require('./components/page-three.js');

m.route(document.body, '/pageOne', {
    '/pageOne': PageOne,
    '/pageTwo': PageTwo,
    '/pageThree': PageThree
});

