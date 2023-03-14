import { createI18n } from "vue-i18n"
// import pluralRules from "./rules/pluralization"
// import numberFormats from "./rules/numbers.js"
// import datetimeFormats from "./rules/datetime.js"


function getUserLocale() {
  const locale = window.navigator.language ||
    window.navigator.userLanguage 

    locale.split('-')[0];
    if(locale.split('-')[0] ==='pt'){
      return 'pt'
    }else{
      return 'en'
    }
   
}


const messages = {
  en: {
    title:"Wiza Payments",
    description:"Payment methods",
    next:"Next",
    send:"Send",
    cancel:"Cancel",
    otpTitle:"OPT verification",
    otpDescription:"Enter the OTP sent to",
    warning:"Do not refresh this page while waiting for payment confirmation",
    waiting:"Waiting authorization",
   purchaseMsn:"Purchase made successfully"
  },
  pt: {
    title:"Wiza Pagamentos",
    description:"Métodos de pagamento",
    next:"Seguinte",
    send:"Enviar",
    cancel:"Cancelar",
    otpTitle:"Verificação OTP",
    otpDescription:"Digite o OTP enviado para",
    warning:"Não atualize esta página enquanto aguarda a confirmação do pagamento",
    waiting:"Aguardando autorização",
    purchaseMsn:"Compra realizada com sucesso"
  }
}

export default createI18n({

  locale: getUserLocale(),
  fallbackLocale: 'en',
  legacy: false,
   messages

})