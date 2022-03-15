let wholeDiv = document.querySelectorAll('.row.sideBar')[0]
let conversation1 = document.querySelector('#conversation')
let leftSideDiv = document.querySelector('.row.compose-sideBar')
let MsgUser = document.querySelector('#mainUser')
let mainName = document.querySelector('#main-name')
let searchText = document.querySelector('#searchText')
let composeText = document.querySelector('#composeText')
let rowReply = document.querySelector('.row.reply')
let send = document.querySelector('#send')
let msg = document.querySelector('#comment')


let mainUser = window.localStorage.getItem('user')

let data = null
let filteredUser = null
let filteredUsers = null

window.addEventListener('load', async () => {
    mainName.textContent = mainUser

    data = await fetch('http://192.168.1.6:6900/chat')
    data = await data.json()

    filteredUser = data.data.users.find( el => el.user == mainUser)

    wholeDiv.innerHTML = null

    if(filteredUser?.chat) {
        for(let user of filteredUser.chat) {
            renderMsgedUser(user)
        }
    }

    let allUsers = await fetch('http://192.168.1.6:6900/users')
    allUsers = await allUsers.json()
    filteredUsers = allUsers.data.users.filter( el => el.userName != mainUser) 

    for(let user of filteredUsers) {
        renderMsgedUser(user, true)
    }
})


/**
 * if left is available this function is for leftSide div, if not it is for mainSide div
 * @param {object} user 
 * @param {boolean} left 
 */
function renderMsgedUser(user, left) {

    let [div1, div2, div3, img, div4, div5, div6, span, div7, span2] = createEle('div', 'div', 'div', 'img', 'div', 'div', 'div', 'span', 'div', 'span')
    
    div1.classList.add('row', 'sideBar-body')
    div2.classList.add('col-sm-3', 'col-xs-3', 'sideBar-avatar')
    div3.classList.add('avatar-icon')
    
    img.src = "https://bootdey.com/img/Content/avatar/avatar6.png"

    div4.classList.add('col-sm-9', 'col-xs-9', 'sideBar-main')
    div5.classList.add('row')
    div6.classList.add('col-sm-8', 'col-xs-8', 'sideBar-name')
    
    span.classList.add('name-meta')
    span.textContent = user.userName

    div7.classList.add('col-sm-4', 'col-xs-4', 'pull-right', 'sideBar-time')
    span2.classList.add('time-meta', 'pull-right')
    span2.textContent = new Date(user.date).toISOString().substr(11, 8).slice(0, 5)

    div3.append(img)
    div2.append(div3)
    
    div6.append(span)
    div5.append(div6, div7)
    
    div7.append(span2)
    div4.append(div5)

    div1.append(div2, div4)

    if(left) {
        leftSideDiv.append(div1)
    } else {
        wholeDiv.append(div1)
    }

    div1.addEventListener('click', async () => {

        if(window.getComputedStyle(rowReply).display == 'none') {
            rowReply.removeAttribute('hidden')
        }

        MsgUser.textContent = user.userName
        conversation1.innerHTML = null

        let messages = await fetch('http://192.168.1.6:6900/message')
        messages = await messages.json()

        let userMsg = messages.data.users.find( el => el.user == mainUser)

        let neededMsg = userMsg?.data.filter( el => el.user == user.userName)
        if(!userMsg?.data || !neededMsg.length) {
            alert('no chats yet!')
            return
        }
        
        for(let i = 0; i < neededMsg.length; i++) {
            renderMsg(neededMsg[i])
        }
    })
}

searchText.addEventListener('input', () => {

    wholeDiv.innerHTML = null
    let regExp = new RegExp(searchText.value, 'gi')

    let users = filteredUser.chat.filter( user => user.userName.match(regExp))
    console.log(users)
    for(let i = 0; i < users.length; i++) {
        renderMsgedUser(users[i])
    }
})

composeText.addEventListener('input', () => {
    leftSideDiv.innerHTML = null

    let regExp = new RegExp(composeText.value, 'gi')

    let users = filteredUsers.filter( user => user.userName.match(regExp))
    for(let i = 0; i < users.length; i++) {
        renderMsgedUser(users[i], true)
    }
})

send.addEventListener('click', async () => {
    if(msg.value.trim()) {
        // checking chat database
        let chatInfo = await fetch('http://192.168.1.6:6900/chat')
        chatInfo = await chatInfo.json()

        // find sender's info from chat database
        let mainUserChat = chatInfo.data.users.find( el => el.user == mainUser)

        if(mainUserChat) {
            let receiverExist = mainUserChat.chat.find( el => el.userName == MsgUser.textContent)

            if(receiverExist) {
                receiverExist.date = Date.now()
            } else {
                mainUserChat.chat.push({
                    userName: MsgUser.textContent,
                    date: Date.now()
                })
            }
        } else {
            chatInfo.data.users.push({
                user: mainUser,
                chat: [
                    {
                        userName: MsgUser.textContent, 
                        date: Date.now()
                    }
                ]
            })
            
        }

        // find reciever's info from chat database
        let recieverChat = chatInfo.data.users.find( el => el.user == MsgUser.textContent)
        if(recieverChat) {
            let senderExist = recieverChat.chat.find( el => el.userName == mainUser)

            if(senderExist) {
                senderExist.date = Date.now()
            } else {
                recieverChat.chat.push({
                    userName: mainUser,
                    date: Date.now()
                })
            }
        } else {
            chatInfo.data.users.push({
                user: MsgUser.textContent,
                chat: [
                    {
                        userName: mainUser,
                        date: Date.now()
                    }
                ]
            })
            
        }

        let postChat = await fetch('http://192.168.1.6:6900/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(chatInfo)
        })

    }
})