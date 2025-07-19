
let plussymbol = document.querySelector('.plus');
let inputpage = document.querySelector('#inputcontainer');
let input = document.querySelector('input')
let inputpagecolorboxes = document.querySelectorAll('.navcolorbox1');
let main = document.querySelector('main');
let deleteicon = document.querySelector('.delete');
let deleteactive = false;
let inputactivecolor = '';
const colors = ['red', 'yellow', 'orange', 'green'];


function toggledeletebutton() {
    if (deleteicon.classList.contains('red')) {
        deleteicon.classList.remove('red');
        deleteactive = false;
    }
    else {
        deleteicon.classList.add('red');
        deleteactive = true;
    }
}


deleteicon.addEventListener('click', () => {
    toggledeletebutton()
})

function toggleinputcontainer() {
    console.log(inputpage.style.display)
    if (inputpage.style.display == 'flex') { inputpage.style.display = 'none' }
    else { inputpage.style.display = 'flex'; input.focus(); }
}

function resetinputcolors() {
    for (let i = 0; i < inputpagecolorboxes.length; i++) {
        inputpagecolorboxes[i].classList.remove('border')
    }
    inputpagecolorboxes[0].classList.add('border');
}

plussymbol.addEventListener('click', () => {
    toggleinputcontainer()
})
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        console.log(input.value)
        if (input.value) {

            for (let i = 0; i < inputpagecolorboxes.length; i++) {
                if (inputpagecolorboxes[i].classList.contains('border')) {
                    console.log(inputpagecolorboxes[i].classList[1]);
                    inputactivecolor = inputpagecolorboxes[i].classList[1];
                }
            }
            let id = Math.floor(Math.random() * 1000);
            tokengeneration(id, inputactivecolor, input.value)
            let tokensarr = JSON.parse(localStorage.getItem('tokens')) || []
            tokensarr.push([id, inputactivecolor, input.value])
            localStorage.setItem('tokens', JSON.stringify(tokensarr))
            toggleinputcontainer()
            input.value = ''
        }
        else {
            toggleinputcontainer()
        }
        resetinputcolors()
    }
})
for (let i = 0; i < inputpagecolorboxes.length; i++) {
    inputpagecolorboxes[i].addEventListener('click', () => {
        for (let j = 0; j < inputpagecolorboxes.length; j++) {
            if (i == j) { inputpagecolorboxes[i].classList.add('border') }
            else {
                inputpagecolorboxes[j].classList.remove('border')
            }
        }
    })
}



function takingtokensfromlocal() {
    let tokensfromlocal = JSON.parse(localStorage.getItem('tokens'));
    for (let i = 0; i < tokensfromlocal.length; i++) {
        tokengeneration(tokensfromlocal[i][0], tokensfromlocal[i][1], tokensfromlocal[i][2])
    }
}
function tokengeneration(id, color, content) {

    //tokengenerating
    let container = document.createElement('div');
    container.className = 'token';
    container.innerHTML = `
        <div class="tokenprioroty  ${color}"></div>
        <div class="tokenbody" contenteditable="true">${content}</div> `;

    let contentholder=container.querySelector('.tokenbody');
    contentholder.addEventListener('blur',(e)=>{
        let tokensarr1 = JSON.parse(localStorage.getItem('tokens')) || []
            let index = tokensarr1.findIndex(token => token[0] === id);
             tokensarr1[index][2]=e.target.textContent;
            localStorage.setItem('tokens', JSON.stringify(tokensarr1))
    })



    //delete    
    container.addEventListener('click', () => {
        if (deleteactive) {
            let tokensarr1 = JSON.parse(localStorage.getItem('tokens')) || []
            let index = tokensarr1.findIndex(token => token[0] === id); tokensarr1.splice(index, 1);
            localStorage.setItem('tokens', JSON.stringify(tokensarr1))
            container.remove()
        }
    })
    let tokenpriority = container.querySelector('.tokenprioroty');

    //colorChanging
    tokenpriority.addEventListener('click', () => {
        let index = 0;
        let currentcolor = tokenpriority.classList[1];
        for (let i = 0; i < colors.length; i++) {
            if (colors[i] === currentcolor) {
                index = i;
            }
        }
        tokenpriority.classList.remove(currentcolor);
        tokenpriority.classList.add(colors[(index + 1) % 4]);
        let tokensarr1 = JSON.parse(localStorage.getItem('tokens')) || []
        for (let i = 0; i < tokensarr1.length; i++) {
            if (tokensarr1[i][0] === id) {
                console.log(tokensarr1[i])
                tokensarr1[i][1] = colors[(index + 1) % 4];
                console.log(tokensarr1[i])
            }
        }
        localStorage.setItem('tokens', JSON.stringify(tokensarr1))

    })
    main.appendChild(container)
}

takingtokensfromlocal()