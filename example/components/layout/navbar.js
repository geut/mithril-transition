const m = require('mithril');

module.exports = (props = {}) => {
    return m('nav.navbar.navbar-inverse.navbar-fixed-top', [
        m('.container', [
            m('.navbar-header', [
                m('a.navbar-brand', props.title)
            ]),
            m('.collapse navbar-collapse', [
                //m(
                    //'button.btn.btn-default.navbar-btn',
                    //{
                        //onclick() {
                            //if ( props.anim.isEnabled() ) {
                                //props.anim.disable();
                            //} else {
                                //props.anim.enable();
                            //}
                        //}
                    //},
                    //props.anim.isEnabled() ? 'Disable' : 'Enable'
                //)
            ])
        ])
    ]);
};
