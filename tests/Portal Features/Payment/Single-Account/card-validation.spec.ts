import { test, expect } from '@playwright/test';
import { Helper } from '../../../../helper/helpers';
import { Dashboard } from '../../../../pages/dashboard-page';
import { Payment } from '../../../../pages/payment-page';
import { SingleAccountNoPhoneNumber01 } from '../../../../test-data/single-account.json';
import { InvalidCardAllEmpty } from '../../../../test-data/cards.json'; 
import { InvalidCardIncorrectCardNumber } from '../../../../test-data/cards.json';
import { InvalidCardNumberLessThan16Digits } from '../../../../test-data/cards.json';
import { InvalidCardExpiry } from '../../../../test-data/cards.json';
import { InvalidCardCCVMoreThan } from '../../../../test-data/cards.json';
import { InvalidCardCCVLessThan } from '../../../../test-data/cards.json';

    // API key and Inbox ID value need to be updated before run the tests below until provided with fixed email services
    test.beforeEach('Log in to the app', async ({ page }) => {
          await page.goto(process.env.UAT as string);
          const helper = new Helper(page);
          await helper.loginWithEmailAs2FA(SingleAccountNoPhoneNumber01.customerNumber, SingleAccountNoPhoneNumber01.password);
        });

    test('Make a payment with valid amount and enter invalid card details, then display relevant error and unable to continue', async ({ page }) => {
      const dashboard = new Dashboard(page);
      await dashboard.getMakeAPaymentCard.click();
      const payment = new Payment(page);      
      await expect(payment.getPageHeading).toBeVisible();
      await expect(payment.getWebChat).toBeVisible();
      await expect(payment.getAccountSectionValue).toHaveText(SingleAccountNoPhoneNumber01.accountNumber);
      await payment.enterPaymentAmount(SingleAccountNoPhoneNumber01.paymentAmountNormal);
      await payment.getAmountCountinueButton.click();
      await payment.enterCardDetails(InvalidCardAllEmpty.cardNumber, InvalidCardAllEmpty.cardExpiry, InvalidCardAllEmpty.cardCCV, InvalidCardAllEmpty.cardName);
      await payment.getPaymentMethodContinueButton.click();
      await expect(payment.getMissingCardNumberErrorMessage).toBeVisible();
      await expect(payment.getMissingCardExpiryErrorMessage).toBeVisible();
      await expect(payment.getMissingCCVErrorMessage).toBeVisible();
      await expect(payment.getMissingCardNameErrorMessage).toBeVisible();
      await page.screenshot({ path: 'screenshot.png', fullPage: true });
      await payment.enterCardDetails(InvalidCardNumberLessThan16Digits.cardNumber, InvalidCardNumberLessThan16Digits.cardExpiry, InvalidCardNumberLessThan16Digits.cardCCV, InvalidCardNumberLessThan16Digits.cardName);
      await payment.getPaymentMethodContinueButton.click();
      await expect(payment.getCardNumberErrorMessage1).toBeVisible();
      await page.screenshot({ path: 'screenshot.png', fullPage: true });
      await payment.enterCardDetails(InvalidCardIncorrectCardNumber.cardNumber, InvalidCardIncorrectCardNumber.cardExpiry, InvalidCardIncorrectCardNumber.cardCCV, InvalidCardIncorrectCardNumber.cardName);
      await payment.getPaymentMethodContinueButton.click();
      await expect(payment.getCardNumberErrorMessage2).toBeVisible();
      await page.screenshot({ path: 'screenshot.png', fullPage: true });
      await payment.enterCardDetails(InvalidCardExpiry.cardNumber, InvalidCardExpiry.cardExpiry, InvalidCardExpiry.cardCCV, InvalidCardExpiry.cardName);
      await payment.getPaymentMethodContinueButton.click();
      await expect(payment.getCardExpiryErrorMessage).toBeVisible();
      await page.screenshot({ path: 'screenshot.png', fullPage: true });
      await payment.enterCardDetails(InvalidCardCCVMoreThan.cardNumber, InvalidCardCCVMoreThan.cardExpiry, InvalidCardCCVMoreThan.cardCCV, InvalidCardCCVMoreThan.cardName);
      await payment.getPaymentMethodContinueButton.click();
      await expect(payment.getCCVErrorMessage1).toBeVisible();
      await page.screenshot({ path: 'screenshot.png', fullPage: true });
      await payment.enterCardDetails(InvalidCardCCVLessThan.cardNumber, InvalidCardCCVLessThan.cardExpiry, InvalidCardCCVLessThan.cardCCV, InvalidCardCCVLessThan.cardName);
      await payment.getPaymentMethodContinueButton.click();
      await expect(payment.getCCVErrorMessage2).toBeVisible();
      await page.screenshot({ path: 'screenshot.png', fullPage: true });
    });

    

    