const enabled = Symbol('enabled');

function addClass(elem, className) {
    if (elem.classList) {
        elem.classList.add(className);
    } else {
        elem.className += ' ' + className;
    }
    return elem;
}

function removeClass(elem, className) {
    if (elem.classList) {
        elem.classList.remove(className);
    } else {
        elem.className = elem.className.replace(new RegExp('(^|\\b)' +
        className.split(' ').join('|') +
        '(\\b|$)', 'gi'), ' ');
    }
    return elem;
}

function persistHistory(key, history) {
    if (key) {
        sessionStorage.setItem(key, JSON.stringify(history));
    }
}

function clearHistory(key) {
    if (key) {
        sessionStorage.removeItem(key);
    }
}

function createHistory(persistHistoryAs = null) {
    let history = [];
    if (persistHistoryAs) {
        if (sessionStorage.getItem(persistHistoryAs)) {
            history = JSON.parse(sessionStorage.getItem(persistHistoryAs));
        }
    }
    return {
        persistHistoryAs,
        history,
        push(key) {
            this.history.push(key);
            persistHistory(this.persistHistoryAs, this.history);
        },
        pop() {
            this.history.pop();
            persistHistory(this.persistHistoryAs, this.history);
        },
        clear() {
            this.history = [];
            clearHistory(this.persistHistoryAs);
        },
        last() {
            return this.history[this.history.length - 1] ?
                this.history[this.history.length - 1] :
                undefined;
        }
    };
}

function loadClasses(classList, lastElem, elem, direction) {
    addClass(elem.parentNode, classList.parent);
    addClass(lastElem, classList.lastElem);
    addClass(elem, classList.newElem);
    addClass(elem, classList.direction.replace('<direction>', direction));
}

function unloadClasses(classList, barrier, parentNode, elem, direction) {
    const newBarrier = barrier - 1;
    if (newBarrier > 0) {
        return newBarrier;
    }
    removeClass(elem, classList.newElem);
    removeClass(elem, classList.direction.replace('<direction>', direction));

    if (elem.parentNode) {
        removeClass(elem.parentNode, classList.parent);
    }
    return newBarrier;
}

function config(key, elem, isInit, ctx) {
    if (this.useHistory && !key) {
        throw new Error('Error in mithril-transition: ' +
            'is required specified a key for the v-node.');
    }

    if (!isInit && this.isEnabled()) {
        const parentNode = elem.parentNode;
        const dataState = {
            parent: {
                height: parentNode.offsetHeight,
                width: parentNode.offsetWidth
            },
            lastElem: {
                height: this.last ? this.last.state.height : null,
                width: this.last ? this.last.state.width : null
            },
            newElem: {
                height: elem.offsetHeight,
                width: elem.offsetWidth
            }
        };

        let direction = 'next';

        if (this.useHistory) {
            /**
             *  if the page that comes it was in the final
             *  of the history queue i pop from that
             */
            if (this.history.last() === key) {
                direction = 'prev';
                this.history.pop();
            } else if (this.last) {
                /**
                 *  if direction is go the next i save the state
                 *  of the last element
                 */
                this.history.push(this.last.key);
            }
        }

        if (this.last) {
            let lastElem = this.last.elem;
            const id = 'mithril-transition-' + Date.now();
            loadClasses(this.classList, lastElem, elem, direction);
            lastElem.setAttribute('data-transition-id', id);
            parentNode
                .insertAdjacentHTML('beforeend', lastElem.outerHTML);
            this.last.elem = lastElem = parentNode
                .querySelector('[data-transition-id=' + id + ']');

            let barrier = 2;
            this.anim(
                lastElem,
                elem,
                direction, () => {
                    lastElem.parentNode.removeChild(lastElem);
                    barrier = unloadClasses(
                        this.classList,
                        barrier,
                        parentNode,
                        elem,
                        direction
                    );
                }, () => {
                    barrier = unloadClasses(
                        this.classList,
                        barrier,
                        parentNode,
                        elem,
                        direction
                    );
                },
                dataState
            );
        }

        const userOnUnload = ctx.onunload;
        ctx.onunload = () => {
            elem.style['pointer-events'] = 'none';
            /**
             *  the current element unloaded
             *  is going to be the "new last element"
             */
            this.last = {
                key,
                elem,
                state: {
                    height: dataState.newElem.height,
                    width: dataState.newElem.width
                }
            };

            if (userOnUnload) {
                userOnUnload();
            }
        };
    }
}


export default function transition({
    anim,
    useHistory = true,
    persistHistoryAs = null,
    classList = {
        parent: 'm-transition-parent',
        lastElem: 'm-transition-last-element',
        newElem: 'm-transition-new-element',
        direction: 'm-transition-<direction>'
    },
    disable = function () {}
} = {}) {
    if (!anim) {
        throw new Error('Error in mithril-transition: ' +
            'option `anim` is required.');
    }


    const that = {
        useHistory,
        anim,
        config,
        classList,
        [enabled]: true,
        isEnabled() {
            return that[enabled];
        },
        enable() {
            that[enabled] = true;
        },
        disable() {
            disable();
            that[enabled] = false;
        }
    };

    if (that.useHistory) {
        that.history = createHistory(persistHistoryAs);
    }

    const animate = function animate(elem, isInit, ctx) {
        that.config(this.attrs.key, elem, isInit, ctx);
    };
    animate.isEnabled = that.isEnabled;
    animate.enable = that.enable;
    animate.disable = that.disable;
    return animate;
}
