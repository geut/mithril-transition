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
        throw new Error('Error in mithril-transition: option `anim` is required.');
    }
    const that = {
        useHistory: opts.useHistory || true,
        last: null, // {key: '', elem: ''},
        anim: opts.anim,
        config(key, elem, isInit, ctx) {
            if (!isInit) {
                const parentNode = elem.parentNode;
                let direction = 'next';

                if (that.useHistory) {
                    // si la pagina que viene estaba al final de la history la saco
                    if (that.history.last() === key) {
                        // direccion es volver a uno atras
                        direction = 'prev';
                        that.history.pop();
                    } else {
                        // direccion es ir al proximo, guardo el estado del anterior
                        if (that.last) {
                            that.history.push(that.last.key);
                        }
                    }
                }

                elem
                    .classList
                    .add('m-transition-' + direction);

                if (that.last) {
                    parentNode.insertAdjacentElement('beforeend', that.last.elem);

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

                    // el elemento que se unload se convierte en el ultimo
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
    return that;
}
