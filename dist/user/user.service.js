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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = __importStar(require("bcryptjs"));
const uuid_1 = require("uuid");
const dotenv_1 = require("dotenv");
const errors_1 = require("../common/errors");
const email_service_1 = require("../email/email.service");
const user_schema_1 = require("../mongo/schemas/user/user.schema");
const user_update_email_dto_1 = require("./dtos/user.update.email.dto");
const user_update_phone_dto_1 = require("./dtos/user.update.phone.dto");
const user_update_password_dto_1 = require("./dtos/user.update.password.dto");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const stream_1 = require("stream");
const message_1 = require("../common/message");
const user_update_role_dto_1 = require("./dtos/user.update.role.dto");
const user_update_name_dto_1 = require("./dtos/user.update.name.dto");
(0, dotenv_1.config)();
const { VERIFY_EMAIL_LINK } = process.env;
let UserService = class UserService {
    constructor(userModel, emailService) {
        this.userModel = userModel;
        this.emailService = emailService;
    }
    async getAllUsers() {
        const allUsers = await this.userModel.find();
        return allUsers;
    }
    async getCurrentUser(req) {
        const user = req.user;
        if (!user || typeof user !== 'object' || !('_id' in user)) {
            throw new Error(errors_1.ErrorsApp.NOT_AUTHORIZED);
        }
        const typedUser = user;
        return await typedUser;
    }
    async changeName(dto, req) {
        const user = req.user;
        if (!user || typeof user !== 'object' || !('_id' in user)) {
            throw new Error(errors_1.ErrorsApp.NOT_AUTHORIZED);
        }
        const typedUser = user;
        return await this.userModel.findByIdAndUpdate({ _id: typedUser._id }, dto, {
            new: true,
            fields: ['-createdAt', '-updatedAt'],
        });
    }
    async changeEmail(dto, req) {
        const { email } = dto;
        const user = req.user;
        if (!user || typeof user !== 'object' || !('_id' in user)) {
            throw new Error(errors_1.ErrorsApp.NOT_AUTHORIZED);
        }
        const typedUser = user;
        const normalizedEmail = email.toLowerCase();
        const existingUser = await this.userModel.findOne({
            email: normalizedEmail,
        });
        if (existingUser) {
            throw new common_1.ConflictException(errors_1.ErrorsApp.EXIST_USER);
        }
        const emailVerificationToken = (0, uuid_1.v4)();
        const newEmail = await this.userModel.findByIdAndUpdate(typedUser._id, {
            $set: {
                email: normalizedEmail,
                verificationToken: emailVerificationToken,
                verify: false,
            },
        }, { new: true });
        const verificationLink = `${VERIFY_EMAIL_LINK}${emailVerificationToken}`;
        await this.emailService.sendConfirmationEmail(normalizedEmail, verificationLink);
        return await newEmail;
    }
    async verifyEmail(verificationToken) {
        const user = await this.userModel.findOne({ verificationToken });
        if (!user) {
            throw new common_1.ConflictException(errors_1.ErrorsApp.EMPTY_USER);
        }
        return this.userModel.findByIdAndUpdate(user._id, {
            verify: true,
            verificationToken: null,
        });
    }
    async changePhone(dto, req) {
        const user = req.user;
        if (!user || typeof user !== 'object' || !('_id' in user)) {
            throw new Error(errors_1.ErrorsApp.NOT_AUTHORIZED);
        }
        const typedUser = user;
        return await this.userModel.findByIdAndUpdate({ _id: typedUser._id }, dto, {
            new: true,
            fields: ['-createdAt', '-updatedAt'],
        });
    }
    async changeRole(dto, req) {
        const user = req.user;
        if (!user || typeof user !== 'object' || !('_id' in user)) {
            throw new Error(errors_1.ErrorsApp.NOT_AUTHORIZED);
        }
        const typedUser = user;
        return await this.userModel.findByIdAndUpdate({ _id: typedUser._id }, dto, {
            new: true,
            fields: ['-createdAt', '-updatedAt'],
        });
    }
    async changePassword(dto, req) {
        const { oldPassword, newPassword } = dto;
        const user = req.user;
        if (!user || typeof user !== 'object' || !('_id' in user)) {
            throw new Error(errors_1.ErrorsApp.NOT_AUTHORIZED);
        }
        const typedUser = user;
        const passwordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!passwordMatch) {
            throw new common_1.UnauthorizedException(errors_1.ErrorsApp.BAD_PASSWORD);
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        return await this.userModel.findByIdAndUpdate(typedUser._id, {
            $set: {
                password: hashedPassword,
            },
        }, { new: true });
    }
    async changeAvatar(file, req) {
        if (!file || !file.buffer) {
            throw new Error(errors_1.ErrorsApp.NOT_UPDATE_AVATAR);
        }
        const bufferStream = new stream_1.Readable();
        bufferStream.push(file.buffer);
        bufferStream.push(null);
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary_1.default.uploader.upload_stream({ folder: 'avatars' }, (error, data) => {
                if (error) {
                    reject(new Error(errors_1.ErrorsApp.NOT_UPDATE_AVATAR + error.message));
                }
                resolve(data);
            });
            bufferStream.pipe(uploadStream);
        });
        const avatarUrl = result.secure_url;
        const user = req.user;
        if (!user || typeof user !== 'object' || !('_id' in user)) {
            throw new Error(errors_1.ErrorsApp.NOT_AUTHORIZED);
        }
        const typedUser = user;
        await this.userModel.findByIdAndUpdate({ _id: typedUser._id }, { avatar: avatarUrl }, {
            new: true,
            fields: ['-createdAt', '-updatedAt'],
        });
        return { message: message_1.MessageApp.UPDATE_AVATAR };
    }
};
exports.UserService = UserService;
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "getCurrentUser", null);
__decorate([
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_update_name_dto_1.UserUpdateName, Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "changeName", null);
__decorate([
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_update_email_dto_1.UserUpdateEmailDto, Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "changeEmail", null);
__decorate([
    __param(0, (0, common_1.Param)('verificationToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "verifyEmail", null);
__decorate([
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_update_phone_dto_1.UserUpdatePhone, Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "changePhone", null);
__decorate([
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_update_role_dto_1.UserUpdateRoleDto, Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "changeRole", null);
__decorate([
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_update_password_dto_1.UserUpdatePassword, Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "changePassword", null);
__decorate([
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "changeAvatar", null);
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        email_service_1.EmailService])
], UserService);
//# sourceMappingURL=user.service.js.map