import getIce from "./api/getIce"
import postIce from "./api/postIce"
import deleteIce from "./api/deletIce"
import updateIce from "./api/updateIce"

const listRef = document.querySelector('.list')
const btnOpenRef = document.querySelector('.open-modal')
const backdropRef = document.querySelector('.backdrop')
const formRef = document.querySelector('.form')

let curentId = null

function createItem(arr){
    const el = arr.map(({image, description , price , type , flavour,id}) => {
        return `<li id="${id}"> 
    <img src="${image}" alt="${description}">
    <p>${description}</p>
    <p>${price}</p>
    <p>${type}</p>
    <p>${flavour}</p>
    <button type="button" class="btn_remove" data-action="remove">delete</button>
    <button type="button" class="btn_edit" data-action="edit">edit</button>
</li>`
    }).join('')

    listRef.innerHTML = el
}

getIce().then(res => createItem(res))


btnOpenRef.addEventListener('click',openModal)

function openModal() {
    backdropRef.style.opacity = '1'
    backdropRef.style.pointerEvents = 'auto'
}

function closeModal() {
     backdropRef.style.opacity = '0'
    backdropRef.style.pointerEvents = 'none'
}

formRef.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(e.currentTarget.elements[0].value)
    const data = {
        image: e.currentTarget.elements[0].value,
        flavour: e.currentTarget.elements[1].value,
        type: e.currentTarget.elements[2].value,
        price: e.currentTarget.elements[3].value,
        description: e.currentTarget.elements[4].value,
    }

    if(curentId === null){
      postIce(data).then(getIce).then(res => createItem(res))

    }

        updateIce(curentId, data).then(getIce).then(res => createItem(res))


      formRef.reset()
      closeModal()

})

listRef.addEventListener('click',(e) => {
    const action = e.target.dataset.action
    const li = e.target.closest('li')
    const id = li.id
    if(!action){
        return
    }
    if(action === 'remove'){
        deleteIce(id).then(getIce).then(res => createItem(res))
        return
    }
    if(action === 'edit'){
            console.log(action)
        openModal()
        curentId = id
        // console.log(li.querySelector('img').src)
        // console.log(li.querySelectorAll('p')[0].textContent)
        formRef.elements[0].value = li.querySelector('img').src
        formRef.elements[1].value = li.querySelectorAll('p')[0].textContent
        formRef.elements[2].value = li.querySelectorAll('p')[1].textContent
        formRef.elements[3].value = li.querySelectorAll('p')[2].textContent
        formRef.elements[4].value = li.querySelectorAll('p')[3].textContent
    }

})

