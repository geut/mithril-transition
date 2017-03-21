const m = require('mithril');

module.exports = (props = {}) => {
    return m('nav.navbar.navbar-inverse.navbar-fixed-top', [
        m('.container', [
            m('.navbar-header', [
                m('a.navbar-brand', props.title)
            ]),
            m('.collapse navbar-collapse', [
                m(
                    'button.btn.btn-default.navbar-btn',
                    {
                        onclick() {
                            if ( props.transition.isEnabled() ) {
                                props.transition.disable();
                            } else {
                                props.transition.enable();
                            }
                        }
                    },
                    props.transition.isEnabled() ? 'Disable' : 'Enable'
                )
            ])
        ])
    ]);
};
