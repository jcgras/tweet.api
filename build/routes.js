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
const express_1 = __importDefault(require("express"));
const appController = __importStar(require("./controllers/appController"));
const validateBodyParams_middleware_1 = __importDefault(require("./middlewares/validateBodyParams.middleware"));
const tweet_dto_1 = __importDefault(require("./dtos/tweet.dto"));
const user_dto_1 = __importDefault(require("./dtos/user.dto"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.status(200).send({ status: "online" });
});
router.get("/user", appController.getUsers);
router.get("/user/:id", appController.getUserData);
router.get("/user/:id/tweet", appController.getUserTweets);
router.post("/user", validateBodyParams_middleware_1.default(user_dto_1.default), appController.saveUser);
router.get("/tweet", appController.getTweets);
router.get("/tweet/:id", appController.getTweet);
router.post("/tweet", validateBodyParams_middleware_1.default(tweet_dto_1.default), appController.postTweet);
router.get("/search", appController.search);
module.exports = router;
