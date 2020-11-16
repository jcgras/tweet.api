import express from "express";
import * as appController from "./controllers/appController";
import validateBodyParams from "./middlewares/validateBodyParams.middleware";
import TweetDto from "./dtos/tweet.dto";
import UserDto from "./dtos/user.dto";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send({ status: "offline" });
});
router.get("/user", appController.getUsers);
router.get("/user/:id", appController.getUserData);
router.get("/user/:id/tweet", appController.getUserTweets);
router.post("/user", validateBodyParams(UserDto), appController.saveUser);
router.get("/tweet", appController.getTweets);
router.get("/tweet/:id", appController.getTweet);
router.post("/tweet", validateBodyParams(TweetDto), appController.postTweet);
router.get("/search", appController.search);

export = router;
