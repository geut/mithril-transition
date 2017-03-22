const m = require('mithril');

module.exports = (props = {}) => {
    return m('nav.navbar.navbar-inverse.navbar-fixed-top', [
        m('.container', [
            m('.navbar-header', [
                m('a.navbar-brand', props.title)
            ]),
            m('.collapse.navbar-collapse', [
                m('.navbar-left', [
                    m('button#switch.btn.btn-default.navbar-btn', {
                        onclick() {
                            if ( props.transition.isEnabled() ) {
                                props.transition.disable();
                            } else {
                                props.transition.enable();
                            }
                        }
                    }, props.transition.isEnabled() ? 'Disable' : 'Enable')
                ]),
                m('.navbar-right', [
                    m('button#main-back.btn.btn-warning.navbar-btn', {
                        onclick() {
                            window.history.back();
                        }
                    }, 'Back'),
                    m('button#main-next.btn.btn-default.navbar-btn', {
                        onclick() {
                            let page = parseInt(props.page);
                            if (page === 3) {
                                page = 1;
                            } else {
                                page++;
                            }
                            m.route.set(`/page/${page}`);
                        }
                    }, 'Next')
                ])
            ])
        ])
    ]);
};
