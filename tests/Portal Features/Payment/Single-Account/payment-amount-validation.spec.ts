import { test, expect } from '@playwright/test';
import { Helper } from '../../../../helper/helpers';
import { Dashboard } from '../../../../pages/dashboard-page';
import { Payment } from '../../../../pages/payment-page';
import { SingleAccountNoPhoneNumber01 } from '../../../../test-data/single-account.json';

    // API key and Inbox ID value need to be updated before run the tests below until provided with fixed email services
    test.beforeEach('Log in to the app', async ({ page }) => {
          await page.goto(process.env.UAT as string);
          const helper = new Helper(page);
          await helper.loginWithEmailAs2FA(SingleAccountNoPhoneNumber01.customerNumber, SingleAccountNoPhoneNumber01.password);
        });

    test('Make a payment with amount < minimum payment, then display relevant error and unable to continue', async ({ page }) => {
      const dashboard = new Dashboard(page);
      await dashboard.getMakeAPaymentCard.click();
      const payment = new Payment(page);      
      await expect(payment.getPageHeading).toBeVisible();
      await expect(payment.getAccountSectionValue).toHaveText(SingleAccountNoPhoneNumber01.accountNumber);
      await payment.enterPaymentAmount(SingleAccountNoPhoneNumber01.paymentAmountLessThanMinimum);
      await payment.getAmountCountinueButton.click();
      await expect(payment.getErrorAmountLessThanMinimum).toBeVisible();
    });

    test('Make a payment with negative amount, then display relevant error and unable to continue', async ({ page }) => {
      const dashboard = new Dashboard(page);
      await dashboard.getMakeAPaymentCard.click();
      const payment = new Payment(page);      
      await expect(payment.getPageHeading).toBeVisible();
      await expect(payment.getAccountSectionValue).toHaveText(SingleAccountNoPhoneNumber01.accountNumber);
      await payment.enterPaymentAmount(SingleAccountNoPhoneNumber01.paymentAmountNegative);
      await payment.getAmountCountinueButton.click();
      await expect(payment.getErrorAmountLessThanMinimum).toBeVisible();
    });

    test('Make a payment with amount > maximum payment, then display relevant error and unable to continue', async ({ page }) => {
      const dashboard = new Dashboard(page);
      await dashboard.getMakeAPaymentCard.click();
      const payment = new Payment(page);      
      await expect(payment.getPageHeading).toBeVisible();
      await expect(payment.getAccountSectionValue).toHaveText(SingleAccountNoPhoneNumber01.accountNumber);
      await payment.enterPaymentAmount(SingleAccountNoPhoneNumber01.paymentAmountMoreThanMaximum);
      await payment.getAmountCountinueButton.click();
      await expect(payment.getErrorAmountMoreThanMaximum).toBeVisible();
    });

    test('Make a payment with amount > account balance but < maximum payment, then display relevant error and unable to continue', async ({ page }) => {
      const dashboard = new Dashboard(page);
      await dashboard.getMakeAPaymentCard.click();
      const payment = new Payment(page);      
      await expect(payment.getPageHeading).toBeVisible();
      await expect(payment.getAccountSectionValue).toHaveText(SingleAccountNoPhoneNumber01.accountNumber);
      await payment.enterPaymentAmount(SingleAccountNoPhoneNumber01.paymentAmountMoreThanBalance);
      await payment.getAmountCountinueButton.click();
      await expect(payment.getErrorAmountMoreThanBalance).toBeVisible();
    });

    

    