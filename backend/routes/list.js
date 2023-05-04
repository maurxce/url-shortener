import express from "express";
import URL from "../models/urlSchema.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const result = await URL.find({}).lean().exec();
  const urls = result.map(({ _id, __v, ...rest }) => rest);

  return res.json(urls);
});

export default router;
