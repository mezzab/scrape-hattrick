const curl = require("curl");
const jsdom = require("jsdom");

const primerId = 13220;
const cantLigas = 256;
const cantBotsMinima = 2;

const urlBuilder = number =>
  `https://www.hattrick.org/World/Series/?LeagueLevelUnitID=${number}`;

for (i = 0; i < cantLigas; i++) {
  const numeroLiga = i + 1;
  const url = urlBuilder(primerId + i);

  curl.get(url, null, (err, resp, body) => {
    if (resp.statusCode == 200) {
      parseData(body, url, numeroLiga);
    } else {
      //some error handling
      console.log("error while fetching url");
    }
  });
}

function parseData(html, url, i) {
  const { JSDOM } = jsdom;
  const dom = new JSDOM(html);
  const $ = require("jquery")(dom.window);
  var length = $(".shy").length;
  if (length >= cantBotsMinima) {
    console.log(`Numero de liga: V.${i}`);
    console.log("IdNumber: ", url.slice(url.length - 5));
    console.log("Cantidad de bots: ", length);
    console.log(" ");
  }
}
