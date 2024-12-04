"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = __importStar(require("bcryptjs"));
const uuid_1 = require("uuid");
const dotenv_1 = require("dotenv");
const jwt = __importStar(require("jsonwebtoken"));
const crypto_1 = require("crypto");
const email_service_1 = require("../email/email.service");
const user_schema_1 = require("../mongo/schemas/user/user.schema");
const errors_1 = require("../common/errors");
const message_1 = require("../common/message");
(0, dotenv_1.config)();
const { VERIFY_EMAIL_LINK } = process.env;
let AuthService = class AuthService {
    constructor(userModel, emailService) {
        this.userModel = userModel;
        this.emailService = emailService;
        this.secretKey = process.env.SECRET_KEY;
    }
    async register(userDto) {
        const { email, password } = userDto;
        const normalizedEmail = email.toLowerCase();
        const existingUser = await this.userModel.findOne({
            email: normalizedEmail,
        });
        if (existingUser) {
            throw new common_1.ConflictException(errors_1.ErrorsApp.EXIST_USER);
        }
        const emailVerificationToken = (0, uuid_1.v4)();
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.userModel.create({
            ...userDto,
            email: normalizedEmail,
            password: hashedPassword,
            verificationToken: emailVerificationToken,
        });
        const verificationLink = `${VERIFY_EMAIL_LINK}${emailVerificationToken}`;
        await this.emailService.sendConfirmationEmail(normalizedEmail, verificationLink);
        return newUser;
    }
    async verifyEmail(verificationToken) {
        const user = await this.userModel.findOne({ verificationToken });
        if (!user) {
            throw new common_1.ConflictException(errors_1.ErrorsApp.EMPTY_USER);
        }
        await this.userModel.findByIdAndUpdate(user._id, {
            verify: true,
            verificationToken: null,
        });
        const payload = { id: user._id };
        const token = jwt.sign(payload, this.secretKey, { expiresIn: '24h' });
        const refreshToken = jwt.sign(payload, this.secretKey, {
            expiresIn: '7d',
        });
        await this.userModel.findByIdAndUpdate(user._id, {
            $set: { token, refreshToken },
        });
        return { token, refreshToken };
    }
    async validateOAuthLogin(googleId, email, displayName, photos) {
        let user = await this.userModel.findOne({ googleId });
        if (!user) {
            user = await this.userModel.create({
                googleId,
                email,
                name: displayName,
                avatar: photos,
                verify: true,
            });
        }
        const payload = { id: user._id };
        const token = jwt.sign(payload, this.secretKey, { expiresIn: '24h' });
        const refreshToken = jwt.sign(payload, this.secretKey, {
            expiresIn: '7d',
        });
        return { ...user.toObject(), token, refreshToken };
    }
    async loginWithGoogle(user) {
        if (!user) {
            throw new Error('Користувача не знайдено');
        }
        const payload = { id: user._id };
        const token = jwt.sign(payload, this.secretKey, { expiresIn: '24h' });
        const refreshToken = jwt.sign(payload, this.secretKey, {
            expiresIn: '7d',
        });
        await this.userModel.findByIdAndUpdate(user._id, {
            $set: { token, refreshToken },
        });
        return {
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
            token,
        };
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const normalizedEmail = email.toLowerCase();
        const user = await this.userModel.findOne({ email: normalizedEmail });
        if (!user) {
            throw new common_1.UnauthorizedException(errors_1.ErrorsApp.EMPTY_USER);
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new common_1.UnauthorizedException(errors_1.ErrorsApp.BAD_PASSWORD);
        }
        if (!user.verify) {
            throw new common_1.ConflictException(errors_1.ErrorsApp.NOT_VERIFICATION(normalizedEmail));
        }
        const payload = { id: user._id };
        const token = jwt.sign(payload, this.secretKey, { expiresIn: '24h' });
        const refreshToken = jwt.sign(payload, this.secretKey, {
            expiresIn: '7d',
        });
        await this.userModel.findByIdAndUpdate(user._id, {
            $set: { token, refreshToken },
        });
        return { token, refreshToken };
    }
    async refreshToken(req) {
        const user = req.user;
        if (!user || typeof user !== 'object' || !('_id' in user)) {
            throw new Error(errors_1.ErrorsApp.EMPTY_USER);
        }
        const typedUser = user;
        const payload = { id: typedUser._id };
        const token = jwt.sign(payload, this.secretKey, { expiresIn: '24h' });
        const refreshToken = jwt.sign(payload, this.secretKey, {
            expiresIn: '7d',
        });
        await this.userModel.findByIdAndUpdate(user._id, {
            $set: { token, refreshToken },
        });
        return { token, refreshToken };
    }
    async logout(req) {
        const user = req.user;
        if (!user || typeof user !== 'object' || !('_id' in user)) {
            throw new Error(errors_1.ErrorsApp.EMPTY_USER);
        }
        const typedUser = user;
        return this.userModel.findByIdAndUpdate(typedUser._id, { token: null });
    }
    async sendVerifyCode(dto) {
        const normalizedEmail = dto.email.toLowerCase();
        const user = await this.userModel.findOne({ email: normalizedEmail });
        if (!user) {
            throw new common_1.UnauthorizedException(errors_1.ErrorsApp.EMPTY_USER);
        }
        const verifyCode = this.generateRandomNumber();
        await this.emailService.sendPinEmail(dto.email, verifyCode);
        await this.userModel.findByIdAndUpdate(user._id, {
            verifyCode,
        });
        return { message: message_1.MessageApp.SEND_VERIFY_CODE };
    }
    async verifyCode(dto) {
        const normalizedEmail = dto.email.toLowerCase();
        const user = await this.userModel.findOne({ email: normalizedEmail });
        if (!user) {
            throw new common_1.UnauthorizedException(errors_1.ErrorsApp.EMPTY_USER);
        }
        if (Number(user.verifyCode) !== dto.code) {
            throw new common_1.UnauthorizedException(errors_1.ErrorsApp.BAD_CODE);
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        await this.userModel.findByIdAndUpdate(user._id, {
            password: hashedPassword,
            verifyCode: null,
        });
        return { message: message_1.MessageApp.UPDATE_PASSWORD };
    }
    generateRandomNumber() {
        const buffer = (0, crypto_1.randomBytes)(5);
        const randomNumber = buffer.readUInt32BE(0) * 256 + buffer[4];
        return (Math.floor((randomNumber / 0xffffffffff) * (9999999999 - 1000000000 + 1)) + 1000000000);
    }
};
exports.AuthService = AuthService;
__decorate([
    __param(0, (0, common_1.Param)('verificationToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "verifyEmail", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "logout", null);
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map