import "./css/index.css"
import IMask from "imask"

// classe -> elemento dentro da classe -> "> g" procura pelo primeiro nivel de g -> pegar o primeiro <g> dentro do elemento anterior -> elemento dentro do g
const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")

const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(type) {
  const colors = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#DF6F29", "#C69347"],
    default: ["black", "gray"],
  }

  ccBgColor01.setAttribute("fill", colors[type][0])
  ccBgColor02.setAttribute("fill", colors[type][1])
  ccLogo.setAttribute("src", `cc-${type}.svg`)
}
globalThis.setCardType = setCardType

const securityCode = document.querySelector("#security-code")
const securityCodeMask = {
  mask: "0000",
}
const securityCodeMasked = IMask(securityCode, securityCodeMask)

const expirationDate = document.querySelector("#expiration-date")
const expirationDateMask = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
  },
}
const expirationDateMasked = IMask(expirationDate, expirationDateMask)

const cardNumber = document.querySelector("#card-number")
const cardNumberMask = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardType: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2} | ^22[2-9]\d | ^2[3-7]\d{0,2})\d{0, 12}/,
      cardType: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      cardType: "default",
    },
  ],
  // Essa função ela ocorre a cada entrada o teclado, o parametro appended se encarrega disso
  dispatch: function (appended, dynamicMasked) {
    // O que esse comando faz é adicionar o novo numero clicado (appended) ao que já tinha antes (dynamicMasked). Caso seja um numero, só concatena, se for um caracter substitui por vazio
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    //dynamicMasked.compiledMasks -> retorna um dos objetos dentro do mask
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })

    return foundMask
  },
}
const cardNumberMasked = IMask(cardNumber, cardNumberMask)
//^4\d{0,15}
//Inicia com o numero 4 seguido de dígitos que a qtd podem ir de 0 a 15
//(^5[1-5]\d{0,2} | ^22[2-9]\d | ^2[3-7]\d{0,2})\d{0, 12}
//Inicia com 5, seguide de um numero entre 1 e 5 seguido de dois digitos + 12 dígitos
