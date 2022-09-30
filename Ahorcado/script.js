/* Algun día:
- Agregar un localStorage para agregar palabras desde el campo de forma permanente. Asi no tener que editar el archivo JavaScript para agregar palabras. 
- Crear funcion para no repetir palabra anterior para sortear. (Idea) utilizando un par de variables y darles como valor la palabra anterior y la otra a la palabra nueva. Asi para decir que la palabra nueva nunca puede ser igual a la anterior


Corregir a futuro:
Prohibir que el usuario pueda ingresar una nueva palabra que contenga numeros y simbolos especiales.

Que el juego solo se active cuando se de click a iniciar juego. Por las scopes, no se me permite conseguir este objetivo. Pero como el usuario no va a ver el error de forma visual, entonces es redundante. 



/*------------Boton Iniciar Juego----------- */

function inicioJugar(){
    
    document.getElementById("pantalla_inicio").style.display="none";
    document.getElementById("pantalla_juego").style.display="inline-block";
    nuevoJuego();
    
    
}/*Al dar click al boton Iniciar Juego, aparece el juego.*/
 
var letrasPermitidas="qwertyuiopñlkjhgfdsazxcvbnm";
var permitidas=letrasPermitidas.split("");
/*--Verificar palabras y separar las letras en grupos:--*/
var letraIndividual;

var listPalabras=["alura".split(""),"juego".split("")]; 
/*Palabras predeterminadas del array */


/*-----Para Agregar palabras desde el archivo JS----*/
function addPalabra(palabra){
    
    if(palabra.length>12){
        console.log("El maximo de letras es doce. Ingrese una palabra mas corta");
        return;
    }
 
    letraIndividual=palabra.split("");/*Separar la palabra por letra y retornarlo en un array*/
    /*letraIndividual seria el array con las letras separadas. */
    listPalabras.push(letraIndividual);
    /*Al array listPalabras se le ingresará al fnal el array con la nueva palabra con letras separadas */
}

/*Agregar palabra del campo HTML a la lista de palabras--*/
function addPalabrita(){

    var palabrita=document.getElementById("campoAgegarPalabra").value.toLowerCase();
    
    letraIndividual=palabrita.split("");/*Separar la palabra por letra y retornarlo en un array*/
    /*letraIndividual seria el array con las letras separadas. */

    if(palabrita.length>12){
        console.log("El maximo de letras es doce. Ingrese una palabra mas corta");
        document.getElementById("letrasMaximas").style.visibility="visible"
        return;
    }else{
        listPalabras.push(letraIndividual);
        /*Al array listPalabras se le ingresará al fnal el array con la nueva palabra con letras separadas */
       
        letraIndividual.forEach((element) =>{
           if(!(permitidas.includes(element))){
                document.getElementById("campoAgegarPalabra").value="";
                console.log("no se puede");
                listPalabras.pop(letraIndividual);
                
                return;
           }else{
                document.getElementById("letrasMaximas").style.visibility="hidden";
            }
        })

         console.log(listPalabras);
        console.log("'"+palabrita+"' se ha agregado a la lista");
    }
 
    
    
}
/*Entonces lo que agregue en el campo va a ir dentro del array de lista de palabras. */


/*Esto supuestamente sería ingresado por el usuario si hubiese un local storage (base de datos)*/
/*Palabras ingresadas localmente en el JS */ 
addPalabra("desafio");
addPalabra("maquina");
addPalabra("programar");
addPalabra("computador");
addPalabra("maquina");
addPalabra("cancion");
/*--------------------------- */
console.log(listPalabras); /*En consola se mostrara todas las palabras disponibles.*/

/*Sortear numero para dar palabra aleatoria de la lista*/ 

function seleccionRandom(lista){
    return lista[Math.floor(Math.random()*(listPalabras.length))];
}
var palabraAleatoria= seleccionRandom(listPalabras);

/*PalabraAleatoria es la ultima palabra (separada en letras) que se eligió de manera random */

/*----------------letras a pantalla---------------------*/

var listaaa= document.getElementById("letra_correcta");

/*listaaa es el campo donde se mostrará la palabra a descubrir.*/

function cargarPalabra(){
palabraAleatoria.forEach((element,index) => {
    listaaa.innerHTML+=`<li class="contenedor_letra"><div class="letra" id="tecla${index}" style="visibility:hidden">${element}</div></li>`
});
}



/*--------Detectar tecla----------- */

var letritaGan=[]; /*Array que contendrá las letras correctas que ingrese el usuario */

var letritaInc=[];/*Array que contendrá las letras incorrectas que ingrese el usuario */

var puntoGanado=0;/*puntos por cada letra correcta */
var puntoPerdido=0;/*puntos por cada letra incorrecta */







document.addEventListener("keyup",function(event){

    /*Si se suelta una tecla que corresponde con la palabra oculta: Se verificará si se ha utilizado antes. Si se utlizó, dira que se ha repetido, si es nueva se agregará como letra nueva*/
    if(palabraAleatoria.includes(event.key)&& permitidas.includes(event.key)){
        
        if(letritaGan.includes(event.key)){
            return console.log("Ya se ha repetido "+event.key);
        }else{
        letritaGan.push(event.key);
       
        console.log("Se ha agregado la letra "+event.key+" al array letra correcta");
        }

        console.log(letritaGan);
    } else if(!(palabraAleatoria.includes(event.key))&& permitidas.includes(event.key)){/*Sucede lo mismmo que pasaba i se ingresaba una letra correcta, pero ahora con una letra incorrecta. */

        if(letritaInc.includes(event.key)){
            return console.log("Ya se ha repetido "+event.key+" incorrectamente");
        }else{
            letritaInc.push(event.key);

            console.log("Se ha agregado la letra "+event.key+" al array letra incorrecta");
            console.log(letritaInc);
            puntoPerdido++;
            console.log("puntos perdidos "+puntoPerdido);

            if(puntoGanado<palabraAleatoria.length){
                document.getElementById("palo"+letritaInc.length).style.visibility="visible";

                /*campo letras incorrectas */
                document.getElementById("letra_incorrecta").innerHTML+=`<li class="letra">${event.key}</li>`
            }
            
          if(puntoPerdido>=9 &&puntoGanado<palabraAleatoria.length){
              document.getElementById("lose").style.display="inline-block";
              
          }
                
        }
    }

    palabraAleatoria.forEach((element,index) => {

        if(event.key==element && puntoPerdido<9){
            // console.log(event.key);
            document.getElementById("tecla"+index).style.visibility="visible";

            puntoGanado++;
            console.log("Vas acumulando "+puntoGanado+" puntos");
            
            if(puntoGanado>=palabraAleatoria.length && puntoPerdido<=9){
                document.getElementById("win").style.display="inline-block";
                
            }
            

        } 

    });

    
})


/*-----------------------------------*/

/*-----------------Boton Nuevo Juego--------------- */
function nuevoJuego(){
    
    /*Al hacer click al boton, se borrará el campo */
    listaaa.innerHTML="";

    document.getElementById("letra_incorrecta").innerHTML="";

    puntoGanado=0;//Para reiniciar el conteno de puntos
    
    puntoPerdido=0;
    
    
    letritaGan=[];//Vaciar array de letras utilizadas.
    letritaInc=[];

    /*Volver a sortear palabra */
    palabraAleatoria=seleccionRandom(listPalabras);

    cargarPalabra();
    
    console.log(palabraAleatoria);

    document.getElementById("win").style.display="none";
    document.getElementById("lose").style.display="none";

    for(var i=1;i<=9;i++){
        document.getElementById("palo"+i).style.visibility="hidden";
    }


}

/*-------------------Boton Desistir----------- */
function botonDesistir(){

    document.getElementById("pantalla_inicio").style.display="inline-block";
    document.getElementById("pantalla_juego").style.display="none";
    document.getElementById("pantalla_agregar").style.display="none";
    
    document.getElementById("campoAgegarPalabra").value="";
    document.getElementById("letrasMaximas").style.visibility="hidden";
}
/*------------------Agregar palabra--------------------*/ 
function inicioAgregar(){
    document.getElementById("pantalla_inicio").style.display="none";
    document.getElementById("pantalla_agregar").style.display="inline-block";
    
}


  



