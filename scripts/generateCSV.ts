import csv from "csv-parser";
import fs from "fs";
import path from "path";
import archiver from "archiver";

import * as QRCode from "qrcode";

const readCSVAndGenerateQR = async (filePath: string) => {
  const names: string[] = [];
  let index = 0;

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", async (row) => {
      const name = row["NOMBRE Y APELLIDO (Calfrac)"];
      names.push(name.trim().replace(",", ""));
    })
    .on("end", async () => {
      for (let name of names) {
        const qrString = name; // JSON.stringify(name);

        try {
          const fileName = `qr-${(index + 1)
            .toString()
            .padStart(3, "0")}-${name.toLowerCase()}.png`;
          await QRCode.toFile(`./scripts/qrs/${fileName}`, qrString, {
            width: 500,
          });
          console.log(`QR Code saved as ${fileName}`);
          index++;
        } catch (err) {
          console.error("Failed to create QR Code", err);
        }
      }

      console.log("CSV file successfully processed");
    });
};

const deleteFilesWithExtension = (dirPath: string, extension: string): void => {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    files.forEach((file) => {
      if (path.extname(file) === extension) {
        fs.unlink(path.join(dirPath, file), (err) => {
          if (err) {
            console.error("Error deleting file:", err);
          } else {
            console.log(`Deleted file: ${file}`);
          }
        });
      }
    });
  });
};

/**
 * Function to zip all contents of a directory
 * @param sourceDir - Source directory to zip
 * @param outPath - Output path of the zip file
 */
export function zipDirectory(
  sourceDir: string,
  outPath: string,
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    // create a file to stream archive data to.
    const output = fs.createWriteStream(outPath);
    const archive = archiver("zip", {
      zlib: { level: 9 }, // Sets the compression level.
    });

    output.on("close", () => {
      console.log(archive.pointer() + " total bytes");
      console.log(
        "Archiver has been finalized and the output file descriptor has closed.",
      );
      resolve();
    });

    // good practice to catch warnings (ie stat failures and other non-blocking errors)
    archive.on("warning", (err) => {
      if (err.code === "ENOENT") {
        console.warn(err);
      } else {
        // throw error
        reject(err);
      }
    });

    // good practice to catch this error explicitly
    archive.on("error", (err) => {
      reject(err);
    });

    // pipe archive data to the output file
    archive.pipe(output);

    // append files
    archive.directory(sourceDir, false);

    archive.finalize();
  });
}

function main() {
  deleteFilesWithExtension("./scripts/qrs", ".png");
  readCSVAndGenerateQR("./scripts/invitados-final.csv");
  zipDirectory(
    "./scripts/qrs",
    "./scripts/qrs-" + new Date().toISOString().split("T")[0] + ".zip",
  );
}

main();
