import { Request, Response } from "express";
import * as fs from "fs";
import * as path from "path";

/** Get user list */
export const getUsers = (req: Request, res: Response) => {
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "/../../data/MOCK_DATA.json"), "utf-8")
  );

  const users = data.map((u: any) => u.user_name).sort();
  return res.status(200).send(users);
};

/** Get an specific user data */
export const getUserData = (req: Request, res: Response) => {
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "/../../data/MOCK_DATA.json"), "utf-8")
  );

  const user = data.find((u: any) => u.user_name === req.params.id);
  return res.status(user ? 200 : 204).send(user);
};

/** Get the user tweets */
export const getUserTweets = (req: Request, res: Response) => {
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "/../../data/MOCK_DATA.json"), "utf-8")
  );

  const tweets = data
    .filter((u: any) => u.user_name === req.params.id)
    .map((t: any) => t.tweet);
  return res.status(tweets.length > 0 ? 200 : 204).send(tweets);
};

export const saveUser = (req: Request, res: Response) => {
  const newTweet = {
    user_name: req.body.user_name,
    tweet: req.body.tweet,
  };

  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "/../../data/MOCK_DATA.json"), "utf-8")
  );

  if (
    data.some(
      (t: any) =>
        t.user_name === newTweet.user_name && t.tweet === newTweet.tweet
    )
  ) {
    throw "Duplicate user tweet";
  } else {
    fs.writeFileSync(
      path.join(__dirname, "/../../data/MOCK_DATA.json"),
      JSON.stringify([...data, newTweet]),
      "utf-8"
    );
    return res.status(200).send({ published: true });
  }
};

/** Get tweet list */
export const getTweets = (req: Request, res: Response) => {
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "/../../data/MOCK_DATA.json"), "utf-8")
  );

  const tweets = data.map((u: any) => u.tweet).reverse();
  return res.status(200).send(tweets);
};

/** Get Tweet */
export const getTweet = (req: Request, res: Response) => {
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "/../../data/MOCK_DATA.json"), "utf-8")
  );

  const tweet = data.find((u: any) => u.tweet === req.params.id);
  return res.status(tweet ? 200 : 204).send(tweet);
};

/** Publish new tweet */
export const postTweet = (req: Request, res: Response) => {
  const newTweet = {
    user_name: req.body.user_name,
    tweet: req.body.tweet,
  };

  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "/../../data/MOCK_DATA.json"), "utf-8")
  );

  if (
    data.some(
      (t: any) =>
        t.user_name === newTweet.user_name && t.tweet === newTweet.tweet
    )
  ) {
    throw new Error("Duplicate user tweet");
  } else {
    fs.writeFileSync(
      path.join(__dirname, "/../../data/MOCK_DATA.json"),
      JSON.stringify([...data, newTweet]),
      "utf-8"
    );
    return res.status(200).send({ published: true });
  }
};

/** Search tweets by text */
export const search = (req: Request, res: Response) => {
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "/../../data/MOCK_DATA.json"), "utf-8")
  );

  const results = data
    .filter((u: any) => u.tweet.includes(req.query.text))
    .map((t: any) => t.tweet)
    .sort();
  return res.status(results.length > 0 ? 200 : 204).send(results);
};
