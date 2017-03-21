const m = require('mithril');
const navbar = require('./navbar');
const createTransition = require('../../../src/index.js');
const animationend = require('animationend');
const transition = createTransition({
    persistHistoryAs: 'appHistory',
    animation({ lastElm, nextElm, direction, cbLast, cbNext }) {
        animationend(lastElm, cbLast);
        animationend(nextElm, () => {
            nextElm.classList.remove('pt-page-moveFromRight', 'pt-page-moveFromLeft');
        	cbNext();
        });
        if (direction === 'next') {
            lastElm.classList.add('pt-page-moveToLeft');
        	nextElm.classList.add('pt-page-moveFromRight');
        } else {
            lastElm.classList.add('pt-page-moveToRight');
        	nextElm.classList.add('pt-page-moveFromLeft');
        }
    }
});

module.exports = (content, props = {}) => {
    props.transition = transition;
    return m('.app', [
        m('.page', { key: m.route.get(), oncreate: transition.oncreate, onremove: transition.onremove }, [
            navbar(props),
            m('.container', [
                content
            ])
        ])
    ]);
};
