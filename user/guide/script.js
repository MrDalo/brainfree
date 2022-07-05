/**
 * Project: ITU2021
 * @file /user/guide/script.js
 * @author Dalibor Králik
 * @brief JS file, ktory sa stara o /user/guide/index.html - uzivatelske akcie na tejto stranke
 * 
 * 
 * @copyright Copyright (c) 2021
 * 
 */



/**
 * @brief   Funkcia, ktora sa vykona po nacitani webovej stranky
 */
window.addEventListener('load', ()=>{
    
    //osetrenie ak sa uzivatel prepne na tuto stranku bez loginu
    if(userName == null){
        window.location.replace(window.location.href.replace('/user/guide', ''));
        return;
    }
    
    
});



/**
 *  @brief   Funkcia, ktora reaguje na uzivatelsky klik na Burger Menu
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
