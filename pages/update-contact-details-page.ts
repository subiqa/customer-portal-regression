import { expect, type Locator, type Page } from '@playwright/test';

export class UpdateContactDetails {
  readonly page: Page;
  readonly getPageHeading: Locator;
  readonly getEmailInput: Locator;
  readonly getMobileNumberInput: Locator;
  readonly getResidentialAddress: Locator;
  readonly getPostalAddress: Locator;
  readonly getDisclaimerText: Locator;
  readonly getSubmitButton: Locator;
  readonly getErrorMessage1: Locator;
  readonly getErrorMessage2: Locator;
  readonly getErrorMessage3: Locator;
  readonly getErrorMessage4: Locator;
  readonly getErrorMessage5: Locator;
  readonly getErrorMessage6: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getPageHeading = page.getByRole('heading', { name: 'Update my contact details'});
    this.getEmailInput = page.locator('#update-contact-details-email');
    this.getMobileNumberInput = page.locator('#update-contact-details-tel');
    this.getResidentialAddress = page.locator('#update-contact-details-residential');
    this.getPostalAddress = page.locator('#update-contact-details-postal');
    this.getDisclaimerText = page.getByText('For security reasons, we will need to manually review your updated contact details before updating our records.');
    this.getSubmitButton = page.getByRole('button', {name: 'Submit For Review'});
    this.getErrorMessage1 = page.getByText('The email field is required.');
    this.getErrorMessage2 = page.getByText('The mobile number field is required.');
    this.getErrorMessage3 = page.getByText('The residential address field is required.');
    this.getErrorMessage4 = page.getByText('The postal address field is required.');
    this.getErrorMessage5 = page.getByText('Please enter a valid mobile number (e.g., 04XXXXXXXX).');
    this.getErrorMessage6 = page.getByText('Please enter a valid email address.')
    
  }

  async enterEmail(newEmail: string){
    await expect(this.getEmailInput).toBeVisible();
    await this.getEmailInput.clear();
    await this.getEmailInput.fill(newEmail);
  }

  async enterMobileNumber(newMobileAddress: string){
    await expect(this.getMobileNumberInput).toBeVisible();
    await this.getMobileNumberInput.clear();
    await this.getMobileNumberInput.fill(newMobileAddress);
  }

  async enterResidentialAddress(newResidentialAddress: string){
    await expect(this.getResidentialAddress).toBeVisible();
    await this.getResidentialAddress.clear();
    await this.getResidentialAddress.fill(newResidentialAddress);
  }

  async enterPostalAddress(newPostalAddress: string){
    await expect(this.getPostalAddress).toBeVisible();
    await this.getPostalAddress.clear();
    await this.getPostalAddress.fill(newPostalAddress);
  }
}