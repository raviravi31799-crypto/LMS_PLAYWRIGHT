import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

export function readCSV(fileName: string) {
  const filePath = path.join(process.cwd(), "src", "testdata", fileName);

  const fileContent = fs.readFileSync(filePath, "utf8");

  return parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });
}