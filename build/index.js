"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const routes_1 = __importDefault(require("./routes"));
const app = express_1.default();
const PORT = 3000;
app.use(express_1.json({ strict: false }));
app.use(express_1.urlencoded({ extended: false }));
app.use("/api", routes_1.default);
app.use((req, res, next) => {
    res.status(404).send({
        error: 404,
        msg: "Unable to find the requested resource or method not available",
    });
});
// Handle errors
app.use((err, req, res, next) => {
    console.error(`⚡️${err.stack}`);
    res.status(400).send({
        error: 400,
        msg: err.message,
    });
});
const server = app.listen(PORT, () => {
    return console.log(`✓ Server is listening on ${PORT}`);
});
server.on("error", (err) => {
    console.log(`⚡️Error happened: ${err.message}`);
});
exports.default = server;