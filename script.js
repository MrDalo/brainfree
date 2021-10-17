/*Animaciu side barov sprav tak, ze arrow a burger menu ostane len, ostatne das do display:none a zmenis pozadie, bdue sa lepsie robit animacia 
a nebude s tym problem. Dokazes spravit jedno burger menu a jednu arrow in circle*/

function getData(){

   return false;
}


function createNewTask(e){
    console.log(e);
}

function settingsOfMatrix(){

}


function burgerMenuTrigger(){
    document.getElementById("leftMenu").classList.toggle("triggered");
}

function arrowCircleTrigger(){
    document.getElementById("rightMenu").classList.toggle("triggered");

}



console.log(document.getElementById("taskComplete"));