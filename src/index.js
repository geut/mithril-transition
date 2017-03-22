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
