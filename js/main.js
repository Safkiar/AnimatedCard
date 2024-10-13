import 'picturefill'
import custom from './modules/custom'
import './images'; 
import '../scss/app.scss';
import numbers from './modules/numbers';
import spaceDigits from './modules/spaceDigits';
import cvv from './modules/cvv';
import date from './modules/date';
import lettersAngle from './modules/lettersAngle';
import validateForm from './modules/validateForm';
import dynamicBorder from './modules/dynamicBorder';

window.addEventListener('load', () => {
    numbers()
    spaceDigits()
    dynamicBorder()
    cvv()
    custom()
    date()
    lettersAngle()
    validateForm()
})