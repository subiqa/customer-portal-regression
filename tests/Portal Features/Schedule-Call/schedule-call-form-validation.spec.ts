import { test, expect } from '@playwright/test';
import { Helper } from '../../../helper/helpers';
import { Dashboard } from '../../../pages/dashboard-page';
import { SingleAccountNoPhoneNumber01 } from '../../../test-data/single-account.json';
import { SingleAccountWithPhoneNumber01 } from '../../../test-data/single-account.json';

    test('Given Customer didn\'t have phone number in DM, When submit schedule a call with invalid input, then relevant error message will be displayed', async ({ page }) => {
      await page.goto(process.env.UAT as string);
      const helper = new Helper(page);
      // API key and Inbox ID value need to be updated befor run the test below until provided with paid email services
      await helper.loginWithEmailAs2FA(SingleAccountNoPhoneNumber01.customerNumber, SingleAccountNoPhoneNumber01.password);
      const dashboard = new Dashboard(page);
      await dashboard.getScheduleACallCard.click();
      await dashboard.selectTomorrow();
      await dashboard.selectScheduleACallTime('09:00,11:00');
      await dashboard.selectScheduleACallState('ACT');
      await dashboard.enterContactNumber('');
      await dashboard.getScheduleACallConfirmCallButton.click();
      await expect(dashboard.getScheduleACallErrorMessage1).toBeVisible();
      await page.screenshot({ path: 'screenshot.png' });
      await dashboard.selectTomorrow();
      await dashboard.selectScheduleACallTime('11:00,13:00');
      await dashboard.selectScheduleACallState('NSW');
      await dashboard.enterContactNumber('1234567890');
      await dashboard.getScheduleACallConfirmCallButton.click();
      await expect(dashboard.getScheduleACallErrorMessage2).toBeVisible();
      await page.screenshot({ path: 'screenshot.png' });
      await dashboard.selectTomorrow();
      await dashboard.selectScheduleACallTime('13:00,16:00');
      await dashboard.selectScheduleACallState('');
      await dashboard.getScheduleACallConfirmCallButton.click();
      await expect(dashboard.getScheduleACallErrorMessage3).toBeVisible();
      await page.screenshot({ path: 'screenshot.png' });
      await dashboard.selectTomorrow();
      await dashboard.selectScheduleACallTime('');
      await dashboard.selectScheduleACallState('QLD');
      await dashboard.enterContactNumber('0412345678');
      await dashboard.getScheduleACallConfirmCallButton.click();
      await expect(dashboard.getScheduleACallErrorMessage4).toBeVisible();
      await page.screenshot({ path: 'screenshot.png' });
      await dashboard.getScheduleACallDate.selectOption({ index: 0});
      await dashboard.selectScheduleACallTime('16:00,18:00');
      await dashboard.selectScheduleACallState('SA');
      await dashboard.enterContactNumber('0412345678');
      await dashboard.getScheduleACallConfirmCallButton.click();
      await expect(dashboard.getScheduleACallErrorMessage5).toBeVisible();
      await page.screenshot({ path: 'screenshot.png' });
      await dashboard.getScheduleACallDate.selectOption({ index: 0});
      await dashboard.selectScheduleACallTime('');
      await dashboard.selectScheduleACallState('');
      await dashboard.getScheduleACallContactNumberInput.clear();
      await dashboard.getScheduleACallConfirmCallButton.click();
      await expect(dashboard.getScheduleACallErrorMessage1).toBeVisible();
      await expect(dashboard.getScheduleACallErrorMessage3).toBeVisible();
      await expect(dashboard.getScheduleACallErrorMessage4).toBeVisible();
      await expect(dashboard.getScheduleACallErrorMessage5).toBeVisible();
      await page.screenshot({ path: 'screenshot.png' });
      await dashboard.getScheduleACallDate.selectOption({ index: 0});
      await dashboard.selectScheduleACallTime('');
      await dashboard.selectScheduleACallState('');
      await dashboard.enterContactNumber('1234567890');
      await dashboard.getScheduleACallConfirmCallButton.click();
      await expect(dashboard.getScheduleACallErrorMessage2).toBeVisible();
      await expect(dashboard.getScheduleACallErrorMessage3).toBeVisible();
      await expect(dashboard.getScheduleACallErrorMessage4).toBeVisible();
      await expect(dashboard.getScheduleACallErrorMessage5).toBeVisible();
      await page.screenshot({ path: 'screenshot.png' });
    });

    test('Given Customer have phone number in DM, When submit schedule a call with invalid input, then relevant error message will be displayed', async ({ page }) => {
      await page.goto(process.env.UAT as string);
      const helper = new Helper(page);
      // API key and Inbox ID value need to be updated befor run the test below until provided with paid email services
      await helper.loginWithEmailAs2FA(SingleAccountWithPhoneNumber01.customerNumber, SingleAccountWithPhoneNumber01.password);
      const dashboard = new Dashboard(page);
      await dashboard.getScheduleACallCard.click();
      await dashboard.getScheduleACallConfirmCallButton.click();
      await expect(dashboard.getScheduleACallErrorMessage3).toBeVisible();
      await expect(dashboard.getScheduleACallErrorMessage4).toBeVisible();
      await expect(dashboard.getScheduleACallErrorMessage5).toBeVisible();
      await dashboard.selectTomorrow();
      await dashboard.selectScheduleACallTime('09:00,11:00');
      await dashboard.selectScheduleACallState('ACT');
      await dashboard.enterContactNumber('');
      await dashboard.getScheduleACallConfirmCallButton.click();
      await expect(dashboard.getScheduleACallErrorMessage1).toBeVisible();
      await page.screenshot({ path: 'screenshot.png' });
      await dashboard.selectTomorrow();
      await dashboard.selectScheduleACallTime('11:00,13:00');
      await dashboard.selectScheduleACallState('ACT');
      await dashboard.enterContactNumber('1234567890');
      await dashboard.getScheduleACallConfirmCallButton.click();
      await expect(dashboard.getScheduleACallErrorMessage2).toBeVisible();
      await page.screenshot({ path: 'screenshot.png' });
      await dashboard.selectTomorrow();
      await dashboard.selectScheduleACallTime('13:00,16:00');
      await dashboard.selectScheduleACallState('');
      await dashboard.getScheduleACallContactNumberDefault.click();
      await dashboard.getScheduleACallConfirmCallButton.click();
      await expect(dashboard.getScheduleACallErrorMessage3).toBeVisible();
      await page.screenshot({ path: 'screenshot.png' });
      await dashboard.selectTomorrow();
      await dashboard.selectScheduleACallTime('');
      await dashboard.selectScheduleACallState('QLD');
      await dashboard.getScheduleACallContactNumberDefault.click();
      await dashboard.getScheduleACallConfirmCallButton.click();
      await expect(dashboard.getScheduleACallErrorMessage4).toBeVisible();
      await page.screenshot({ path: 'screenshot.png' });
      await dashboard.getScheduleACallDate.selectOption({ index: 0});
      await dashboard.selectScheduleACallTime('16:00,18:00');
      await dashboard.selectScheduleACallState('QLD');
      await dashboard.getScheduleACallContactNumberDefault.click();
      await dashboard.getScheduleACallConfirmCallButton.click();
      await expect(dashboard.getScheduleACallErrorMessage5).toBeVisible();
      await page.screenshot({ path: 'screenshot.png' });
      await dashboard.getScheduleACallDate.selectOption({ index: 0});
      await dashboard.selectScheduleACallTime('');
      await dashboard.selectScheduleACallState('');
      await dashboard.getScheduleACallContactNumberInput.clear();
      await dashboard.getScheduleACallConfirmCallButton.click();
      await expect(dashboard.getScheduleACallErrorMessage1).toBeVisible();
      await expect(dashboard.getScheduleACallErrorMessage3).toBeVisible();
      await expect(dashboard.getScheduleACallErrorMessage4).toBeVisible();
      await expect(dashboard.getScheduleACallErrorMessage5).toBeVisible();
      await page.screenshot({ path: 'screenshot.png' });
      await dashboard.getScheduleACallDate.selectOption({ index: 0});
      await dashboard.selectScheduleACallTime('');
      await dashboard.selectScheduleACallState('');
      await dashboard.enterContactNumber('1234567890');
      await dashboard.getScheduleACallConfirmCallButton.click();
      await expect(dashboard.getScheduleACallErrorMessage2).toBeVisible();
      await expect(dashboard.getScheduleACallErrorMessage3).toBeVisible();
      await expect(dashboard.getScheduleACallErrorMessage4).toBeVisible();
      await expect(dashboard.getScheduleACallErrorMessage5).toBeVisible();
      await page.screenshot({ path: 'screenshot.png' });
    });


    

    