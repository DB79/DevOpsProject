import { DevOpsProjectPage } from './app.po';

describe('dev-ops-project App', () => {
  let page: DevOpsProjectPage;

  beforeEach(() => {
    page = new DevOpsProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
