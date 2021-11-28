let userName = sessionStorage.getItem("token");
let errorMssg;

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


function checkTest(){
    let taskComplete = document.getElementById("taskCompleteCheckbox").checked;
    
    console.log(taskComplete);
    
}


function dataTaskSend(){
    try{
        var request = createXmlHttpRequestObject();
        //console.log(userName);
        
        
        let taskName = document.getElementById("taskName").value;
        let taskDescription = document.getElementById("taskDescription").value;
        let taskPriority = document.getElementById("priorityList").value;
        let taskDeadline = document.getElementById("calendar").value;
        let taskComplete = document.getElementById("taskCompleteCheckbox").checked;
        let taskOwner = userName;

        if(taskName == ""){
            errorMssg = "Prazdne pole mena tasku";
            //TODO vytvor element a cez innerhtml tam vpis errorMssg
            console.log(errorMssg);
            return;
        }
        else if(taskDeadline == ""){
            errorMssg = "Prazdne pole deadlinu tasku";
            //TODO vytvor element a cez innerhtml tam vpis errorMssg
            console.log(errorMssg);
            return;
        }
        else if(taskPriority == null || taskPriority == "None" || taskPriority =='' || taskPriority == "NULL"){
            errorMssg = "Prazdne pole priority tasku";
            //TODO vytvor element a cez innerhtml tam vpis errorMssg
            console.log(errorMssg);

            return;
        }
        
            //TODO pories taskComplete
        if(taskComplete === true){
            taskComplete = 1;
        }
        else
            taskComplete = 0;
        

        request.open("POST","http://wedevs.sk:8080/tasks", true);
        request.onreadystatechange = function()
            {
                
                if ((request.readyState == 4) && (request.status == 200)) // process is completed and http status is OK
                {
                    if(request.responseText == "MissingDeadline"){
                        errorMssg = "Prazdne pole deadlinu tasku";
                        //TODO vytvor element a cez innerhtml tam vpis errorMssg
                        console.log(errorMssg);
                    }
                    else{
                        errorMssg = "Task created successfully";
                        //TODO vytvor element a cez innerhtml tam vpis errorMssg
                        console.log(errorMssg);

                    }
                }
            }

            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
       // request.send(`name=${taskName}&description=${taskDescription}&deadline=${taskDeadline}&complete=${taskComplete}&user=${userName}`);
       request.send(`name=${taskName}&deadline=${taskDeadline}&user=${taskOwner}&description=${taskDescription}&priority=${taskPriority}`);//&complete=${taskComplete}&user=${userName}`);
    
    }
    catch(e){
    }

}



function showLoadedTasks(arrayOfTasks){
    let matrixes = document.getElementsByClassName("contentOfMatrix");
    let errorMssg;
    let doMatrix = matrixes[0];
    let delegateMatrix = matrixes[1]
    let scheduleMatrix = matrixes[2]
    let deleteMatrix = matrixes[3]

    for(let i in arrayOfTasks){
        //console.log(arrayOfTasks[i].priority);
        if(arrayOfTasks[i].priority == "Urgent - Important"){
            
            if(parseInt(doMatrix.dataset.numberoftasks)  == 4){
                errorMssg = "Too much tasks in do matrix";
                //TODO vypisat errorMssg
                console.log(errorMssg);
            }
            else{
                console.log(doMatrix);
                doMatrix.innerHTML += `<div class="task" data-id=${arrayOfTasks[i].id} onclick="selectedTask(this)">${arrayOfTasks[i].name}</div>`
                doMatrix.dataset.numberoftasks = (parseInt(doMatrix.dataset.numberoftasks)+1);
                console.log("do"+ doMatrix.dataset.numberoftasks);
            }
            
        }
        else if(arrayOfTasks[i].priority == "Urgent - Not Important"){
            
            
            if(parseInt(scheduleMatrix.dataset.numberoftasks)  == 4){
                errorMssg = "Too much tasks in schedule matrix";
                //TODO vypisat errorMssg
                console.log(errorMssg);
            }
            else{
                scheduleMatrix.innerHTML += `<div class="task" data-id=${arrayOfTasks[i].id} onclick="selectedTask(this)">${arrayOfTasks[i].name}</div>`
                scheduleMatrix.dataset.numberoftasks = (parseInt(scheduleMatrix.dataset.numberoftasks)+1);
                console.log("schedule" +scheduleMatrix.dataset.numberoftasks);
            }
        }
        else if(arrayOfTasks[i].priority == "Not Urgent - Important"){
            
            
            if(parseInt(delegateMatrix.dataset.numberoftasks)  == 4){
                errorMssg = "Too much tasks in delegate matrix";
                //TODO vypisat errorMssg
                console.log(errorMssg);
            }
            else{
                delegateMatrix.innerHTML += `<div class="task" data-id=${arrayOfTasks[i].id} onclick="selectedTask(this)">${arrayOfTasks[i].name}</div>`
                delegateMatrix.dataset.numberoftasks = (parseInt(delegateMatrix.dataset.numberoftasks)+1);
                console.log("delegate" + delegateMatrix.dataset.numberoftasks);
            }
        }
        else if(arrayOfTasks[i].priority == "Not Urgent - Not Important"){
            
            if(parseInt(deleteMatrix.dataset.numberoftasks)  == 4){
                errorMssg = "Too much tasks in delete matrix";
                //TODO vypisat errorMssg
                console.log(errorMssg);
            }
            else{
                deleteMatrix.innerHTML += `<div class="task" data-id=${arrayOfTasks[i].id} onclick="selectedTask(this)">${arrayOfTasks[i].name}</div>`
                deleteMatrix.dataset.numberoftasks = (parseInt(deleteMatrix.dataset.numberoftasks)+1);
                console.log("delete"+deleteMatrix.dataset.numberoftasks);
            }
            
        }
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
        
        data.open("GET", `http://wedevs.sk:8080/tasks/${userName}`, true);
        data.onreadystatechange = function(){
            if ((data.readyState == 4) && (data.status == 200)){
                if(data.responseText == "NotFound"){

                }
                else{
                    let pole = JSON.parse(data.responseText);
                        
                        console.log(pole);
                    showLoadedTasks(pole);

                }
            }
        }

        data.send();

    }
    catch(e){
    }
});



function selectedTask(element){
    //console.log(element.dataset.id);
    try{
        let data = createXmlHttpRequestObject();
        
        data.open("GET", `http://wedevs.sk:8080/tasks/${userName}`, true);
        data.onreadystatechange = function(){
            if ((data.readyState == 4) && (data.status == 200)){
                if(data.responseText == "NotFound"){

                }
                else{
                    let pole = JSON.parse(data.responseText);
                    for(let i in pole){
                        if(pole[i].id == element.dataset.id){
                            arrowCircleTrigger(0);
                            document.getElementById("taskName").value = pole[i].name;
                            document.getElementById("taskDescription").value = pole[i].description;
                            document.getElementById("priorityList").value = pole[i].priority;
                            document.getElementById("calendar").value = pole[i].deadline;
                            document.getElementById("inputForm").dataset.taskid = pole[i].id;
                            console.log(document.getElementById("inputForm").dataset.taskid);
                        }
            
                    }    
                    
                }
            }
        }

        data.send();

    }
    catch(e){
    }


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


function deleteTask(){
    taskId = document.getElementById("inputForm").dataset.taskid;
    if(taskId == "0"){
        errorMssg = "Deleting not selected task";
        //TODO vypisat do chyboveho okienka
        console.log(errorMssg);
        return;
    } 

    try{
        let data = createXmlHttpRequestObject();
        
        data.open("DELETE", `http://wedevs.sk:8080/taskById/${taskId}`, true);
        data.onreadystatechange = function(){
            if ((data.readyState == 4) && (data.status == 200)){
                if(data.responseText == "NotFound"){
                    errorMssg="Task was not found";
                    console.log(errorMssg);
                    //TODO vypisat do chyboveh boxu
                    
                }
                else{
                    errorMssg="Task was successfully deleted";
                    console.log(errorMssg);
                    //TODO vypisat do chyboveh boxu
                    //Box color green

                    //TODO treba odstranit task z matice
                    
                        
                    
                }
            }
        }

        data.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        data.send();

    }
    catch(e){
    }






}


/**
     * Function which react on click on '+' in matrix
     */
function createNewTask(index){
    
    arrowCircleTrigger(index);
    document.getElementById("taskName").value = ""
    document.getElementById("taskDescription").value = ""
    document.getElementById("priorityList").value = ""
    document.getElementById("calendar").value = ""
    document.getElementById("inputForm").dataset.taskid = "0";

    let matrixes = document.querySelectorAll(".contentOfMatrix");
    matrix = matrixes[index];
    //console.log(parseInt(matrix.dataset.numberoftasks));
   
    
}


