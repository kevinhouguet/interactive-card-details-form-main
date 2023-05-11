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
    app.changeCard();
  },
  changeCard: () => {
    const cardBack = document.querySelector('.card-back')
    const cardFront = document.querySelector('.card-front')
    cardBack.querySelector('.card-back__cvc').textContent = app.state.cvc
    const spanForNumber = cardFront.querySelector('.card-front__number').querySelectorAll('span')
    const cardNumbersArray = app.splitCardNumber(app.state.cardNumber)
    console.log(cardNumbersArray)
    spanForNumber.forEach((span, i) => {
      span.textContent = cardNumbersArray[i]
    })
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
  }
}

document.addEventListener('DOMContentLoaded', app.init);

