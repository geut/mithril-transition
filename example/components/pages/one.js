const m = require('mithril');
const layout = require('../layout');
const Panel = require('../panel');

const panels = [
    {
        title: 'Panel One',
        items: [
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
            'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        ]
    }
];

const PageOne = {
    oninit(vnode) {
        vnode.state.title = 'Page One';
    },
    view(vnode) {
        return layout([
            m('h1', 'Testing the page one'),
            m('.row', panels.map((value, key) => {
                const attrs = Object.assign({ key: `${vnode.attrs.page}-panel-${key}` }, value);
                return m('.col-md-6', m(Panel, attrs));
            }))
        ], {
            page: vnode.attrs.page,
            title: vnode.state.title
        });
    }
};

module.exports = PageOne;
