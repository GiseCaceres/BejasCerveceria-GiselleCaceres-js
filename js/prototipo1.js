

function agregarAlCarrito(){

    dineroDelUsuario = parseInt(prompt("¿Cuanto dinero ingresas?"));

    do{
        //indicamos lo que le ancanza
        let producto= limiteDeCompra();
        
        let cantidad=parseInt(prompt("¿Cuantos quieres?"));


        alert("Usted elijio "+ arrayProductos[producto-1].marca);
        arrayProductos[producto-1].modificarStock(cantidad);
        if (arrayProductos[producto-1].stock < 0 || Number.isNaN(cantidad)){
            alert("No tenemos suficiente stock en este momento")
            precio=0;
            cantidad=0;
        }
        else{
            if(dineroDelUsuario >= arrayProductos[producto-1].precio){
                dineroDelUsuario=dineroDelUsuario-arrayProductos[producto-1].precio;
                alert("El pago se realizo con exito a usted le queda "+ dineroDelUsuario);

                total = total +(total + arrayProductos[producto-1].precio*cantidad);
                mostrarProducto.innerText = mostrarProducto.innerText + "Poducto: " + arrayProductos[producto-1].marca + " Cantidad: " + cantidad + "\n";
            }
            else{
                alert("No te alcanza para realizar esta compra");
            }
        }


        if(dineroDelUsuario<300){
            ingDinero=parseInt(prompt("A usted no le alcanzaria para comprar mas productos\n1. Ingresar mas dinero\n2. Salir"));
            if(ingDinero==1)
                dineroDelUsuario=dineroDelUsuario+(parseInt(prompt("Le sobro "+ dineroDelUsuario +", Ingrese dinero:")));
            else break;
        }
        continuidad = prompt("¿Desea continuar elijiendo?\n si/no").toLowerCase();

    }while(continuidad != "no");
}

