import m from 'mithril';
import layout from './layout';

const PageTwo = {
    controller() {
        return {
            title: m.prop('Page Two')
        };
    },
    view(ctrl) {
        return layout([
            m('h1', 'Testing the page two'),
            m('.panel.panel-danger', [
                m('.panel-heading', [
                    m('h3.panel-title', 'Panel page two')
                ]),
                m('.panel-body', [
                    m(
                        'a.btn.btn-danger[href=/pageOne]',
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

export default PageTwo;
