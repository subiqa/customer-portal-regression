import { test as baseTest, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import MailSlurp from 'mailslurp-client';
import { VerifyYourAccountPage } from '../pages/verify-your-account-page';
import { Customer01SingleAccount } from '../test-data/staging-single-account.json';
import { Dashboard } from '../pages/dashboard-page';

export const test = baseTest.extend({
    webApp: async ({ page }, use) => {
        await page.goto('https://test.customer.pioneercredit.com.au/account');
        const loginpage = new LoginPage(page);
        await expect(loginpage.getCustomerNumberTextbox).toBeVisible();
        await expect(loginpage.getPasswordTextbox).toBeVisible();
        await loginpage.enterCustomerCredentials(Customer01SingleAccount.customerNumber, Customer01SingleAccount.password);
        await loginpage.clickLoginButton();

        // Verify your account screen is displayed
        const verifyYourAccountPage = new VerifyYourAccountPage(page);
        await expect(verifyYourAccountPage.getEmailTextbox).toBeVisible();
        await expect(verifyYourAccountPage.getEmailSendCodeButton).toBeVisible();

        // Click on send code button
        await verifyYourAccountPage.clickEmailSendCodeButton();

        //Connect to Mailslurp API. Need to update the inboxID before run the test
        const mailslurp = new MailSlurp({ apiKey: '810053d51e36f6395aeafe8ddd80ca13d32afbccb838bfe607654df84b3755e8'})
        const latestEmail = await mailslurp.waitController.waitForLatestEmail({
            inboxId: 'c035907b-80ff-42ab-ac48-2b8e91ef949c',
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
        await page.waitForURL('https:\/\/test\.customer\.pioneercredit\.com\.au\/account\?id_token=*', { timeout: 10000 })
        const dashboard = new Dashboard (page);
        await expect(dashboard.getMakeAPaymentCard).toBeVisible();
        //await expect(dashboard.getSetUpPaymentPlanCard).toBeVisible();
        await expect(dashboard.getOffersCard).toBeVisible();
        await expect(dashboard.getScheduleACallCard).toBeVisible();
        await expect(dashboard.getAccountSummary).toBeVisible();
        await use(page);
    }
});

export { expect };
