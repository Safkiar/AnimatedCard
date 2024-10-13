export default function dynamicCardBehavior() {
    const form = document.querySelector('.card__form');
    const dynamicBorder = document.querySelector('.dynamic-border'); 
    const cardPreview = document.querySelector('.card__preview'); 
    const cvvInput = document.getElementById('cardCVV');
    function isCardFlipped() {
        return cardPreview.classList.contains('flipped');
    }

    function flipCard() {
        cvvInput.addEventListener('focus', () => {
            cardPreview.classList.add('flipped');
        });

        cvvInput.addEventListener('blur', () => {
            setTimeout(() => {
                cardPreview.classList.remove('flipped');
            }, 300); 
        });
    }

    function handleFocus(event) {
        const target = event.target;
        const previewClass = getPreviewClassForInput(target.id); 
        const previewElement = document.querySelector(previewClass);

        if (!previewElement) return; 

        if (isCardFlipped()) {
            setTimeout(() => {
                calculateBorder(previewElement);
            }, 1000); 
        } else {
            calculateBorder(previewElement);
        }
    }

    function calculateBorder(previewElement) {
        const previewRect = previewElement.getBoundingClientRect();
        const cardRect = cardPreview.getBoundingClientRect(); 

        let leftOffset = previewRect.left - cardRect.left;
        let topOffset = previewRect.top - cardRect.top;

        dynamicBorder.style.width = `${previewRect.width + 12}px`; 
        dynamicBorder.style.height = `${previewRect.height + 10}px`; 
        dynamicBorder.style.top = `${topOffset - 10}px`; 
        dynamicBorder.style.left = `${leftOffset - 10}px`; 
        dynamicBorder.style.opacity = '1'; 
    }


    function handleBlur() {
        dynamicBorder.style.opacity = '0'; 
    }

    const inputs = form.querySelectorAll('#cardNumber, #cardName, #expDateMonth, #expDateYear');
    inputs.forEach(input => {
        input.addEventListener('focus', handleFocus);
        input.addEventListener('blur', handleBlur);
    });

    function getPreviewClassForInput(inputId) {
        switch(inputId) {
            case 'cardNumber':
                return '.card__preview__front-number';
            case 'cardName':
                return '.card__preview__front-holder';
            case 'expDateMonth':
            case 'expDateYear':
                return '.card__preview--expires';
            default:
                return null;
        }
    }

    flipCard();
}