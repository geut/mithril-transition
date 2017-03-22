const m = require('mithril');
const layout = require('../layout');

const PageThree = {
    oninit(vnode) {
        vnode.state.title = 'Page Three';
    },
    view(vnode) {
        return layout([
            m('h1', 'Testing the page three'),
            m('h2', 'nothing more to show')
        ], {
            page: vnode.attrs.page,
            title: vnode.state.title
        });
    }
};

module.exports = PageThree;
