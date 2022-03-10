let username = document.querySelector('#login-input-username')
let password = document.querySelector('#login-input-password')
let email_input = document.querySelector('#login-input-email')
let email = document.querySelector('#login-input-email')
let li = document.querySelectorAll('.login-nav__item')
let email_label = document.querySelector('#email')
let signIn = document.querySelector('#signIn')
let signUp = document.querySelector('#signUp')
let form = document.querySelector('form')
let btn = document.querySelector('#btn')

/**
 * signIn handler
 */
signIn.onclick = () => {
    // give and remove active class
    li[1].classList.add('active')
    li[0].classList.remove('active')

    // make invisible email field
    email_label.style.display = 'none'
    email_input.style.display = 'none'

    email_input.required = false

    btn.innerHTML = 'Sign in'
}

/**
 * signUp handler
 */
signUp.onclick = () => {
    // give and remove active class
    li[0].classList.add('active')
    li[1].classList.remove('active')

    // make visible email field
    email_label.style.display = 'block'
    email_input.style.display = 'inline'

    email_input.required = true

    btn.innerHTML = 'Sign up'
}

/**
 * submit handler
 * @param {*} event 
 */
form.onsubmit = (event) => {

    // freeze page
    event.preventDefault()

    console.log(username.value, email.value, password.value)
}

