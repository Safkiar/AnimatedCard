export default function () {
  const form = document.querySelector('.card__form');

  if (!form) {
    console.error('Form not found!');
    return;
  }

  const cardNumberError = document.getElementById('cardNumberError');
  const cardNameError = document.getElementById('cardNameError');
  const expDateError = document.getElementById('expDateError');
  const cardCVVError = document.getElementById('cardCVVError');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    cardNumberError.textContent = '';
    cardNameError.textContent = '';
    expDateError.textContent = '';
    cardCVVError.textContent = '';

    const formData = new FormData(form);

    let cardNumber = formData.get('cardNumber');
    const cardName = formData.get('cardName');
    const expDateMonth = formData.get('expDateMonth');
    const expDateYear = formData.get('expDateYear');
    const cardCVV = formData.get('cardCVV');

    cardNumber = cardNumber.replace(/\s+/g, '');

    let isValid = true;

    if (!/^\d{16}$/.test(cardNumber)) {
      isValid = false;
      cardNumberError.textContent = '❌ Card number must be 16 digits.';
    }

    if (/^[13789]/.test(cardNumber)) {
      isValid = false;
      cardNumberError.textContent = `❌ Card number cannot start with ${cardNumber[0]}.`;
    }

    if (!/^[a-zA-Z\s]+$/.test(cardName) || cardName.trim() === "") {
      isValid = false;
      cardNameError.textContent = '❌ Card name cannot be empty.';
    }

    if (!expDateMonth || !expDateYear) {
      isValid = false;
      expDateError.textContent = '❌ Expiration date must be selected.';
    } else {
      const today = new Date();
      const expirationDate = new Date(expDateYear, expDateMonth - 1);

      if (expirationDate < today) {
        isValid = false;
        expDateError.textContent = '❌ Expiration date is expired.';
      }
    }

    if (!/^\d{3,4}$/.test(cardCVV)) {
      isValid = false;
      cardCVVError.textContent = '❌ CVV must be 3 or 4 digits.';
    }

    if (!isValid) {
      console.log('Form validation failed. ❌❌❌');
      return;
    }

    const formInputs = form.querySelectorAll('input, button');
    formInputs.forEach(input => input.disabled = true);

    const jsonData = {
      cardNumber,
      cardName,
      expDateMonth,
      expDateYear,
      cardCVV
    };

    const popupDiv = document.createElement('div');
    popupDiv.classList.add('popup-modal');
    popupDiv.innerHTML = `
      <h2>Success 🎉</h2>
      <p><strong>Card Number:</strong> ${cardNumber}</p>
      <p><strong>Card Name:</strong> ${cardName}</p>
      <p><strong>Expiration Date:</strong> ${expDateMonth}/${expDateYear}</p>
      <p><strong>CVV:</strong> ${cardCVV}</p>
      <button id="closePopup">Close</button>
    `;
    document.body.appendChild(popupDiv);

    form.reset();
    document.getElementById('closePopup').addEventListener('click', () => {
      popupDiv.remove();
      formInputs.forEach(input => input.disabled = false);
    });

    console.log('Submitting Data to Backend as JSON:', JSON.stringify(jsonData));
  });
}
    /*
    fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    */
