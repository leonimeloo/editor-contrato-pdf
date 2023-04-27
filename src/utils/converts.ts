const extenso = require("../../extenso");

export function convertMonthName(month: number) {
  switch (month) {
    case 1:
      return "Janeiro";
      break;
    case 2:
      return "Fevereiro";
      break;
    case 3:
      return "Março";
      break;
    case 4:
      return "Abril";
      break;
    case 5:
      return "Maio";
      break;
    case 6:
      return "Junho";
      break;
    case 7:
      return "Julho";
      break;
    case 8:
      return "Agosto";
      break;
    case 9:
      return "Setembro";
      break;
    case 10:
      return "Outubro";
      break;
    case 11:
      return "Novembro";
      break;
    case 12:
      return "Dezembro";
      break;
  }
}

export function convertState(state: string) {
  switch (state) {
    case "ac":
      return "Acre";
      break;
    case "al":
      return "Alagoas";
      break;
    case "ap":
      return "Amapá";
      break;
    case "am":
      return "Amazonas";
      break;
    case "ba":
      return "Bahia";
      break;
    case "ce":
      return "Ceará";
      break;
    case "df":
      return "Distrito Federal";
      break;
    case "es":
      return "Espírito Santo";
      break;
    case "go":
      return "Goiás";
      break;
    case "ma":
      return "Maranhão";
      break;
    case "mt":
      return "Mato Grosso";
      break;
    case "ms":
      return "Mato Grosso do Sul";
      break;
    case "mg":
      return "Minas Gerais";
      break;
    case "pa":
      return "Pará";
      break;
    case "pb":
      return "Paraíba";
      break;
    case "pr":
      return "Paraná";
      break;
    case "pe":
      return "Pernambuco";
      break;
    case "pi":
      return "Piauí";
      break;
    case "rj":
      return "Rio de Janeiro";
      break;
    case "rn":
      return "Rio Grande do Norte";
      break;
    case "rs":
      return "Rio Grande do Sul";
      break;
    case "ro":
      return "Rondônia";
      break;
    case "rr":
      return "Roraima";
      break;
    case "sc":
      return "Santa Catarina";
      break;
    case "sp":
      return "São Paulo";
      break;
    case "se":
      return "Sergipe";
      break;
    case "to":
      return "Tocantins";
      break;
  }
}

export function convertHouseType(type: string) {
  switch (type) {
    case "casa":
      return "Imóvel Residencial";
      break;
    case "comercio":
      return "Ponto Comercial";
      break;
  }
}

export function convertRg(rg: string) {
  if (rg.length < 9) {
    const formattedStr =
      rg.slice(0, 2) + "." + rg.slice(2, 5) + "." + rg.slice(5);
    return formattedStr;
  } else {
    return rg.match(/.{1,3}/g)?.join(".");
  }
}
