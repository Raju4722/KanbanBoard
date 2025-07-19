
let plussymbol = document.querySelector('.plus');
let inputpage = document.querySelector('#inputpage');
let input = document.querySelector('input')
let inputpagecolorboxes = document.querySelectorAll('.navcolorbox1');
let main = document.querySelector('main');

function toggleinputcontainer() {
    console.log(inputpage.style.display)
    if (inputpage.style.display == 'flex') { inputpage.style.display = 'none' }
    else { inputpage.style.display = 'flex' }
}
plussymbol.addEventListener('click', () => {
    toggleinputcontainer()
})
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        let container = document.createElement('div');
        container.className = 'token';
        container.textContent = input.value;
        container.innerHTML=`
        
        `

        main.appendChild(container)
           toggleinputcontainer() 
           input.value=''
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