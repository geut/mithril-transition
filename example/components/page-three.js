const m = require('mithril');
const layout = require('./layout');

const PageThree = {
    oninit(vnode) {
        vnode.state.title = 'Page Three';
    },
    view(vnode) {
        return layout([
            m('h1', 'Testing the page three'),
            m('.panel.panel-success', [
                m('.panel-heading', [
                    m('h3.panel-title', 'Panel page three')
                ]),
                m('.panel-body', [
                    m(
                        'a.btn.btn-danger.pull-left[href=/pageTwo]',
                        { oncreate: m.route.link },
                        'Go to page two'
                    ),
                    m(
                        'a.btn.btn-primary.pull-right[href=/pageOne]',
                        { oncreate: m.route.link },
                        'Go to page one'
                    )
                ])
            ])
        ], {
            title: vnode.state.title
        });
    }
};

module.exports = PageThree;
