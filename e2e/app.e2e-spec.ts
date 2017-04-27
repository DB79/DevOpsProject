import { DevOpsProjectPage } from './app.po';

describe('dev-ops-project App', () => {
  let page: DevOpsProjectPage;

  beforeEach(() => {
    page = new DevOpsProjectPage();
  });

  it('should display h2 saying Stock System', () => {
    page.navigateTo();
    expect(page.getH2Text()).toEqual('Stock System');
  });

  it('should display h1 saying Dev Ops Project', () => {
    page.navigateTo();
    expect(page.getH1Text()).toEqual('Dev Ops Project');
  });
});
