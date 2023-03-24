import express from "express";
import { nanoid } from "nanoid";
import URL from "../models/urlSchema.js";

const router = express.Router();

// example.com/create?url=api.example.com
router.post("/", async (req, res) => {
  const originalURL = await URL.findOne({ original: req.query.url });
  if (originalURL != null) res.json({ url: result.shortened });
  
  let shortened = nanoid(8);
  const shortenedURL = await URL.findOne({ shortened });

  do {
    shortened = nanoid(8);
  } while (shortenedURL != null);
  
  const entry = new URL({
    shortened,
    original: req.query.url,
  });

  await entry.save();

  res.json({ url: shortened });
});

export default router;
