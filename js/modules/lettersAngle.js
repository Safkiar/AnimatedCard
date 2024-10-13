export default function handleCardNameInput() {
    const cardNameInput = document.getElementById('cardName');
    const nameElement = document.querySelector('.card__preview__front-holder--name');
    let prevValue = '';

    cardNameInput.addEventListener('input', function (event) {
        let valueStr = event.target.value;

        valueStr = valueStr.slice(0, 25);
        valueStr = valueStr.trimStart().replace(/\s{2,}/g, ' ');
        valueStr = valueStr.replace(/[^\p{L}\s]/gu, ''); 
        event.target.value = valueStr;
        valueStr = valueStr.toUpperCase();
        if (valueStr === prevValue) return;
        prevValue = valueStr;
        if (valueStr.length === 0) {
            clearNameElement();
            return;
        }

        const nameLetters = valueStr.split('');

        requestAnimationFrame(() => {
            updateNameDisplay(nameLetters);
        });
    });

    function updateNameDisplay(nameLetters) {
        clearExtraSpans(nameLetters.length);

        const currentSpans = Array.from(nameElement.children);
        const maxLength = Math.max(currentSpans.length, nameLetters.length);

        for (let i = 0; i < maxLength; i++) {
            const newLetter = nameLetters[i] || ''; 
            const letterSpan = currentSpans[i];

            if (letterSpan) {
                const currentLetter = letterSpan.textContent === '\u00A0' ? ' ' : letterSpan.textContent;
                if (currentLetter !== newLetter) {
                    if (newLetter) {
                        animateLetterChange(letterSpan, newLetter);
                    } else {
                        animateLetterRemoval(letterSpan);
                    }
                }
            } else if (newLetter) {
                const newSpan = document.createElement('span');
                newSpan.innerHTML = newLetter === ' ' ? '&nbsp;' : newLetter;
                newSpan.classList.add('animate-in-letter');
                nameElement.appendChild(newSpan);

                newSpan.addEventListener('animationend', function () {
                    newSpan.classList.remove('animate-in-letter');
                }, { once: true });
            }
        }
    }

    function animateLetterChange(letterSpan, newLetter) {
        letterSpan.classList.add('animate-out-letter');

        letterSpan.addEventListener('animationend', function () {
            letterSpan.classList.remove('animate-out-letter');
            letterSpan.innerHTML = newLetter === ' ' ? '&nbsp;' : newLetter;
            letterSpan.classList.add('animate-in-letter');

            letterSpan.addEventListener('animationend', function () {
                letterSpan.classList.remove('animate-in-letter');
            }, { once: true });
        }, { once: true });
    }

    function animateLetterRemoval(letterSpan) {
        letterSpan.classList.add('animate-out-letter');

        letterSpan.addEventListener('animationend', function () {
            if (letterSpan.parentNode) {
                letterSpan.parentNode.removeChild(letterSpan);
            }
        }, { once: true });
    }

    function clearNameElement() {
        while (nameElement.firstChild) {
            nameElement.removeChild(nameElement.firstChild);
        }
    }

    function clearExtraSpans(length) {
        const currentSpans = Array.from(nameElement.children);
        while (currentSpans.length > length) {
            const extraSpan = currentSpans.pop(); 
            animateLetterRemoval(extraSpan);
        }
    }
}