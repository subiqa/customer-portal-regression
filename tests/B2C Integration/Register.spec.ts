import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/login-page';
import { SetUpPage } from '../../pages/set-up-your-account-page';



    test.beforeEach('Open start URL', async ({ page }) => {
      await page.goto(process.env.UAT as string);
    });

    test('Given customer is unregistered and didn\'t have phone number and email address, when register, then relevant error screen will be displayed', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.clickSignUpLink();
      const setUpPage = new SetUpPage(page);
      await expect(setUpPage.getSetUpHeading).toBeVisible();
      await expect(setUpPage.getWebChat).toBeVisible();
      await setUpPage.enterCustomerNumber('1018629');
      await setUpPage.selectDay('25');
      await setUpPage.selectMonth('10');
      await setUpPage.selectYear('1993');
      await setUpPage.clickNextButton();
      await expect(setUpPage.getMissingMFAErrorTitle).toBeVisible();
      await expect(setUpPage.getMissingMFAErrorDesc).toBeVisible();
      await expect(setUpPage.getMissingMFAErrorBackButton).toBeVisible();
      await setUpPage.clickBackButton();
      // Verify customer will be redirected back to Login page
      await expect (loginPage.getLoginHeading).toBeVisible();
    });

    test('Given customer is unregistered, no email address and preferences = Yes (overseas customer), when register, then relevant error screen will be displayed', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.clickSignUpLink();
      const setUpPage = new SetUpPage(page);
      await expect(setUpPage.getSetUpHeading).toBeVisible();
      await expect(setUpPage.getWebChat).toBeVisible();
      await setUpPage.enterCustomerNumber('1018521');
      await setUpPage.selectDay('3');
      await setUpPage.selectMonth('9');
      await setUpPage.selectYear('1995');
      await setUpPage.clickNextButton();
      await expect(setUpPage.getMissingMFAErrorTitle).toBeVisible();
      await expect(setUpPage.getMissingMFAErrorDesc).toBeVisible();
      await expect(setUpPage.getMissingMFAErrorBackButton).toBeVisible();
      await setUpPage.clickBackButton();
      // Verify customer will be redirected back to Login page
      await expect (loginPage.getLoginHeading).toBeVisible();
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
      await setUpPage.getCancelButton.click();
      // Verify customer will be redirected back to Login page
      await expect (loginPage.getLoginHeading).toBeVisible();
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
      await setUpPage.getCancelButton.click();
      // Verify customer will be redirected back to Login page
      await expect (loginPage.getLoginHeading).toBeVisible();
    });

    //Bug in error handling
    // test('Given customer is unregistered, when register with invalid 7 digits Customer number and incorrect DOB, then relevant error screen will be displayed', async ({ page }) => {
    //   const loginPage = new LoginPage(page);
    //   await loginPage.clickSignUpLink();
    //   const setUpPage = new SetUpPage(page);
    //   await expect(setUpPage.getSetUpHeading).toBeVisible();
    //   await expect(setUpPage.getWebChat).toBeVisible();
    //   await setUpPage.enterCustomerNumber('1234567');
    //   await setUpPage.selectDay('1');
    //   await setUpPage.selectMonth('2');
    //   await setUpPage.selectYear('1993');
    //   await setUpPage.clickNextButton();
    //   Assertion error message goes here
    //   await setUpPage.getCancelButton.click();
    //   // Verify customer will be redirected back to Login page
    //   await expect (page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
    // });

    //Bug in error handling
    // test('Given customer is unregistered, when register with invalid 7 digits Customer number and correct DOB, then relevant error screen will be displayed', async ({ page }) => {
    //   const loginPage = new LoginPage(page);
    //   await loginPage.clickSignUpLink();
    //   const setUpPage = new SetUpPage(page);
    //   await expect(setUpPage.getSetUpHeading).toBeVisible();
    //   await expect(setUpPage.getWebChat).toBeVisible();
    //   await setUpPage.enterCustomerNumber('1234567');
    //   await setUpPage.selectDay('24');
    //   await setUpPage.selectMonth('9');
    //   await setUpPage.selectYear('1992');
    //   await setUpPage.clickNextButton();
    //   Assertion error message goes here
    //   await setUpPage.getBackButton.click();
    //   // Verify customer will be redirected back to Login page
    //   await expect (page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
    // });

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
      await setUpPage.getBackButton.click();
      // Verify customer will be redirected back to Login page
      await expect (page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
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
      await setUpPage.getCancelButton.click();
      // Verify customer will be redirected back to Login page
      await expect (page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
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
      await setUpPage.getCancelButton.click();
      // Verify customer will be redirected back to Login page
      await expect (page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
    });