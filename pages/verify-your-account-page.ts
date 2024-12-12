import { expect, type Locator, type Page } from '@playwright/test';

export class VerifyYourAccountPage {
  readonly page: Page;
  readonly getPioneerCreditLogo: Locator;
  readonly getVerifyYourAccountHeading: Locator;
  readonly getVerifyYourAccountDescription: Locator;
  readonly getEmailLabel: Locator;
  readonly getEmailTextbox: Locator;
  readonly getEmailSendCodeButton: Locator;
  readonly getMobileNumberLabel: Locator;
  readonly getMobileNumberSendCodeButton: Locator;
  readonly getMobileNumberVerificationCodeLabel: Locator;
  readonly getMobileNumberVerificationCodeTextbox: Locator;
  readonly getMobileNumberSendNewCodeLink: Locator;
  readonly getContactUsLink: Locator;
  readonly getWebChat: Locator;
  readonly getEmailVerificationCodeLabel: Locator;
  readonly getEmailVerificationCodeTextbox: Locator;
  readonly getEmailVerifyCodeButton: Locator;
  readonly getEmailSendNewCodeLink: Locator;
  readonly getMobileNumberVerifyCodeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getPioneerCreditLogo = page.getByRole('link', { name: 'Logo of Pioneer Credit' });
    this.getVerifyYourAccountHeading = page.getByRole('heading', { name: 'Verify your account' });
    this.getVerifyYourAccountDescription = page.getByText('A verification code will be');
    this.getEmailLabel = page.locator('#readOnlyEmail_label');
    this.getEmailTextbox = page.getByPlaceholder('Email', { exact: true });
    this.getEmailSendCodeButton = page.getByLabel('Send code');
    this.getContactUsLink = page.getByRole('link', { name: 'Having trouble? Contact us' });
    this.getWebChat = page.getByRole('button', {name: 'Launch chat button'});
    this.getEmailVerificationCodeLabel = page.getByText('Verification code', { exact: true })
    this.getEmailVerificationCodeTextbox = page.getByPlaceholder('Verification code');
    this.getEmailVerifyCodeButton = page.getByLabel('Verify code');
    this.getEmailSendNewCodeLink = page.getByLabel('Send new code');
    this.getMobileNumberSendCodeButton = page.getByRole('button', { name: 'Send code' });
    this.getMobileNumberVerificationCodeLabel = page.getByText('Verification Code');
    this.getMobileNumberVerificationCodeTextbox = page.getByLabel('Verification Code');
    this.getMobileNumberVerifyCodeButton = page.getByLabel('Verify code');
    this.getMobileNumberLabel = page.getByText('Mobile Number');
    this.getMobileNumberSendNewCodeLink = page.getByText('Send a new code');

  }

  async clickEmailSendCodeButton(){
    await expect(this.getEmailSendCodeButton).toBeVisible();
    await this.getEmailSendCodeButton.click();
  }

  async clickMobileNumberSendCodeButton(){
    await expect(this.getMobileNumberSendCodeButton).toBeVisible();
    await this.getMobileNumberSendCodeButton.click();
  }

  async enterEmailVerificationCode(verificationCode: string){
    await expect(this.getEmailVerificationCodeTextbox).toBeVisible();
    await this.getEmailVerificationCodeTextbox.fill(verificationCode);
  }

  async enterMobileNumberVerificationCode(verificationCode: string){
    await expect(this.getMobileNumberVerificationCodeTextbox).toBeVisible();
    await this.getMobileNumberVerificationCodeTextbox.fill(verificationCode);
  }

  async clickEmailVerifyCodeButton(){
    await this.getEmailVerifyCodeButton.click();
  }

  async clickMobileNumberVerifyCodeButton(){
    await this.getMobileNumberVerifyCodeButton.click();
  }
}