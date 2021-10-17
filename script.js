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



/**
 * Function which react on click on right Burger Menu
 */
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

/**
 * Function which react on click on Arrow circle
 */
function arrowCircleTrigger(){
    let rightMenu = document.getElementById("rightMenu");
    rightMenu.classList.toggle("notVisibleRight");
    
    /*Toggle class to Arrow Circle*/
    var arrow = document.getElementById("rightArrowCircle");
    arrow.classList.toggle("notVisibleArrowCircle");

    /*Toggle class to lines of Arrwo Circle */
    Array.from(arrow.children).forEach(element =>{
        element.classList.toggle("notVisibleArrowLine");
    })
    
    /*Toggle class to child elements of rightMenu except Arrow circle*/
    document.getElementById("inputForm").classList.toggle("notVisibleElements");
    
    
    
}


