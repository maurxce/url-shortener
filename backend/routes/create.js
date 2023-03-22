import express from "express";
import { nanoid } from "nanoid";
import URL from "../models/urlSchema.js";

const router = express.Router();

// example.com/create?url=api.example.com
router.post("/", async (req, res) => {
  let url;
  const result = await URL.findOne({ original: req.query.url });
  if (result != null) url = result.shortened;

  if (result == null) {
    const shortened = nanoid(8);
    url = shortened;

    const entry = new URL({
      shortened,
      original: req.query.url,
    });

    await entry.save();
  }

  res.json({ url });
});

export default router;
