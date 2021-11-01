import {data} from '../data/data.js';


const templateCard = document.getElementById('templateCard').content;
const fragment = document.createDocumentFragment();
const items = document.getElementById('items');
const detail = document.getElementById('detail');
const shoppingList = document.getElementById('shoppingList');
const totalList = document.getElementById('totalList');
let peli = { };



document.addEventListener('DOMContentLoaded', () => {

    loadData(data);
})


const loadData = data => {

   data.forEach(hero => {

       const {id,titulo,image} = hero;

       templateCard.querySelector('h5').textContent = titulo;
       templateCard.querySelector('img').setAttribute('src',image);
       templateCard.querySelector('img').dataset.id = id;

       const clone = templateCard.cloneNode(true);

       fragment.appendChild(clone)
   } )


   items.appendChild(fragment);
}



form.addEventListener('submit', () => {
           

    let inputName = document.querySelector('#inputName').value;
    let email = document.querySelector('#email').value;
    let phone = document.querySelector('#phone').value;
    let address = document.querySelector('#address').value;
    let gender = document.querySelector('#gender').value
    let message = document.querySelector('#msm').value;


    if(inputName=="" || email=="" || phone=="" || address=="" || gender=="" || message==""){
         alert('Ingresar todos los campos');
         return true;
    }
    else{
        if(isNaN(inputName)){
            localStorage.setItem("Name", inputName);
            localStorage.setItem("Email", email);
            localStorage.setItem("Phone", phone);
            localStorage.setItem("Address", address);
            localStorage.setItem("Gender", gender);
            localStorage.setItem("Message", message);
            getLocalStorage();
        }else{
             alert("Name most string");
        }
        return false;
    }

    
})


function getLocalStorage(){
    let nameSave = localStorage.getItem("Name");
    let emailSave = localStorage.getItem("Email");
    let phoneSave = localStorage.getItem("Phone");
    let addressSave = localStorage.getItem("Address");
    let genderSave = localStorage.getItem("Gender");
    let messageSave = localStorage.getItem("Message");
    alert(`La información suministrada es: 
    Nombre: ${nameSave} 
    E-mail: ${emailSave}
    Teléfono: ${phoneSave}
    Dirección: ${addressSave}
    Género: ${genderSave}
    Observaciones: ${messageSave}`);
}




items.addEventListener('click', e => {

   let idTarget = e.target.dataset.id;
   

   data.forEach(peli => {

       const {id,titulo,año,duracion,generos,sinopsis, reparto,image} = peli;

       if(id == idTarget){

           const objeto = {
               id: id,
               titulo: titulo,
               año: año,
               duracion: duracion,
               generos: generos,
               sinopsis: sinopsis,
               reparto: reparto,
               image: image
           }
           

           localStorage.setItem("Peli",JSON.stringify(objeto));
           getPeli();
           window.scrollTo(0,2300)
       }   
   })
   e.stopPropagation();
   e.preventDefault();
})


function getPeli(){
    detail.innerHTML = '';

    peli = JSON.parse(localStorage.getItem("Peli")); 

    const {titulo,año,duracion,generos,sinopsis, reparto,image} = peli;
  
    detail.innerHTML = `
    <table border="2px" align="center">
    <tr>
        <td rowspan="3"><img src="${image}"  width="400" height="500"></td>
        <td align="center">
         <h2>Titulo: ${titulo}</h2>
         <h4>Año: ${año}</h4>
         <h4>Duración: ${duracion}</h4>
         <h4>Géneros: ${generos}</h4>
         <h4>Sinópsis: ${sinopsis}</h4>
         <h4>Reparto: ${reparto}</h4>
        </td>
    </tr>
</table>
    `
}


//-----------------------------------CAROUSEL---------------------------------------------------\\
//-----------------------------------------------------------------------------------------------\\

const fila = document.querySelector('.contenedor-carousel');
const peliculas = document.querySelectorAll('.pelicula');

const flechaIzquierda = document.getElementById('flecha-izquierda');
const flechaDerecha = document.getElementById('flecha-derecha');

// ? ----- ----- Event Listener para la flecha derecha. ----- -----
flechaDerecha.addEventListener('click', () => {
	fila.scrollLeft += fila.offsetWidth;

	const indicadorActivo = document.querySelector('.indicadores .activo');
	if(indicadorActivo.nextSibling){
		indicadorActivo.nextSibling.classList.add('activo');
		indicadorActivo.classList.remove('activo');
	}
});

// ? ----- ----- Event Listener para la flecha izquierda. ----- -----
flechaIzquierda.addEventListener('click', () => {
	fila.scrollLeft -= fila.offsetWidth;

	const indicadorActivo = document.querySelector('.indicadores .activo');
	if(indicadorActivo.previousSibling){
		indicadorActivo.previousSibling.classList.add('activo');
		indicadorActivo.classList.remove('activo');
	}
});

// ? ----- ----- Paginacion ----- -----
const numeroPaginas = Math.ceil(peliculas.length / 5);
for(let i = 0; i < numeroPaginas; i++){
	const indicador = document.createElement('button');

	if(i === 0){
		indicador.classList.add('activo');
	}

	document.querySelector('.indicadores').appendChild(indicador);
	indicador.addEventListener('click', (e) => {
		fila.scrollLeft = i * fila.offsetWidth;

		document.querySelector('.indicadores .activo').classList.remove('activo');
		e.target.classList.add('activo');
	});
}

// ? ----- ----- Hover ----- -----
peliculas.forEach((pelicula) => {
	pelicula.addEventListener('mouseenter', (e) => {
		const elemento = e.currentTarget;
		setTimeout(() => {
			peliculas.forEach(pelicula => pelicula.classList.remove('hover'));
			elemento.classList.add('hover');
		}, 300);
	});
});

fila.addEventListener('mouseleave', () => {
	peliculas.forEach(pelicula => pelicula.classList.remove('hover'));
});