import { expect, type Locator, type Page } from '@playwright/test';

export class SetUpPage {
  readonly page: Page;
  readonly getSetUpHeading: Locator;
  readonly getCustomerNumberlLabel: Locator;
  readonly getCustomerNumberInput: Locator;
  readonly getDOBLabel: Locator;
  readonly getDay: Locator;
  readonly getMonth: Locator;
  readonly getYear: Locator;
  readonly getNextButton: Locator;
  readonly getCancelButton: Locator;
  readonly getWebChat: Locator;
  readonly getMissingMFAErrorTitle: Locator;
  readonly getMissingMFAErrorDesc: Locator;
  readonly getMissingMFAErrorBackButton: Locator;
  readonly getEmptyCustomerNumberError: Locator;
  readonly getLessThan7DigitsError: Locator;
  readonly getBackButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getSetUpHeading = page.getByRole('heading', { name: 'Set up your account' });
    this.getCustomerNumberlLabel = page.getByText('Customer Number');
    this.getCustomerNumberInput = page.getByPlaceholder('Customer Number');
    this.getDOBLabel = page.getByText('Date of Birth');
    this.getDay = page.getByLabel('Day');
    this.getMonth = page.getByLabel('Month');
    this.getYear = page.getByLabel('Year');
    this.getNextButton = page.getByLabel('Next');
    this.getCancelButton = page.getByLabel('Cancel');
    this.getWebChat = page.getByLabel('Launch chat');
    this.getMissingMFAErrorTitle = page.getByRole('heading', { name: 'Sorry, the login info you\'ve entered doesn\'t match our records' });
    this.getMissingMFAErrorDesc = page.getByLabel('Please check you are using your customer number (not account number) or call us on 1300 720 823');
    this.getMissingMFAErrorBackButton = page.getByRole('button', { name: 'Back' });
    this.getEmptyCustomerNumberError = page.getByText('This information is required.');
    this.getLessThan7DigitsError = page.getByText('Please enter 7 digit customer');
    this.getBackButton = page.getByRole('button', { name: 'Back' });

  }

  async enterCustomerNumber(customerNumber: string){
    await expect(this.getCustomerNumberlLabel).toBeVisible();
    await this.getCustomerNumberInput.click();
    await this.getCustomerNumberInput.fill(customerNumber);
    await expect(this.getCustomerNumberInput).toHaveValue(customerNumber);
  }

  async selectDay(dayValue: string){
    await expect(this.getDay).toHaveValue('1');
    await this.getDay.selectOption(dayValue);
    await expect(this.getDay).toHaveValue(dayValue);
  }

  async selectMonth(monthValue: string){
    await expect(this.getMonth).toHaveValue('1');
    await this.getMonth.selectOption(monthValue);
    await expect(this.getMonth).toHaveValue(monthValue);
  }

  async selectYear(yearValue: string){
    await expect(this.getYear).toHaveValue('1984');
    await this.getYear.selectOption(yearValue);
    await expect(this.getYear).toHaveValue(yearValue);
  }

  async clickNextButton(){
    await this.getNextButton.click();
  }

  async clickBackButton(){
    await this.getMissingMFAErrorBackButton.click();
  }

}