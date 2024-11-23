"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
const bcrypt = require("bcrypt");
const saltRounds = 10;
async function hashPassword(req, res, next) {
    req.body.password = await bcrypt.hash(req.body.password, saltRounds).then((hash) => hash);
    next();
}
;
//# sourceMappingURL=users.middleware.js.map