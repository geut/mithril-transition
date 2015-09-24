import m from 'mithril';
import layout from './layout';

const PageThree = {
    controller() {
        return {
            title: m.prop('Page Three')
        };
    },
    view(ctrl) {
        return layout([
            m('h1', 'Testing the page three'),
            m('.panel.panel-success', [
                m('.panel-heading', [
                    m('h3.panel-title', 'Panel page three')
                ]),
                m('.panel-body', [
                    m(
                        'a.btn.btn-success[href=/pageOne]',
                        {config: m.route},
                        'Go to page one'
                    )
                ])
            ])
        ], {
            title: ctrl.title()
        });
    }
};

export default PageThree;
