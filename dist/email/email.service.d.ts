import { MailerService } from '@nestjs-modules/mailer';
export declare class EmailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendConfirmationEmail(email: string, verificationLink: string): Promise<void>;
    sendPinEmail(email: string, number: number): Promise<void>;
}
