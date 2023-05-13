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
    console.log('RENDER', elementToModify, newValue)

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
    // Create a listener for each input with the same name as the key of the state to itierate on it
    const input = {
      cardHolderName: form.querySelector('#cardholder-name'),
      cardNumber: form.querySelector('#card-number'),
      expDateMM: form.querySelector('#expdate-MM'),
      expDateYY: form.querySelector('#expdate-YY'),
      cvc: form.querySelector('#cvc'),
    }

    // itierate on the state to create a listener for each key
    Object.keys(app.state).forEach((key) => {
      app.addCustomListener(input[key], key, 'input')
    })

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
    for (const key of formdata.keys()) {
      app.state[key] = formdata.get(key) === ""
                                      ? app.state[key] : formdata.get(key)
    }
    app.showConfirmLayout();
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

