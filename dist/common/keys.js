"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keysSchemasString = void 0;
exports.keysSchemasString = {
    EMAIL: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    PHONE: /^\+380\d{9}$/,
    PASSWORD: /^(?=.*[a-zA-Z])(?=.*[*!#&])[A-Za-z0-9*!#&]{6,}$/,
};
//# sourceMappingURL=keys.js.map