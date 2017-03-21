const m = require('mithril');
const navbar = require('./navbar');
const createTransition = require('../../../src/index.js');
const velocity = require('velocity-animate');
require('velocity-animate/velocity.ui.min');

const transition = createTransition({
    persistHistoryAs: 'appHistory',
    animation({ lastElm, nextElm, direction, cbLast, cbNext }) {
        const query = '.navbar-brand, .page > .container > *';
        if (direction === 'next') {
            velocity(
                lastElm.querySelectorAll(query),
                'transition.slideLeftBigOut',
                {
                    complete: cbLast,
                    stagger: 100
                }
            );

            velocity(
                nextElm.querySelectorAll(query),
                'transition.slideRightBigIn',
                {
                    stagger: 100,
                    complete: cbNext
                }
            );
        } else {
            velocity(
                lastElm.querySelectorAll(query),
                'transition.slideRightBigOut',
                {
                    complete: cbLast,
                    stagger: 100
                }
            );

            velocity(
                nextElm.querySelectorAll(query),
                'transition.slideLeftBigIn',
                {
                    stagger: 100,
                    complete: cbNext
                }
            );
        }
        return false;
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
