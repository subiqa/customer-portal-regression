import { test, expect } from '@playwright/test';
import { Helper } from '../../../../helper/helpers';
import { Dashboard } from '../../../../pages/dashboard-page';
import { Payment } from '../../../../pages/payment-page';
import { SingleAccountNoPhoneNumber01 } from '../../../../test-data/single-account.json';
import { Visa } from '../../../../test-data/cards.json';
import { Mastercard} from '../../../../test-data/cards.json';

    // API key and Inbox ID value need to be updated before run the tests below until provided with fixed email services
    test.beforeEach('Log in to the app', async ({ page }) => {
          await page.goto(process.env.UAT as string);
          const helper = new Helper(page);
          await helper.loginWithEmailAs2FA(SingleAccountNoPhoneNumber01.customerNumber, SingleAccountNoPhoneNumber01.password);
        });

    test('Make a payment with correct amount and Visa card, then payment success', async ({ page }) => {
          const dashboard = new Dashboard(page);
          await dashboard.getMakeAPaymentCard.click();
          const payment = new Payment(page);      
          await expect(payment.getPageHeading).toBeVisible();
          await expect(payment.getWebChat).toBeVisible();
          await expect(payment.getAccountSectionValue).toHaveText(SingleAccountNoPhoneNumber01.accountNumber);
          await payment.enterPaymentAmount('100');
          await payment.getAmountCountinueButton.click();
          await payment.enterCardDetails(Visa.cardNumber, Visa.cardExpiry, Visa.cardCCV, Visa.cardName)
          await payment.getPaymentMethodContinueButton.click();
          await expect(payment.getConfirmAccount).toHaveText(SingleAccountNoPhoneNumber01.accountNumber);
          await expect(payment.getConfirmAmount).toContainText('100');
          await expect(payment.getConfirmPaymentMethod).toHaveText('Visa ending in 8769');
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
          await expect(payment.getPaymentSuccessHeading).toBeVisible();
          await expect(payment.getPaymentSuccessAccountNumber).toHaveText(SingleAccountNoPhoneNumber01.accountNumber);
          await expect(payment.getPaymentSuccessAmount).toContainText('100')
          await expect(payment.getPaymentSuccessPaymentMethod).toContainText('ending in 8769');
        });

        test('Make a payment with correct decimal amount and Visa card, then payment success', async ({ page }) => {
          const dashboard = new Dashboard(page);
          await dashboard.getMakeAPaymentCard.click();
          const payment = new Payment(page);      
          await expect(payment.getPageHeading).toBeVisible();
          await expect(payment.getWebChat).toBeVisible();
          await expect(payment.getAccountSectionValue).toHaveText(SingleAccountNoPhoneNumber01.accountNumber);
          await payment.enterPaymentAmount('1000.10');
          await payment.getAmountCountinueButton.click();
          await payment.enterCardDetails(Visa.cardNumber, Visa.cardExpiry, Visa.cardCCV, Visa.cardName)
          await payment.getPaymentMethodContinueButton.click();
          await expect(payment.getConfirmAccount).toHaveText(SingleAccountNoPhoneNumber01.accountNumber);
          await expect(payment.getConfirmAmount).toContainText('1000.10');
          await expect(payment.getConfirmPaymentMethod).toHaveText('Visa ending in 8769');
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
          await expect(payment.getPaymentSuccessHeading).toBeVisible();
          await expect(payment.getPaymentSuccessAccountNumber).toHaveText(SingleAccountNoPhoneNumber01.accountNumber);
          await expect(payment.getPaymentSuccessAmount).toContainText('1000.10')
          await expect(payment.getPaymentSuccessPaymentMethod).toContainText('ending in 8769');
        });

        test('Make a payment with Visa card and edit the amount before submit, then display payment success for the updated amount', async ({ page }) => {
          const dashboard = new Dashboard(page);
          await dashboard.getMakeAPaymentCard.click();
          const payment = new Payment(page);      
          await expect(payment.getPageHeading).toBeVisible();
          await expect(payment.getWebChat).toBeVisible();
          await expect(payment.getAccountSectionValue).toHaveText(SingleAccountNoPhoneNumber01.accountNumber);
          await payment.enterPaymentAmount('1000');
          await payment.getAmountCountinueButton.click();
          await payment.enterCardDetails(Visa.cardNumber, Visa.cardExpiry, Visa.cardCCV, Visa.cardName)
          await payment.getPaymentMethodContinueButton.click();
          await expect(payment.getConfirmAccount).toHaveText(SingleAccountNoPhoneNumber01.accountNumber);
          await expect(payment.getConfirmAmount).toContainText('1000');
          await expect(payment.getConfirmPaymentMethod).toHaveText('Visa ending in 8769');
          await expect(payment.getConfirmInformation).toBeVisible();
          await expect(payment.getConfirmProcessPaymentButton).toBeVisible();
          await expect(payment.getConfirmCopyrights).toBeVisible();
          await payment.getAmountSectionTitle.click();
          await payment.enterPaymentAmount('50');
          await payment.getAmountCountinueButton.click();
          await expect(payment.getCardExpiryFieldInput).toHaveValue(Visa.cardExpiry);
          await expect(payment.getCCVFieldInput).toHaveValue(Visa.cardCCV);
          await expect(payment.getCardNameFieldInput).toHaveValue(Visa.cardName);
          await payment.getPaymentMethodContinueButton.click();
          await expect(payment.getConfirmAccount).toHaveText(SingleAccountNoPhoneNumber01.accountNumber);
          await expect(payment.getConfirmAmount).toContainText('50');
          await expect(payment.getConfirmPaymentMethod).toHaveText('Visa ending in 8769');
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
          await expect(payment.getPaymentSuccessHeading).toBeVisible();
          await expect(payment.getPaymentSuccessAccountNumber).toHaveText(SingleAccountNoPhoneNumber01.accountNumber);
          await expect(payment.getPaymentSuccessAmount).toContainText('50')
          await expect(payment.getPaymentSuccessPaymentMethod).toContainText('ending in 8769');
        });

        test('Make a payment and edit the card before submit, then display payment success for the updated amount', async ({ page }) => {
          const dashboard = new Dashboard(page);
          await dashboard.getMakeAPaymentCard.click();
          const payment = new Payment(page);      
          await expect(payment.getPageHeading).toBeVisible();
          await expect(payment.getWebChat).toBeVisible();
          await expect(payment.getAccountSectionValue).toHaveText(SingleAccountNoPhoneNumber01.accountNumber);
          await payment.enterPaymentAmount('101');
          await payment.getAmountCountinueButton.click();
          await payment.enterCardDetails(Mastercard.cardNumber, Mastercard.cardExpiry, Mastercard.cardCCV, Mastercard.cardName);
          await payment.getPaymentMethodContinueButton.click();
          await expect(payment.getConfirmAccount).toHaveText(SingleAccountNoPhoneNumber01.accountNumber);
          await expect(payment.getConfirmAmount).toContainText('101');
          await expect(payment.getConfirmPaymentMethod).toContainText('ending in 2346');
          await expect(payment.getConfirmInformation).toBeVisible();
          await expect(payment.getConfirmProcessPaymentButton).toBeVisible();
          await expect(payment.getConfirmCopyrights).toBeVisible();
          await payment.getPaymentMethodSectionTitle.click();
          await expect(payment.getCardExpiryFieldInput).toHaveValue(Mastercard.cardExpiry);
          await expect(payment.getCCVFieldInput).toHaveValue(Mastercard.cardCCV);
          await expect(payment.getCardNameFieldInput).toHaveValue(Mastercard.cardName);
          await payment.enterCardDetails(Visa.cardNumber, Visa.cardExpiry, Visa.cardCCV, Visa.cardName);
          await payment.getPaymentMethodContinueButton.click();
          await expect(payment.getConfirmAccount).toHaveText(SingleAccountNoPhoneNumber01.accountNumber);
          await expect(payment.getConfirmAmount).toContainText('101');
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
          await expect(payment.getPaymentSuccessHeading).toBeVisible();
          await expect(payment.getPaymentSuccessAccountNumber).toHaveText(SingleAccountNoPhoneNumber01.accountNumber);
          await expect(payment.getPaymentSuccessAmount).toContainText('101')
          await expect(payment.getPaymentSuccessPaymentMethod).toContainText('ending in 8769');
        });

        test('Make a payment and edit the amount and card details before submit, then payment success', async ({ page }) => {
          const dashboard = new Dashboard(page);
          await dashboard.getMakeAPaymentCard.click();
          const payment = new Payment(page);      
          await expect(payment.getPageHeading).toBeVisible();
          await expect(payment.getWebChat).toBeVisible();
          await expect(payment.getAccountSectionValue).toHaveText(SingleAccountNoPhoneNumber01.accountNumber);
          await payment.enterPaymentAmount('1000');
          await payment.getAmountCountinueButton.click();
          await payment.enterCardDetails(Mastercard.cardNumber, Mastercard.cardExpiry, Mastercard.cardCCV, Mastercard.cardName)
          await payment.getPaymentMethodContinueButton.click();
          await expect(payment.getConfirmAccount).toHaveText(SingleAccountNoPhoneNumber01.accountNumber);
          await expect(payment.getConfirmAmount).toContainText('1000');
          await expect(payment.getConfirmPaymentMethod).toContainText('ending in 2346');
          await expect(payment.getConfirmInformation).toBeVisible();
          await expect(payment.getConfirmProcessPaymentButton).toBeVisible();
          await expect(payment.getConfirmCopyrights).toBeVisible();
          await payment.getAmountSectionTitle.click();
          await payment.enterPaymentAmount('50');
          await payment.getAmountCountinueButton.click();
          await payment.enterCardDetails(Visa.cardNumber, Visa.cardExpiry, Visa.cardCCV, Visa.cardName)
          await payment.getPaymentMethodContinueButton.click();
          await expect(payment.getConfirmAccount).toHaveText(SingleAccountNoPhoneNumber01.accountNumber);
          await expect(payment.getConfirmAmount).toContainText('50');
          await expect(payment.getConfirmPaymentMethod).toHaveText('Visa ending in 8769');
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
          await expect(payment.getPaymentSuccessHeading).toBeVisible();
          await expect(payment.getPaymentSuccessAccountNumber).toHaveText(SingleAccountNoPhoneNumber01.accountNumber);
          await expect(payment.getPaymentSuccessAmount).toContainText('50')
          await expect(payment.getPaymentSuccessPaymentMethod).toContainText('ending in 8769');
        });