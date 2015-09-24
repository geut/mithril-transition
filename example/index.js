import m from 'mithril';
import PageOne from './components/page-one.js';
import PageTwo from './components/page-two.js';
import PageThree from './components/page-three.js';

m.route(document.body, '/pageOne', {
    '/pageOne': PageOne,
    '/pageTwo': PageTwo,
    '/pageThree': PageThree
});
