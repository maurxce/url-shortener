import express from "express";
import URL from "../models/urlSchema.js";

const router = express.Router();

// example.com/aBcdEfgH
router.get("/:id", async (req, res) => {
  let url = "/";
  const result = await URL.findOne({ shortened: req.params.id });

  if (result != null) {
    url = result.original;

    result.clicked += 1;
    result.save();
  }

  res.redirect(url);
});

export default router;
