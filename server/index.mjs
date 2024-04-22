import express from "express";
import { getFileNames, getFiles, parseFiles } from "./utils.mjs";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());

app.get("/files/data", async (_, res, next) => {
  try {
    const { files: fileNames } = await getFileNames();
    const files = await getFiles(fileNames);
    const out = parseFiles(files);

    res.status(200).json(out);
  } catch (err) {
    next(err);
  }
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
