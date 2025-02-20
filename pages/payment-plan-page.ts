import { expect, type Locator, type Page } from '@playwright/test';

export class PaymentPlan {
  readonly page: Page;
  readonly getWebChat: Locator;
  readonly getTitle: Locator;
  readonly getAccountNumber: Locator;
  readonly getAmountInput: Locator;
  readonly getFrequencyWeekly: Locator;
  readonly getFrequencyFortnightly: Locator;
  readonly getFrequencyMonthly: Locator;
  readonly getFirstPaymentDate: Locator;
  readonly getFirstDueDate: Locator;
  readonly getSecondDueDate: Locator;
  readonly getFirstDueAmount: Locator;
  readonly getClosureDate: Locator;
  readonly getPaymentPlanContinueButton: Locator;
  readonly getPaymentMethodBank: Locator;
  readonly getPaymentMethodCard: Locator;
  readonly getBSBInput: Locator;
  readonly getBankAccountNumberInput: Locator;
  readonly getBankAccountNameInput: Locator; 
  readonly getPaymentMethodContinueButton: Locator;
  readonly getConfirmAccount: Locator;
  readonly getConfirmPaymentPlan: Locator;
  readonly getConfirmPaymentMethod: Locator;
  readonly getPaymentReminderCheckbox: Locator;
  readonly getTnCCheckbox: Locator; 
  readonly getConfirmButton: Locator;
  readonly getPaymentPlanSuccessHeading: Locator;
  readonly getPaymentPlanErrorMessage: Locator;
  readonly getPaymentPlanSuccessAccountNumber: Locator;
  readonly getPaymentPlanSuccessAmount: Locator;
  readonly getPaymentPlanSuccessFrequency: Locator;
  readonly getPaymentPlanSuccessPaymentMethod: Locator;
  readonly getPaymentPlanSuccessPaymentDate: Locator;
  readonly getPaymentPlanSuccessDashboardButton: Locator;
  readonly getPaymentPlanSuccessPrintButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getWebChat = page.getByLabel('Launch chat button');
    this.getTitle = page.getByRole('heading', { name: 'Set up a payment plan' });
    this.getAccountNumber = page.locator('#pioneer-credit-application > main > div > div:nth-child(3) > div > div > form > details:nth-child(1) > summary > span');
    this.getAmountInput = page.locator('#step-card-amount');
    this.getFrequencyWeekly = page.getByLabel('weekly');
    this.getFrequencyFortnightly = page.getByLabel('fortnightly');
    this.getFrequencyMonthly = page.getByLabel('monthly');
    this.getFirstPaymentDate = page.getByLabel('Friday, January 10th,');
    this.getFirstDueDate = page.locator('//*[@id="pioneer-credit-application"]/main/div/div[3]/div/div/form/details[2]/div/div[3]/div[2]/table/tbody/tr[1]/td[1]');
    this.getSecondDueDate = page.locator('//*[@id="pioneer-credit-application"]/main/div/div[3]/div/div/form/details[2]/div/div[3]/div[2]/table/tbody/tr[2]/td[1]');
    this.getFirstDueAmount = page.locator('//*[@id="pioneer-credit-application"]/main/div/div[3]/div/div/form/details[2]/div/div[3]/div[2]/table/tbody/tr[1]/td[2]');
    this.getClosureDate = page.getByText('Estimated closure date:');
    this.getPaymentPlanContinueButton = page.getByRole('button', { name: 'Continue' });
    this.getPaymentMethodBank = page.getByLabel('Bank Account');
    this.getPaymentMethodCard = page.getByLabel('Debit or Credit Card');
    this.getBSBInput = page.getByPlaceholder('Enter your BSB');
    this.getBankAccountNumberInput = page.getByPlaceholder('Enter your account number');
    this.getBankAccountNameInput = page.getByPlaceholder('Enter your name as it appears');
    this.getPaymentMethodContinueButton = page.getByRole('button', { name: 'Continue' });
    this.getConfirmAccount = page.locator('//*[@id="pioneer-credit-application"]/main/div/div[3]/div/div/form/details[4]/div/table/tbody/tr[1]/td[2]');
    this.getConfirmPaymentPlan = page.locator('//*[@id="pioneer-credit-application"]/main/div/div[3]/div/div/form/details[4]/div/table/tbody/tr[2]/td[2]');
    this.getConfirmPaymentMethod = page.locator('//*[@id="pioneer-credit-application"]/main/div/div[3]/div/div/form/details[4]/div/table/tbody/tr[3]/td[2]');
    this.getPaymentReminderCheckbox = page.getByLabel('I would like to receive');
    this.getTnCCheckbox = page.getByLabel('I accept Pioneer Credit\'s');
    this.getConfirmButton = page.getByRole('button', { name: 'Confirm' });
    this.getPaymentPlanSuccessHeading = page.getByText('Payment Plan Confirmed');
    this.getPaymentPlanSuccessAccountNumber = page.locator('//*[@id="pioneer-credit-application"]/main/div/div[2]/table/tbody/tr[1]/td[2]');
    this.getPaymentPlanSuccessAmount = page.locator('//*[@id="pioneer-credit-application"]/main/div/div[2]/table/tbody/tr[2]/td[2]');
    this.getPaymentPlanSuccessFrequency = page.locator('//*[@id="pioneer-credit-application"]/main/div/div[2]/table/tbody/tr[3]/td[2]');
    this.getPaymentPlanSuccessPaymentMethod = page.locator('//*[@id="pioneer-credit-application"]/main/div/div[2]/table/tbody/tr[4]/td[2]');
    this.getPaymentPlanSuccessPaymentDate = page.locator('//*[@id="pioneer-credit-application"]/main/div/div[2]/table/tbody/tr[5]/td[2]');
    this.getPaymentPlanSuccessDashboardButton = page.getByRole('main').getByRole('link', { name: 'Dashboard' });
    this.getPaymentPlanSuccessPrintButton = page.getByRole('button', { name: 'Print' });
  }

  async enterAmount(amount: string){
    await this.getAmountInput.clear();
    await this.getAmountInput.fill(amount);
    await expect(this.getAmountInput).toHaveValue(amount);
  }

  async assertWeeklyDatesRange(){
    const date = require('date-and-time');
    const today = new Date();
    const todayFormat = date.format(today, 'YYYY-MM-DD');
    const eightDaysAfter = date.addDays(today, 8);
    const eightDaysAfterFormat = date.format(eightDaysAfter, 'YYYY-MM-DD');
    await expect(this.page.locator(`.rdp-day[data-day="${todayFormat}"]`).locator('button[class="rdp-day_button"]')).toBeDisabled();
    await expect(this.page.locator(`.rdp-day[data-day="${eightDaysAfterFormat}"]`).locator('button[class="rdp-day_button"]')).toBeDisabled();
  }

  async selectWeeklyFirstPaymentDate(){
    const date = require('date-and-time');
    const now = new Date();
    const firstPaymentDate = date.addDays(now, 7);
    const firstPaymentDateFormat = date.format(firstPaymentDate, 'YYYY-MM-DD');
    await this.page.locator(`.rdp-day[data-day="${firstPaymentDateFormat}"]`).locator('button[class="rdp-day_button"]').click();
  }

  async getWeeklyFirstPaymentDateFormat1(){
    const date = require('date-and-time');
    const now = new Date();
    const weeklyFirstPaymentDate = date.addDays(now, 7);
    const weeklyFirstPaymentDateFormat1 = date.format(weeklyFirstPaymentDate, 'DD/MM/YYYY');
    return weeklyFirstPaymentDateFormat1;
  }

  async getWeeklySecondPaymentDateFormat1(){
    const date = require('date-and-time');
    const now = new Date();
    const weeklySecondPaymentDate = date.addDays(now, 14);
    const weeklySecondPaymentDateFormat = date.format(weeklySecondPaymentDate, 'DD/MM/YYYY');
    return weeklySecondPaymentDateFormat;
  }

  async getWeeklyFirstPaymentDateFormat2(){
    const date = require('date-and-time');
    const now = new Date();
    const weeklyFirstPaymentDate = date.addDays(now, 7);
    const weeklyFirstPaymentDateFormat2 = date.format(weeklyFirstPaymentDate, 'DD-MMM-YY');
    return weeklyFirstPaymentDateFormat2;
  }

  async assertFortnightlyDatesRange(){
    const date = require('date-and-time');
    const today = new Date();
    const todayFormat = date.format(today, 'YYYY-MM-DD');
    const fifteenDaysAfter = date.addDays(today, 15);
    const fifteenDaysAfterFormat = date.format(fifteenDaysAfter, 'YYYY-MM-DD');
    await expect(this.page.locator(`.rdp-day[data-day="${todayFormat}"]`).locator('button[class="rdp-day_button"]')).toBeDisabled();
    await expect(this.page.locator(`.rdp-day[data-day="${fifteenDaysAfterFormat}"]`).locator('button[class="rdp-day_button"]')).toBeDisabled();
  }

  async selectFortnightlyFirstPaymentDate(){
    const date = require('date-and-time');
    const now = new Date();
    const fortnightlyFirstPaymentDate = date.addDays(now, 14);
    const fortnightlyFirstPaymentDateFormat = date.format(fortnightlyFirstPaymentDate, 'YYYY-MM-DD');
    await this.page.locator(`.rdp-day[data-day="${fortnightlyFirstPaymentDateFormat}"]`).locator('button[class="rdp-day_button"]').click();
  }

  async getFortnightlyFirstPaymentDateFormat1(){
    const date = require('date-and-time');
    const now = new Date();
    const fortnightlyFirstPaymentDate = date.addDays(now, 14);
    const fortnightlyFirstPaymentDateFormat1 = date.format(fortnightlyFirstPaymentDate, 'DD/MM/YYYY');
    return fortnightlyFirstPaymentDateFormat1;
  }

  async getFortnightlySecondPaymentDateFormat1(){
    const date = require('date-and-time');
    const now = new Date();
    const fortnightlySecondPaymentDate = date.addDays(now, 28);
    const fortnightlySecondPaymentDateFormat1 = date.format(fortnightlySecondPaymentDate, 'DD/MM/YYYY');
    return fortnightlySecondPaymentDateFormat1;
  }

  async getFortnightlyFirstPaymentDateFormat2(){
    const date = require('date-and-time');
    const now = new Date();
    const fortnightlyFirstPaymentDate = date.addDays(now, 14);
    const fortnightlyFirstPaymentDateFormat2 = date.format(fortnightlyFirstPaymentDate, 'DD-MMM-YY');
    return fortnightlyFirstPaymentDateFormat2;
  }

  async assertMonthlyDatesRange(){
    const date = require('date-and-time');
    const today = new Date();
    const todayFormat = date.format(today, 'YYYY-MM-DD');
    const thirtyoneDaysAfter = date.addDays(today, 31);
    const thirtyoneDaysAfterFormat = date.format(thirtyoneDaysAfter, 'YYYY-MM-DD');
    await expect(this.page.locator(`.rdp-day[data-day="${todayFormat}"]`).locator('button[class="rdp-day_button"]')).toBeDisabled();
    await expect(this.page.locator(`.rdp-day[data-day="${thirtyoneDaysAfterFormat}"]`).locator('button[class="rdp-day_button"]')).toBeDisabled()
  }

  async selectMonthlyFirstPaymentDate(){
    const date = require('date-and-time');
    const now = new Date();
    const monthlyfirstPaymentDate = date.addDays(now, 28);
    const monthlyfirstPaymentDateFormat = date.format(monthlyfirstPaymentDate, 'YYYY-MM-DD');
    await this.page.locator(`.rdp-day[data-day="${monthlyfirstPaymentDateFormat}"]`).locator('button[class="rdp-day_button"]').click();
  }

  async getMonthlyFirstPaymentDateFormat1(){
    const date = require('date-and-time');
    const now = new Date();
    const monthlyFirstPaymentDate = date.addDays(now, 28);
    const monthlyFirstPaymentDateFormat1 = date.format(monthlyFirstPaymentDate, 'DD/MM/YYYY');
    return monthlyFirstPaymentDateFormat1;
  }

  async getMonthlySecondPaymentDateFormat1(){
    const date = require('date-and-time');
    const now = new Date();
    const monthlySecondPaymentDate = date.addDays(now, 56);
    const monthlySecondPaymentDateFormat1 = date.format(monthlySecondPaymentDate, 'DD/MM/YYYY');
    return monthlySecondPaymentDateFormat1;
  }

  async getMonthlyFirstPaymentDateFormat2(){
    const date = require('date-and-time');
    const now = new Date();
    const monthlyFirstPaymentDate = date.addDays(now, 28);
    const monthlyFirstPaymentDateFormat2 = date.format(monthlyFirstPaymentDate, 'DD-MMM-YY');
    return monthlyFirstPaymentDateFormat2;
  }

  async enterBSB(bsbNumber:string){
    await expect(this.getBSBInput).toBeVisible();
    await this.getBSBInput.fill(bsbNumber);
  }

  async enterBankAccountNumber(bankAccountNumber:string){
    await expect(this.getBankAccountNumberInput).toBeVisible();
    await this.getBankAccountNumberInput.fill(bankAccountNumber);
  }

  async enterBankAccountName(bankAccountName:string){
    await expect(this.getBankAccountNameInput).toBeVisible();
    await this.getBankAccountNameInput.fill(bankAccountName);
    await expect(this.getBankAccountNameInput).toHaveValue(bankAccountName);
  }

  async checkedTnCCheckbox(){
    await expect(this.getTnCCheckbox).toBeVisible();
    await this.getTnCCheckbox.click()
    await expect(this.getTnCCheckbox).toBeChecked();
  }

  async checkedPaymentReminderCheckbox(){
    await expect(this.getPaymentReminderCheckbox).toBeVisible();
    await this.getPaymentReminderCheckbox.click()
    await expect(this.getPaymentReminderCheckbox).toBeChecked();
  }
}