import { expect, type Locator, type Page } from '@playwright/test';
import MailSlurp from 'mailslurp-client';

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
        const mailslurp = new MailSlurp({ apiKey: '47295b12e8eb2a3fb28df0315be755040c9e6236a5507a629e2d417858fe4805'})
        const latestEmail = await mailslurp.waitController.waitForLatestEmail({
            inboxId: 'a3b339d0-ee0b-4277-9cdf-bca243177bb9',
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
    

}