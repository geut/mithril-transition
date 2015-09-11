import m from 'mithril';
import navbar from './navbar';
import Transition from '../../mithril-animation/index.js';
import Velocity from 'velocity-animate';
import 'velocity-animate/velocity.ui.min';

const anim = Transition({
    useBrowserHistory: true,
    anim(lastElem, newElem, direction, cbLast, cbNew) {
        const query = '.navbar-brand, .page > .container > *';
        if (direction === 'next') {
            Velocity(
                lastElem.querySelectorAll(query),
                'transition.slideLeftBigOut',
                {
                    complete: cbLast,
                    stagger: 100
                }
            );

            Velocity(
                newElem.querySelectorAll(query),
                'transition.slideRightBigIn',
                {
                    stagger: 100,
                    complete: cbNew
                }
            );
        } else {
            Velocity(
                lastElem.querySelectorAll(query),
                'transition.slideRightBigOut',
                {
                    complete: cbLast,
                    stagger: 100
                }
            );

            Velocity(
                newElem.querySelectorAll(query),
                'transition.slideLeftBigIn',
                {
                    stagger: 100,
                    complete: cbNew
                }
            );
        }
        return false;
    }
});

export default (content, props = {}) => {
    return m('.app.m-transition-content', [
        m('.page', {key: m.route(), config: anim}, [
            navbar(props),
            m('.container', [
                content
            ])
        ])
    ]);
};
