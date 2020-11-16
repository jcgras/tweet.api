"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
function validateBodyParams(type) {
    return (req, res, next) => {
        class_validator_1.validate(class_transformer_1.plainToClass(type, req.body)).then((errors) => {
            if (errors.length > 0) {
                const message = errors
                    .map((err) => `Missing body param: ${err.property}`)
                    .join(", ");
                next(new Error(message));
            }
            else {
                next();
            }
        });
    };
}
exports.default = validateBodyParams;
