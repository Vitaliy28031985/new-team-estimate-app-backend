"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
let EmailService = class EmailService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendConfirmationEmail(email, verificationLink) {
        try {
            await this.mailerService.sendMail({
                to: email,
                subject: 'Підтвердження електронної скриньки!',
                html: `<div><p>Будь ласка, натисніть на посилання нижче для підтвердження вашої електронної пошти:</p><a href="${verificationLink}">Підтвердити електронну пошту</a></div>`,
            });
            console.log('Email sent successfully');
        }
        catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Email sending failed');
        }
    }
    async sendPinEmail(email, number) {
        try {
            await this.mailerService.sendMail({
                to: email,
                subject: 'Код підтвердження!',
                html: `<div><p>Будь ласка, введіть цей код:${number} у діалоговому вікні застосунку!</p></div>`,
            });
            console.log('Email sent successfully');
        }
        catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Email sending failed');
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], EmailService);
//# sourceMappingURL=email.service.js.map