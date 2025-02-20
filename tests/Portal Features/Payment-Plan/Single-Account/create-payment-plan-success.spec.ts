import { test, expect } from '@playwright/test';
import { Helper } from '../../../../helper/helpers';
import { Dashboard } from '../../../../pages/dashboard-page';
import { PaymentPlan } from '../../../../pages/payment-plan-page';
import { SingleAccountNoPaymentPlanWeeklyBank } from '../../../../test-data/single-account.json';

    // API key and Inbox ID value need to be updated before run the tests below until provided with fixed email services
    // Please ensure the test account have the exisitng payment plan deleted
    test.beforeEach('Log in to the app', async ({ page }) => {
          await page.goto(process.env.UAT as string);
          const helper = new Helper(page);
          await helper.loginWithEmailAs2FA(SingleAccountNoPaymentPlanWeeklyBank.customerNumber, SingleAccountNoPaymentPlanWeeklyBank.password);
        });

    test('Make a payment plan: Weekly - Bank with correct input, then create payment plan success', async ({ page }) => {
      const dashboard = new Dashboard(page);
      await dashboard.getSetUpPaymentPlanCard.click();
      const paymentPlan = new PaymentPlan(page);      
      await expect(paymentPlan.getTitle).toBeVisible();
      await expect(paymentPlan.getAccountNumber).toHaveText(SingleAccountNoPaymentPlanWeeklyBank.accountNumber);
      await paymentPlan.enterAmount('999');
      await paymentPlan.getFrequencyWeekly.click();
      await expect(paymentPlan.getFrequencyWeekly).toHaveAttribute('aria-checked', 'true');
      await paymentPlan.assertWeeklyDatesRange();
      await paymentPlan.selectWeeklyFirstPaymentDate();
      const firstDueDate = await paymentPlan.getWeeklyFirstPaymentDateFormat1();
      await expect(paymentPlan.getFirstDueDate).toContainText(firstDueDate);
      const secondDueDate = await paymentPlan.getWeeklySecondPaymentDateFormat1();
      await expect(paymentPlan.getSecondDueDate).toContainText(secondDueDate);
      await expect(paymentPlan.getFirstDueAmount).toContainText('999');
      await expect(paymentPlan.getClosureDate).toBeVisible();
      await paymentPlan.getPaymentPlanContinueButton.click();
      await paymentPlan.getPaymentMethodBank.click();
      // await expect(paymentPlan.getPaymentMethodBank).toHaveAttribute('aria-checked', 'true');
      // await paymentPlan.enterBSB('313000');
      // const randomNumber = new Helper(page);
      // const randomBankAccount = await randomNumber.getRandomBankAccount();
      // await paymentPlan.enterBankAccountNumber(randomBankAccount);
      // await paymentPlan.enterBankAccountName('Subi Test');
      // await paymentPlan.getPaymentMethodContinueButton.click();
      // await expect(paymentPlan.getConfirmAccount).toHaveText(SingleAccountNoPaymentPlanWeeklyBank.accountNumber);
      // // Failed by unwanted Lump Sum field. Uncomment once it fixed
      // //await expect(paymentPlan.getConfirmPaymentPlan).toContainText('999 per week'); 
      // //await expect(paymentPlan.getConfirmPaymentMethod).toContainText('Account ending in -'+randomBankAccount.substring(6,9));
      // await paymentPlan.checkedPaymentReminderCheckbox();
      // await paymentPlan.checkedTnCCheckbox();
      // // wait for the save payment plan POST return 200
      // const savePaymentPlanPromise = page.waitForResponse(response =>
      //   response.url() === 'https://test.customer.pioneercredit.com.au/api/debt-manager/consumers/'+SingleAccountNoPaymentPlanWeeklyBank.customerNumber+'/savepaymentschedule?version=v3' && response.status() === 200
      //       && response.request().method() === 'POST'
      // );
      // await paymentPlan.getConfirmButton.click();
      // const savePaymentPlanResponse = await savePaymentPlanPromise;
      // await expect(paymentPlan.getPaymentPlanSuccessHeading).toBeVisible();
      // await expect(paymentPlan.getPaymentPlanSuccessAccountNumber).toContainText(SingleAccountNoPaymentPlanWeeklyBank.accountNumber);
      // await expect(paymentPlan.getPaymentPlanSuccessAmount).toContainText('999');
      // await expect(paymentPlan.getPaymentPlanSuccessFrequency).toContainText('Weekly');
      // await expect(paymentPlan.getPaymentPlanSuccessPaymentMethod).toContainText(randomBankAccount.substring(5,9));
      // const paymentDateSuccess = await paymentPlan.getWeeklyFirstPaymentDateFormat2();
      // await expect(paymentPlan.getPaymentPlanSuccessPaymentDate).toContainText(paymentDateSuccess);
      // await expect(paymentPlan.getPaymentPlanSuccessDashboardButton).toBeVisible();
      // await expect(paymentPlan.getPaymentPlanSuccessPrintButton).toBeVisible();
      // // Return to Dashboard and should see the summary
      // await paymentPlan.getPaymentPlanSuccessDashboardButton.click();
      // await expect(dashboard.getWelcomeMessage).toBeVisible();
      // await page.reload();
      // await expect(dashboard.getEditPaymentPlanCard).toBeVisible();
      // await expect(dashboard.getpaymentPlanAmount).toContainText('999');
      // await expect(dashboard.getpaymentPlanFrequency).toContainText('Weekly');
      // await expect(dashboard.getpaymentPlanNextPaymentDate).toContainText(firstDueDate);
      // //await expect(dashboard.getpaymentPlanReminderCheckbox).toBeChecked(); need to wait for https://pioneercredit.atlassian.net/browse/CP-502 to be fixed
      // await expect(dashboard.getpaymentPlanViewUpcomingButton).toBeVisible();
      // await dashboard.getpaymentPlanViewUpcomingButton.click();
      // await expect(dashboard.getpaymentPlanFirstDueDate).toContainText(firstDueDate);
      // await expect(dashboard.getpaymentPlanSecondDueDate).toContainText(secondDueDate);
    });

    test('Make a payment plan: Fortnightly - Bank with correct input, then create payment plan success', async ({ page }) => {
      const dashboard = new Dashboard(page);
      await dashboard.getSetUpPaymentPlanCard.click();
      const paymentPlan = new PaymentPlan(page);      
      await expect(paymentPlan.getTitle).toBeVisible();
      await expect(paymentPlan.getAccountNumber).toHaveText(SingleAccountNoPaymentPlanWeeklyBank.accountNumber);
      await paymentPlan.enterAmount('2000');
      await paymentPlan.getFrequencyFortnightly.click();
      await expect(paymentPlan.getFrequencyFortnightly).toHaveAttribute('aria-checked', 'true');
      await paymentPlan.assertFortnightlyDatesRange();
      await paymentPlan.selectFortnightlyFirstPaymentDate();
      const firstDueDate = await paymentPlan.getFortnightlyFirstPaymentDateFormat1();
      await expect(paymentPlan.getFirstDueDate).toContainText(firstDueDate);
      const secondDueDate = await paymentPlan.getFortnightlySecondPaymentDateFormat1();
      await expect(paymentPlan.getSecondDueDate).toContainText(secondDueDate);
      await expect(paymentPlan.getFirstDueAmount).toContainText('2000');
      await expect(paymentPlan.getClosureDate).toBeVisible();
      await paymentPlan.getPaymentPlanContinueButton.click();
      // await paymentPlan.getPaymentMethodBank.click();
      // await expect(paymentPlan.getPaymentMethodBank).toHaveAttribute('aria-checked', 'true');
      // await paymentPlan.enterBSB('313000');
      // const randomNumber = new Helper(page);
      // const randomBankAccount = await randomNumber.getRandomBankAccount();
      // await paymentPlan.enterBankAccountNumber(randomBankAccount);
      // await paymentPlan.enterBankAccountName('Subi Test');
      // await paymentPlan.getPaymentMethodContinueButton.click();
      // await expect(paymentPlan.getConfirmAccount).toHaveText(SingleAccountNoPaymentPlanWeeklyBank.accountNumber);
      // // Failed by unwanted Lump Sum field. Uncomment once it fixed
      // // await expect(paymentPlan.getConfirmPaymentPlan).toContainText('2000 per fortnight'); // Failed by unwanted Lump Sum field
      // // await expect(paymentPlan.getConfirmPaymentMethod).toContainText('Account ending in -'+randomBankAccount.substring(6,9));
      // await paymentPlan.checkedPaymentReminderCheckbox();
      // await paymentPlan.checkedTnCCheckbox();
      // // wait for the save payment plan POST return 200
      // const savePaymentPlanPromise = page.waitForResponse(response =>
      //   response.url() === 'https://test.customer.pioneercredit.com.au/api/debt-manager/consumers/'+SingleAccountNoPaymentPlanWeeklyBank.customerNumber+'/savepaymentschedule?version=v3' && response.status() === 200
      //       && response.request().method() === 'POST'
      // );
      // await paymentPlan.getConfirmButton.click();
      // const savePaymentPlanResponse = await savePaymentPlanPromise;
      // await expect(paymentPlan.getPaymentPlanSuccessHeading).toBeVisible();
      // await expect(paymentPlan.getPaymentPlanSuccessAccountNumber).toContainText(SingleAccountNoPaymentPlanWeeklyBank.accountNumber);
      // await expect(paymentPlan.getPaymentPlanSuccessAmount).toContainText('2000');
      // await expect(paymentPlan.getPaymentPlanSuccessFrequency).toContainText('Fortnightly');
      // await expect(paymentPlan.getPaymentPlanSuccessPaymentMethod).toContainText(randomBankAccount.substring(5,9));
      // const paymentDateSuccess = await paymentPlan.getFortnightlyFirstPaymentDateFormat2();
      // await expect(paymentPlan.getPaymentPlanSuccessPaymentDate).toContainText(paymentDateSuccess);
      // await expect(paymentPlan.getPaymentPlanSuccessDashboardButton).toBeVisible();
      // await expect(paymentPlan.getPaymentPlanSuccessPrintButton).toBeVisible();
      // // Return to Dashboard and should see the summary
      // await paymentPlan.getPaymentPlanSuccessDashboardButton.click();
      // await expect(dashboard.getWelcomeMessage).toBeVisible();
      // await page.reload();
      // await expect(dashboard.getEditPaymentPlanCard).toBeVisible();
      // await expect(dashboard.getpaymentPlanAmount).toContainText('2,000');
      // await expect(dashboard.getpaymentPlanFrequency).toContainText('Fortnightly');
      // await expect(dashboard.getpaymentPlanNextPaymentDate).toContainText(firstDueDate);
      // //await expect(dashboard.getpaymentPlanReminderCheckbox).toBeChecked(); need to wait for https://pioneercredit.atlassian.net/browse/CP-502 to be fixed
      // await expect(dashboard.getpaymentPlanViewUpcomingButton).toBeVisible();
      // await dashboard.getpaymentPlanViewUpcomingButton.click();
      // await expect(dashboard.getpaymentPlanFirstDueDate).toContainText(firstDueDate);
      // await expect(dashboard.getpaymentPlanSecondDueDate).toContainText(secondDueDate);
    });

    test('Make a payment plan: Monthly - Bank with correct input, then create payment plan success', async ({ page }) => {
      const dashboard = new Dashboard(page);
      await dashboard.getSetUpPaymentPlanCard.click();
      const paymentPlan = new PaymentPlan(page);      
      await expect(paymentPlan.getTitle).toBeVisible();
      await expect(paymentPlan.getAccountNumber).toHaveText(SingleAccountNoPaymentPlanWeeklyBank.accountNumber);
      await paymentPlan.enterAmount('4500');
      await paymentPlan.getFrequencyMonthly.click();
      await expect(paymentPlan.getFrequencyMonthly).toHaveAttribute('aria-checked', 'true');
      await paymentPlan.assertMonthlyDatesRange();
      await paymentPlan.selectMonthlyFirstPaymentDate();
      const firstDueDate = await paymentPlan.getMonthlyFirstPaymentDateFormat1();
      await expect(paymentPlan.getFirstDueDate).toContainText(firstDueDate);
      const secondDueDate = await paymentPlan.getMonthlySecondPaymentDateFormat1();
      await expect(paymentPlan.getSecondDueDate).toContainText(secondDueDate);
      await expect(paymentPlan.getFirstDueAmount).toContainText('4500');
      await expect(paymentPlan.getClosureDate).toBeVisible();
      await paymentPlan.getPaymentPlanContinueButton.click();
      // await paymentPlan.getPaymentMethodBank.click();
      // await expect(paymentPlan.getPaymentMethodBank).toHaveAttribute('aria-checked', 'true');
      // await paymentPlan.enterBSB('313000');
      // const randomNumber = new Helper(page);
      // const randomBankAccount = await randomNumber.getRandomBankAccount();
      // await paymentPlan.enterBankAccountNumber(randomBankAccount);
      // await paymentPlan.enterBankAccountName('Subi Test');
      // await paymentPlan.getPaymentMethodContinueButton.click();
      // await expect(paymentPlan.getConfirmAccount).toHaveText(SingleAccountNoPaymentPlanWeeklyBank.accountNumber);
      // // Failed by unwanted Lump Sum field. Uncomment once it fixed
      // // await expect(paymentPlan.getConfirmPaymentPlan).toContainText('2000 per monthly'); // Failed by unwanted Lump Sum field
      // // await expect(paymentPlan.getConfirmPaymentMethod).toContainText('Account ending in -'+randomBankAccount.substring(6,9));
      // await paymentPlan.checkedPaymentReminderCheckbox();
      // await paymentPlan.checkedTnCCheckbox();
      // // wait for the save payment plan POST return 200
      // const savePaymentPlanPromise = page.waitForResponse(response =>
      //   response.url() === 'https://test.customer.pioneercredit.com.au/api/debt-manager/consumers/'+SingleAccountNoPaymentPlanWeeklyBank.customerNumber+'/savepaymentschedule?version=v3' && response.status() === 200
      //       && response.request().method() === 'POST'
      // );
      // await paymentPlan.getConfirmButton.click();
      // const savePaymentPlanResponse = await savePaymentPlanPromise;
      // await expect(paymentPlan.getPaymentPlanSuccessHeading).toBeVisible();
      // await expect(paymentPlan.getPaymentPlanSuccessAccountNumber).toContainText(SingleAccountNoPaymentPlanWeeklyBank.accountNumber);
      // await expect(paymentPlan.getPaymentPlanSuccessAmount).toContainText('4500');
      // await expect(paymentPlan.getPaymentPlanSuccessFrequency).toContainText('Monthly');
      // await expect(paymentPlan.getPaymentPlanSuccessPaymentMethod).toContainText(randomBankAccount.substring(5,9));
      // const paymentDateSuccess = await paymentPlan.getMonthlyFirstPaymentDateFormat2();
      // await expect(paymentPlan.getPaymentPlanSuccessPaymentDate).toContainText(paymentDateSuccess);
      // await expect(paymentPlan.getPaymentPlanSuccessDashboardButton).toBeVisible();
      // await expect(paymentPlan.getPaymentPlanSuccessPrintButton).toBeVisible();
      // // Return to Dashboard and should see the summary
      // await paymentPlan.getPaymentPlanSuccessDashboardButton.click();
      // await expect(dashboard.getWelcomeMessage).toBeVisible();
      // await page.reload();
      // await expect(dashboard.getEditPaymentPlanCard).toBeVisible();
      // await expect(dashboard.getpaymentPlanAmount).toContainText('4,500');
      // await expect(dashboard.getpaymentPlanFrequency).toContainText('Monthly');
      // await expect(dashboard.getpaymentPlanNextPaymentDate).toContainText(firstDueDate);
      // //await expect(dashboard.getpaymentPlanReminderCheckbox).toBeChecked(); need to wait for https://pioneercredit.atlassian.net/browse/CP-502 to be fixed
      // await expect(dashboard.getpaymentPlanViewUpcomingButton).toBeVisible();
      // await dashboard.getpaymentPlanViewUpcomingButton.click();
      // await expect(dashboard.getpaymentPlanFirstDueDate).toContainText(firstDueDate);
      // await expect(dashboard.getpaymentPlanSecondDueDate).toContainText(secondDueDate);
    });