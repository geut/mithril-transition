const m = require('mithril');
const slide = require('../../slide');

function change() {
    if (this.state.currentItem === this.state.items.length - 1) {
        this.state.currentItem = 0;
        return;
    }

    this.state.currentItem++;
}

function back() {
    if (this.state.currentItem === 0) {
        this.state.currentItem = this.state.items.length - 1;
        return;
    }

    this.state.currentItem--;
}

module.exports = {
    oninit(vnode) {
        vnode.state.title = vnode.attrs.title;
        vnode.state.currentItem = 0;
        vnode.state.items = vnode.attrs.items;
        vnode.state.transition = slide(vnode.attrs.key);
    },
    view(vnode) {
        return m('.panel.panel-primary', [
            m('.panel-heading', [
                m('h3.panel-title', vnode.attrs.title)
            ]),
            m('.panel-body', [
                m(`#${vnode.attrs.key}.items`, [
                    m('p.item', {
                        key: `${vnode.attrs.key}-item-${vnode.state.currentItem}`,
                        oncreate: vnode.state.transition.oncreate,
                        onremove: vnode.state.transition.onremove
                    }, vnode.state.items[vnode.state.currentItem])
                ]),
                m('a.next.btn.btn-warning.pull-left', {
                    onclick: back.bind(vnode)
                }, 'Back'),
                m('a.next.btn.btn-primary.pull-right', {
                    onclick: change.bind(vnode)
                }, 'Next')
            ])
        ]);
    }
};
