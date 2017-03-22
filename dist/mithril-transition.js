(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.mithrilTransition = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const createHistory = require('./lib/history');
const { oncreate, onremove } = require('./lib/hooks');
const enabled = Symbol('enabled');

module.exports = function createTransition({
    animation,
    useHistory = true,
    persistHistoryAs = null,
    classList = {
        parent: 'm-transition-parent',
        lastElm: 'm-transition-last-element',
        nextElm: 'm-transition-next-element',
        direction: 'm-transition-<direction>'
    },
    disable = function () {}
} = {}) {

    if (!animation) {
        throw new Error('Error in mithril-transition: option [animation] is required.');
    }

    const that = {
        useHistory,
        animation,
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
        },
        oncreate(...args) {
            return oncreate.call(that, ...args);
        },
        onremove(...args) {
            return onremove.call(that, ...args);
        }
    };

    if (that.useHistory) {
        that.history = createHistory(persistHistoryAs);
    }

    return that;
};

},{"./lib/history":3,"./lib/hooks":4}],2:[function(require,module,exports){
exports.loadClasses = function (classList, lastElm, elem, direction) {
    elem.parentNode.classList.add(classList.parent);
    lastElm.classList.add(classList.lastElm);
    elem.classList.add(classList.nextElm);
    elem.classList.add(classList.direction.replace('<direction>', direction));
};

exports.unloadClasses = function (classList, barrier, parentNode, elem, direction) {
    const newBarrier = barrier - 1;

    if (newBarrier > 0) {
        return newBarrier;
    }

    elem.classList.remove(classList.nextElm);
    elem.classList.remove(classList.direction.replace('<direction>', direction));

    if (elem.parentNode) {
        elem.parentNode.classList.remove(classList.parent);
    }

    return newBarrier;
};

},{}],3:[function(require,module,exports){
function persistHistory(key, stack) {
    if (key) {
        sessionStorage.setItem(key, JSON.stringify(stack));
    }
}

function clearHistory(key) {
    if (key) {
        sessionStorage.removeItem(key);
    }
}

module.exports = function createHistory(persistHistoryAs = null) {
    let stack = [];
    if (persistHistoryAs) {
        if (sessionStorage.getItem(persistHistoryAs)) {
            stack = JSON.parse(sessionStorage.getItem(persistHistoryAs));
        }
    }
    return {
        persistHistoryAs,
        stack,
        push(key) {
            this.stack.push(key);
            persistHistory(this.persistHistoryAs, this.stack);
        },
        pop() {
            this.stack.pop();
            persistHistory(this.persistHistoryAs, this.stack);
        },
        clear() {
            this.stack = [];
            clearHistory(this.persistHistoryAs);
        },
        last() {
            return this.stack[this.stack.length - 1] ?
                this.stack[this.stack.length - 1] :
                undefined;
        },
        direction(key, last) {
            if (this.last() === key) {
                // if the page that comes it was in the final of the history queue i pop from that
                this.pop();
                return 'prev';
            } else if (last) {
                // if direction is go the next i save the state of the last element
                this.push(last.key);
            }

            return 'next';
        }
    };
};


},{}],4:[function(require,module,exports){
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

},{"./classes":2}]},{},[1])(1)
});