import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/login-page';
import { Helper } from '../../pages/helpers';
import { VerifyYourAccountPage } from '../../pages/verify-your-account-page';



    test.beforeEach(async ({ page }) => {
      const testpage = 'https://pnccustomerdev.b2clogin.com/pnccustomerdev.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1A_SIGNUP_SIGNIN&client_id=1b4d81c8-0b6e-474c-9ee0-869b5035f2c1&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fjwt.ms&scope=openid&response_type=id_token&prompt=login';
      await page.goto(testpage);
      await expect(page.getByRole('img', { name: 'Logo of Pioneer Credit' })).toBeVisible();
      await expect(page.getByRole('button', {name: 'Launch chat button'})).toBeVisible();
    });

    test('When customer go to Login page, Then Login page will display correct content', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.pioneerCreditLogoIsVisible();
      await loginPage.verifyPioneerCreditLogo();
      await loginPage.loginHeadingIsVisible();
      await loginPage.loginMessageIsVisible();
      await loginPage.customerLabelIsVisible();
      await loginPage.customerNumberTextbox();
      await loginPage.passwordLabelIsVisible();
      await loginPage.passwordTextbox();
      await loginPage.forgotPasswordLinkIsVisible();
      await loginPage.verifyForgotPasswordLink();
      await loginPage.loginButtonIsVisible();
      await loginPage.signUpLinkIsVisible();
      await loginPage.verifySignUpLink();
      await loginPage.privacyLinkIsVisible();
      await loginPage.verifyPrivacyLink();
      await loginPage.TnCLinkIsVisible();
      await loginPage.verifyTnCLink();
      await loginPage.webChat();
    })

    test('Given customer on login screen, when click on top logo and footer links, then correct page will be opened accordingly', async ({ page }) => {
      const loginPage = new LoginPage(page);
      const helper = new Helper(page);
      await helper.verifyLinkOpenInNewTab(loginPage.getPioneerCreditLogo, 'https://pioneercredit.com.au/');
      await helper.verifyLinkOpenInNewTab(loginPage.getPrivacyLink, 'https://pioneercredit.com.au/for-customers/your-privacy/#b05f3dca-7317-4f23-866e-3bc01334389f');
      await helper.verifyLinkOpenInNewTab(loginPage.getTnCLink, 'https://pioneercredit.com.au/for-customers/your-privacy/#cfff822b-fb00-49fe-909b-0bf94804cc03');
      
    })

    test('When login with empty Customer number and empty Password, Then display error message', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.enterCustomerCredentials('','');
      await loginPage.clickLoginButton();
      await expect(loginPage.getMissingCustomerNumberMessage).toBeVisible();
      await expect(loginPage.getMissingPasswordMessage).toBeVisible();
    });

    test('When login with empty Customer number and correct Password, Then display error message', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.enterCustomerCredentials('','Banana01');
      await loginPage.clickLoginButton();
      await expect(loginPage.getMissingCustomerNumberMessage).toBeVisible();
      await expect(loginPage.getMissingPasswordMessage).toBeHidden();
    });

    test('When login with correct Customer number and empty Password, Then display error message', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.enterCustomerCredentials('1018623','');
      await loginPage.clickLoginButton();
      await expect(loginPage.getMissingCustomerNumberMessage).toBeHidden();
      await expect(loginPage.getMissingPasswordMessage).toBeVisible();
    });

    test('When login with correct Customer number and incorrect Password, Then display error message', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.enterCustomerCredentials('1018623','lalalala');
      await loginPage.clickLoginButton();
      await expect(loginPage.getIncorrectLoginCombinationMessage).toBeVisible();
      await expect(loginPage.getMissingCustomerNumberMessage).toBeHidden();
      await expect(loginPage.getMissingPasswordMessage).toBeHidden();
    });

    test('When login with incorrect Customer number and empty Password, Then display error message', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.enterCustomerCredentials('1234567', '');
      await loginPage.clickLoginButton();
      await expect(loginPage.getMissingPasswordMessage).toBeVisible();
      await expect(loginPage.getMissingCustomerNumberMessage).toBeHidden();
    })

    test('When login with incorrect Customer number and correct Password, Then display error message', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.enterCustomerCredentials('1234567', 'Banana05');
      await loginPage.clickLoginButton();
      await expect(loginPage.getIncorrectCustomerNumberMessage).toBeVisible();
      await expect(loginPage.getIncorrectLoginCombinationMessage).toBeHidden();
    })

    test('When login with incorrect Customer number and incorrect Password, Then display error message', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.enterCustomerCredentials('1234567', '12345asdfg');
      await loginPage.clickLoginButton();
      await expect(loginPage.getIncorrectCustomerNumberMessage).toBeVisible();
      await expect(loginPage.getIncorrectLoginCombinationMessage).toBeHidden();
    })

    test('Given customer is not registered, when enter the correct customer number and random password, then relevant error message will be displayed', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.enterCustomerCredentials('1018628', 'Banana01');
      await loginPage.clickLoginButton();
      await expect(loginPage.getUnregisteredCustomerLoginErrorMessage).toBeVisible();
    })

    test('Given customer on login screen, when enter the less than 7 digit into the customer number textbox, then relevant error message will be displayed', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.enterCustomerCredentials('123456', 'Banana01');
      await loginPage.clickLoginButton();
      await expect(loginPage.getLessThanSevenDigitMessage).toBeVisible();
    })

    // Test case below still have bugs
    test('Given customer on mobile phone verify your account screen, when enter the verification code, then verification code only accept numbers only', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.enterCustomerCredentials('1018623', 'Banana01');
      await loginPage.clickLoginButton();
      const verifyYourAccountPage = new VerifyYourAccountPage(page);
      await verifyYourAccountPage.clickMobileNumberSendCodeButton();
      await verifyYourAccountPage.enterMobileNumberVerificationCode('asdasd!@#');
      await expect(verifyYourAccountPage.getMobileNumberVerificationCodeTextbox).toHaveValue('');
    })

    test('Given customer on email verify your account screen, when enter the verification code, then verification code only accept numbers only', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.enterCustomerCredentials('1017033', 'Banana01');
      await loginPage.clickLoginButton();
      const verifyYourAccountPage = new VerifyYourAccountPage(page);
      await verifyYourAccountPage.clickEmailSendCodeButton();
      await verifyYourAccountPage.enterMobileNumberVerificationCode('asdasd!@#');
      await expect(verifyYourAccountPage.getMobileNumberVerificationCodeTextbox).toHaveValue('');
    })

    test('Given customer prefer Prefer Email Verification = Blank/No and no phone number and no email address, when user login with correct credentials, then display relevant error page', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.enterCustomerCredentials('1019620', 'Banana01');
      await loginPage.clickLoginButton();
      await expect(loginPage.getMissingMFAErrorTitle).toBeVisible();
      await expect(loginPage.getMissingMFABackButton).toBeVisible();
    })

    // API key and Inbox ID value need to be updated befor run the test belo
    test('Given customer Prefer Email Verification = Blank/No and have email address only, when login into the app with correct credentials, then customer should get the verification code via email and login success', async ({ page }) => {
      test.slow;
      const loginPage = new LoginPage(page);
      await loginPage.enterCustomerCredentials('1017033', 'Banana01');
      await loginPage.clickLoginButton();

      // Verify your account screen is displayed
      const verifyYourAccountPage = new VerifyYourAccountPage(page);
      await expect(verifyYourAccountPage.getVerifyYourAccountHeading).toBeVisible();
      await expect(verifyYourAccountPage.getVerifyYourAccountDescription).toBeVisible();
      await expect(verifyYourAccountPage.getPioneerCreditLogo).toBeVisible();
      await expect(verifyYourAccountPage.getEmailLabel).toBeVisible();
      await expect(verifyYourAccountPage.getEmailTextbox).toBeVisible();
      await expect(verifyYourAccountPage.getEmailSendCodeButton).toBeVisible();
      await expect(verifyYourAccountPage.getContactUsLink).toBeVisible();
      await expect(verifyYourAccountPage.getWebChat).toBeVisible();

      // Click on send code button
      await verifyYourAccountPage.clickEmailSendCodeButton();
      
      // Verification code field and Send new code link are displayed
      await expect(verifyYourAccountPage.getEmailVerificationCodeLabel).toBeVisible();
      await expect(verifyYourAccountPage.getEmailVerificationCodeTextbox).toBeVisible();
      await expect(verifyYourAccountPage.getEmailSendNewCodeLink).toBeVisible();
      
      // Get the email verification code using Mailslrup services
      const helper = new Helper(page); 
      const verificationCode = await helper.getVerificationCode();

      // Enter verification code
      await verifyYourAccountPage.enterEmailVerificationCode(verificationCode);
      await verifyYourAccountPage.clickEmailVerifyCodeButton();

      // Verify customer is redirected to dashboard page
      await page.waitForURL('https:\/\/test\.customer\.pioneercredit\.com\.au\/account\?id_token=*', { timeout: 30000 })
      await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible({ timeout: 30000 });

    });

    // Can't verify until redirected to Dashboard due to no test SMS service
    test('Given customer prefer Prefer Email Verification = Blank/No and have mobile number and email address, when login into the app with correct credentials, then customer should get the verification code via sms', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.enterCustomerCredentials('1018621', 'Banana01');
      await loginPage.clickLoginButton();

      // Verify your account screen is displayed
      const verifyYourAccountPage = new VerifyYourAccountPage(page);
      await expect(verifyYourAccountPage.getMobileNumberLabel).toBeVisible();
      await expect(verifyYourAccountPage.getMobileNumberSendCodeButton).toBeVisible();

      // Click on send code button
      await verifyYourAccountPage.clickMobileNumberSendCodeButton();

      // Verification code field and Send new code link are displayed
      await expect(verifyYourAccountPage.getMobileNumberVerificationCodeLabel).toBeVisible();
      await expect(verifyYourAccountPage.getMobileNumberVerificationCodeTextbox).toBeVisible()
      await expect(verifyYourAccountPage.getMobileNumberSendNewCodeLink).toBeVisible();

      // Get the email verification code if we have paid sms service

      // Enter verification code
      // await verifyYourAccountPage.enterMobileNumberVerificationCode(verificationCode);
      // await verifyYourAccountPage.clickMobileNumberVerifyCodeButton();

      // Verify customer is redirected to dashboard page
      // await page.waitForURL('https:\/\/test\.customer\.pioneercredit\.com\.au\/account\?id_token=*', { timeout: 30000 })
      // await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible({ timeout: 30000 });
    })