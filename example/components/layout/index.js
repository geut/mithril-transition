const m = require('mithril');
const navbar = require('./navbar');
//const transition = require('../../../src/index.js');
const velocity = require('velocity-animate');
require('velocity-animate/velocity.ui.min');

//const anim = transition({
    //persistHistoryAs: 'appHistory',
    //anim(lastElem, newElem, direction, cbLast, cbNew, dataState) {
        //console.log(dataState);
        //const query = '.navbar-brand, .page > .container > *';
        //if (direction === 'next') {
            //velocity(
                //lastElem.querySelectorAll(query),
                //'transition.slideLeftBigOut',
                //{
                    //complete: cbLast,
                    //stagger: 100
                //}
            //);

            //velocity(
                //newElem.querySelectorAll(query),
                //'transition.slideRightBigIn',
                //{
                    //stagger: 100,
                    //complete: cbNew
                //}
            //);
        //} else {
            //velocity(
                //lastElem.querySelectorAll(query),
                //'transition.slideRightBigOut',
                //{
                    //complete: cbLast,
                    //stagger: 100
                //}
            //);

            //velocity(
                //newElem.querySelectorAll(query),
                //'transition.slideLeftBigIn',
                //{
                    //stagger: 100,
                    //complete: cbNew
                //}
            //);
        //}
        //return false;
    //}
//});

module.exports = (content, props = {}) => {
    //props.anim = anim;
    return m('.app', [
        m('.page', { key: m.route.get() }, [
            navbar(props),
            m('.container', [
                content
            ])
        ])
    ]);
};
