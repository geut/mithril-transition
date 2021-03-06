import { Selector as selector } from 'testcafe';

fixture `Started`
    .page `${process.env.URL || 'https://geut.github.io/mithril-transition/example/#!/page/1'}`;

function gotoLastPage(t) {
    return t
        .click(selector('#main-next'))
        .expect(selector('.navbar-brand').textContent).eql('Page Two', 'Title must be: Page Two')
        .click(selector('#main-next'))
        .expect(selector('.navbar-brand').textContent).eql('Page Three', 'Title must be: Page Three');
}

function gobackToFirstPage(t) {
    return t
        .click(selector('#main-back'))
        .expect(selector('.navbar-brand').textContent).eql('Page Two', 'Title must be: Page Two')
        .click(selector('#main-back'))
        .expect(selector('.navbar-brand').textContent).eql('Page One', 'Title must be: Page One');
}

test('should navigate until the page 3', async t => {
    await gotoLastPage(t);
});

test('should navigate to the page 3 and go back to the page 1', async t => {
    await gobackToFirstPage(gotoLastPage(t));
});

test('should mithril-transition disabled when call the method disable()', async t => {
    await t
        .setTestSpeed(1)
        .click(selector('#switch'))
        .click(selector('#main-next'))
        .expect(selector('.app').hasClass('m-transition-parent')).notOk()
        .click(selector('#switch'))
        .click(selector('#main-back'))
        .expect(selector('.app').hasClass('m-transition-parent')).ok();
});
