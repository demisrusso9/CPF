document.querySelector('input').onkeypress = e =>
  e.key === 'Enter' ? click() : ''

function click() {
  let cpf = document.querySelector('input')
  let convertedCPF = cpf.value.match(/[\d]/g).map(number => number)

  if (checkCPF(convertedCPF)) {
    cpf.classList.remove('failed', 'failed-animation', 'animate-scale')

    void cpf.offsetWidth

    cpf.classList.add('success', 'animate-scale')
  } else {
    cpf.classList.remove('success', 'animate-scale', 'failed-animation')

    void cpf.offsetWidth

    cpf.classList.add('failed', 'failed-animation')
  }
}

function checkCPF(cpf) {
  let newCPF = cpf.slice(0, 9)

  let firstDigit = calcFirstDigit(cpf)
  newCPF.push(firstDigit)

  let secondDigit = calcSecondDigit(newCPF)
  newCPF.push(secondDigit)

  return isValid(cpf, newCPF)
}

function isValid(cpf, newCPF) {
  return cpf.join('') === newCPF.join('')
}

function calcFirstDigit(cpf) {
  let value = 10
  let nineDigits = cpf.slice(0, 9)
  let sum = nineDigits.reduce((acc, cur) => (acc += cur * value--), 0)

  let remainder = sum % 11

  return calcRemainder(remainder)
}

function calcSecondDigit(cpf) {
  let value = 11
  let nineDigits = cpf.slice(0, 10)
  let sum = nineDigits.reduce((acc, cur) => (acc += cur * value--), 0)

  let remainder = sum % 11

  return calcRemainder(remainder)
}

function calcRemainder(remainder) {
  return remainder >= 2 ? 11 - remainder : 0
}

function maskCPF(e) {
  let input = e.target
  let cpf = input.value.replace(/\D/g, '')

  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2')
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2')
  cpf = cpf.replace(/(\d{3})(\d{2})$/, '$1-$2')

  input.value = cpf
}
