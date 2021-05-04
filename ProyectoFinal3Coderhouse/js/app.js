// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
let articulosCarrito = [];

// Listeners
cargarEventListeners();

function cargarEventListeners() {
     // Cuando se presiona "Agregar Carrito"
     listaCursos.addEventListener('click', agregarCurso);

     // Cuando se elimina un curso del carrito
     carrito.addEventListener('click', eliminarCurso);

     // Vaciar el carrito
     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);


     // Contenido cargado
     document.addEventListener('DOMContentLoaded', () => {
          articulosCarrito = JSON.parse( localStorage.getItem('carrito') ) || []  ;
          // console.log(articulosCarrito);
          carritoHTML();
     });
}


// Añade el curso al carrito
function agregarCurso(e) {
     e.preventDefault();
     
     if(e.target.classList.contains('agregar-carrito')) {
          const curso = e.target.parentElement.parentElement;
          
          leerDatosCurso(curso);
     }
}

// Leer los datos del curso
function leerDatosCurso(curso) {
     const infoCurso = {
          imagen: curso.querySelector('img').src,
          titulo: curso.querySelector('h4').textContent,
          precio: curso.querySelector('.precio span').textContent,
          id: curso.querySelector('a').getAttribute('data-id'), 
          cantidad: 1
     }


     if( articulosCarrito.some( curso => curso.id === infoCurso.id ) ) { 
          const cursos = articulosCarrito.map( curso => {
               if( curso.id === infoCurso.id ) {
                    let cantidad = parseInt(curso.cantidad);
                    cantidad++
                    curso.cantidad =  cantidad;
                    return curso;
               } else {
                    return curso;
               }
          })
          articulosCarrito = [...cursos];
     }  else {
          articulosCarrito = [...articulosCarrito, infoCurso];
     }

     console.log(articulosCarrito)

     

     // console.log(articulosCarrito)
     carritoHTML();
}

// Elimina curso del carrito en el DOM
function eliminarCurso(e) {
     e.preventDefault();
     if(e.target.classList.contains('borrar-curso') ) {
          
          const curso = e.target.parentElement.parentElement;
          const cursoId = curso.querySelector('a').getAttribute('data-id');
          
          // Eliminar del arreglo del carrito
          articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

          carritoHTML();
     }
}


// Muestra el curso en el Carrito
function carritoHTML() {

     vaciarCarrito();

     articulosCarrito.forEach(curso => {
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>  
                    <img src="${curso.imagen}" width=100>
               </td>
               <td>${curso.titulo}</td>
               <td>${curso.precio}</td>
               <td>${curso.cantidad} </td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
               </td>
          `;
          contenedorCarrito.appendChild(row);
     });

     
     sincronizarStorage();

}


 
function sincronizarStorage() {
     localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
     // forma rapida (recomendada)
     while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
      }
}


//Jquery - TP 12 y 13
$(function() 
{
   console.log( "El DOM esta listo" );
});

$('#busqueda').submit(function (e) {
     e.preventDefault();
     console.log("Buencando...");
     //$('#lista-cursos').fadeOut(3000); --> ocultar la lista de cursos
     // $(".icono3").prepend('<h3>¡Hola Coder1!</h3>');

     $("#aprende, #aprende2").css("color", "red")
        .slideUp(2000)
        .slideDown(2000)
        //.prepend('<div class="alert alert-success"> <strong>Disculpe!</strong> El buscador no se encuentra funcionando actualmente.</div>');   

})

$(".agregar-carrito").mouseenter(function () {
     console.log("Mirando...");
     $( this ).css("background-color", "red");
})

$(".agregar-carrito").mouseleave(function () {
     console.log("Mirando...");
     $( this ).css("background-color", "#33C3F0");
})