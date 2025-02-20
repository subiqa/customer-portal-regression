import { expect, type Locator, type Page } from '@playwright/test';
import MailSlurp from 'mailslurp-client';
import { LoginPage } from '../pages/login-page';
import { VerifyYourAccountPage } from '../pages/verify-your-account-page';
import { Dashboard } from '../pages/dashboard-page';
import date from 'date-and-time';

export class Helper {
    readonly page: Page;
    
    constructor(page: Page){
        this.page = page;
    }

    async verifyLinkUrl(link: Locator, expectedUrl: string){
        const href = await link.getAttribute('href');
        if (href === null) {
            console.log('No href attribute found');
        } else {
            console.log('Link href:', href);
        }
        expect(href).toContain(expectedUrl);
    }

    async getVerificationCode(){
        //Connect to Mailslurp API
        const mailslurp = new MailSlurp({ apiKey: '232a70faa0825a300db8bc8bcf217aac57bb40fa1902c0ce613db74866fc7bcd'})
        const latestEmail = await mailslurp.waitController.waitForLatestEmail({
            inboxId: '0a192939-5eca-45af-a277-1687bc261550',
            unreadOnly: true,
        });
        expect(latestEmail.subject).toContain('PNC Customer DEV account email verification code');

        // extract the confirmation code (so we can confirm the user)
        const pattern = '([0-9]{6})';
        const matchResults = await mailslurp.emailController.getEmailContentMatch({
            contentMatchOptions: { pattern },
            emailId: latestEmail.id,
        });
        const verificationCode = matchResults.matches[0];
        return verificationCode;
    }

    async verifyLinkOpenInNewTab(link: Locator, expectedUrl: string){
        await link.click();
        const pagePromise = this.page.waitForEvent('popup');
        const newTab = await pagePromise;
        await newTab.waitForLoadState();
        await expect(newTab).toHaveURL(expectedUrl);
        //await newTab.close();
    }

    // API key, Inbox ID and Customer email address need to be updated
    async loginWithEmailAs2FA(customerNumber:string, password: string){
        const loginpage = new LoginPage(this.page);
        await expect(loginpage.getCustomerNumberTextbox).toBeVisible();
        await expect(loginpage.getPasswordTextbox).toBeVisible();
        await loginpage.enterCustomerCredentials(customerNumber, password);
        await loginpage.clickLoginButton();

        // Verify your account screen is displayed
        const verifyYourAccountPage = new VerifyYourAccountPage(this.page);
        await expect(verifyYourAccountPage.getEmailTextbox).toBeVisible();
        await expect(verifyYourAccountPage.getEmailSendCodeButton).toBeVisible();

        // Click on send code button
        await verifyYourAccountPage.clickEmailSendCodeButton();

        //Connect to Mailslurp API. Need to update the inboxID before run the test
        const mailslurp = new MailSlurp({ apiKey: '232a70faa0825a300db8bc8bcf217aac57bb40fa1902c0ce613db74866fc7bcd'})
        const latestEmail = await mailslurp.waitController.waitForLatestEmail({
            inboxId: '0a192939-5eca-45af-a277-1687bc261550',
            unreadOnly: true,
        });
        expect(latestEmail.subject).toContain('PNC Customer DEV account email verification code');

        // extract the confirmation code (so we can confirm the user)
        const pattern = '([0-9]{6})';
        const matchResults = await mailslurp.emailController.getEmailContentMatch({
            contentMatchOptions: { pattern },
            emailId: latestEmail.id,
        });
        const verificationCode = matchResults.matches[0];

        // enter verification code
        await expect(verifyYourAccountPage.getEmailVerificationCodeTextbox).toBeVisible(); 
        await verifyYourAccountPage.enterEmailVerificationCode(verificationCode);
        await verifyYourAccountPage.clickEmailVerifyCodeButton();

        // Verify the dashboard page
        await this.page.waitForURL('https:\/\/test\.customer\.pioneercredit\.com\.au\/account\?id_token=*', { timeout: 30000 })
        const dashboard = new Dashboard(this.page);
        await expect(dashboard.getMakeAPaymentCard).toBeVisible({timeout: 30000});
        //await expect(dashboard.getSetUpPaymentPlanCard).toBeVisible();
        await expect(dashboard.getOffersCard).toBeVisible();
        await expect(dashboard.getScheduleACallCard).toBeVisible();
        await expect(dashboard.getAccountSummary).toBeVisible();
        await expect(dashboard.getPaymentPlan).toBeVisible();
        await expect(dashboard.getWebChat).toBeVisible();
    }

    async getRandomBankAccount(){
        const randomBankAccount = Math.random().toString().substring(2,11);
        return randomBankAccount;
    }
}