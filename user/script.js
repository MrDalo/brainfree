let userName = sessionStorage.getItem("token");


function createXmlHttpRequestObject()
{
    let request;

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



function dataTaskSend(){
    try{
        var request = createXmlHttpRequestObject();
        console.log(userName);

        
        let taskName = document.getElementById("taskName").value;
        let taskDescription = document.getElementById("taskDescription").value;
        let taskPriority = document.getElementById("priorityList").value;
        let taskDeadline = document.getElementById("calendar").value;
        let taskComplete = document.getElementById("taskCompleteCheckbox").value;
        let taskOwner = userName;
        
        console.log(taskDeadline);
        request.open("POST","http://wedevs.sk:8080/tasks", true);
        request.onreadystatechange = function()
            {
                
                if ((request.readyState == 4) && (request.status == 200)) // process is completed and http status is OK
                {
                  //  console.log(request.responseText);
                }
            }

            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send(`name=${taskName}&deadline=${taskDeadline}&user=${userName}`);
    }
    catch(e){
    }

}



window.addEventListener('load', ()=>{
    
    //osetrenie ak sa uzivatel prepne na tuto stranku bez loginu
    if(userName == null){
        window.location.replace(window.location.href.replace('/user/', ''));
        return;
    }
    
    try{
        let data = createXmlHttpRequestObject();
        //userName = "example";
        data.open("GET", `http://wedevs.sk:8080/tasks/${userName}`, true);
        data.onreadystatechange = function(){
            if ((data.readyState == 4) && (data.status == 200)){
                let pole = JSON.parse(data.responseText);
                    for (let i in pole) {
                      console.log(pole);
                    }
            }
        }

        data.send();
    }
    catch(e){
    }
});






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
    let arrow = document.getElementById("rightArrowCircle");
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


