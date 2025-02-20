import { test, expect } from '@playwright/test';
import { Helper } from '../../../../helper/helpers';
import { Dashboard } from '../../../../pages/dashboard-page';
import { Payment } from '../../../../pages/payment-page';
import { SingleAccountNoPhoneNumber01 } from '../../../../test-data/single-account.json';
import { Visa } from '../../../../test-data/cards.json';
import { Mastercard } from '../../../../test-data/cards.json';

    // API key and Inbox ID value need to be updated before run the tests below until provided with fixed email services
    test.beforeEach('Log in to the app', async ({ page }) => {
          await page.goto(process.env.UAT as string);
          const helper = new Helper(page);
          await helper.loginWithEmailAs2FA(SingleAccountNoPhoneNumber01.customerNumber, SingleAccountNoPhoneNumber01.password);
        });

    test('Make a payment with declined amount with  Visa card, then payment failed', async ({ page }) => {
          const dashboard = new Dashboard(page);
          await dashboard.getMakeAPaymentCard.click();
          const payment = new Payment(page);      
          await expect(payment.getPageHeading).toBeVisible();
          await expect(payment.getWebChat).toBeVisible();
          await expect(payment.getAccountSectionValue).toHaveText(SingleAccountNoPhoneNumber01.accountNumber);
          await payment.enterPaymentAmount('100.51');
          await payment.getAmountCountinueButton.click();
          await payment.enterCardDetails(Visa.cardNumber, Visa.cardExpiry, Visa.cardCCV, Visa.cardName)
          await payment.getPaymentMethodContinueButton.click();
          await expect(payment.getConfirmAccount).toHaveText(SingleAccountNoPhoneNumber01.accountNumber);
          await expect(payment.getConfirmAmount).toContainText('100.51');
          await expect(payment.getConfirmPaymentMethod).toContainText('ending in 8769');
          await expect(payment.getConfirmInformation).toBeVisible();
          await expect(payment.getConfirmProcessPaymentButton).toBeVisible();
          await expect(payment.getConfirmCopyrights).toBeVisible();
          // wait for the payment call return 200
          const responsePromise = page.waitForResponse(response =>
            response.url() === 'https://test.customer.pioneercredit.com.au/api/debt-manager/consumers/undefined/singleelectronicpayment?version=v3' && response.status() === 200
                && response.request().method() === 'POST'
          );
          await payment.getConfirmProcessPaymentButton.click();
          const response = await responsePromise;
          // Need to be updated with the declined screen
          // await expect(payment.getPaymentSuccessHeading).toBeVisible();
          // await expect(payment.getPaymentSuccessAccountNumber).toHaveText(Customer01SingleAccount.accountNumber);
          // await expect(payment.getPaymentSuccessAmount).toContainText('100')
          // await expect(payment.getPaymentSuccessPaymentMethod).toContainText('ending in 8769');
        });

        test('Make a payment with declined amount with  Mastercard card, then payment failed', async ({ page }) => {
          const dashboard = new Dashboard(page);
          await dashboard.getMakeAPaymentCard.click();
          const payment = new Payment(page);      
          await expect(payment.getPageHeading).toBeVisible();
          await expect(payment.getWebChat).toBeVisible();
          await expect(payment.getAccountSectionValue).toHaveText(SingleAccountNoPhoneNumber01.accountNumber);
          await payment.enterPaymentAmount('1000.59');
          await payment.getAmountCountinueButton.click();
          await payment.enterCardDetails(Mastercard.cardNumber, Mastercard.cardExpiry, Mastercard.cardCCV, Mastercard.cardName)
          await payment.getPaymentMethodContinueButton.click();
          await expect(payment.getConfirmAccount).toHaveText(SingleAccountNoPhoneNumber01.accountNumber);
          await expect(payment.getConfirmAmount).toContainText('1000.59');
          await expect(payment.getConfirmPaymentMethod).toContainText('ending in 2346');
          await expect(payment.getConfirmInformation).toBeVisible();
          await expect(payment.getConfirmProcessPaymentButton).toBeVisible();
          await expect(payment.getConfirmCopyrights).toBeVisible();
          // wait for the payment call return 200
          const responsePromise = page.waitForResponse(response =>
            response.url() === 'https://test.customer.pioneercredit.com.au/api/debt-manager/consumers/undefined/singleelectronicpayment?version=v3' && response.status() === 200
                && response.request().method() === 'POST'
          );
          await payment.getConfirmProcessPaymentButton.click();
          const response = await responsePromise;
          // Need to be updated with the declined screen
          // await expect(payment.getPaymentSuccessHeading).toBeVisible();
          // await expect(payment.getPaymentSuccessAccountNumber).toHaveText(Customer01SingleAccount.accountNumber);
          // await expect(payment.getPaymentSuccessAmount).toContainText('100')
          // await expect(payment.getPaymentSuccessPaymentMethod).toContainText('ending in 8769');
        });