import csv from "csv-parser";
import * as fs from "fs";
import * as QRCode from "qrcode";

const readCSVAndGenerateQR = async (filePath: string) => {
  const names: string[] = [];
  let index = 0;

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", async (row) => {
      const name = row["NOMBRE Y APELLIDO (Calfrac)"];
      names.push(name.replace(",", ""));
    })
    .on("end", async () => {
      for (let name of names) {
        const qrString = name; // JSON.stringify(name);

        try {
          const fileName = `qr-${index
            .toString()
            .padStart(3, "0")}-${name.toLowerCase()}.png`;
          await QRCode.toFile(`./qrs/${fileName}`, qrString, {
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

readCSVAndGenerateQR("./invitados.csv");
