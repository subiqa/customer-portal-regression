import { expect, type Locator, type Page } from '@playwright/test';

export class Payment {
  readonly page: Page;
  readonly getWebChat: Locator;
  readonly getPageHeading: Locator;
  readonly getAccountSectionTitle: Locator;
  readonly getAccountSectionValue: Locator;
  readonly getAmountSectionTitle: Locator;
  readonly getAmountFieldTitle: Locator;
  readonly getAmountFieldInput: Locator;
  readonly getAmountCountinueButton: Locator;
  readonly getErrorAmountLessThanMinimum: Locator;
  readonly getErrorAmountMoreThanMaximum: Locator;
  readonly getErrorAmountMoreThanBalance: Locator;
  readonly getPaymentMethodSectionTitle: Locator;
  readonly getCardNumberFieldTitle: Locator;
  readonly getCardNumberFieldInput: Locator;
  readonly getCardExpiryFieldTitle: Locator;
  readonly getCardExpiryFieldInput: Locator;
  readonly getCCVFieldTitle: Locator;
  readonly getCCVFieldInput: Locator;
  readonly getCardNameFieldTitle: Locator;
  readonly getCardNameFieldInput: Locator;
  readonly getCardNumberErrorMessage1: Locator;
  readonly getCardNumberErrorMessage2: Locator;
  readonly getMissingCardNumberErrorMessage: Locator;
  readonly getMissingCardExpiryErrorMessage: Locator;
  readonly getMissingCCVErrorMessage: Locator;
  readonly getMissingCardNameErrorMessage: Locator;
  readonly getPaymentMethodContinueButton: Locator;
  readonly getCardExpiryErrorMessage: Locator;
  readonly getCCVErrorMessage1: Locator;
  readonly getCCVErrorMessage2: Locator;
  readonly getConfirmAccount: Locator;
  readonly getConfirmAmount: Locator;
  readonly getConfirmPaymentMethod: Locator;
  readonly getConfirmInformation: Locator;
  readonly getConfirmCopyrights: Locator;
  readonly getConfirmProcessPaymentButton: Locator;
  readonly getPaymentSuccessHeading: Locator;
  readonly getPaymentSuccessAccountNumber: Locator;
  readonly getPaymentSuccessAmount: Locator;
  readonly getPaymentSuccessPaymentMethod: Locator;
  readonly getPaymentSuccessDashboardButton: Locator;
  readonly getPaymentSuccessPrintButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getWebChat = page.getByLabel('Launch chat');
    this.getPageHeading = page.getByRole('heading', { name: 'Make a payment' });
    this.getAccountSectionTitle = page.locator('//*[@id="pioneer-credit-application"]/main/div/div[2]/div/div/form/details[1]/summary/div/h3');
    this.getAccountSectionValue = page.locator('//*[@id="pioneer-credit-application"]/main/div/div[2]/div/div/form/details[1]/summary/span');
    this.getAmountSectionTitle = page.locator('//*[@id="pioneer-credit-application"]/main/div/div[2]/div/div/form/details[2]/summary/div/h3');
    this.getAmountFieldTitle = page.getByLabel('Amount');
    this.getAmountFieldInput = page.getByPlaceholder('Amount');
    this.getAmountCountinueButton = page.getByRole('button', {name: 'Continue'});
    this.getErrorAmountLessThanMinimum = page.getByText('Please enter an amount from $5 up to $100,000.');
    this.getCardNumberFieldInput = page.getByPlaceholder('Enter your card number');
    this.getCardExpiryFieldInput = page.getByPlaceholder('MM/YY');
    this.getCCVFieldInput = page.getByPlaceholder('Enter your CCV');
    this.getCardNameFieldInput = page.getByPlaceholder('Enter your name as it appears on your card');
    this.getCardNumberErrorMessage1 = page.getByText('Card Number is too short.'); 
    this.getCardNumberErrorMessage2 = page.getByText('Card Number is not a valid VISA or Mastercard number.')
    this.getMissingCardNumberErrorMessage = page.getByText('Card Number is required.'); 
    this.getMissingCardExpiryErrorMessage = page.getByText('Card Expiry is required.'); 
    this.getMissingCCVErrorMessage = page.getByText('CCV is required.'); 
    this.getMissingCardNameErrorMessage = page.getByText('Card Holder Name is required.');
    this.getPaymentMethodSectionTitle = page.locator('//*[@id="pioneer-credit-application"]/main/div/div[2]/div/div/form/details[3]/summary/div/h3')
    this.getPaymentMethodContinueButton = page.getByRole('button', {name: 'Continue'});
    this.getCardExpiryErrorMessage = page.getByText('Card Expiry is in the past.');
    this.getCCVErrorMessage2 = page.getByText('CCV is too short.');
    this.getCCVErrorMessage1= page.getByText('CCV is too long.');
    this.getErrorAmountMoreThanMaximum = page.getByText('Please enter an amount from $5 up to $100,000.');
    this.getErrorAmountMoreThanBalance = page.getByText('Please enter an amount from $5 up to $100,000.');
    this.getConfirmAccount = page.locator('//*[@id="pioneer-credit-application"]/main/div/div[2]/div/div/form/details[4]/div/table/tbody/tr[1]/td[2]')
    this.getConfirmAmount = page.locator('//*[@id="pioneer-credit-application"]/main/div/div[2]/div/div/form/details[4]/div/table/tbody/tr[2]/td[2]');
    this.getConfirmPaymentMethod = page.locator('//*[@id="pioneer-credit-application"]/main/div/div[2]/div/div/form/details[4]/div/table/tbody/tr[3]/td[2]');
    this.getConfirmInformation = page.getByText('Payments require cleared funds in your account on the day of the payment or your payment will be unsuccessful.');
    this.getConfirmCopyrights = page.getByText('© Registered to Ezi Management Pty Ltd (ABN 47 110 689 711) and Ezidebit Pty Ltd (ABN 67 096 902 813)');
    this.getConfirmProcessPaymentButton = page.getByRole('button', {name: 'Process Payment'});
    this.getPaymentSuccessHeading = page.getByText('Payment Successful');
    this.getPaymentSuccessAccountNumber = page.locator('//*[@id="pioneer-credit-application"]/main/div/div[2]/table/tbody/tr[1]/td[2]');
    this.getPaymentSuccessAmount = page.locator('//*[@id="pioneer-credit-application"]/main/div/div[2]/table/tbody/tr[2]/td[2]');
    this.getPaymentSuccessPaymentMethod = page.locator('//*[@id="pioneer-credit-application"]/main/div/div[2]/table/tbody/tr[3]/td[2]');
    this.getPaymentSuccessDashboardButton = page.getByRole('button', {name: 'Dashboard'});
    this.getPaymentSuccessPrintButton = page.getByRole('button', {name: 'Print'});
  }

  async enterPaymentAmount (amount:string){
    await expect(this.getAmountFieldInput).toBeVisible();
    await this.getAmountFieldInput.clear();
    await this.getAmountFieldInput.fill(amount);
    await expect(this.getAmountFieldInput).toHaveValue(amount);
  }

  async enterCardDetails(cardNumber: string, cardExpiry: string, ccv: string, cardName: string){
    await expect(this.getCardNumberFieldInput).toBeVisible();
    await this.getCardNumberFieldInput.clear();
    await this.getCardNumberFieldInput.fill(cardNumber);
    //await expect(this.getCardNumberFieldInput).toHaveValue(cardNumber);
    await expect(this.getCardExpiryFieldInput).toBeVisible();
    await this.getCardExpiryFieldInput.clear();
    await this.getCardExpiryFieldInput.fill(cardExpiry);
    await expect(this.getCardExpiryFieldInput).toHaveValue(cardExpiry);
    await expect(this.getCCVFieldInput).toBeVisible();
    await this.getCCVFieldInput.clear();
    await this.getCCVFieldInput.fill(ccv);
    await expect(this.getCCVFieldInput).toHaveValue(ccv);
    await expect(this.getCardNameFieldInput).toBeVisible();
    await this.getCardNameFieldInput.clear();
    await this.getCardNameFieldInput.fill(cardName);
    await expect(this.getCardNameFieldInput).toHaveValue(cardName);
  }

  
}