

function getData(){

   return false;
}


function settingsOfMatrix(index){
    let settingsWindwos = document.getElementsByClassName("settingsWindow");
    settingsWindwos[index].classList.toggle("showWindow");
    
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
function arrowCircleTrigger(index){

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
    
    /*Selection of priority depends where user want to create task*/
    const priority = ["Urgent - Important", "Urgent - Not Important", "Not Urgent - Important", "Not Urgent - Not Important"];
    let dropPriorityMenu = document.getElementById("priorityList");
    dropPriorityMenu.value = priority[index];
}


/**
     * Function which react on click on '+' in matrix
     */
function createNewTask(index){
    
    arrowCircleTrigger(index);

    let matrixes = document.querySelectorAll(".contentOfMatrix");
    console.log(matrixes[index]);
    
}

