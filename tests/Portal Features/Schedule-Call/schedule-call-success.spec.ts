import { test, expect } from '@playwright/test';
import { Helper } from '../../../helper/helpers';
import { Dashboard } from '../../../pages/dashboard-page';
import { SingleAccountNoPhoneNumber01 } from '../../../test-data/single-account.json';
import { SingleAccountWithPhoneNumber01 } from '../../../test-data/single-account.json';

    // API key and Inbox ID value need to be updated befor run the test below until provided with paid email services
    test('Given customer have phone number in DM, when schedule a call, then the existing phone number will be selected by default and submit success', async ({ page }) => {
      await page.goto(process.env.UAT as string);
      const helper = new Helper(page);
      await helper.loginWithEmailAs2FA(SingleAccountWithPhoneNumber01.customerNumber, SingleAccountWithPhoneNumber01.password);
      const dashboard = new Dashboard(page);
      await dashboard.getScheduleACallCard.click();
      await dashboard.selectTomorrow();
      await dashboard.selectScheduleACallTime('09:00,11:00');
      await dashboard.selectScheduleACallState('ACT');
      await expect(dashboard.getScheduleACallContactNumberDefault).toBeChecked();
      // wait for the schedule a call PUT return 200
      const responsePromise = page.waitForResponse(response =>
        response.url() === 'https://test.customer.pioneercredit.com.au/api/debt-manager/consumers/'+SingleAccountWithPhoneNumber01.customerNumber+'/userdefinedpages/PORTALC/data/23' && response.status() === 200
            && response.request().method() === 'PUT'
      );
      await dashboard.getScheduleACallConfirmCallButton.click();
      const response = await responsePromise;
      await expect(dashboard.getScheduleACallSubmitSuccessMessage).toBeVisible();
    });

    test('Given customer have phone number in DM, when schedule a call, then customer able to enter alternate number and submit success', async ({ page }) => {
      await page.goto(process.env.UAT as string);
      const helper = new Helper(page);
      await helper.loginWithEmailAs2FA(SingleAccountWithPhoneNumber01.customerNumber, SingleAccountWithPhoneNumber01.password);
      const dashboard = new Dashboard(page);
      await dashboard.getScheduleACallCard.click();
      await dashboard.selectTomorrow();
      await dashboard.selectScheduleACallTime('13:00,16:00');
      await dashboard.selectScheduleACallState('QLD');
      await expect(dashboard.getScheduleACallContactNumberDefault).toBeChecked();
      await dashboard.enterContactNumber('0487654321');
      // wait for the schedule a call PUT return 200
      const responsePromise = page.waitForResponse(response =>
        response.url() === 'https://test.customer.pioneercredit.com.au/api/debt-manager/consumers/'+SingleAccountWithPhoneNumber01.customerNumber+'/userdefinedpages/PORTALC/data/23' && response.status() === 200
            && response.request().method() === 'PUT'
      );
      await dashboard.getScheduleACallConfirmCallButton.click();
      const response = await responsePromise;
      await expect(dashboard.getScheduleACallSubmitSuccessMessage).toBeVisible();
    });

    test('Given customer didn\'t have phone number in DM, when schedule a call, then customer able to enter an alternate phone number and submit success', async ({ page }) => {
      await page.goto(process.env.UAT as string);
      const helper = new Helper(page);
      await helper.loginWithEmailAs2FA(SingleAccountNoPhoneNumber01.customerNumber, SingleAccountNoPhoneNumber01.password);
      const dashboard = new Dashboard(page);
      await dashboard.getScheduleACallCard.click();
      await dashboard.selectTomorrow();
      await dashboard.selectScheduleACallTime('16:00,18:00');
      await dashboard.selectScheduleACallState('WA');
      await dashboard.enterContactNumber('0487654321');
      // wait for the schedule a call PUT return 200
      const responsePromise = page.waitForResponse(response =>
        response.url() === 'https://test.customer.pioneercredit.com.au/api/debt-manager/consumers/'+SingleAccountNoPhoneNumber01.customerNumber+'/userdefinedpages/PORTALC/data/13' && response.status() === 200
            && response.request().method() === 'PUT'
      );
      await dashboard.getScheduleACallConfirmCallButton.click();
      const response = await responsePromise;
      await expect(dashboard.getScheduleACallSubmitSuccessMessage).toBeVisible();
    });