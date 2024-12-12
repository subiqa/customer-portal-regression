import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/login-page';
import { SetUpPage } from '../../pages/set-up-your-account-page';



    test.beforeEach(async ({ page }) => {
      const testpage = 'https://pnccustomerdev.b2clogin.com/pnccustomerdev.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1A_SIGNUP_SIGNIN&client_id=1b4d81c8-0b6e-474c-9ee0-869b5035f2c1&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fjwt.ms&scope=openid&response_type=id_token&prompt=login';
      await page.goto(testpage);
      await expect(page.getByRole('img', { name: 'Logo of Pioneer Credit' })).toBeVisible();
      await expect(page.getByRole('button', {name: 'Launch chat button'})).toBeVisible();
    });

    test('Given customer is unregistered and no phone number and no email address, when register with correct credentials, then relevant error screen will be displayed', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.clickSignUpLink();
      const setUpPage = new SetUpPage(page);
      await expect(setUpPage.getSetUpHeading).toBeVisible();
      await expect(setUpPage.getWebChat).toBeVisible();
      await setUpPage.enterCustomerNumber('1019621');
      await setUpPage.selectDay('20');
      await setUpPage.selectMonth('10');
      await setUpPage.selectYear('1992');
      await setUpPage.clickNextButton();
      await expect(setUpPage.getMissingMFAErrorTitle).toBeVisible();
      await expect(setUpPage.getMissingMFAErrorDesc).toBeVisible();
      await expect(setUpPage.getMissingMFAErrorBackButton).toBeVisible();
      await setUpPage.clickBackButton();
      // Verify customer will be redirected back to Login page
      await expect (page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
    });

    test('Given customer is unregistered and have Overseas tag and no email address, when register, then relevant error screen will be displayed', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.clickSignUpLink();
      const setUpPage = new SetUpPage(page);
      await expect(setUpPage.getSetUpHeading).toBeVisible();
      await expect(setUpPage.getWebChat).toBeVisible();
      await setUpPage.enterCustomerNumber('1018628');
      await setUpPage.selectDay('24');
      await setUpPage.selectMonth('9');
      await setUpPage.selectYear('1992');
      await setUpPage.clickNextButton();
      await expect(setUpPage.getMissingMFAErrorTitle).toBeVisible();
      await expect(setUpPage.getMissingMFAErrorDesc).toBeVisible();
      await expect(setUpPage.getMissingMFAErrorBackButton).toBeVisible();
      await setUpPage.clickBackButton();
      // Verify customer will be redirected back to Login page
      await expect (page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
    });

    test('Given customer is unregistered, when register with empty Customer number and incorrect DOB, then relevant error screen will be displayed', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.clickSignUpLink();
      const setUpPage = new SetUpPage(page);
      await expect(setUpPage.getSetUpHeading).toBeVisible();
      await expect(setUpPage.getWebChat).toBeVisible();
      // Leave Customer number empty and DOB default value
      await setUpPage.clickNextButton();
      await expect(setUpPage.getEmptyCustomerNumberError).toBeVisible();
      //await setUpPage.getCancelButton.click();
      // Verify customer will be redirected back to Login page
      //await expect (page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
    });

    test('Given customer is unregistered, when register with empty Customer number and correct DOB, then relevant error screen will be displayed', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.clickSignUpLink();
      const setUpPage = new SetUpPage(page);
      await expect(setUpPage.getSetUpHeading).toBeVisible();
      await expect(setUpPage.getWebChat).toBeVisible();
      // Leave Customer number empty
      await setUpPage.selectDay('24');
      await setUpPage.selectMonth('9');
      await setUpPage.selectYear('1992');
      await setUpPage.clickNextButton();
      await expect(setUpPage.getEmptyCustomerNumberError).toBeVisible();
      //await setUpPage.getCancelButton.click();
      // Verify customer will be redirected back to Login page
      // await expect (page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
    });

    test('Given customer is unregistered, when register with invalid 7 digits Customer number and incorrect DOB, then relevant error screen will be displayed', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.clickSignUpLink();
      const setUpPage = new SetUpPage(page);
      await expect(setUpPage.getSetUpHeading).toBeVisible();
      await expect(setUpPage.getWebChat).toBeVisible();
      await setUpPage.enterCustomerNumber('1234567');
      await setUpPage.selectDay('1');
      await setUpPage.selectMonth('2');
      await setUpPage.selectYear('1993');
      await setUpPage.clickNextButton();
      await expect(setUpPage.getMissingMFAErrorTitle).toBeVisible();
      await expect(setUpPage.getMissingMFAErrorDesc).toBeVisible();
      await expect(setUpPage.getMissingMFAErrorBackButton).toBeVisible();
      //await setUpPage.clickBackButton();
      // Verify customer will be redirected back to Login page
      //await expect (page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
    });

    test('Given customer is unregistered, when register with invalid 7 digits Customer number and correct DOB, then relevant error screen will be displayed', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.clickSignUpLink();
      const setUpPage = new SetUpPage(page);
      await expect(setUpPage.getSetUpHeading).toBeVisible();
      await expect(setUpPage.getWebChat).toBeVisible();
      await setUpPage.enterCustomerNumber('1234567');
      await setUpPage.selectDay('24');
      await setUpPage.selectMonth('9');
      await setUpPage.selectYear('1992');
      await setUpPage.clickNextButton();
      await expect(setUpPage.getMissingMFAErrorTitle).toBeVisible();
      await expect(setUpPage.getMissingMFAErrorDesc).toBeVisible();
      await expect(setUpPage.getMissingMFAErrorBackButton).toBeVisible();
      //await setUpPage.clickBackButton();
      // Verify customer will be redirected back to Login page
      //await expect (page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
    });

    test('Given customer is unregistered, when register with valid Customer number and incorrect DOB, then relevant error screen will be displayed', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.clickSignUpLink();
      const setUpPage = new SetUpPage(page);
      await expect(setUpPage.getSetUpHeading).toBeVisible();
      await expect(setUpPage.getWebChat).toBeVisible();
      await setUpPage.enterCustomerNumber('1018628');
      await setUpPage.selectDay('1');
      await setUpPage.selectMonth('9');
      await setUpPage.selectYear('1992');
      await setUpPage.clickNextButton();
      await expect(setUpPage.getMissingMFAErrorTitle).toBeVisible();
      await expect(setUpPage.getMissingMFAErrorDesc).toBeVisible();
      await expect(setUpPage.getMissingMFAErrorBackButton).toBeVisible();
      //await setUpPage.clickBackButton();
      // Verify customer will be redirected back to Login page
      //await expect (page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
    });

    test('Given customer is unregistered, when register with less than 7 digits Customer number and incorrect DOB, then relevant error screen will be displayed', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.clickSignUpLink();
      const setUpPage = new SetUpPage(page);
      await expect(setUpPage.getSetUpHeading).toBeVisible();
      await expect(setUpPage.getWebChat).toBeVisible();
      await setUpPage.enterCustomerNumber('101862');
      await setUpPage.selectDay('1');
      await setUpPage.selectMonth('9');
      await setUpPage.selectYear('1992');
      await setUpPage.clickNextButton();
      await expect(setUpPage.getLessThan7DigitsError).toBeVisible();
      //await setUpPage.clickBackButton();
      // Verify customer will be redirected back to Login page
      //await expect (page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
    });

    test('Given customer is unregistered, when register with less than 7 digits Customer number and correct DOB, then relevant error screen will be displayed', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.clickSignUpLink();
      const setUpPage = new SetUpPage(page);
      await expect(setUpPage.getSetUpHeading).toBeVisible();
      await expect(setUpPage.getWebChat).toBeVisible();
      await setUpPage.enterCustomerNumber('10186');
      await setUpPage.selectDay('24');
      await setUpPage.selectMonth('9');
      await setUpPage.selectYear('1992');
      await setUpPage.clickNextButton();
      await expect(setUpPage.getLessThan7DigitsError).toBeVisible();
      //await setUpPage.clickBackButton();
      // Verify customer will be redirected back to Login page
      //await expect (page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
    });