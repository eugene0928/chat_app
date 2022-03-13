let wholeDiv = document.querySelectorAll('.row.sideBar')[0]
let mainUser = document.querySelector('#mainUser')

window.addEventListener('load', async () => {
    mainUser.textContent = window.localStorage.getItem('user')

    let data = await fetch('http://192.168.1.6:6900/chat')
    data = await data.json()

    let filteredUser = data.data.users.find( el => el.user == mainUser.textContent)
    console.log(filteredUser)

    for(let user of filteredUser.chat) {
        renderMsgedUser(user)
    }
})

function renderMsgedUser(user) {
    let [div1, div2, div3, img, div4, div5, div6, span, div7, span2] = createEle('div', 'div', 'div', 'img', 'div', 'div', 'div', 'span', 'div', 'span')
    
    div1.classList.add('row', 'sideBar-body')
    div2.classList.add('col-sm-3', 'col-xs-3', 'sideBar-avatar')
    div3.classList.add('avatar-icon')
    
    img.src = "https://bootdey.com/img/Content/avatar/avatar3.png"

    div4.classList.add('col-sm-9', 'col-xs-9', 'sideBar-main')
    div5.classList.add('row')
    div6.classList.add('col-sm-8', 'col-xs-8', 'sideBar-name')
    
    span.classList.add('name-meta')
    span.textContent = user

    div7.classList.add('col-sm-4', 'col-xs-4', 'pull-right', 'sideBar-time')
    span2.classList.add('time-meta', 'pull-right')
    span2.textContent = '18:18'

    div3.append(img)
    div2.append(div3)
    
    div6.append(span)
    div5.append(div6)
    
    div7.append(span2)
    div4.append(div5, div7)

    div1.append(div2, div4)
    wholeDiv.append(div1)

    div1.addEventListener('click', () => {
        //
    })
}

