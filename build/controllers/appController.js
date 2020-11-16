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
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = exports.postTweet = exports.getTweet = exports.getTweets = exports.saveUser = exports.getUserTweets = exports.getUserData = exports.getUsers = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
/** Get user list */
exports.getUsers = (req, res) => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, "/../../data/MOCK_DATA.json"), "utf-8"));
    const users = data.map((u) => u.user_name).sort();
    return res.status(200).send(users);
};
/** Get an specific user data */
exports.getUserData = (req, res) => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, "/../../data/MOCK_DATA.json"), "utf-8"));
    const user = data.find((u) => u.user_name === req.params.id);
    return res.status(user ? 200 : 204).send(user);
};
/** Get the user tweets */
exports.getUserTweets = (req, res) => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, "/../../data/MOCK_DATA.json"), "utf-8"));
    const tweets = data
        .filter((u) => u.user_name === req.params.id)
        .map((t) => t.tweet);
    return res.status(tweets.length > 0 ? 200 : 204).send(tweets);
};
exports.saveUser = (req, res) => {
    const newTweet = {
        user_name: req.body.user_name,
        tweet: req.body.tweet,
    };
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, "/../../data/MOCK_DATA.json"), "utf-8"));
    if (data.some((t) => t.user_name === newTweet.user_name && t.tweet === newTweet.tweet)) {
        throw "Duplicate user tweet";
    }
    else {
        fs.writeFileSync(path.join(__dirname, "/../../data/MOCK_DATA.json"), JSON.stringify([...data, newTweet]), "utf-8");
        return res.status(200).send({ published: true });
    }
};
/** Get tweet list */
exports.getTweets = (req, res) => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, "/../../data/MOCK_DATA.json"), "utf-8"));
    const tweets = data.map((u) => u.tweet).reverse();
    return res.status(200).send(tweets);
};
/** Get Tweet */
exports.getTweet = (req, res) => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, "/../../data/MOCK_DATA.json"), "utf-8"));
    const tweet = data.find((u) => u.tweet === req.params.id);
    return res.status(tweet ? 200 : 204).send(tweet);
};
/** Publish new tweet */
exports.postTweet = (req, res) => {
    const newTweet = {
        user_name: req.body.user_name,
        tweet: req.body.tweet,
    };
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, "/../../data/MOCK_DATA.json"), "utf-8"));
    if (data.some((t) => t.user_name === newTweet.user_name && t.tweet === newTweet.tweet)) {
        throw new Error("Duplicate user tweet");
    }
    else {
        fs.writeFileSync(path.join(__dirname, "/../../data/MOCK_DATA.json"), JSON.stringify([...data, newTweet]), "utf-8");
        return res.status(200).send({ published: true });
    }
};
/** Search tweets by text */
exports.search = (req, res) => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, "/../../data/MOCK_DATA.json"), "utf-8"));
    const results = data
        .filter((u) => u.tweet.includes(req.query.text))
        .map((t) => t.tweet)
        .sort();
    return res.status(results.length > 0 ? 200 : 204).send(results);
};
