import m from 'mithril';
import layout from './layout';

const PageOne = {
    controller() {
        return {
            title: m.prop('Page One')
        };
    },
    view(ctrl) {
        return layout([
            m('h1', 'Testing the page one'),
            m('.panel.panel-primary', [
                m('.panel-heading', [
                    m('h3.panel-title', 'Panel page one')
                ]),
                m('.panel-body', [
                    m(
                        'a.btn.btn-primary[href=/pageTwo]',
                        {config: m.route},
                        'Go to page two'
                    )
                ])
            ])
        ], {
            title: ctrl.title()
        });
    }
};

export default PageOne;
