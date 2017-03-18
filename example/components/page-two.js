const m = require('mithril');
const layout = require('./layout');

const PageTwo = {
    controller(vnode) {
        vnode.state.title = 'Page Two';
    },
    view(vnode) {
        return layout([
            m('h1', 'Testing the page two'),
            m('.panel.panel-danger', [
                m('.panel-heading', [
                    m('h3.panel-title', 'Panel page two')
                ]),
                m('.panel-body', [
                    m(
                        'a.btn.btn-primary.pull-left[href=/pageOne]',
                        { oncreate: m.route.link },
                        'Go to page one'
                    ),
                    m(
                        'a.btn.btn-success.pull-right[href=/pageThree]',
                        { oncreate: m.route.link },
                        'Go to page three'
                    )
                ])
            ])
        ], {
            title: vnode.state.title
        });
    }
};

module.exports = PageTwo;
