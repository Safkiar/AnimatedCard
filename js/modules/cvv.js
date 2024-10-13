export default function() {
    const cvvInput = document.getElementById('cardCVV');
    const cvvPreview = document.querySelector('.card__preview__back__box-inputView');

    cvvInput.addEventListener('input', function(event) {
        let value = event.target.value;
        value = value.replace(/\D/g, '').slice(0, 4); 
        cvvInput.value = value;
        cvvPreview.textContent = value || '###'; 
    });
}