import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/login-page';
import { Helper } from '../../helper/helpers';
import { VerifyYourAccountPage } from '../../pages/verify-your-account-page';
import { Dashboard } from '../../pages/dashboard-page';



    test.beforeEach('Open start URL', async ({ page }) => {
      await page.goto(process.env.UAT as string);
    });

    test('When customer go to Login page, then Login page will display correct content', async ({ page }) => {
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

    test('When login with empty Customer number and empty Password, then display correct error message', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.enterCustomerCredentials('','');
      await loginPage.clickLoginButton();
      await expect(loginPage.getMissingCustomerNumberMessage).toBeVisible();
      await expect(loginPage.getMissingPasswordMessage).toBeVisible();
    });

    test('When login with empty Customer number and correct Password, then display correct error message', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.enterCustomerCredentials('','Banana01');
      await loginPage.clickLoginButton();
      await expect(loginPage.getMissingCustomerNumberMessage).toBeVisible();
      await expect(loginPage.getMissingPasswordMessage).toBeHidden();
    });

    test('When customer enter less than 7 digit into the customer number textbox, then display correct error message', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.enterCustomerCredentials('123456', 'Banana01');
      await loginPage.clickLoginButton();
      await expect(loginPage.getLessThanSevenDigitMessage).toBeVisible();
      await expect(loginPage.getMissingCustomerNumberMessage).toBeHidden();
      await expect(loginPage.getMissingPasswordMessage).toBeHidden();
    })

    test('When login with correct Customer number and empty Password, then display correct error message', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.enterCustomerCredentials('1018623','');
      await loginPage.clickLoginButton();
      await expect(loginPage.getMissingCustomerNumberMessage).toBeHidden();
      await expect(loginPage.getMissingPasswordMessage).toBeVisible();
    });

    test('When login with correct Customer number and incorrect Password, then display correct error message', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.enterCustomerCredentials('1018623','lalalala');
      await loginPage.clickLoginButton();
      await expect(loginPage.getIncorrectLoginCombinationMessage).toBeVisible();
      await expect(loginPage.getMissingCustomerNumberMessage).toBeHidden();
      await expect(loginPage.getMissingPasswordMessage).toBeHidden();
    });

    test('When login with incorrect Customer number and empty Password, then display correct error message', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.enterCustomerCredentials('1234567', '');
      await loginPage.clickLoginButton();
      await expect(loginPage.getMissingPasswordMessage).toBeVisible();
      await expect(loginPage.getMissingCustomerNumberMessage).toBeHidden();
    })

    test('When login with incorrect Customer number and correct Password, then display correct error message', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.enterCustomerCredentials('1234567', 'Banana05');
      await loginPage.clickLoginButton();
      await expect(loginPage.getIncorrectCustomerNumberMessage).toBeVisible();
      await expect(loginPage.getIncorrectLoginCombinationMessage).toBeHidden();
      await expect(loginPage.getMissingCustomerNumberMessage).toBeHidden();
      await expect(loginPage.getMissingPasswordMessage).toBeHidden();
    })

    test('When login with incorrect Customer number and incorrect Password, then display correct error message', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.enterCustomerCredentials('1234567', '12345asdfg');
      await loginPage.clickLoginButton();
      await expect(loginPage.getIncorrectCustomerNumberMessage).toBeVisible();
      await expect(loginPage.getIncorrectLoginCombinationMessage).toBeHidden();
      await expect(loginPage.getMissingCustomerNumberMessage).toBeHidden();
      await expect(loginPage.getMissingPasswordMessage).toBeHidden();
    })

    test('Given customer is not registered, when enter the correct customer number and random password, then relevant error message will be displayed', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.enterCustomerCredentials('1018629', 'Banana01');
      await loginPage.clickLoginButton();
      await expect(loginPage.getUnregisteredCustomerLoginErrorMessage).toBeVisible();
      await expect(loginPage.getMissingCustomerNumberMessage).toBeHidden();
      await expect(loginPage.getMissingPasswordMessage).toBeHidden();
    })

    // Test case below still in B2C side to resolve
    // test('Given customer on mobile phone verify your account screen, when enter the verification code, then verification code only accept numbers only', async ({ page }) => {
    //   const loginPage = new LoginPage(page);
    //   await loginPage.enterCustomerCredentials('1018623', 'Banana01');
    //   await loginPage.clickLoginButton();
    //   const verifyYourAccountPage = new VerifyYourAccountPage(page);
    //   await verifyYourAccountPage.clickMobileNumberSendCodeButton();
    //   await verifyYourAccountPage.enterMobileNumberVerificationCode('asdasd!@#');
    //   await expect(verifyYourAccountPage.getMobileNumberVerificationCodeTextbox).toHaveValue('');
    // })

    test('Given customer on email verify your account screen, when enter the verification code, then verification code not accepting non number input', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.enterCustomerCredentials('1018626', 'Banana01');
      await loginPage.clickLoginButton();
      const verifyYourAccountPage = new VerifyYourAccountPage(page);
      await verifyYourAccountPage.clickEmailSendCodeButton();
      await verifyYourAccountPage.enterMobileNumberVerificationCode('asdasd!@#');
      await expect(verifyYourAccountPage.getMobileNumberVerificationCodeTextbox).toHaveValue('');
    })

    test('Given customer Prefer Email Verification = Blank/No and didn\'t have both phone number and email address, when user login with correct credentials, then display relevant error page', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.enterCustomerCredentials('1018624', 'Banana01');
      await loginPage.clickLoginButton();
      await expect(loginPage.getMissingMFAErrorTitle).toBeVisible();
      await expect(loginPage.getMissingMFAErrorDesc).toBeVisible();
      await expect(loginPage.getMissingMFABackButton).toBeVisible();
    })

    // Can't verify test results until redirected to Dashboard page due to no test SMS service is provided
    test('Given customer Prefer Email Verification = Blank/No and have both mobile number and email address, when login into the app with correct credentials, then customer should get the verification code via sms', async ({ page }) => {
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
      await expect(verifyYourAccountPage.getMobileNumberVerificationCodeTextbox).toBeVisible()
      await expect(verifyYourAccountPage.getMobileNumberSendNewCodeLink).toBeVisible();

      // Get the email verification code if we have paid sms service goes here

      // Enter verification code
      // await verifyYourAccountPage.enterMobileNumberVerificationCode(verificationCode);
      // await verifyYourAccountPage.clickMobileNumberVerifyCodeButton();

      // Verify customer is redirected to dashboard page
      // await page.waitForURL('https:\/\/test\.customer\.pioneercredit\.com\.au\/account\?id_token=*', { timeout: 30000 })
      // await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible({ timeout: 30000 });
    })

    // API key, Inbox ID and Customer email address need to be updated before running the test below
    test('Given customer Prefer Email Verification = Blank/No and didn\'t have mobile number but have email address, when login into the app with correct credentials, then customer should get the verification code via email and login success', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.enterCustomerCredentials('1018626', 'Banana01');
      await loginPage.clickLoginButton();

      // Verify your account screen is displayed
      const verifyYourAccountPage = new VerifyYourAccountPage(page);
      await expect(verifyYourAccountPage.getVerifyYourAccountHeading).toBeVisible();
      await expect(verifyYourAccountPage.getVerifyYourAccountDescription).toBeVisible();
      await expect(verifyYourAccountPage.getEmailLabel).toBeVisible();
      await expect(verifyYourAccountPage.getEmailTextbox).toBeVisible();
      await expect(verifyYourAccountPage.getContactUsLink).toBeVisible();
      await expect(verifyYourAccountPage.getWebChat).toBeVisible();

      // Click on send code button
      await expect(verifyYourAccountPage.getEmailSendCodeButton).toBeVisible();
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
      await page.waitForURL('https:\/\/test\.customer\.pioneercredit\.com\.au\/account\?id_token=*')
      const dashboard = new Dashboard(page);
      await expect(dashboard.getWelcomeMessage).toBeVisible();
      await expect(dashboard.getMakeAPaymentCard).toBeVisible();
    })

    
    test('Given customer Prefer Email Verification = Yes and didn\'t have email address, when login into the app with correct credentials, then customer should get the verification code via email and login success', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.enterCustomerCredentials('1024634', 'Banana01');
      await loginPage.clickLoginButton();
      await expect(loginPage.getMissingMFAErrorTitle).toBeVisible();
      await expect(loginPage.getMissingMFAErrorDesc).toBeVisible();
      await expect(loginPage.getMissingMFABackButton).toBeVisible();
    })

    // API key, Inbox ID and Customer email address need to be updated before running the test below
    test('Given customer prefer Prefer Email Verification = Yes and have both mobile number and email address, when login into the app with correct credentials, then customer should get the verification code via email and login success', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.enterCustomerCredentials('1018628', 'Banana01');
      await loginPage.clickLoginButton();

      // Verify your account screen is displayed
      const verifyYourAccountPage = new VerifyYourAccountPage(page);
      await expect(verifyYourAccountPage.getVerifyYourAccountHeading).toBeVisible();
      await expect(verifyYourAccountPage.getVerifyYourAccountDescription).toBeVisible();
      await expect(verifyYourAccountPage.getEmailLabel).toBeVisible();
      await expect(verifyYourAccountPage.getEmailTextbox).toBeVisible();
      await expect(verifyYourAccountPage.getContactUsLink).toBeVisible();
      await expect(verifyYourAccountPage.getWebChat).toBeVisible();

      // Click on send code button
      await expect(verifyYourAccountPage.getEmailSendCodeButton).toBeVisible();
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
      await page.waitForURL('https:\/\/test\.customer\.pioneercredit\.com\.au\/account\?id_token=*')
      const dashboard = new Dashboard(page);
      await expect(dashboard.getWelcomeMessage).toBeVisible();
      await expect(dashboard.getMakeAPaymentCard).toBeVisible();
    })