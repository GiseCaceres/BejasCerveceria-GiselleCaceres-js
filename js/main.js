let dineroDelUsuario = 0;
let continuidad=0;
let total=0;
let precio=0;
let n=0;
const arrayProductos = [];
let cantidadProd=[1];
let carrito=[1];

let mostrarProducto = document.getElementById('pProductos');
let mostrarTotal = document.getElementById('pTotal');
let botones = document.getElementsByClassName("boton");
let cant = document.getElementsByClassName("cant");
let tBody=document.querySelector("tbody");
let enviar=document.getElementById("enviar");
let botonesEli=document.getElementsByClassName("eliminar");
let secciones=document.getElementById("formulario");
let botonDeshacer = document.getElementById("deshacer");

//CLASES DE LOS PRODUCTOS
class Productos{
    constructor(marca, cantidad, precio, stock, id){
        this.marca=marca;
        this.cantidad=cantidad;
        this.precio=parseInt(precio);
        this.stock=parseInt(stock);
        this.id= id;
    }

    modificarStock(c){ 
        this.stock= this.stock - c;
    }
}

//CARGAR LOS PRODUCTOS

fetch('/js/stock.json', {
    method: 'GET',
    headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'}
    })
    .then((resp) => resp.json())
    .then((data) => data.map((obj) => arrayProductos.push(obj)))
    .then(() => imprimir());

//LLAMAR A LOS BOTONES 

for(i=0; i<botones.length; i++){
    botones[i].addEventListener("click",(e)=>{
        let capturar= e.target.name;
        if(localStorage.getItem("carrito") === null){
            localStorage.setItem("carrito", [e.target.name]);
            localStorage.setItem("cantidadProd", [cant[capturar-1].value]);
        }
        else if(localStorage.getItem("carrito") !== null && localStorage.getItem("carrito").length === 0){
            localStorage.clear();
            localStorage.setItem("carrito", [e.target.name]);
            localStorage.setItem("cantidadProd", [cant[capturar-1].value]);
        }
        else{
            carrito=localStorage.getItem("carrito").split(",");
            cantidadProd=localStorage.getItem("cantidadProd").split(",");
            cantidadProd.push(cant[capturar-1].value);
            localStorage.setItem("cantidadProd", cantidadProd);
            carrito.push(e.target.name);
            localStorage.setItem("carrito", carrito);
        }
      
        imprimir();
        //PASAR EL RESULTADO DE LA CANTIDAD POR EL PRECIO DEL PRODUCTO
        // sumaProductos(cant[capturar-1].value+arrayProductos[e.target.name].precio);
        if(localStorage.getItem("carrito").length === 0){
            Toastify({
                text: "No hay nada en el carrito",
                duration: 2000,
                gravity: 'top',
                position: 'right',
                style: {
                    background: 'linear-gradient(to right, #00b09b, #96c92d)'
                }
            }).showToast();
        }else{
            Toastify({
                text: "Tu producto se agrego correctamente",
                duration: 2000,
                gravity: 'top',
                position: 'right',
                style: {
                    background: 'linear-gradient(to right, #00b09b, #96c92d)'
                }
            }).showToast();
        }
    });
}


function crearNuevoNodo(valor,num,botonEli){//crea un nuevo nodo hijo de tBody
    let newNodo=document.createElement("tr");
    if(botonEli){
        let crearEliminar=`<td id="box">
                            <button name="${num}" class="eliminar" onclick="eliminar(this)"><i class="fa fa-times"></i></button>
                        </td></tr>`;
        newNodo.innerHTML+= valor+crearEliminar;
    }
    else{
        newNodo.innerHTML+= valor;
    }
    tBody.appendChild(newNodo);
}

function imprimir(){
    let listaP=0;
    let listaC=0;
    tBody.innerHTML="";
    total=0;
    listaP=localStorage.getItem("carrito").split(",");
    listaC=localStorage.getItem("cantidadProd").split(",");
    for(i=0;i<listaP.length;i++)
    {
        let producto = listaP[i];
        let cantidad = listaC[i];

        crearNuevoNodo(`<tr><th name="${i}" scope="row">${arrayProductos[producto-1].id}</th><td>${arrayProductos[producto-1].marca}</td><td>${cantidad}</td><td>${arrayProductos[producto-1].precio}</td><td>${(arrayProductos[producto-1].precio)*cantidad}</td>`,i,true);
        total=total+(cantidad*arrayProductos[producto-1].precio);
    }

    crearNuevoNodo(`<tr class="table-dark"><th scope="subtotal"></th><td></td><td></td><td>Sub-Total:</td><td>${total}</td><td></td></tr>`,false);
}


function eliminar(e){
    removerNodo(`<th name="${e.name}"`,e.name);
}
  
function removerNodo(valor, num){
    let listaP=0;
    let listaC=0;
    for (let child of tBody.childNodes){
      if(child.innerHTML !== undefined) 
        if(child.innerHTML.includes(valor)){
          tBody.removeChild(child);//Eliminamos el nodo
         
          listaC=localStorage.getItem("cantidadProd").split(",");
          listaP=localStorage.getItem("carrito").split(",");
          
          listaP.splice(num,1);
          listaC.splice(num,1); 
          localStorage.setItem("carrito",listaP);
          localStorage.setItem("cantidadProd",listaC);

          imprimir(); 
        }
    }
}

function decidir(valor){
    secciones.classList.toggle("mostrar");
    if(localStorage.getItem("carrito").length === 0){
        Swal.fire({
            icon: 'error',
            title:  "No hay nada en el carro",
            showConfirmButton: true,
            timer: 2000
          })
    } else if(valor){
        enviar.classList.toggle("noMostrar");
        botonDeshacer.classList.toggle("mostrar");
        alerta("Su pedido se a enviado con exito");
        for (let boton of botonesEli)
          boton.onclick = "";
    }
    else{ 
        imprimir();
        alerta("Su pedido se a cancelado con exito");
        botonDeshacer.classList.toggle("mostrar");
        enviar.classList.toggle("mostrar");

    }
}

function alerta(valor){
    Swal.fire({
        icon: 'success',
        title: valor,
        showConfirmButton: false,
        timer: 2000
      })
}






