function History(useBrowserHistory = false) {
    return {
        useBrowserHistory: useBrowserHistory,
        history: useBrowserHistory ? window.history : [],
        push(key) {
            const obj = {key: key};
            const that = this;
            if (this.useBrowserHistory) {
                setTimeout(() => {
                    that.history.pushState(obj, key);
                }, 16);
            } else {
                this.history.push(obj);
            }
        },
        pop() {
            if (!this.useBrowserHistory) {
                this.history.pop();
            }
        },
        last() {
            if (this.useBrowserHistory) {
                return this.history.state
                    ? this.history.state.key
                    : undefined;
            }
            return this.history[this.history.length - 1]
                ? this.history[this.history.length - 1].key
                : undefined;
        }
    };
}

export default function Transition(opts = {}) {
    if (!opts.anim) {
        throw new Error('Error in mithril-transition: ' +
        'option `anim` is required.');
    }
    const that = {
        useHistory: opts.useHistory || true,
        last: null, // {key: '', elem: ''}
        anim: opts.anim,
        config(key, elem, isInit, ctx) {
            if (!isInit) {
                const parentNode = elem.parentNode;
                let direction = 'next';

                if (that.useHistory) {
                    /**
                     *  if the page that comes it was in the final
                     *  of the history queue i pop from that
                     */
                    if (that.history.last() === key) {
                        direction = 'prev';
                        that.history.pop();
                    } else {
                        /**
                         *  if direction is go the next i save the state
                         *  of the last element
                         */
                        if (that.last) {
                            that.history.push(that.last.key);
                        }
                    }
                }

                elem
                    .classList
                    .add('m-transition-' + direction);

                if (that.last) {
                    parentNode
                        .insertAdjacentElement('beforeend', that.last.elem);

                    that.anim(
                       that.last.elem,
                       elem,
                       parentNode,
                       direction,
                       () => {
                           parentNode.removeChild(that.last.elem);
                       }
                   );
                }

                const userOnUnload = ctx.onunload;
                ctx.onunload = () => {
                    elem
                        .classList
                        .remove('m-transition-' + direction);
                    elem
                        .classList
                        .add('m-transition-last');

                    /**
                     *  the current element unloaded
                     *  is going to be the new last
                     */
                    that.last = {
                        key: key,
                        elem: elem
                    };

                    if (userOnUnload) {
                        userOnUnload();
                    }
                };
            }
        }
    };

    if (that.useHistory) {
        that.history = History(opts.useBrowserHistory);
    }

    const anim = function anim(elem, isInit, ctx) {
        that.config(this.attrs.key, elem, isInit, ctx);
    };
    anim.transitionInstance = that;
    return anim;
}
