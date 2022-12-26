//? 1.: Primero llamamos a declarar el formulario y el bloque donde aparecerán los libros

let form = document.querySelector('.main-form');
let spaceBook = document.querySelector('.book-list');
let rangeValue = document.querySelector('[name="note"] + span')
let iconEyes = document.querySelector('.eye-icon')

//? 2.: Segundo declaramos una función que nos permita filtrar el contenido de los input

let getValueAndCheckEmpty = (input) =>{
  
  let value = input.value;
  
  if(value.trim() === '' || value === null ){
    input.setAttribute('placeholder','No lo dejes vacío');
    input.classList.add('error')
    return 'está vacío'
  } else{
    input.parentElement.classList.remove('error')
    return value
  }
}
// //? 3.: Terciero, Creamos la función con la que trabajaremos, esta función recogerá los datos enviados desde el filtro. Y su trabajo será añadir dicha ifnroamción en nuestra lista de libros.

let onFormSubmit = (event) =>{

//   //* No nos podemos olvidar de prevenir los comportamientos por defecto de los form

  event.preventDefault()

//   //* Cazamos las variables de los input que vamos a utilizar

  let title = getValueAndCheckEmpty(form.bookTitle)
  let author = getValueAndCheckEmpty(form.bookAuthor)
  let theme = form.theme.value
  let note = form.note.value
  let checkbox = form.isRidden.checked

  if(title === 'está vacío' || author === 'está vacío'){
    return
  }

  let newBook = document.createElement('article');
  let eyeIcon = checkbox === true ? 'bi-eye' : 'bi-eye-slash';
  newBook.classList.add('book');
  newBook.innerHTML = `
  <div class="book--title">
  <span class="book__title"> ${title} </span> -
  <span class="book__author"> ${author} </span>
</div>
<div class="book--note">
  <span class="book__theme">${theme}</span>
  <span class="book__note">Note: ${note}</span>
  <i class="icon eye-icon bi ${eyeIcon}"></i>
  <i class="icon delete-icon bi bi-trash"></i>
</div>
  `

  spaceBook.append(newBook)
}

spaceBook.onclick = (event) =>{
  if(event.target.classList.contains('delete-icon')){
    const youSure = confirm('¿Estás Seguro?')
    if(youSure) event.target.parentElement.parentElement.remove()
  }
}


form.addEventListener('submit', () => onFormSubmit(event) )

form.note.addEventListener('input', () => {
  rangeValue.innerHTML = form.note.value
})