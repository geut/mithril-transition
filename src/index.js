function history(useBrowserHistory = false) {
    return {
        useBrowserHistory: useBrowserHistory,
        history: useBrowserHistory ? window.history : [],
        push(key) {
            const obj = {
                key
            };
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
                return this.history.state ? this.history.state.key : undefined;
            }
            return this.history[this.history.length - 1]
                ? this.history[this.history.length - 1].key
                : undefined;
        }
    };
}

function appendStyles(element, styles) {
    for (const attr in styles) {
        if ({}.hasOwnProperty.call(styles, attr)) {
            element.style[attr] = styles[attr];
        }
    }
}

function removeStyles(element, styles) {
    for (const attr in styles) {
        if ({}.hasOwnProperty.call(styles, attr)) {
            element.style[attr] = null;
        }
    }
}

function loadStyles(parentNode, elem) {
    if (this.styleParent) {
        appendStyles(parentNode, this.styleParent);
    }
    if (this.styleElement) {
        appendStyles(this.last.elem, this.styleElement);
        appendStyles(elem, this.styleElement);
    }
}

function unloadStyles(barrier, parentNode, elem) {
    const newBarrier = barrier - 1;
    if (newBarrier > 0) {
        return newBarrier;
    }
    if (this.styleParent) {
        removeStyles(parentNode, this.styleParent);
    }
    if (this.styleElement) {
        removeStyles(this.last.elem, this.styleElement);
        removeStyles(elem, this.styleElement);
    }
    return newBarrier;
}

function config(key, elem, isInit, ctx) {
    if (this.useHistory && !key) {
        throw new Error('Error in mithril-transition: ' +
            'is required specified a key for the v-node.');
    }

    if (!isInit) {
        const parentNode = elem.parentNode;
        let direction = 'next';

        if (this.useHistory) {
            /**
             *  if the page that comes it was in the final
             *  of the history queue i pop from that
             */
            if (this.history.last() === key) {
                direction = 'prev';
                this.history.pop();
            } else {
                /**
                 *  if direction is go the next i save the state
                 *  of the last element
                 */
                if (this.last) {
                    this.history.push(this.last.key);
                }
            }
        }

        elem
            .classList
            .add('m-transition-' + direction);

        if (this.last) {
            this.loadStyles(parentNode, elem);

            parentNode
                .insertAdjacentElement('beforeend', this.last.elem);

            let barrier = 2;
            this.anim(
                this.last.elem,
                elem,
                direction, () => {
                    parentNode.removeChild(this.last.elem);
                    barrier = this.unloadStyles(barrier, parentNode, elem);
                }, () => {
                    elem
                        .classList
                        .remove('m-transition-' + direction);
                    barrier = this.unloadStyles(barrier, parentNode, elem);
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
             *  is going to be the "new last element"
             */
            this.last = {
                key: key,
                elem: elem
            };

            if (userOnUnload) {
                userOnUnload();
            }
        };
    }
}
export default function transition({
    anim = null,
        useHistory = true,
        useBrowserHistory = false,
        styleParent = {
            width: '100%',
            height: '100%',
            overflow: 'hidden'
        },
        styleElement = {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
        }
} = {}) {
    if (!anim) {
        throw new Error('Error in mithril-transition: ' +
            'option `anim` is required.');
    }

    const that = {
        useHistory,
        anim,
        config,
        styleParent,
        styleElement,
        loadStyles,
        unloadStyles
    };

    if (that.useHistory) {
        that.history = history(useBrowserHistory);
    }

    return function animate(elem, isInit, ctx) {
        that.config(this.attrs.key, elem, isInit, ctx);
    };
}
