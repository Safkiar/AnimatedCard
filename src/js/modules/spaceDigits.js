export default function() {
    const inputField = document.getElementById('cardNumber');
  
    inputField.addEventListener('input', function(e) {
      let value = inputField.value;
      let cursorPosition = inputField.selectionStart;
      let rawValue = value.replace(/\D/g, '');
      let formattedValue = '';
      for (let i = 0; i < rawValue.length; i++) {
        if (i > 0 && i % 4 === 0) {
          formattedValue += ' ';
        }
        formattedValue += rawValue[i];
      }
  
      let unformattedCursorPosition = 0;
      for (let i = 0; i < cursorPosition; i++) {
        if (/\d/.test(value[i])) {
          unformattedCursorPosition++;
        }
      }

      inputField.value = formattedValue;

      let newCursorPosition = 0;
      let digitsCounted = 0;
      while (digitsCounted < unformattedCursorPosition && newCursorPosition < formattedValue.length) {
        if (/\d/.test(formattedValue[newCursorPosition])) {
          digitsCounted++;
        }
        newCursorPosition++;
      }
  
      inputField.setSelectionRange(newCursorPosition, newCursorPosition);
    });
  }