import { RdGoogleBookSearchPage } from './app.po';

describe('rd-google-book-search App', () => {
  let page: RdGoogleBookSearchPage;

  beforeEach(() => {
    page = new RdGoogleBookSearchPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
