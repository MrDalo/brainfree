function createXmlHttpRequestObject()
{
    var request;

    try
    {
        request = new XMLHttpRequest(); // should work on all browsers except IE6 or older
    }
    catch (e)
    {
        try
        {
            request = new ActiveXObject("Microsoft.XMLHttp"); // browser is IE6 or older
        }
        catch (e)
        {
            // ignore error
        }
    }

    if (!request)
    {
        alert("Error creating the XMLHttpRequest object.");
    }
    else
    {
        return request;
    }
}



function dataRequest(){


    var data = createXmlHttpRequestObject();

    data.open("GET", "http://wedevs.sk:8080/tasks/example", true);
    data.onreadystatechange = function(){
        if ((data.readyState == 4) && (data.status == 200)){
            var pole = JSON.parse(data.responseText);
                for (var i in pole) {
                  console.log(pole[i].description);
                }
            
            
 
        }

    }
    
    data.send();


}


function getData(){

   return false;
}


function colorChangeBackground(input, index){
    let arrayOfKvadrants = document.getElementsByClassName("matrixKvadrant");    
    arrayOfKvadrants[index].style.backgroundColor = input.value;
}

function colorChangeText(input, index){
    let arrayOfKvadrants = document.getElementsByClassName("matrixKvadrant");
    arrayOfKvadrants[index].getElementsByTagName('p')[0].style.color = input.value;
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
    const priority = ["Urgent - Important", "Urgent - Not Important", "Not Urgent - Important", "Not Urgent - Not Important", "None"];
    let dropPriorityMenu = document.getElementById("priorityList");
    dropPriorityMenu.value = priority[index];
}


/**
     * Function which react on click on '+' in matrix
     */
function createNewTask(index){
    
    arrowCircleTrigger(index);

    let matrixes = document.querySelectorAll(".contentOfMatrix");
   
    
}


let userName = sessionStorage.getItem("token");


window.addEventListener('load', ()=>{
    //osetrenie ak sa uzivatel prepne na tuto stranku bez loginu
    if(userName === ""){
        window.location.replace(window.location.href.replace('/user/', ''));
        return;
    }

    

    var data = createXmlHttpRequestObject();
    userName = "example";
    data.open("GET", `http://wedevs.sk:8080/tasks/${userName}`, true);
    data.onreadystatechange = function(){
        if ((data.readyState == 4) && (data.status == 200)){
            var pole = JSON.parse(data.responseText);
                for (var i in pole) {
                  console.log(pole);
                }
            
            
 
        }

    }
    
    data.send();
    
});
