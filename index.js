const curl = require("curl");
const jsdom = require("jsdom");
const config = require("./config");

const { idPrimerLiga, cantLigas, cantBotsMinima } = config;
console.log(
  `Estamos recorriendo ${cantLigas} ligas, comenzando por la ${idPrimerLiga},`
);
console.log(`En busca de una liga con mas de ${cantBotsMinima} bots.`);

const urlBuilder = number =>
  `https://www.hattrick.org/World/Series/?LeagueLevelUnitID=${number}`;

function parseData(html, url, i) {
  const { JSDOM } = jsdom;
  const dom = new JSDOM(html);
  const $ = require("jquery")(dom.window);
  var cantBotsEncontrados = $(".shy").length;

  if (cantBotsEncontrados >= cantBotsMinima) {
    console.log(" ");
    console.log("Liga encontrada!");
    console.log(`Numero de liga: V.${i}`);
    console.log("IdNumber: ", url.slice(url.length - 5));
    console.log("Cantidad de bots: ", cantBotsEncontrados);
    console.log(" ");
  }
}

for (i = 0; i < cantLigas; i++) {
  const numeroLiga = i + 1;
  const url = urlBuilder(idPrimerLiga + i);
  curl.get(url, null, (err, resp, body) => {
    if (resp.statusCode == 200) {
      process.stdout.write(".");
      parseData(body, url, numeroLiga);
    } else {
      console.log("Error while fetching url");
    }
  });
}
