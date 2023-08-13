// change the object to change it back to true/false
let selectedDog;
let allDogs;


fetch('http://localhost:3000/pups')
.then(r => r.json())
.then(dogData => {
    allDogs = dogData
    dogData.forEach(dogs => renderDogs(dogs))
})


function renderDogs(dogs) {
    const dogBar = document.querySelector('#dog-bar')
    let span = document.createElement('span')
    span.textContent = dogs.name
    dogBar.append(span)

    span.addEventListener('click', () => {
        selectedDog = dogs
        const dogInfo = document.querySelector('#dog-info')
        dogInfo.innerHTML = '';
        const img = document.createElement('img')
        const dogNm = document.createElement('h2')
        const btn = document.createElement('button')

        img.src = dogs.image
        dogNm.textContent = dogs.name
        btn.textContent = goodOrBad(dogs.isGoodDog, selectedDog)
        dogInfo.append(img, dogNm, btn)
        
        btn.addEventListener('click', () => {
            if (btn.textContent === 'Good Dog!') {
                dogs.isGoodDog = false
                btn.textContent = 'Bad Dog!'
            } else if (btn.textContent === 'Bad Dog!') {
                dogs.isGoodDog = true
                btn.textContent = 'Good Dog!'
            }

            const updateObj = {
                "id": dogs.id,
                "isGoodDog": dogs.isGoodDo
            }
            updateDb(updateObj)
        })
    })
}

function goodOrBad(status, selectedDog) {
    if (status) {
        return 'Good Dog!'
    } else {
        return 'Bad Dog!'
    }
}

function updateDb(updateObj) {
fetch(`http://localhost:3000/pups/${updateObj.id}`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify(updateObj)
})
    .then(r => r.json())
    .then(updated => console.log(updated))
}

// Toggle
document.addEventListener('DOMContentLoaded', () => toggle())

function toggle() {
const toggle = document.querySelector('#good-dog-filter')
toggle.addEventListener('click', (e) => {
    const dogBar = document.querySelector('#dog-bar')
    dogBar.innerHTML = ""
    
    if (toggle.textContent.includes('OFF')) {
        toggle.textContent = toggle.textContent.replace('OFF', 'ON')
        const good = allDogs.filter((allDogs) => allDogs.isGoodDog === true)
        good.forEach((good) => renderDogs(good))

    } else {
        // toggle.textContent = toggle.textContent.replace('ON', 'OFF')
        // const bad = allDogs.filter((allDogs) => allDogs.isGoodDog === true)
        // bad.forEach((bad) => renderDogs(bad))
        toggle.textContent = toggle.textContent.replace('ON', 'OFF')
        allDogs.forEach((allDogs) => renderDogs(allDogs))
    }
})
}