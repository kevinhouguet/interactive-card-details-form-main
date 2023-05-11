const app = {

  state: {
    name: 'Jane Appleseed',
    cardNumber: '0000000000000000',
    expDateMM: "00",
    expDateYY: "00",
    cvc: "000"
  },

  init: () => {
    app.getInformation();
  },

  getInformation: () => {
    const form = document.querySelector('.card-form');
    form.addEventListener('submit', app.handleSubmitForm);
  },

  handleSubmitForm: (event) => {
    event.preventDefault();
    console.log(event.currentTarget)
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
    console.log(cardNumbersArray)
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

