import { expect, type Locator, type Page } from '@playwright/test';
import { Helper } from '../helper/helpers';

export class LoginPage {
  readonly page: Page;
  readonly getPioneerCreditLogo: Locator;
  readonly getLoginHeading: Locator;
  readonly getLoginMessage: Locator;
  readonly getCustomerNumberLabel: Locator;
  readonly getCustomerNumberTextbox: Locator;
  readonly getPasswordLabel: Locator;
  readonly getPasswordTextbox: Locator;
  readonly getForgotPasswordLink: Locator;
  readonly getLoginButton: Locator;
  readonly getSignUpLink: Locator;
  readonly getWebChat: Locator;
  readonly getTnCLink: Locator;
  readonly getPrivacyLink: Locator;
  readonly getMissingCustomerNumberMessage: Locator;
  readonly getMissingPasswordMessage: Locator;
  readonly getIncorrectLoginCombinationMessage: Locator;
  readonly getIncorrectCustomerNumberMessage: Locator;
  readonly getMissingMFAErrorTitle: Locator;
  readonly getMissingMFAErrorDesc: Locator;
  readonly getMissingMFABackButton: Locator;
  readonly getUnregisteredCustomerLoginErrorMessage: Locator;
  readonly getFeedbackLink: Locator;
  readonly getYourPrivacyLink: Locator;
  readonly getCorporateDirectoryLink: Locator;
  readonly getShareRegistryLink: Locator;
  readonly getAccessibilityLink: Locator;
  readonly getContactUsLink: Locator;
  readonly getLinkedIn: Locator;
  readonly getLessThanSevenDigitMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getPioneerCreditLogo = page.getByRole('img', { name: 'Logo of Pioneer Credit' });
    this.getLoginHeading = page.getByRole('heading', { name: 'Login to your account' });
    this.getLoginMessage = page.getByText('Important message from Pioneer Our sign in process has changed. Please use your');
    this.getCustomerNumberLabel = page.getByText('Customer Number', { exact: true });
    this.getCustomerNumberTextbox = page.getByPlaceholder('Customer Number');
    this.getPasswordLabel = page.getByText('Password', { exact: true });
    this.getPasswordTextbox = page.getByPlaceholder('Password')
    this.getForgotPasswordLink = page.getByRole('link', { name: 'Forgot your password?' });
    this.getLoginButton = page.getByRole('button', { name: 'Log in' });
    this.getSignUpLink = page.getByRole('link', { name: 'Sign up now' });
    this.getTnCLink = page.getByRole('link', { name: 'Terms and Conditions' });
    this.getWebChat = page.getByLabel('Launch chat');
    this.getPrivacyLink = page.getByRole('link', { name: 'Privacy Policy' });
    this.getMissingCustomerNumberMessage = page.getByText('Please enter your Customer Number');
    this.getMissingPasswordMessage = page.getByText('Please enter your password');
    this.getIncorrectLoginCombinationMessage = page.getByText('Sorry, the login info you\'ve entered doesn\'t match our records. Please call us on 1300 720 823');
    this.getIncorrectCustomerNumberMessage = page.getByText('We can\'t seem to find your account.');
    this.getMissingMFAErrorTitle = page.getByRole('heading', { name: 'Sorry, the login info you\'ve entered doesn\'t match our records' });
    this.getMissingMFAErrorDesc = page.getByText('Please call us on 1300 720 823');
    this.getMissingMFABackButton = page.getByRole('button', { name: 'Back' });
    this.getUnregisteredCustomerLoginErrorMessage = page.getByText('We can\'t seem to find your');
    this.getFeedbackLink = page.getByRole('link', { name: 'Feedback' });
    this.getYourPrivacyLink = page.getByRole('link', { name: 'Your Privacy' });
    this.getCorporateDirectoryLink = page.getByRole('link', { name: 'Corporate Directory' });
    this.getShareRegistryLink = page.getByRole('link', { name: 'Share Registry' });
    this.getAccessibilityLink = page.getByRole('link', { name: 'Accessibility' });
    this.getContactUsLink = page.getByRole('link', { name: 'Accessibility' });
    this.getLinkedIn = page.getByRole('link', { name: 'LinkedIn' });
    this.getLessThanSevenDigitMessage = page.getByText('Please enter 7 digit customer');
    
  }

    async pioneerCreditLogoIsVisible(){
      await expect(this.getPioneerCreditLogo).toBeVisible();
    }

    async loginHeadingIsVisible(){
      await expect(this.getLoginHeading).toBeVisible();
    }

    async loginMessageIsVisible(){
      await expect(this.getLoginMessage).toBeVisible();
    }

    async customerLabelIsVisible(){
      await expect(this.getCustomerNumberLabel).toBeVisible();
    }

    async customerNumberTextbox(){
      await expect(this.getCustomerNumberTextbox).toBeVisible();
    }

    async passwordLabelIsVisible(){
      await expect(this.getPasswordLabel).toBeVisible();
    }

    async passwordTextbox(){
      await expect(this.getPasswordTextbox).toBeVisible();
    }

    async forgotPasswordLinkIsVisible(){
      await expect(this.getForgotPasswordLink).toBeVisible();
    }

    async loginButtonIsVisible(){
      await expect(this.getLoginButton).toBeVisible();
    }

    async signUpLinkIsVisible(){
      await expect(this.getSignUpLink).toBeVisible();
    }

    async TnCLinkIsVisible(){
      await expect(this.getTnCLink).toBeVisible();
    }

    async privacyLinkIsVisible(){
      await expect(this.getPrivacyLink).toBeVisible();
    }

    async webChat(){
      await expect(this.getWebChat).toBeVisible();
    }
    
    async verifyPioneerCreditLogo() {
      const image = this.getPioneerCreditLogo;
      const isImageLoaded = await image.evaluate((img: HTMLImageElement) => 
        img.naturalWidth > 0 && img.naturalHeight > 0
      );
      expect(isImageLoaded).toBe(true);
    }  

    async verifyForgotPasswordLink(){
      const link = this.getForgotPasswordLink;
      const helper = new Helper(this.page);
      await helper.verifyLinkUrl(link, 'unified?claimsexchange=ForgotPasswordExchange')
    }

    async verifySignUpLink(){
      const link = this.getSignUpLink;
      const helper = new Helper(this.page);
      await helper.verifyLinkUrl(link, 'unified?local=signup')
    }

    async verifyTnCLink(){
      const link = this.getTnCLink;
      const helper = new Helper(this.page);
      await helper.verifyLinkUrl(link, 'https://pioneercredit.com.au/customer-support/your-privacy/#cfff822b-fb00-49fe-909b-0bf94804cc03')
    }

    async verifyPrivacyLink(){
      const link = this.getPrivacyLink;
      const helper = new Helper(this.page);
      await helper.verifyLinkUrl(link, 'https://pioneercredit.com.au/customer-support/your-privacy/#b05f3dca-7317-4f23-866e-3bc01334389f')
    }

    async enterCustomerCredentials(customerNumber: string, password: string){
      await this.getCustomerNumberTextbox.fill(customerNumber);
      await expect(this.getCustomerNumberTextbox).toHaveValue(customerNumber);
      await this.getPasswordTextbox.fill(password);
      await expect(this.getPasswordTextbox).toHaveValue(password);
    }

    async clickLoginButton(){
      await this.getLoginButton.click();
    }

    async clickForgotPasswordLink(){
      await this.getForgotPasswordLink.click();
    }

    async clickSignUpLink(){
      await this.getSignUpLink.click();
  }
}