let username = document.querySelector('#login-input-username')
let password = document.querySelector('#login-input-password')
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
    email.style.display = 'none'

    email.required = false

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
    email.style.display = 'inline'

    email.required = true

    btn.innerHTML = 'Sign up'
}

/**
 * submit handler
 * @param {*} event 
 */
form.onsubmit = async (event) => {

    // freeze page
    event.preventDefault()

    // req for all users
    let users = await fetch('http://192.168.1.6:6900/users')
    users = await users.json()

    // find needed user
    let filteredUser = users.data.users.find( el => el.userName == username.value)

    // signing up
    if(btn.textContent == 'Sign up') {
        

        if(filteredUser) {
            alert('This user is already exists, please choose another user')
            username.value = null
            password.value = null
            email.value = null

            return
        }

        if(!validName(username.value)) {
            alert('Please, this username is too short. Choose another one!')
            return
        }

        if(!validPassw(password.value)) {
            alert("This password is not valid. Password's length should be higher than 3. Choose another one!")
            return
        }

        // new user's info
        let obj = {
            userId: users.data.users.length ? users.data.users.reduce( (acc, el) => {
                if(acc < el.userId) {
                    acc = el.userId
                }
                return acc
            }, 0) + 1 : 1,
            userName: username.value,
            email: email.value,
            password: password.value,
            date: Date.now()
        }

        // send post request
        let data = await fetch('http://192.168.1.6:6900/users', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })

        // check if request is ok to change location
       if(data.ok) {
            window.location = 'http://192.168.1.6:6900/app'
       }
       
       // clean input
        username.value = null
        email.value = null
        password.value = null

        return
    } else {
        // check if user is signed up
        if(!filteredUser) {
            alert('You have not signed up yet, please sign up first!')

            username.value = null
            password.value = null
            return
        }

        // password check
        if(filteredUser.password != password.value) {
            console.log(filteredUser, password.value)
            alert('Wrong password, please try again')
            password.value = null
            return
        }

        // location change
        window.location = 'http://192.168.1.6:6900/app'

        // clean input
        username.value = null
        password.value = null

        return
    }
}

