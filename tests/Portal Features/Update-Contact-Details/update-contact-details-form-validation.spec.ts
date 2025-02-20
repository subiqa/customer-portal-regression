import { test, expect } from '@playwright/test';
import { Helper } from '../../../helper/helpers';
import { SingleAccountNoPhoneNumber01 } from '../../../test-data/single-account.json';
import { Account } from '../../../pages/account-menus';
import { UpdateContactDetails } from '../../../pages/update-contact-details-page';

    // API key and Inbox ID value need to be updated befor run the test below until provided with paid email services
    test('When updating contact details and enter invalid contact details, then display relevant error message ', async ({ page }) => {
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
      // leave all fields empty and click on submit
      await updateContact.getSubmitButton.click();
      await expect(updateContact.getErrorMessage1).toBeVisible();
      await expect(updateContact.getErrorMessage2).toBeVisible();
      await expect(updateContact.getErrorMessage3).toBeVisible();
      await expect(updateContact.getErrorMessage4).toBeVisible();
      await expect(updateContact.getErrorMessage5).toBeHidden();
      await expect(updateContact.getErrorMessage6).toBeHidden();
      // incorrect mobile number
      await updateContact.enterEmail('msubiantara2@thebrandagency.co');
      await updateContact.enterMobileNumber('123456');
      await updateContact.enterResidentialAddress('This is new residential address');
      await updateContact.enterPostalAddress('This is new postal address');
      await updateContact.getSubmitButton.click();
      await expect(updateContact.getErrorMessage5).toBeVisible();
      await expect(updateContact.getErrorMessage1).toBeHidden();
      await expect(updateContact.getErrorMessage2).toBeHidden();
      await expect(updateContact.getErrorMessage3).toBeHidden();
      await expect(updateContact.getErrorMessage4).toBeHidden();
      await expect(updateContact.getErrorMessage6).toBeHidden();
      // incorrect email address
      await updateContact.enterEmail('msubiantara3');
      await updateContact.enterMobileNumber('0412345678');
      await updateContact.enterResidentialAddress('This is new residential address');
      await updateContact.enterPostalAddress('This is new postal address');
      await updateContact.getSubmitButton.click();
      await expect(updateContact.getErrorMessage6).toBeVisible();
      await expect(updateContact.getErrorMessage1).toBeHidden();
      await expect(updateContact.getErrorMessage2).toBeHidden();
      await expect(updateContact.getErrorMessage3).toBeHidden();
      await expect(updateContact.getErrorMessage4).toBeHidden();
      await expect(updateContact.getErrorMessage5).toBeHidden();
      // incorrect email address and mobile address
      await updateContact.enterEmail('msubiantara3');
      await updateContact.enterMobileNumber('345678');
      await updateContact.enterResidentialAddress('This is new residential address');
      await updateContact.enterPostalAddress('This is new postal address');
      await updateContact.getSubmitButton.click();
      await expect(updateContact.getErrorMessage6).toBeVisible();
      await expect(updateContact.getErrorMessage5).toBeVisible();
      await expect(updateContact.getErrorMessage1).toBeHidden();
      await expect(updateContact.getErrorMessage2).toBeHidden();
      await expect(updateContact.getErrorMessage3).toBeHidden();
      await expect(updateContact.getErrorMessage4).toBeHidden();
    });