//asignacion de la tecla "Enter";
let enter = document.getElementById("total");
enter.addEventListener("keypress", function(e){
if(e.key == "Enter"){
    ingresar_cuenta();
    monto_total();
}
})

//registro de cuenta
document.getElementById("registrarse").addEventListener("click", function(e) {
    
    let registro_usuario = document.getElementById("registrar_usuario");
    let registro_clave = document.getElementById("registrar_clave");
    let cuenta_nueva = { usuario: registro_usuario.value, clave: registro_clave.value };

    let cuentasLs = JSON.parse(localStorage.getItem("cuentas"));
    if(!cuentasLs){
        cuentasLs = [];
        cuentasLs.push(cuenta_nueva);
        localStorage.setItem("cuentas", JSON.stringify(cuentasLs));
    } else {
        let found = cuentasLs.find(cuenta => cuenta.usuario === cuenta_nueva.usuario);
        if(found){
            Swal.fire({
                title:'El usuario ya existe',
                icon: 'error'
            });
        } else {
            cuentasLs.push(cuenta_nueva);
            localStorage.setItem("cuentas", JSON.stringify(cuentasLs));

            Swal.fire({
                title:'¡Se creo la cuenta con exito!',
                icon: 'success'
            });
        }
    }

});

//inicio de sesion de la cuenta
document.getElementById("iniciar_sesion").addEventListener("click", function(e){

    let nombre_usuario = document.getElementById("ingresar_usuario").value;
    let clave_usuario = document.getElementById("ingresar_clave").value;
    let inicio_sesion = {usuario:nombre_usuario, clave:clave_usuario};
    let cuentasLs = JSON.parse(localStorage.getItem("cuentas"));
    if(!cuentasLs) return;

    let found = cuentasLs.find(cuenta => cuenta.usuario === nombre_usuario);
    !found ? Swal.fire({
        title: 'Email incorrecto',
        icon: 'error'
        }) : false

    if(clave_usuario === found.clave){
        document.getElementById("total").innerHTML = ''
        let html = `<div id="clima"> 
        </div>Hola, bienvenido a la calculadora de cuentas mensuales. <br>
        Ingrese el nombre de la cuenta que debe pagar con su respectivo precio debajo del nombre. <br>
        Cuenta:
        <input type="text" id="cuenta"> <br>
        Precio :  
        <input type="number" id="precio"> <br>
        <button id="cuenta_nueva" onclick="ingresar_cuenta()">Ingresar cuenta</button>
        <button id="total" onclick="monto_total()">Monto total a pagar</button><br>
        Lista de cuentas ingresadas:
        <ul id="enlistado">
        </ul>
        <div id="cuenta_total">
        </div>`;
        for(let cuentas of lista_cuentas){
            html = html + `
                            <ul><li>${cuentas.nombre}: ${cuentas.precio}$ </li></ul>`;     
        }
        document.getElementById("total").innerHTML = html    
        Swal.fire({
            title: 'Bienvenidx',
            icon: 'success'
            })
        
            let contenedor = document.getElementById("clima");
            let ciudad = "Buenos Aires";
            
            //fetch
            fetch("https://api.openweathermap.org/data/2.5/weather?q="+ ciudad +"&lang=es&units=metric&appid=6a632b213d76e1a61f994d825ac45f37")
                .then(response => response.json())
                .then(data =>{
                    contenedor.innerHTML = `<span> Ciudad: ${data.name}</span> 
                                            <span> Temp: ${data.main.temp}</span>`
                })
        
        }else{
         Swal.fire({
            title: 'contraseña incorrecta',
            icon: 'error'
            })
    }   
})




let lista_cuentas = [];
let precio_total = 0;

//lista de cuentas
class cuentas{
    constructor(nombre,precio){
        this.nombre = nombre;
        this.precio = precio; 
    }
}

//ingreso de cuentas mediante el usuario
function ingresar_cuenta(){
    let nombre = document.getElementById("cuenta").value;
    let precio = document.getElementById("precio").value;
    
    if(precio > 0){
    precio_total = precio_total + parseFloat(precio); 

    let nueva_cuenta = new cuentas(nombre , precio);
    lista_cuentas.push( nueva_cuenta );


    let enlistado = document.getElementById("enlistado");
    let li = document.createElement("li");

    li.innerHTML = `<span>${nombre}: ${precio}$</span>
                    `; 
    enlistado.append(li);

    }
}


//sumatoria y lista de cuentas a pagar por el usuario
function monto_total(){  
    console.log(...lista_cuentas);
    document.getElementById("cuenta_total").innerHTML = ''
    let html = ``;
    html = html + `<br> <h1>El monto total a pagar es de: ${precio_total}</h1>`;
    document.getElementById("cuenta_total").innerHTML = html
}


