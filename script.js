
let plussymbol = document.querySelector('.plus');
let inputpage = document.querySelector('#inputcontainer');
let input = document.querySelector('input')
let Navbarcolorboxes = document.querySelectorAll('.navcolorbox');
let inputpagecolorboxes = document.querySelectorAll('.navcolorbox1');
let main = document.querySelector('main');
let deleteicon = document.querySelector('.delete');
let deleteactive = false;
let inputactivecolor = '';
const colors = ['red', 'yellow', 'orange', 'green'];
const tokencomponents = {};


//Toggle Delete Option
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

//Toggle Input Page hide and visible
function toggleinputcontainer() {
    // console.log(inputpage.style.display)
    if (inputpage.style.display == 'flex') { inputpage.style.display = 'none' }
    else { inputpage.style.display = 'flex'; input.focus(); }
}


//ColorToggling in Input page
function resetinputcolors() {
    for (let i = 0; i < inputpagecolorboxes.length; i++) {
        inputpagecolorboxes[i].classList.remove('border')
    }
    inputpagecolorboxes[0].classList.add('border');
}

plussymbol.addEventListener('click', () => {
    toggleinputcontainer()
})



//Creating Token
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        if (input.value) {

            for (let i = 0; i < inputpagecolorboxes.length; i++) {
                if (inputpagecolorboxes[i].classList.contains('border')) {
                    inputactivecolor = inputpagecolorboxes[i].classList[1];
                }
            }
            let id = Math.floor(Math.random() * 1000);
            tokengeneration(id, inputactivecolor, input.value)
            let tokensarr = TokenGetting();
            tokensarr.push([id, inputactivecolor, input.value])
            TokenSetting(tokensarr);
            toggleinputcontainer()
            input.value = ''
        }
        else {
            toggleinputcontainer()
        }
        resetinputcolors()
    }
})

//Resetting Active color in Input
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

//Getting Tokens from LocalStorage
function TokenGetting() {
    return JSON.parse(localStorage.getItem('tokens')) || [];
}

//Setting Tokens to LocalStorage
function TokenSetting(arr) {
    localStorage.setItem('tokens', JSON.stringify(arr));
}


function takingtokensfromlocal() {
    let tokensfromlocal = TokenGetting();
    for (let i = 0; i < tokensfromlocal.length; i++) {
        tokengeneration(tokensfromlocal[i][0], tokensfromlocal[i][1], tokensfromlocal[i][2])
    }
}

function tokengeneration(id, color, content) {
    //
    

    //tokengenerating
    let container = document.createElement('div');
    container.className = 'token';
    container.innerHTML = `
        <div class="tokenprioroty  ${color}"></div>
        <div class="tokenbody" contenteditable="true">${content}</div> `;


    //Content Editing   
    let contentholder = container.querySelector('.tokenbody');
    contentholder.addEventListener('blur', (e) => {
        let tokensarr1 = TokenGetting();
        let index = tokensarr1.findIndex(token => token[0] === id);
        tokensarr1[index][2] = e.target.textContent;
        TokenSetting(tokensarr1);
    })

    //Hiding
    function hide() {
        container.style.display = 'none';

    }
    function disp() {

        container.style.display = 'block';

    }

    //Delete    
    container.addEventListener('click', () => {
        if (deleteactive) {
            let tokensarr1 = TokenGetting();
            let index = tokensarr1.findIndex(token => token[0] === id); tokensarr1.splice(index, 1);
            TokenSetting(tokensarr1);
            container.remove()
            delete tokencomponents[id];
        }
    })
    

    //colorChanging
    let tokenpriority = container.querySelector('.tokenprioroty');
    tokenpriority.addEventListener('click', () => {
        console.log(tokencomponents)
        let index = 0;
        let currentcolor = tokenpriority.classList[1];
        for (let i = 0; i < colors.length; i++) {
            if (colors[i] === currentcolor) {
                index = i;
            }
        }
        tokenpriority.classList.remove(currentcolor);
        tokenpriority.classList.add(colors[(index + 1) % 4]);
        let tokensarr1 = TokenGetting();
        for (let i = 0; i < tokensarr1.length; i++) {
            if (tokensarr1[i][0] === id) {
                tokensarr1[i][1] = colors[(index + 1) % 4];
            }
        }
        TokenSetting(tokensarr1);
    })

    let activenavcolor=NavActiveColor();
    if(activenavcolor && activenavcolor!==color){
      hide();
    }
    main.appendChild(container)
    tokencomponents[id] = { hide, disp, container };
}

//Initializing the Tokens from LocalStorage
takingtokensfromlocal()

//Navbar Color Bars
for (let i = 0; i < Navbarcolorboxes.length; i++) {
    Navbarcolorboxes[i].addEventListener('click', () => {
        RemoveNavBorders();
        for (let k = 0; k < Navbarcolorboxes.length; k++) {
            if (k === i) {
                Navbarcolorboxes[k].classList.add('border');
            }
        }
        let color = Navbarcolorboxes[i].classList[1];
        let tokens = TokenGetting();
        for (let j = 0; j < tokens.length; j++) {
            let ticketcolor = tokens[j][1];
            let id = tokens[j][0];
            if (tokencomponents[id]) {
                if (color !== ticketcolor) {
                    tokencomponents[id].hide();
                }
                else {
                    tokencomponents[id].disp();
                }
            }
        }
    })
}


//removeborders
function RemoveNavBorders() {
    for (let i = 0; i < Navbarcolorboxes.length; i++) {
        Navbarcolorboxes[i].classList.remove('border');
    }
}

//GivesCurrentNavBorder
function NavActiveColor() {
    for (let i = 0; i < Navbarcolorboxes.length; i++) {
        if (Navbarcolorboxes[i].classList.contains('border')){
           return Navbarcolorboxes[i].classList[1]
        }
    }
}

//ResetTokenPreferences
let preferencereset = document.querySelector('#navcolorbar p');
preferencereset.addEventListener('click', () => {
    RemoveNavBorders();
    for (let id in tokencomponents) {
        let component = tokencomponents[id];
        component.disp()
    }

})
