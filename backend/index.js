const cors = require("cors");
const express = require("express");
var AdmZip = require("adm-zip");
var fs = require("fs");
var path = require("path");

const app = express();
const port = 2020;

// reading archives
let a = "./epub-books/bronze.epub#(/6/4)";
// console.log(a);
var zip = new AdmZip("./epub-books/bronze.epub");
var zipEntries = zip.getEntries(); // an array of ZipEntry records
// console.log(zipEntries);
// zipEntries.forEach((entry) => {
//     console.log(entry);
// //     var entryName = entry.entryName;
// //     var decompressedData = zip.readFile(entry); // decompressed buffer of the entry
// });

// console.log(typeof zip.readFile(zip.getEntry("index_split_001.html")).toString('utf-8'));

app.use(cors({ origin: true }));
app.get("/", (req, res) => {
    res.send(returnResponse(zipEntries));
});

app.get("/css", (req, res) => {
    res.send();
});

app.use(express.static("public"));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

function returnResponse(zipEntries) {
    let a = [];
    let data;

    zipEntries.forEach((entry) => {
        // console.log(entry.entryName);
        var entryName = entry.entryName;
        var decompressedData = zip.readFile(entry); // decompressed buffer of the entry
        if (entry.entryName === "bronze/page_styles.css") {
            console.log(path.join(__dirname + "/temp/") + "style.css");
            data = decompressedData.toJSON();
            // fs.writeFile(
            //     path.join(__dirname + "/temp/") + 'style.css',
            //     decompressedData,
            //     (data) => {
            //         // console.log(data);
            //     }
            // );
        } else {
            data = decompressedData.toString("utf-8");
        }

        // console.log(decompressedData.);
        a.push({
            name: entry.entryName,
            data: data,
        });
    });
    return a;
}
