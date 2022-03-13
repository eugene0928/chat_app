let conversation = document.querySelector('#conversation')
let weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun']


function renderMsg(obj) {

    let [div1, div2, div3, div4, span] = createEle('div', 'div', 'div', 'div', 'span')

    div1.classList.add('row', 'message-body')

    if(obj.from) {
        div2.classList.add('col-sm-12', 'message-main-sender')
        div3.classList.add('sender')
        div4.textContent = obj.message
    } else {
        div2.classList.add('col-sm-12', 'message-main-receiver')
        div3.classList.add('receiver')
        div4.textContent = obj.message
    }

    div4.classList.add('message-text')
    span.classList.add('message-time', 'pull-right')
    span.textContent = weekDays[new Date(obj.date).getDay()]
    
    div4.append(span)
    div3.append(div4)
    div2.append(div3)
    div1.append(div2)

    conversation.append(div1)
}

