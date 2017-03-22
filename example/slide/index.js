const createTransition = require('../../src/index.js');
const animationend = require('animationend');

module.exports = (persistHistoryAs) => {
    return createTransition({
        persistHistoryAs,
        animation({ lastElm, nextElm, direction, cbLast, cbNext }) {
            animationend(lastElm, cbLast);
            animationend(nextElm, () => {
                nextElm.classList.remove('pt-page-moveFromRight', 'pt-page-moveFromLeft');
                cbNext();
            });
            if (direction === 'next') {
                lastElm.classList.add('pt-page-moveToLeft');
                nextElm.classList.add('pt-page-moveFromRight');
            } else {
                lastElm.classList.add('pt-page-moveToRight');
                nextElm.classList.add('pt-page-moveFromLeft');
            }
        }
    });
};
