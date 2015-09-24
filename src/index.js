function persistHistory(persistHistoryAs, history) {
    sessionStorage.setItem(persistHistoryAs, JSON.stringify(history));
}
function createHistory(persistHistoryAs = false) {
    let history = [];
    if (persistHistoryAs) {
        if (sessionStorage.getItem(persistHistoryAs)) {
            history = JSON.parse(sessionStorage.getItem(persistHistoryAs));
        }
    }
    return {
        persistHistoryAs: persistHistoryAs,
        history,
        push(key) {
            this.history.push(key);
            persistHistory(this.persistHistoryAs, this.history);
        },
        pop() {
            this.history.pop();
            persistHistory(this.persistHistoryAs, this.history);
        },
        last() {
            return this.history[this.history.length - 1]
                ? this.history[this.history.length - 1]
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

function loadStyles(lastElem, elem) {
    if (this.styleParent) {
        appendStyles(elem.parentNode, this.styleParent);
    }
    if (this.styleLastElement) {
        appendStyles(lastElem, this.styleLastElement);
    }
    if (this.styleNewElement) {
        appendStyles(elem, this.styleNewElement);
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

    /**
     * is not necesary unload the style of the last element because
     * is going remove it.
     */

    if (this.styleNewElement) {
        removeStyles(elem, this.styleNewElement);
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
            const lastElem = this.last.elem;
            this.loadStyles(lastElem, elem);

            parentNode
                .insertAdjacentElement('beforeend', lastElem);

            let barrier = 2;
            this.anim(
                lastElem,
                elem,
                direction, () => {
                    lastElem.remove();
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

const defaultStyleElements = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
};
export default function transition({
    anim = null,
    useHistory = true,
    persistHistoryAs = false,
    styleParent = {
        width: '100%',
        height: '100%',
        overflow: 'hidden'
    },
    styleLastElement = defaultStyleElements,
    styleNewElement = defaultStyleElements
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
        styleLastElement,
        styleNewElement,
        loadStyles,
        unloadStyles
    };

    if (that.useHistory) {
        that.history = createHistory(persistHistoryAs);
    }

    return function animate(elem, isInit, ctx) {
        that.config(this.attrs.key, elem, isInit, ctx);
    };
}
