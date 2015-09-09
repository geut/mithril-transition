import m from 'mithril';
import navbar from './navbar';
import Transition from '../../mithril-animation/index.js';
import Velocity from 'velocity-animate';
import 'velocity-animate/velocity.ui.min';

const trans = Transition({
    useBrowserHistory: true,
    anim(lastElem, newElem, parent, direction, cbRemove) {
        const query = '.navbar-brand, .page > .container';
        if (direction === 'next') {
            Velocity(
                lastElem.querySelectorAll(query),
                'transition.slideLeftBigOut',
                {
                    complete: cbRemove,
                    stagger: 100
                }
            );

            Velocity(
                newElem.querySelectorAll(query),
                'transition.slideRightBigIn',
                {
                    stagger: 100
                }
            );
        } else {
            Velocity(
                lastElem.querySelectorAll(query),
                'transition.slideRightBigOut',
                {
                    complete: cbRemove,
                    stagger: 100
                }
            );

            Velocity(
                newElem.querySelectorAll(query),
                'transition.slideLeftBigIn',
                {
                    stagger: 100
                }
            );
        }
        return false;
    }
});

export default (content, props = {}) => {
    return m('.app.m-transition-content', [
        m('.page', {key: m.route(), config: trans}, [
            navbar(props),
            m('.container', [
                content
            ])
        ])
    ]);
};
