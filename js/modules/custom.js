export default function(){

  const cardNumberInput = document.getElementById('cardNumber');
  const companyLogoContainer = document.querySelector('.card__preview__front-company');
  const companyLogoContainerBack = document.querySelector('.card__preview__back__box-company');
  let currentCardType = 'visa'; 

  cardNumberInput.addEventListener('focus', () => {
    cardNumberInput.addEventListener('input', handleCardNumberInput);
  });

  cardNumberInput.addEventListener('blur', () => {
    cardNumberInput.removeEventListener('input', handleCardNumberInput);
  });

  function handleCardNumberInput() {
    const cardNumber = cardNumberInput.value.trim();
    const cardType = getCardType(cardNumber);

    if (cardType && cardType !== currentCardType) {
      changeCardLogo(cardType);
      currentCardType = cardType;
    }
  }

  function getCardType(number) {
    if (number.startsWith('4')) {
      return 'visa';
    } else if (number.startsWith('5') || number.startsWith('2')) {
      return 'mastercard';
    } else if (number.startsWith('6')) {
      return 'discover';
    } else {
      return 'visa'; 
    }
  }

  function changeCardLogo(cardType) {

    companyLogoContainer.innerHTML = '';
    companyLogoContainerBack.innerHTML = '';

    const newFrontLogo = createLogo(cardType);
    const newBackLogo = createLogo(cardType);

    companyLogoContainer.appendChild(newFrontLogo);
    companyLogoContainerBack.appendChild(newBackLogo);
  }

  function createLogo(cardType) {
    const logo = document.createElement('img');
    logo.src = `../images/${cardType}.png`; 
    logo.alt = `${cardType}-image`;
    logo.classList.add('card-logo', 'fade-in');
    return logo;
  }
}