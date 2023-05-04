import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { corsOptions, mongooseOptions } from "./options.js";

import redirectRouter from "./routes/redirect.js";
import createRouter from "./routes/create.js";
import listRouter from "./routes/list.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use("/r", redirectRouter);
app.use("/create", createRouter);
app.use("/list", listRouter);

mongoose
  .connect(process.env.DB_CONN, mongooseOptions)
  .then(() => app.listen(PORT, () => console.log(`http://127.0.0.1:${PORT}/`)))
  .catch((err) => console.log(err));
