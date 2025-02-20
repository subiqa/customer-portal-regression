import { expect, type Locator, type Page } from '@playwright/test';

export class Account {
  readonly page: Page;
  readonly getAccountMenuButton: Locator;
  readonly getSingleAccountHeading: Locator;
  readonly getMultipleAccountHeading: Locator;
  readonly getUpdateContactDetailsMenuLink: Locator;
  readonly getLogoutMenuLink: Locator;


  constructor(page: Page) {
    this.page = page;
    this.getAccountMenuButton = page.getByRole('button', { name: 'Open Account Navigation' });
    this.getUpdateContactDetailsMenuLink = page.getByRole('link', { name: 'Update contact details' });
    this.getLogoutMenuLink = page.getByRole('button', { name: 'Logout' });
  }
}