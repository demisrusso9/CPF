$().ready(() => $('input').mask('000.000.000-00'));

document.querySelector('input').onkeypress = (e) => (e.key === 'Enter') ? click() : ''

function click() {
    let cpf = document.querySelector('input');
    let convertedCPF = cpf.value.match(/[\d]/g).map(number => number);
    
    if (checkCPF(convertedCPF)) {        
        cpf.classList.add('success')        
        cpf.classList.remove('failed', 'failed-animation')
    } else {
        cpf.classList.remove('success')
        cpf.classList.add('failed', 'failed-animation')
    }
}

function checkCPF(cpf) {
    let newCPF = cpf.slice(0, 9);

    let firstDigit = calcFirstDigit(cpf)
    newCPF.push(firstDigit)

    let secondDigit = calcSecondDigit(newCPF)
    newCPF.push(secondDigit)

    return isValid(cpf, newCPF);
}

function isValid(cpf, newCPF) {
    return cpf.join('') === newCPF.join('')
}

function calcFirstDigit(cpf) {
    let value = 10;
    let nineDigits = cpf.slice(0, 9);
    let sum = nineDigits.reduce((acc, cur) => acc += cur * value--, 0)

    let remainder = sum % 11;

    return calcRemainder(remainder)
}

function calcSecondDigit(cpf) {
    let value = 11;
    let nineDigits = cpf.slice(0, 10);
    let sum = nineDigits.reduce((acc, cur) => acc += cur * value--, 0)

    let remainder = sum % 11;

    return calcRemainder(remainder)
}

function calcRemainder(remainder) {
    return (remainder >= 2) ? (11 - remainder) : 0;
}