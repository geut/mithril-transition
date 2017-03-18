const m = require('mithril');
const layout = require('./layout');

const PageOne = {
    oninit(vnode) {
        vnode.state.title = 'Page One';
    },
    view(vnode) {
        return layout([
            m('h1', 'Testing the page one'),
            m('.panel.panel-primary', [
                m('.panel-heading', [
                    m('h3.panel-title', 'Panel page one')
                ]),
                m('.panel-body', [
                    m(
                        'a.btn.btn-danger.pull-right[href=/pageTwo]',
                        { oncreate: m.route.link },
                        'Go to page two'
                    )
                ])
            ])
        ], {
            title: vnode.state.title
        });
    }
};

module.exports = PageOne;
