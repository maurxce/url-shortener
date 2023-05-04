import express from "express";
import { nanoid } from "nanoid";
import URL from "../models/urlSchema.js";

const router = express.Router();

// example.com/create?url=api.example.com
router.post("/", async (req, res) => {
  let result = await URL.findOne({ original: req.query.url });
  if (result != null) return res.json(result.shortened);

  let shortened;
  do {
    shortened = nanoid(8);
    result = await URL.findOne({ shortened });
  } while (result != null);

  const entry = new URL({
    shortened,
    original: req.query.url,
  });

  await entry.save();
  return res.json({ shortened });
});

export default router;
