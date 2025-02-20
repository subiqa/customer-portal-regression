import { expect, type Locator, type Page } from '@playwright/test';

export class Dashboard {
  readonly page: Page;
  readonly getPioneerCreditLogo: Locator;
  readonly getWebChat: Locator;
  readonly getDashboardMenu: Locator;
  readonly getPaymentsMenu: Locator;
  readonly getOffersMenu: Locator;
  readonly getDocumentsMenu: Locator;
  readonly getWelcomeMessage: Locator;
  readonly getMakeAPaymentCard: Locator;
  readonly getSetUpPaymentPlanCard: Locator;
  readonly getEditPaymentPlanCard: Locator;
  readonly getOffersCard: Locator;
  readonly getScheduleACallCard: Locator;
  readonly getAccountSummary: Locator;
  readonly getPortalProgress: Locator;
  readonly getPaymentPlan: Locator;
  readonly getPaymentPlanButton: Locator;
  readonly getScheduleACallDate: Locator;
  readonly getScheduleACallTime: Locator;
  readonly getScheduleACallState: Locator;
  readonly getScheduleACallContactNumberDefault: Locator;
  readonly getScheduleACallContactNumberInput: Locator;
  readonly getScheduleACallConfirmCallButton: Locator;
  readonly getScheduleACallSubmitSuccessMessage: Locator;
  readonly getScheduleACallErrorMessage1: Locator;
  readonly getScheduleACallErrorMessage2: Locator;
  readonly getScheduleACallErrorMessage3: Locator;
  readonly getScheduleACallErrorMessage4: Locator;
  readonly getScheduleACallErrorMessage5: Locator;
  readonly getpaymentPlanAmount: Locator;
  readonly getpaymentPlanFrequency: Locator;
  readonly getpaymentPlanNextPaymentDate: Locator;
  readonly getpaymentPlanReminderCheckbox: Locator;
  readonly getpaymentPlanViewUpcomingButton: Locator;
  readonly getpaymentPlanFirstDueDate: Locator;
  readonly getpaymentPlanSecondDueDate: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getPioneerCreditLogo = page.getByRole('banner').getByRole('link', { name: 'Pioneer Credit Portal Logo' });
    this.getWebChat = page.getByLabel('Launch chat');
    this.getDashboardMenu = page.getByRole('link', { name: 'Dashboard' });
    this.getPaymentsMenu = page.getByRole('banner').getByRole('list').getByText('Payments', { exact: true });
    this.getOffersMenu = page.getByRole('link', { name: 'Offers', exact: true });
    this.getDocumentsMenu = page.getByPlaceholder('Email', { exact: true });
    this.getWelcomeMessage = page.getByRole('heading', { name: 'Hello,' });
    this.getMakeAPaymentCard = page.getByRole('link', { name: 'Make a payment Reduce your' })
    this.getSetUpPaymentPlanCard = page.getByRole('link', { name: 'Set up a payment plan Make' });
    this.getOffersCard = page.getByRole('link', { name: 'View discount offers Save' });
    this.getScheduleACallCard = page.getByRole('heading', { name: 'Schedule a call' });
    this.getEditPaymentPlanCard = page.getByRole('heading', { name: 'Edit payment plan' });
    this.getAccountSummary = page.getByText('Account SummaryAccount');
    this.getPortalProgress = page.getByRole('heading', { name: 'Portal Progress' });
    this.getPaymentPlan = page.getByRole('heading', { name: 'Payment Plan', exact: true });
    this.getPaymentPlanButton = page.getByRole('link', { name: 'Set up Payment Plan' });
    this.getScheduleACallDate = page.locator('#schedules-a-call-date');
    this.getScheduleACallTime = page.locator('#schedules-a-call-time');
    this.getScheduleACallState = page.locator('#schedules-a-call-state');
    this.getScheduleACallContactNumberDefault = page.locator('#schedules-a-call-contact-number-default');
    this.getScheduleACallContactNumberInput = page.getByPlaceholder('Enter an alternate number');
    this.getScheduleACallConfirmCallButton = page.getByRole('button', { name: 'Confirm Call' });
    this.getScheduleACallSubmitSuccessMessage = page.locator('//*[@id="pioneer-credit-application"]/main/div/div[2]/div[4]/div/details/p');
    this.getScheduleACallErrorMessage1 = page.getByText('This contact number field is required.');
    this.getScheduleACallErrorMessage2 = page.getByText('Please enter a valid mobile number (e.g. 04XXXXXXXX)');
    this.getScheduleACallErrorMessage3 = page.getByText('The state field is required');
    this.getScheduleACallErrorMessage4 = page.getByText('The time field is required');
    this.getScheduleACallErrorMessage5 = page.getByText('The date field is required');
    this.getpaymentPlanAmount = page.locator('//*[@id="pioneer-credit-application"]/main/div/div[3]/div[3]/div[2]/table[1]/tbody/tr[1]/td[2]');
    this.getpaymentPlanFrequency = page.locator('//*[@id="pioneer-credit-application"]/main/div/div[3]/div[3]/div[2]/table[1]/tbody/tr[2]/td[2]');
    this.getpaymentPlanNextPaymentDate = page.locator('//*[@id="pioneer-credit-application"]/main/div/div[3]/div[3]/div[2]/table[1]/tbody/tr[3]/td[2]');
    this.getpaymentPlanReminderCheckbox = page.locator('#subscribe-to-sms');
    this.getpaymentPlanViewUpcomingButton = page.locator('#view-upcoming-payments');
    this.getpaymentPlanFirstDueDate = page.locator('//*[@id="pioneer-credit-application"]/main/div/div[3]/div[3]/div[2]/table[2]/tbody/tr[1]/td[1]')
    this.getpaymentPlanSecondDueDate = page.locator('//*[@id="pioneer-credit-application"]/main/div/div[3]/div[3]/div[2]/table[2]/tbody/tr[2]/td[1]');
  }

  async selectTomorrow(){
    await expect(this.getScheduleACallDate).toBeVisible();
    await this.getScheduleACallDate.selectOption({ index: 1})
  }

  async selectScheduleACallTime(time: string){
    await this.getScheduleACallTime.selectOption(time);
    await expect(this.getScheduleACallTime).toHaveValue(time);
  }

  async selectScheduleACallState(state: string){
    await this.getScheduleACallState.selectOption(state);
    await expect(this.getScheduleACallState).toHaveValue(state);
  }

  async enterContactNumber(contactNumber: string){
    await this.getScheduleACallContactNumberInput.clear();
    await this.getScheduleACallContactNumberInput.fill(contactNumber);
    await expect(this.getScheduleACallContactNumberInput).toHaveValue(contactNumber);
  }
  
}