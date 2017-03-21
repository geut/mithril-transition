const {
    loadClasses,
    unloadClasses
} = require('./classes');

module.exports = {

    oncreate(vnode) {
        const key = vnode.key;
        const dom = vnode.dom;
        if (this.useHistory && !key) {
            throw new Error('Error in mithril-transition: is required specified a key for the vnode if you want to use the history.');
        }

        if (this.isEnabled()) {
            const parentNode = dom.parentNode;

            let direction = 'next';

            if (this.useHistory) {
                direction = this.history.direction(key, this.last);
            }

            if (this.last) {
                let lastElm = this.last.dom;
                const classList = this.classList;

                const id = 'mithril-transition-' + Date.now();

                loadClasses(classList, lastElm, dom, direction);

                lastElm.setAttribute('data-transition-id', id);

                parentNode.insertAdjacentHTML('beforeend', lastElm.outerHTML);

                lastElm = parentNode.querySelector('[data-transition-id=' + id + ']');

                let barrier = 2;
                this.animation({
                    lastElm,
                    nextElm: dom,
                    direction,
                    cbLast() {
                        lastElm.parentNode.removeChild(lastElm);
                        barrier = unloadClasses(classList, barrier, parentNode, dom, direction);
                    },
                    cbNext() {
                        barrier = unloadClasses(classList, barrier, parentNode, dom, direction);
                    }
                });
            }
        }
    },

    onremove(vnode) {
        if (this.isEnabled()) {
            // this property block a possible user event during the onunload
            vnode.dom.style['pointer-events'] = 'none';

            /**
             *  the current element unloaded
             *  is going to be the "new last element"
             */
            this.last = {
                key: vnode.key,
                dom: vnode.dom
            };
        }
    }

};
