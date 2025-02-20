import { test, expect } from '@playwright/test';
import { Helper } from '../../../helper/helpers';
import { SingleAccountNoPhoneNumber01 } from '../../../test-data/single-account.json';
import { Account } from '../../../pages/account-menus';
import { UpdateContactDetails } from '../../../pages/update-contact-details-page';

    // API key and Inbox ID value need to be updated befor run the test below until provided with paid email services
    test('When customer update contact details and enter valid input, then submit success ', async ({ page }) => {
      await page.goto(process.env.UAT as string);
      const helper = new Helper(page);
      await helper.loginWithEmailAs2FA(SingleAccountNoPhoneNumber01.customerNumber, SingleAccountNoPhoneNumber01.password);
      const accountMenu = new Account(page);
      await expect(accountMenu.getAccountMenuButton).toBeVisible();
      await accountMenu.getAccountMenuButton.click();
      await expect(accountMenu.getUpdateContactDetailsMenuLink).toBeVisible();
      await accountMenu.getUpdateContactDetailsMenuLink.click();
      const updateContact = new UpdateContactDetails(page);
      await expect(updateContact.getPageHeading).toBeVisible();
      await expect(updateContact.getSubmitButton).toBeVisible();
      await accountMenu.getAccountMenuButton.click(); // this step should be removed once the Account menu UI has been fixed
      await updateContact.enterEmail('msubiantara2@thebrandagency.co');
      await updateContact.enterMobileNumber('0412345678');
      await updateContact.enterResidentialAddress('This is new residential address');
      await updateContact.enterPostalAddress('This is new postal address');
      // wait for the schedule a call PUT return 200
      const responsePromise = page.waitForResponse(response =>
        response.url() === 'https://test.customer.pioneercredit.com.au/api/debt-manager/consumers/'+SingleAccountNoPhoneNumber01.customerNumber+'/userdefinedpages/PORTALC/data/13' && response.status() === 200
            && response.request().method() === 'PUT'
      );
      await updateContact.getSubmitButton.click();
      const response = await responsePromise;
      // assert success screen here once the issue has been fixed
    });