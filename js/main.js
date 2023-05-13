const app = {

  state: {
    cardHolderName: 'Jane Appleseed',
    cardNumber: '0000000000000000',
    expDateMM: "00",
    expDateYY: "00",
    cvc: "000"
  },

  init: () => {
    app.createListeners();
  },

  render: (elementToModify, newValue) => {
    const htmlElementToModify = document.querySelector(`#${elementToModify}`)

    // console.log(childElementToModify);
    // console.log(newValue)

    if(elementToModify === 'cardNumber') {
      // 12345678 needs to be 1234 5678
      // replace all pattern of 4 numbers by the same pattern with a space
      newValue = newValue.replace(/(.{4})/g, '$1 ');
      if(newValue.replaceAll(' ', '').length <= 16){
        htmlElementToModify.textContent = newValue.toUpperCase()
      }
    } else {
      htmlElementToModify.textContent = newValue.toUpperCase()
    }
  },

  createListeners: () => {
    const form = document.querySelector('.card-form');
    const cardHolderName = form.querySelector('#cardholder-name')
    const cardNumber = form.querySelector('#card-number')
    const expdateMM = form.querySelector('#expdate-MM')
    const expdateYY = form.querySelector('#expdate-YY')
    const cvc = form.querySelector('#cvc')
    app.addCustomListener(cardHolderName,'cardHolderName','input')
    app.addCustomListener(cardNumber,'cardNumber','input')
    form.addEventListener('submit', app.handleSubmitForm);
  },

  addCustomListener: (htmlElement, elementToModify, eventType) => {
    htmlElement.addEventListener(eventType, (event) => {
      console.log('INPUT CHANGE')
      app.state[elementToModify] = event.currentTarget.value
      app.render(elementToModify, event.currentTarget.value)
    })
  },

  handleSubmitForm: (event) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget)
    app.truc = 'truc'
    for (const key of formdata.keys()) {
      app.state[key] = formdata.get(key) === ""
                                      ? app.state[key] : formdata.get(key)
    }
    app.showConfirmLayout();
    app.changeCard();
  },
  changeCard: () => {
    // change the back of card
    const cardBack = document.querySelector('.card-back')
    cardBack.querySelector('.card-back__cvc').textContent = app.state.cvc

    // change the front of card
    const cardFront = document.querySelector('.card-front')

    // change the card number
    const spanForNumber = cardFront.querySelector('.card-front__number').querySelectorAll('span')
    const cardNumbersArray = app.splitCardNumber(app.state.cardNumber)
    spanForNumber.forEach((span, i) => {
      span.textContent = cardNumbersArray[i]
    })

    // change the name
    const cardName = cardFront.querySelector('.card-front_owner')
    cardName.textContent = app.state.name.toUpperCase()

    // change the exp date
    const cardExpDate = cardFront.querySelector('.card-front_expiry-date')
    cardExpDate.textContent = `${app.state.expDateMM}/${app.state.expDateYY}`
  },
  splitCardNumber: (cardNumber) => {
    // We needing an array of string
    // 12345678 needs to be split in array like that : ['1234', '5678']
    const result = []
    const nbRound = 4;
    for (let i = 0; i < nbRound; i++) {
      const rangeNb = 4;
      result.push(cardNumber.substring(0+(rangeNb*i),4+(rangeNb*i)))
    }
    return result
  },
  showConfirmLayout: () => {
    // hide form
    const cardForm = document.querySelector('.card-form')
    cardForm.classList.add('hidden');
    // show confirm layout
    const completeLayout = document.querySelector('.complete__layout')
    completeLayout.classList.remove('hidden')
  },
}

document.addEventListener('DOMContentLoaded', app.init);

