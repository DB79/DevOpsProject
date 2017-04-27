import { browser, element, by } from 'protractor';

export class DevOpsProjectPage {
  navigateTo() {
    return browser.get('http://damien-devops.azurewebsites.net/');
  }

  getParagraphText() {
    return element(by.css('app-root h2')).getText();
  }
}
