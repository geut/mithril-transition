import m from 'mithril';
import navbar from './navbar';
import transition from '../../../src/index.js';
import velocity from 'velocity-animate';
import 'velocity-animate/velocity.ui.min';

const anim = transition({
    persistHistoryAs: 'appHistory',
    anim(lastElem, newElem, direction, cbLast, cbNew) {
        const query = '.navbar-brand, .page > .container > *';
        if (direction === 'next') {
            velocity(
                lastElem.querySelectorAll(query),
                'transition.slideLeftBigOut',
                {
                    complete: cbLast,
                    duration: 10000,
                    stagger: 100
                }
            );

            velocity(
                newElem.querySelectorAll(query),
                'transition.slideRightBigIn',
                {
                    stagger: 100,
                    duration: 10000,
                    complete: cbNew
                }
            );
        } else {
            velocity(
                lastElem.querySelectorAll(query),
                'transition.slideRightBigOut',
                {
                    complete: cbLast,
                    duration: 10000,
                    stagger: 100
                }
            );

            velocity(
                newElem.querySelectorAll(query),
                'transition.slideLeftBigIn',
                {
                    stagger: 100,
                    duration: 10000,
                    complete: cbNew
                }
            );
        }
        return false;
    }
});

export default (content, props = {}) => {
    return m('.app', [
        m('.page', {key: m.route(), config: anim}, [
            navbar(props),
            m('.container', [
                content
            ])
        ])
    ]);
};
