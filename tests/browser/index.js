import { Selector as selector } from 'testcafe';

fixture `Started`
    .page `${process.env.URL || 'https://geut.github.io/mithril-transition/example'}`;

test('Expected navigate until the page 3', async t => {
    await t
        .click(selector('#goto-page-two'))
        .expect(selector('.navbar-brand').textContent).eql('Page Two', 'Title must be: Page Two')
        .click(selector('#goto-page-three'))
        .expect(selector('.navbar-brand').textContent).eql('Page Three', 'Title must be: Page Three');
});

test('Expected navigate to the page 2 and back', async t => {
    await t
        .click(selector('#goto-page-two'))
        .expect(selector('.navbar-brand').textContent).eql('Page Two', 'Title must be: Page Two')
        .click(selector('#goto-page-one'))
        .expect(selector('.navbar-brand').textContent).eql('Page One', 'Title must be: Page One');
});
