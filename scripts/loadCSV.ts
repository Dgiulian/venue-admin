import csv from "csv-parser";
import fs from "fs";
import path from "path";
import archiver from "archiver";

export function loadCsv(filePath: string): Promise<string[]> {
  const names: string[] = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", async (row) => {
        const name = row["Nombre y Apellido"];
        names.push(name.trim().replace(",", ""));
      })
      .on("end", async () => {
        resolve(names);
      });
  });
}

loadCsv(path.join("scripts", "Listado para sorteo.csv"));
