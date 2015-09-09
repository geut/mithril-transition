import m from 'mithril';
import PageOne from './components/page-one.js';
import PageTwo from './components/page-two.js';

m.route(document.body, '/pageOne', {
    '/pageOne': PageOne,
    '/pageTwo': PageTwo
});
