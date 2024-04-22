import fetch from "node-fetch";
import { KEY, baseUrl, hexLength, minColsLength } from "./constants.mjs";

const isEmptyCol = (cols) => {
  return cols.some((e) => e.length === 0);
};

const isNumber = (col) => {
  return isNaN(Number(col));
};

export const isValidColumn = (cols) => {
  if (cols.length !== minColsLength) {
    return false;
  }

  if (typeof cols[1] !== "string") {
    return false;
  }

  if (isEmptyCol(cols)) {
    return false;
  }

  if (isNumber(cols[2])) {
    return false;
  }

  if (cols[3].length !== hexLength) {
    return false;
  }

  return true;
};

export const getFileNames = async () => {
  return fetch(`${baseUrl}/files`, {
    headers: {
      authorization: `Bearer ${KEY}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      throw new Error(error);
    });
};

export const getFile = async (fileName) => {
  return fetch(`${baseUrl}/file/${fileName}`, {
    headers: {
      authorization: `Bearer ${KEY}`,
    },
  })
    .then(async (res) => {
      const text = await res.text();
      return { fileName, data: text };
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export const parseFiles = (files) => {
  const out = [];
  for (const f of files) {
    const jsonFile = {
      file: f.fileName,
      lines: [],
    };

    if (f.data.length === 0) {
      out.puth(jsonFile);
      continue;
    }

    // skip headers
    const lines = f.data.split("\n").slice(1);
    for (const l of lines) {
      const cols = l.split(",");
      if (!isValidColumn(cols)) {
        continue;
      }

      jsonFile.lines.push({
        text: cols[1],
        number: Number(cols[2]),
        hex: cols[3],
      });
    }
    out.push(jsonFile);
  }
  return out;
};

export const getFiles = async (fileNames) => {
  const filesPromises = [];
  for (const f of fileNames) {
    filesPromises.push(getFile(f));
  }

  const files = [];
  const results = await Promise.allSettled(filesPromises);
  for (const r of results) {
    if (r.status === "rejected") {
      continue;
    }
    files.push(r.value);
  }
  return files;
};
