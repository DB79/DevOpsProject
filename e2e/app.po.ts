import { browser, element, by } from 'protractor';

export class DevOpsProjectPage {
  navigateTo() {
    return browser.get('/');
  }

  getH2Text() {
    return element(by.css('app-root h2')).getText();
  }

  getH1Text(){
    return element(by.css('app-root h1')).getText();
  }
}
