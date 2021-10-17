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
    let leftMenu = document.getElementById("leftMenu");
    leftMenu.classList.toggle("notVisibleLeft");
    
    let menuLinesArray = document.querySelectorAll(".menuLines");

    /*Prekonvertuje premennu 'menuLinesArray' na array, prejde kazdy prvok a togglne jeho class na 'notTriggered'*/
    Array.from(menuLinesArray).forEach(element =>{
        element.classList.toggle("notVisibleLine");
    })
    
    /*Hide every element except burgerMenu */
    Array.from(leftMenu.children).forEach(element =>{
        if(element.id != "burgerMenu"){
            element.classList.toggle("notVisibleElements");
        }
    })
}

function arrowCircleTrigger(){
    let rightMenu = document.getElementById("rightMenu");
    rightMenu.classList.toggle("notVisibleRight");
        
    var arrow = document.getElementById("rightArrowCircle");
    arrow.classList.toggle("notVisibleArrowCircle");

    Array.from(arrow.children).forEach(element =>{
        element.classList.toggle("notVisibleArrowLine");
    })
    
    Array.from(rightMenu.children).forEach(element =>{
        if(element.id != "rightArrowCircle"){
            element.classList.toggle("notVisibleElements");
        }
    })
    
    
    
}


