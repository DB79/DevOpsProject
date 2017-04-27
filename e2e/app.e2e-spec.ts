import { DevOpsProjectPage } from './app.po';

describe('dev-ops-project App', () => {
  let page: DevOpsProjectPage;

  beforeEach(() => {
    page = new DevOpsProjectPage();
  });

  it('should display h2 saying Stock System', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Stock System - failing');
  });
});
