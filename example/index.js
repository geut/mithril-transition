const m = require('mithril');
const pages = [
    require('./components/pages/one.js'),
    require('./components/pages/two.js'),
    require('./components/pages/three.js')
];

m.route(document.body, '/page/1', {
    '/page/:page': {
        onmatch(args) {
            return pages[args.page - 1];
        }
    }
});

