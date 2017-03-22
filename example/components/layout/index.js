const m = require('mithril');
const navbar = require('./navbar');
const slide = require('../../slide');

const transition = slide('appHistory');

module.exports = (content, props = {}) => {
    props.transition = transition;
    return m('.app', [
        m('.page', { key: `page-${props.page}`, oncreate: transition.oncreate, onremove: transition.onremove }, [
            navbar(props),
            m('.container', [
                content
            ])
        ])
    ]);
};
