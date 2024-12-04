"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageApp = void 0;
exports.MessageApp = {
    DELETE_POSITION: 'Позицію кошторису успішно видалено!',
    DELETE_ADVANCE: 'Позицію авансу успішно видалено!',
    DELETE_MATERIAL: 'Чек успішно видалено!',
    DELETE_PRICE: 'Позицію прайсу успішно видалено!',
    UPDATE_AVATAR: 'Вашу фотографію успіщно оновлено!',
    SEND_VERIFY_CODE: 'Код для оновлення паролю успішно відправлено на вашу електронну скриньку! Будь ласка перейдіть на неї для подальшого оновлення паролю!',
    UPDATE_PASSWORD: 'Ваш пароль успішно оновлено!',
    ADD_ALLOW(email) {
        return `Юзеру з email ${email} доступ успішно надано!`;
    },
    UPDATE_ALLOW(email) {
        return `Юзеру з email ${email} дані доступ успішно оновлено!`;
    },
    DELETE_ALLOW(email) {
        return `Юзеру з email ${email} доступ успішно забрано!`;
    },
    DELETE_ESTIMATE() {
        return `Таблицю  успішно видалено!`;
    },
    CREATE_POSITION(title) {
        return `Позицію кошторису ${title} успішно додано!`;
    },
    UPDATE_POSITION(title) {
        return `Позицію кошторису ${title} успішно оновлено!`;
    },
    ADD_ADVANCE(comment) {
        return `Позицію авансу ${comment} успішно додано!`;
    },
    UPDATE_ADVANCE(comment) {
        return `Позицію авансу ${comment} успішно оновлено!`;
    },
    CREATE_MATERIALS(title) {
        return `Чек на матеріали ${title} успішно додано!`;
    },
    UPDATE_MATERIAL(title) {
        return `Чек на матеріали ${title} успішно оновлено!`;
    },
    ADD_DISCOUNT(discount) {
        return `Знижку в розмірі ${discount}% встановлено!`;
    },
    ADD_LOW_PROJECT(discount) {
        return `Кошторис на ${discount}% створено!`;
    },
    UPDATE_PROJECT_PRICE(title) {
        return `Позицію прайсу ${title} успішно оновлено!`;
    },
};
//# sourceMappingURL=message.js.map