export default function() {
    const expMonthSelect = document.getElementById('expDateMonth');
    const expYearSelect = document.getElementById('expDateYear');
    const digitElements = document.querySelectorAll('.card__preview__front-expires--date .digit');
    let prevDisplayDigits = ['M', 'M', 'Y', 'Y'];
  
    expMonthSelect.addEventListener('change', updateExpDate);
    expYearSelect.addEventListener('change', updateExpDate);
  
    function updateExpDate() {
      let monthValue = expMonthSelect.value;
      let yearValue = expYearSelect.value;
      if (!monthValue) {
        monthValue = 'MM';
      } else {
        monthValue = monthValue.padStart(2, '0'); 
      }
  
      if (!yearValue) {
        yearValue = 'YY';
      } else {
        yearValue = yearValue.slice(-2); 
      }
  
      const displayDigits = [
        monthValue.charAt(0),
        monthValue.charAt(1),
        yearValue.charAt(0),
        yearValue.charAt(1)
      ];
  
      for (let i = 0; i < displayDigits.length; i++) {
        if (displayDigits[i] !== prevDisplayDigits[i]) {
          animateDigitChange(digitElements[i], displayDigits[i]);
        }
      }
      prevDisplayDigits = displayDigits.slice();
    }
  
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