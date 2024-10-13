export default function() {
    const cardNumberInput = document.getElementById('cardNumber');
    const digitElements = document.querySelectorAll('.card__preview__front-number .digit');
    let prevDisplayDigits = Array(16).fill('#');

    cardNumberInput.addEventListener('input', function(event) {
        const valueStr = event.target.value.toString().replace(/\D/g, '');
        const digits = valueStr.split('');
        const displayDigits = Array(16).fill('#');

        for (let i = 0; i < digits.length && i < 16; i++) {
            displayDigits[i] = digits[i];
        }

        for (let i = 0; i < displayDigits.length; i++) {
            if (displayDigits[i] !== prevDisplayDigits[i]) {
                animateDigitChange(digitElements[i], displayDigits[i]);
            }
        }
        prevDisplayDigits = displayDigits.slice();
    });

    function animateDigitChange(element, newDigit) {
        element.classList.add('animate-out');
        setTimeout(function() {
            element.textContent = newDigit;
            element.classList.remove('animate-out');
            element.classList.add('animate-in');
            setTimeout(function() {
                element.classList.remove('animate-in');
            }, 300); 
        }, 300); 
    }
}