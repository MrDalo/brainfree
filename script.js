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


let errorMssg;

function loginFormAction(){
    let name = document.getElementById("userNameLog");
    let password = document.getElementById("passwdLogin");
    let errorDiv = document.getElementById("errorDiv");
    if(name.value == "" || password.value == ""){
        errorMssg = "Empty login field";
        
        errorDiv.innerHTML = errorMssg;
        errorDiv.classList.add("visible");
        setTimeout(()=>{
            errorDiv.classList.remove("visible");
        }, 3000);
        return;
    }
    
    var request = createXmlHttpRequestObject();
    
    
    request.open("POST","http://wedevs.sk:8080/login", true);
    request.onreadystatechange = function()
    {
        if ((request.readyState == 4) && (request.status == 200)) // process is completed and http status is OK
        {
            
            if(request.responseText == "notFound"){
                console.log("Account doesnt exist");
                errorMssg = "Account doesnt exist";
                
                errorDiv.innerHTML = errorMssg;
                errorDiv.classList.add("visible");
                setTimeout(()=>{
                    errorDiv.classList.remove("visible");
                }, 3000);
            }
            else if(request.responseText == "incorrectPassword"){
                console.log("Incorrect password");
                errorMssg = "Incorrect password";                
                errorDiv.innerHTML = errorMssg;
                errorDiv.classList.add("visible");
                setTimeout(()=>{
                    errorDiv.classList.remove("visible");
                }, 3000);
                
            }
            else if(request.responseText == "RequestEmpty"){
                console.log("Requests fields are empty");
                errorMssg = "Empty login field";                
                errorDiv.innerHTML = errorMssg;
                errorDiv.classList.add("visible");
                setTimeout(()=>{
                    errorDiv.classList.remove("visible");
                }, 3000);
                
            }
                else{
                    console.log("log in");
                    sessionStorage.setItem("token", name.value);
                    window.location.replace(window.location.href.replace('index.html', 'user/index.html'));     
                }
            }
        }
        
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send(`username=${name.value}&password=${password.value}`);
        
        
        
        
        
        
        // sessionStorage.setItem("token", name.value);
        
        
        // window.location.replace(window.location.href+'user');
        // console.log("dfasdf");
        return false;
    }
    
    
    function createUser(){
        var request = createXmlHttpRequestObject();

    let username = document.getElementById("userNameReg").value;
    let userpasswd = document.getElementById("passwdRegister").value;
    let useremail = document.getElementById("userEmail").value;
    let userpasswd2 = document.getElementById("passwdControl").value;
    let errorDiv = document.getElementById("errorDiv");
    
    if(userpasswd != userpasswd2){
        console.log("Passwords are not same");
        errorMssg = "Passwords are not same";
        errorDiv.innerHTML = errorMssg;
        errorDiv.classList.add("visible");
        setTimeout(()=>{
            errorDiv.classList.remove("visible");
        }, 3000);
        return;
    }
    
    if(username == "" || userpasswd == "" || useremail == ""){
        console.log("Empty input fields");
        errorMssg = "Empty input fields";
        errorDiv.innerHTML = errorMssg;
        errorDiv.classList.add("visible");
        setTimeout(()=>{
            errorDiv.classList.remove("visible");
        }, 3000);
        return;
    }


    request.open("POST","http://wedevs.sk:8080/users", true);
    request.onreadystatechange = function()
        {
            if ((request.readyState == 4) && (request.status == 200)) // process is completed and http status is OK
            {
                console.log(request.responseText);
                if(request.responseText == "RequestEmpty"){
                    errorMssg = "Empty input fields";
                    errorDiv.innerHTML = errorMssg;
                    errorDiv.classList.add("visible");
                    setTimeout(()=>{
                        errorDiv.classList.remove("visible");
                    }, 3000);                   
                    
                }
                else if(request.responseText == "UserExists"){
                    console.log("User already exists");
                    errorMssg = "User already exists";
                    errorDiv.innerHTML = errorMssg;
                    errorDiv.classList.add("visible");
                    setTimeout(()=>{
                        errorDiv.classList.remove("visible");
                    }, 3000);
                    
                }
                else{
                    sessionStorage.setItem("token", username);
                    window.location.replace(window.location.href.replace('index.html', 'user/index.html'));
                    console.log("User created");
                }
            }
        }

    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(`username=${username}&password=${userpasswd}&email=${useremail}`);

}




function closeForm(){
    document.getElementById("logForm").classList.add("hide");
    document.getElementById("loginForm").classList.add("hide");
    document.getElementById("registerForm").classList.add("hide");


}

function openForm(object){
    document.getElementById("logForm").classList.remove("hide");
    document.getElementById(object).classList.remove("hide");
}


function createClock(){
    document.getElementById("timeCircle").innerHTML=clockSVGImg;
}

function isInViewport(element, offset){
    const rect = element.getBoundingClientRect();
    return ((window.innerHeight || document.documentElement.clientHeight) - offset - rect.top > 0 && rect.bottom - offset > 0); 
}


window.addEventListener("scroll", ()=>{
    if(isInViewport(document.getElementById("lastBottomPart"), 0)){
        
        let valueOfScroll = window.scrollY;
        const rect = document.getElementById("lastBottomPart").getBoundingClientRect();
        //console.log("yes: "+ valueOfScroll+ "Rect top: "+document.getElementById("lastBottomPart").offsetTop);
        
        



        lines.forEach(line=>{
            line.style.transform = `translateY(${+(valueOfScroll-2500) * 0.25}px)`;
        })

    }



})


let lines = document.querySelectorAll('.svgLines');



/* 192, 150 for svh width and height*/

let clockSVGImg='<svg width="318" height="248" viewBox="0 0 318 248" fill="none" xmlns="http://www.w3.org/2000/svg">'+
'<g id="Group 77">'+
'<path id="Vector" d="M14.4616 111.708C16.035 110.909 22.0406 111.439 22.0406 111.439C22.0406 111.439 18.9259 116.6 17.3525 117.399C16.9757 117.622 16.557 117.765 16.1225 117.82C15.6879 117.875 15.2466 117.84 14.8261 117.717C14.4056 117.595 14.0148 117.387 13.6779 117.108C13.341 116.828 13.0652 116.482 12.8677 116.091C12.6701 115.701 12.5549 115.273 12.5294 114.837C12.5038 114.4 12.5684 113.962 12.719 113.551C12.8697 113.14 13.1032 112.764 13.4052 112.447C13.7072 112.13 14.0711 111.878 14.4744 111.708H14.4616Z" fill="#6C63FF"/>'+
'<path id="Vector_2" d="M20.7845 102.585C22.5402 102.77 27.2922 106.477 27.2922 106.477C27.2922 106.477 21.8558 109.116 20.1162 108.934C19.3023 108.811 18.5671 108.38 18.0637 107.729C17.5603 107.078 17.3274 106.258 17.4135 105.44C17.4997 104.622 17.8981 103.869 18.526 103.337C19.1539 102.805 19.9628 102.536 20.7845 102.585V102.585Z" fill="#6C63FF"/>'+
'<path id="Vector_3" d="M30.6337 112.296C31.1581 110.612 29.6231 104.783 29.6231 104.783C29.6231 104.783 25.0565 108.72 24.5321 110.404C24.3843 110.81 24.3206 111.243 24.3449 111.674C24.3691 112.106 24.4809 112.528 24.6733 112.916C24.8657 113.303 25.1348 113.647 25.4643 113.928C25.7937 114.208 26.1767 114.419 26.5901 114.547C27.0034 114.675 27.4385 114.718 27.8689 114.673C28.2994 114.629 28.7163 114.497 29.0943 114.286C29.4724 114.076 29.8037 113.791 30.0683 113.449C30.3329 113.107 30.5252 112.714 30.6337 112.296V112.296Z" fill="#6C63FF"/>'+
'<path id="Vector_4" opacity="0.1" d="M34.2226 25.2407C32.1567 26.0971 30.0365 27.1963 28.9013 29.1231C27.6989 31.1586 27.8428 33.6862 28.0666 36.0412C30.0173 56.4661 35.1564 78.1884 26.2822 96.6897C21.9746 105.666 14.7698 112.858 9.03918 121.01C3.30855 129.161 -1.0182 139.339 1.64245 148.928C4.89151 160.645 17.0179 167.142 25.1917 176.159C30.5418 182.054 34.2929 189.219 39.2848 195.421C44.2767 201.623 51.117 207.087 59.0862 207.451C70.5474 207.979 79.8725 198.089 91.1099 195.798C102.622 193.452 114.215 199.421 123.549 206.566C132.884 213.711 141.374 222.368 152.25 226.828C164.262 231.759 177.802 231.005 190.446 233.967C201.958 236.667 212.556 242.409 223.985 245.47C235.415 248.531 248.811 248.346 257.666 240.527C269.207 230.302 268.299 212.088 275.67 198.562C282.516 185.994 295.919 178.492 304.94 167.381C321.173 147.385 320.642 116.821 306.859 95.0728C293.076 73.325 268.11 60.1568 242.581 56.7281C231.069 55.1847 219.214 55.3956 208.146 51.8839C178.521 42.4895 160.891 8.82922 130.645 1.82493C111.42 -2.61986 92.7216 5.07783 76.3452 14.5522C62.1306 22.7771 49.016 19.1088 34.2226 25.2407Z" fill="#6C63FF"/>'+
'<path id="Vector_5" d="M63.0928 91.2251C63.0928 91.2251 52.1784 101.517 40.4645 101.824C35.5456 101.922 30.7911 103.612 26.9151 106.64C25.083 108.087 23.3874 109.699 21.8496 111.455" stroke="#535461" stroke-width="2" stroke-miterlimit="10"/>'+
'<path id="Vector_6" d="M35.7765 95.2323C37.1963 96.2772 39.4285 101.876 39.4285 101.876C39.4285 101.876 33.4132 101.419 31.9934 100.377C31.3534 99.8602 30.9373 99.117 30.8317 98.3017C30.726 97.4864 30.9389 96.6617 31.4261 95.9993C31.9132 95.3368 32.6372 94.8874 33.4474 94.7445C34.2577 94.6017 35.0918 94.7764 35.7765 95.2323V95.2323Z" fill="#6C63FF"/>'+
'<path id="Vector_7" d="M48.3723 92.2254C49.9489 93.0147 53.0956 98.156 53.0956 98.156C53.0956 98.156 47.09 98.7216 45.5134 97.9323C45.1156 97.7588 44.7574 97.5061 44.4604 97.1898C44.1635 96.8734 43.9342 96.4999 43.7864 96.0921C43.6385 95.6844 43.5754 95.2508 43.6006 94.8178C43.6259 94.3848 43.7392 93.9615 43.9335 93.5737C44.1278 93.1858 44.399 92.8416 44.7308 92.5619C45.0625 92.2822 45.4477 92.0729 45.863 91.9467C46.2783 91.8206 46.715 91.7802 47.1464 91.8281C47.5778 91.8761 47.9949 92.0112 48.3723 92.2254V92.2254Z" fill="#6C63FF"/>'+
'<path id="Vector_8" d="M45.322 108.579C45.322 106.815 42.1081 101.716 42.1081 101.716C42.1081 101.716 38.9294 106.828 38.9326 108.598C38.9352 109.446 39.2745 110.258 39.876 110.855C40.4776 111.453 41.292 111.787 42.1401 111.784C42.9882 111.782 43.8006 111.443 44.3985 110.842C44.9964 110.241 45.3309 109.427 45.3284 108.579H45.322Z" fill="#6C63FF"/>'+
'<path id="Vector_9" d="M59.1011 103.032C59.3953 101.294 57.0928 95.7244 57.0928 95.7244C57.0928 95.7244 53.0923 100.236 52.8013 101.975C52.703 102.79 52.9228 103.612 53.415 104.27C53.9073 104.928 54.6342 105.371 55.4448 105.508C56.2554 105.644 57.0875 105.463 57.7683 105.003C58.4492 104.543 58.9265 103.838 59.1011 103.035V103.032Z" fill="#6C63FF"/>'+
'<path id="Vector_10" d="M77.2752 63.9685C77.2752 63.9685 64.1286 56.7533 60.2208 45.7005C58.6153 41.0527 55.544 37.0509 51.4682 34.2961C49.5232 33.0029 47.4636 31.8905 45.3154 30.9729" stroke="#535461" stroke-width="2" stroke-miterlimit="10"/>'+
'<path id="Vector_11" d="M42.8212 24.0231C44.0652 25.2725 45.4051 31.1488 45.4051 31.1488C45.4051 31.1488 39.5337 29.7748 38.2898 28.5222C37.7404 27.9126 37.4467 27.1153 37.4695 26.2953C37.4923 25.4753 37.8298 24.6955 38.4121 24.1173C38.9945 23.5391 39.777 23.2069 40.5978 23.1893C41.4186 23.1718 42.2146 23.4703 42.8212 24.0231V24.0231Z" fill="#6C63FF"/>'+
'<path id="Vector_12" d="M53.4541 27.2281C53.8186 28.9536 51.7496 34.6126 51.7496 34.6126C51.7496 34.6126 47.5699 30.2701 47.2054 28.5414C47.0972 28.1233 47.0749 27.6876 47.1399 27.2607C47.2049 26.8338 47.3558 26.4245 47.5835 26.0575C47.8113 25.6905 48.1111 25.3734 48.4649 25.1254C48.8187 24.8774 49.2191 24.7036 49.642 24.6146C50.0648 24.5255 50.5014 24.523 50.9253 24.6073C51.3491 24.6915 51.7515 24.8607 52.1081 25.1047C52.4647 25.3487 52.7681 25.6623 53 26.0267C53.2319 26.3911 53.3874 26.7987 53.4573 27.2249L53.4541 27.2281Z" fill="#6C63FF"/>'+
'<path id="Vector_13" d="M65.0623 39.2395C64.5059 40.9107 59.8593 44.7547 59.8593 44.7547C59.8593 44.7547 58.4459 38.8976 59.0023 37.2232C59.2699 36.4181 59.8466 35.7522 60.6055 35.372C61.3645 34.9918 62.2435 34.9284 63.0492 35.1957C63.855 35.4631 64.5214 36.0394 64.9019 36.7977C65.2824 37.5561 65.3459 38.4344 65.0783 39.2395H65.0623Z" fill="#6C63FF"/>'+
'<path id="Vector_14" d="M71.8037 50.2794C71.5383 52.0209 67.6081 56.5935 67.6081 56.5935C67.6081 56.5935 65.2225 51.0591 65.4879 49.3176C65.5321 48.8872 65.6634 48.4703 65.8736 48.0921C66.0839 47.7139 66.3689 47.3823 66.7113 47.1174C67.0536 46.8526 67.4462 46.6599 67.8653 46.5512C68.2844 46.4424 68.7212 46.4199 69.1493 46.4848C69.5774 46.5498 69.9878 46.701 70.3557 46.9292C70.7235 47.1574 71.0412 47.4578 71.2894 47.8123C71.5376 48.1668 71.7112 48.568 71.7996 48.9916C71.888 49.4151 71.8894 49.8521 71.8037 50.2762V50.2794Z" fill="#6C63FF"/>'+
'<path id="Vector_15" d="M47.231 39.5814C48.9962 39.5622 54.0745 36.3093 54.0745 36.3093C54.0745 36.3093 48.9227 33.1778 47.1574 33.197C46.3093 33.2067 45.4998 33.5527 44.9069 34.1589C44.3141 34.765 43.9866 35.5817 43.9963 36.4291C44.0061 37.2766 44.3523 38.0855 44.959 38.6778C45.5656 39.2702 46.3828 39.5975 47.231 39.5878V39.5814Z" fill="#6C63FF"/>'+
'<path id="Vector_16" d="M55.2766 52.4077C56.9523 51.8613 60.825 47.2408 60.825 47.2408C60.825 47.2408 54.9696 45.7933 53.2939 46.3397C52.8804 46.4576 52.4949 46.6576 52.1606 46.9278C51.8262 47.198 51.5498 47.5329 51.348 47.9123C51.1461 48.2916 51.0228 48.7078 50.9856 49.1359C50.9484 49.564 50.998 49.9952 51.1314 50.4036C51.2648 50.8121 51.4793 51.1896 51.762 51.5133C52.0448 51.8371 52.3899 52.1005 52.7769 52.2879C53.1639 52.4753 53.5847 52.5828 54.0142 52.6039C54.4437 52.625 54.8731 52.5594 55.2766 52.4109V52.4077Z" fill="#6C63FF"/>'+
'<path id="Vector_17" d="M64.8064 63.8024C66.5525 63.5468 71.151 59.6484 71.151 59.6484C71.151 59.6484 65.6251 57.2327 63.8822 57.4883C63.453 57.5325 63.0371 57.6631 62.6597 57.8721C62.2823 58.0811 61.9512 58.3643 61.6862 58.7046C61.4212 59.0449 61.2279 59.4353 61.1179 59.8522C61.0079 60.2692 60.9834 60.704 61.0461 61.1306C61.1087 61.5572 61.2571 61.9668 61.4823 62.3346C61.7075 62.7024 62.0049 63.0208 62.3565 63.2707C62.7081 63.5206 63.1067 63.6969 63.5283 63.7888C63.9499 63.8807 64.3858 63.8864 64.8096 63.8056L64.8064 63.8024Z" fill="#6C63FF"/>'+
'<path id="Vector_18" d="M167.747 239.038C231.681 239.038 283.51 187.249 283.51 123.365C283.51 59.48 231.681 7.69141 167.747 7.69141C103.812 7.69141 51.9829 59.48 51.9829 123.365C51.9829 187.249 103.812 239.038 167.747 239.038Z" fill="url(#paint0_linear_165:3)"/>'+
'<path id="Vector_19" d="M167.747 237.12C230.622 237.12 281.592 186.19 281.592 123.364C281.592 60.5388 230.622 9.60852 167.747 9.60852C104.872 9.60852 53.9023 60.5388 53.9023 123.364C53.9023 186.19 104.872 237.12 167.747 237.12Z" fill="#5349FF"/>'+
'<path id="Vector_20" d="M167.747 213.794C217.729 213.794 258.247 173.307 258.247 123.364C258.247 73.4216 217.729 32.9349 167.747 32.9349C117.765 32.9349 77.2466 73.4216 77.2466 123.364C77.2466 173.307 117.765 213.794 167.747 213.794Z" fill="#DDE1EC"/>'+
'<path id="minutes" opacity="0.3" d="M170.305 48.9119H165.188V128.797H170.305V48.9119Z" fill="#535461"/>'+
'<g id="Group" opacity="0.1">'+
'<path id="Vector_21" opacity="0.1" d="M245.455 121.447H173.183V127.838H245.455V121.447Z" fill="black"/>'+
'<path id="Vector_22" opacity="0.1" d="M122.158 97.5376L119.191 103.199L164.665 126.994L167.632 121.333L122.158 97.5376Z" fill="black"/>'+
'<path id="Vector_23" opacity="0.1" d="M167.747 134.229C173.045 134.229 177.34 129.937 177.34 124.643C177.34 119.349 173.045 115.057 167.747 115.057C162.448 115.057 158.153 119.349 158.153 124.643C158.153 129.937 162.448 134.229 167.747 134.229Z" fill="black"/>'+
'</g>'+
'<path id="Vector_24" d="M245.455 120.169H173.183V126.56H245.455V120.169Z" fill="#535461"/>'+
'<path id="hours" d="M167.654 120.062L122.179 96.2666L119.212 101.928L164.687 125.723L167.654 120.062Z" fill="#535461"/>'+
'<path id="Vector_25" d="M167.747 132.951C173.045 132.951 177.341 128.659 177.341 123.364C177.341 118.07 173.045 113.778 167.747 113.778C162.449 113.778 158.153 118.07 158.153 123.364C158.153 128.659 162.449 132.951 167.747 132.951Z" fill="#535461"/>'+
'<g id="Group_2" opacity="0.1">'+
'<path id="Vector_26" opacity="0.1" d="M84.2752 134.229C84.2752 84.2848 124.793 43.7993 174.776 43.7993C188.805 43.7869 202.644 47.0386 215.197 53.297C227.75 59.5554 238.673 68.6485 247.099 79.856C231.698 51.89 201.958 32.9349 167.74 32.9349C117.757 32.9349 77.2398 73.4205 77.2398 123.364C77.2104 142.985 83.5965 162.077 95.4263 177.737C88.09 164.409 84.2536 149.44 84.2752 134.229V134.229Z" fill="black"/>'+
'</g>'+
'<path id="Vector_27" d="M251.365 56.8428C250.291 55.8107 241.247 62.5945 241.247 62.5945C241.247 62.5945 238.027 63.1825 238.794 65.3905C239.562 67.5985 235.42 79.9647 235.42 79.9647L233.735 77.6097C233.898 74.8457 233.137 72.8869 232.395 71.6663C232.334 71.5672 232.274 71.4713 232.213 71.3819L232.507 71.2796C232.395 69.7714 229.981 67.4739 228.698 66.3491C228.698 66.1862 228.698 66.0296 228.698 65.8634C228.778 64.0612 229.501 62.16 228.698 60.5271C227.79 58.6642 225.133 57.728 224.909 55.6829C224.775 54.4623 225.6 53.3599 225.964 52.184C226.834 49.372 225.027 46.5026 223.3 44.0805C222.716 43.1724 222.004 42.3524 221.187 41.6456C220.408 41.077 219.553 40.6209 218.647 40.2907C216.118 39.2682 213.531 38.7537 210.921 38.054C208.417 37.3893 206.109 37.073 203.566 37.907C202.963 38.0695 202.412 38.3855 201.967 38.824C201.363 39.5015 201.283 40.4665 200.886 41.2749C200.247 42.5754 198.869 43.3519 197.65 44.1859C196.432 45.0199 195.21 46.1639 195.204 47.6018C195.204 49.6436 197.538 50.9282 198.318 52.8294C199.048 54.5997 198.318 56.5712 197.912 58.4373C197.743 59.0405 197.726 59.6764 197.864 60.2875C198.025 60.7429 198.268 61.1652 198.581 61.5337C199.064 62.1728 199.582 62.7671 200.097 63.3742L199.86 63.4669C195.568 63.0259 192.809 68.4709 192.809 68.4709C193.007 68.5124 193.195 68.5603 193.381 68.6147L193.199 68.8511C191.902 70.5339 190.842 72.3864 190.049 74.3568L186.531 79.0668C186.531 79.0668 185.764 67.2886 187.606 64.6396C189.448 61.9906 185.92 60.3706 185.92 60.3706C185.92 60.3706 178.245 51.8325 177.18 52.5674C176.116 53.3024 179.787 62.5786 183.007 64.0516C183.007 64.0516 183.327 66.9946 182.687 68.9086C182.3 70.1197 180.234 82.8949 180.234 82.8949C180.234 82.8949 178.396 93.6409 186.828 88.327C192.306 84.8824 195.847 78.9517 197.65 75.2259C197.776 74.9639 197.894 74.7136 198.005 74.475C198.088 74.8702 198.145 75.2705 198.175 75.6733L198.494 87.9851C198.575 91.0304 197.91 94.0492 196.556 96.7788L192.799 104.393L193.218 104.521L192.965 104.886C190.49 108.525 186.282 116.708 194.945 120.878L206.457 122.352L205.843 125.294C205.843 125.294 201.091 134.274 199.71 140.457C198.851 144.243 197.511 147.904 195.722 151.35L196.077 151.538C196.003 151.621 195.926 151.708 195.853 151.797C195.155 152.582 194.694 153.548 194.523 154.583L192.962 156.795C192.962 156.795 192.348 165.921 193.576 168.132C194.248 169.34 196.476 170.107 198.373 170.554C201.187 171.222 203.458 168.317 201.964 165.924L201.945 165.892H201.916C201.596 164.406 200.618 159.795 200.938 158.044C201.027 157.546 201.11 157.05 201.152 156.545C201.229 155.882 201.431 155.239 201.747 154.651C201.798 154.551 201.852 154.456 201.907 154.36L202.073 154.43C202.588 154.651 203.096 154.858 203.579 155.04C202.831 155.721 202.3 157.13 202.939 160.028C202.939 160.028 203 167.279 203.553 168.419C204.107 169.56 210.298 171.068 211.372 169.893C212.447 168.717 210.682 164.665 210.682 164.665L210.627 164.703C210.272 162.355 209.834 158.149 210.912 156.494C211.347 155.826 211.769 155.136 212.146 154.491L212.38 154.091C214.382 155.088 216.499 155.839 217.656 155.318C217.656 155.318 222.715 143.54 222.408 142.07C222.101 140.6 230.227 123.962 230.227 123.962C230.227 123.962 237.125 116.293 228.695 111.008C226.019 109.324 224.068 108.193 222.651 107.429L221.465 101.23C220.855 97.9801 220.964 94.6362 221.785 91.4329L223.064 86.5568L223.169 86.1414C223.169 86.1414 226.39 79.5173 226.236 76.4242C226.224 76.1839 226.251 75.9433 226.316 75.7116C226.351 75.8586 226.39 76.012 226.431 76.1718C227.277 79.3866 228.392 82.5249 229.763 85.5534C232.21 91.0687 235.839 90.6309 237.828 89.848C238.254 89.6834 238.632 89.4155 238.929 89.0686C239.225 88.7216 239.431 88.3065 239.527 87.8605C240.243 84.4286 242.21 74.8137 242.334 72.1583C242.446 70.082 242.702 68.0159 243.102 65.9753C248.148 63.0259 252.44 57.875 251.365 56.8428Z" fill="url(#paint1_linear_165:3)"/>'+
'<path id="Vector_28" d="M213.825 151.177C213.825 151.177 213.15 152.529 212.226 154.152C211.865 154.791 211.462 155.478 211.049 156.14C209.588 158.475 211.049 165.917 211.049 165.917L207.851 166.355L204.654 164.757L204.068 159.357V155.408L207.714 151.334L209.313 149.57L213.825 151.177Z" fill="#F8BDC5"/>'+
'<g id="Group_3" opacity="0.1">'+
'<path id="Vector_29" opacity="0.1" d="M213.825 151.177C213.825 151.177 213.15 152.529 212.226 154.152C210.814 153.398 209.45 152.559 208.139 151.64L207.858 151.442L207.708 151.334L209.306 149.57L213.825 151.177Z" fill="black"/>'+
'</g>'+
'<path id="Vector_30" d="M229.46 123.882C229.46 123.882 221.718 140.374 222.012 141.834C222.306 143.294 217.484 154.97 217.484 154.97C216.384 155.488 214.363 154.743 212.457 153.756C211.019 152.99 209.631 152.137 208.299 151.2L208.018 151.001L207.848 150.88L220.557 115.705L209.313 107.464L208.482 106.854L203.455 103.147L218.804 105.921C218.804 105.921 219.338 105.854 222.162 107.432C223.518 108.19 225.402 109.324 228.005 111.03C236.028 116.293 229.46 123.882 229.46 123.882Z" fill="#5E52AD"/>'+
'<g id="Group_4" opacity="0.03">'+
'<path id="Vector_31" opacity="0.03" d="M229.46 123.882C229.46 123.882 221.718 140.374 222.012 141.834C222.306 143.294 217.484 154.97 217.484 154.97C216.384 155.488 214.363 154.743 212.457 153.756C211.019 152.99 209.631 152.137 208.299 151.2L208.018 151.001L207.848 150.88L220.557 115.705L209.313 107.464L208.482 106.854L203.455 103.147L218.804 105.921C218.804 105.921 219.338 105.854 222.162 107.432C223.518 108.19 225.402 109.324 228.005 111.03C236.028 116.293 229.46 123.882 229.46 123.882Z" fill="black"/>'+
'</g>'+
'<path id="Vector_32" d="M205.939 154.095C205.939 154.095 202.14 153.51 203.458 159.642C203.458 159.642 203.515 166.831 204.043 167.95C204.571 169.068 210.471 170.576 211.491 169.41C212.511 168.244 210.832 164.23 210.832 164.23C210.832 164.23 206.525 167.368 205.354 164.01C204.184 160.652 205.939 154.095 205.939 154.095Z" fill="#5D3E53"/>'+
'<path id="Vector_33" d="M203.307 152.928C202.893 153.323 202.555 153.791 202.313 154.309C202.011 154.895 201.819 155.532 201.747 156.188C201.708 156.686 201.628 157.181 201.545 157.673C201.181 159.754 202.578 165.917 202.578 165.917L197.026 166.793L194.983 164.604L194.545 159.789C195.09 158.138 195.386 156.414 195.421 154.676C195.421 153.42 196.061 152.299 196.7 151.481C197.134 150.935 197.631 150.443 198.181 150.014C198.181 150.014 204.478 151.906 203.307 152.928Z" fill="#F8BDC5"/>'+
'<g id="Group_5" opacity="0.1">'+
'<path id="Vector_34" opacity="0.1" d="M203.307 152.928C202.893 153.323 202.556 153.791 202.313 154.309C200.039 153.283 197.65 151.989 196.781 151.509L196.713 151.474C197.147 150.928 197.644 150.436 198.194 150.008C198.194 150.008 204.478 151.906 203.307 152.928Z" fill="black"/>'+
'</g>'+
'<path id="Vector_35" d="M221.276 119.505C221.276 119.505 217.628 126.365 215.287 132.056C213.752 135.795 210.579 144.697 208.571 150.366L208.277 151.203C207.394 153.711 206.806 155.408 206.806 155.408C206.417 155.41 206.03 155.353 205.658 155.239C205.312 155.146 204.926 155.021 204.513 154.868L204.049 154.692C203.589 154.513 203.09 154.305 202.613 154.088C200.292 153.053 197.817 151.704 196.918 151.212L196.579 151.024C198.293 147.593 199.572 143.961 200.388 140.214C201.702 134.085 206.23 125.196 206.23 125.196L206.816 122.275L195.86 120.815C187.606 116.693 191.616 108.567 193.973 104.959C194.375 104.333 194.809 103.728 195.274 103.147L204.04 105.065C204.04 105.065 205.421 105.506 208.491 106.864L209.901 107.503C211.622 108.292 213.739 109.308 216.297 110.612C224.925 114.97 221.276 119.505 221.276 119.505Z" fill="#5E52AD"/>'+
'<path id="Vector_36" d="M202.524 165.48C202.836 166.006 202.986 166.613 202.954 167.224C202.922 167.835 202.71 168.423 202.344 168.914C201.978 169.404 201.475 169.776 200.898 169.981C200.321 170.187 199.696 170.217 199.102 170.068C197.308 169.624 195.181 168.864 194.542 167.665C193.375 165.476 193.957 156.427 193.957 156.427L195.492 154.165C195.492 154.165 194.689 164.163 196.589 165.029C198.488 165.895 202.505 165.435 202.505 165.435L202.524 165.48Z" fill="#5D3E53"/>'+
'<path id="Vector_37" d="M204.078 38.5556C203.495 38.7178 202.965 39.0321 202.543 39.4663C201.968 40.1373 201.904 41.096 201.514 41.898C200.906 43.1762 199.595 43.959 198.431 44.7739C197.267 45.5887 196.106 46.7358 196.1 48.161C196.1 50.1868 198.338 51.4586 199.067 53.3407C199.761 55.0982 199.067 57.0505 198.68 58.9007C198.519 59.4997 198.504 60.1286 198.636 60.7348C198.788 61.1845 199.02 61.6033 199.32 61.9714C200.73 63.8887 202.483 65.5886 203.426 67.7711C204.142 69.4295 204.341 71.2604 204.529 73.0594C204.801 75.6477 205.073 78.2839 204.58 80.8402C204.533 80.9931 204.533 81.157 204.58 81.3099C204.664 81.4566 204.797 81.5695 204.955 81.6295C205.885 82.0812 206.898 82.3403 207.931 82.3912C208.964 82.4421 209.997 82.2837 210.968 81.9255C211.938 81.5673 212.826 81.0168 213.578 80.307C214.33 79.5972 214.931 78.7427 215.344 77.795C215.984 76.3475 216.23 74.5996 217.497 73.6602C217.644 73.538 217.822 73.4575 218.012 73.4269C218.31 73.4351 218.6 73.5319 218.843 73.7049C220.487 74.5932 222.479 74.6188 224.311 74.2545C225.418 74.034 226.55 73.641 227.282 72.7782C228.724 71.0655 227.922 68.506 228.018 66.2724C228.094 64.4862 228.782 62.6009 228.018 60.9841C227.154 59.1371 224.618 58.2105 224.407 56.191C224.279 54.9831 225.066 53.8871 225.415 52.724C226.243 49.9344 224.522 47.0905 222.879 44.6908C222.326 43.7956 221.649 42.9833 220.867 42.2783C220.13 41.7173 219.316 41.2653 218.45 40.9362C216.042 39.9233 213.586 39.412 211.095 38.7218C208.709 38.0412 206.512 37.7248 204.078 38.5556Z" fill="#85555C"/>'+
'<path id="Vector_38" d="M216.31 80.2427H207.835V66.5217C208.087 65.2039 208.234 63.8684 208.276 62.5275C208.276 62.0769 208.276 61.6168 208.276 61.1534C208.197 59.5174 207.858 57.8845 206.969 56.8876C204.631 54.261 214.564 54.6987 214.564 54.6987C214.868 55.9049 215.264 57.0863 215.747 58.2328C216.466 60.0219 217.424 61.7061 218.593 63.24C219.622 64.6049 220.94 65.7256 222.453 66.5217C228.286 69.4423 216.31 80.2427 216.31 80.2427Z" fill="#F8BDC5"/>'+
'<g id="Group_6" opacity="0.1">'+
'<path id="Vector_39" opacity="0.1" d="M215.737 58.2329C214.877 59.3539 213.726 60.2185 212.41 60.7333C211.093 61.248 209.661 61.3933 208.267 61.1534C208.187 59.5174 207.848 57.8846 206.959 56.8876C204.622 54.261 214.554 54.6987 214.554 54.6987C214.859 55.9049 215.255 57.0863 215.737 58.2329V58.2329Z" fill="black"/>'+
'</g>'+
'<path id="Vector_40" d="M209.588 60.8339C213.864 60.8339 217.33 57.3704 217.33 53.0979C217.33 48.8254 213.864 45.3618 209.588 45.3618C205.312 45.3618 201.846 48.8254 201.846 53.0979C201.846 57.3704 205.312 60.8339 209.588 60.8339Z" fill="#F8BDC5"/>'+
'<path id="Vector_41" d="M241.724 66.3779C241.344 68.4022 241.1 70.4497 240.995 72.5066C240.876 75.1364 239.002 84.6715 238.318 88.0746C238.232 88.511 238.039 88.9193 237.757 89.2632C237.474 89.6072 237.111 89.8761 236.7 90.0461C234.8 90.8226 231.347 91.2572 229.025 85.7899C227.716 82.7815 226.654 79.6717 225.85 76.4913C225.565 75.4222 225.351 74.3356 225.21 73.2384L230.327 70.4648C230.808 70.915 231.216 71.438 231.535 72.0146C232.242 73.2256 232.968 75.1684 232.815 77.9069L234.413 80.2427C234.413 80.2427 238.356 67.982 237.611 65.7931C236.866 63.6043 239.949 63.0195 239.949 63.0195C239.949 63.0195 248.567 56.3092 249.591 57.3285C250.614 58.3479 246.543 63.4573 241.724 66.3779Z" fill="#F8BDC5"/>'+
'<path id="Vector_42" d="M199.802 72.216C199.403 73.3577 198.944 74.4776 198.427 75.5711C196.707 79.2682 193.336 85.1573 188.117 88.5636C180.084 93.8168 181.837 83.1634 181.837 83.1634C181.837 83.1634 183.803 70.4968 184.174 69.2986C184.76 67.4005 184.465 64.4831 184.465 64.4831C181.399 63.0228 177.894 53.8297 178.914 53.0979C179.934 52.3662 187.228 60.834 187.228 60.834C187.228 60.834 190.589 62.4317 188.827 65.0679C187.065 67.7041 187.804 79.3704 187.804 79.3704L191.184 74.7084C191.936 72.763 192.946 70.9274 194.187 69.2506C194.826 68.3783 195.274 67.8511 195.274 67.8511L199.802 72.216Z" fill="#F8BDC5"/>'+
'<g id="Group_7" opacity="0.1">'+
'<path id="Vector_43" opacity="0.1" d="M231.539 72.0146C230.464 72.4109 226.304 74.0884 225.843 76.4882C225.559 75.4191 225.345 74.3325 225.204 73.2353L230.32 70.4617C230.805 70.9121 231.217 71.4362 231.539 72.0146Z" fill="black"/>'+
'</g>'+
'<g id="Group_8" opacity="0.1">'+
'<path id="Vector_44" opacity="0.1" d="M199.802 72.2158C199.403 73.3575 198.944 74.4774 198.427 75.571C198.229 74.1267 197.414 70.4328 194.187 69.2409C194.827 68.3686 195.274 67.8413 195.274 67.8413L199.802 72.2158Z" fill="black"/>'+
'</g>'+
'<g id="Group_9" opacity="0.1">'+
'<path id="Vector_45" opacity="0.1" d="M216.31 80.2427H207.836V66.5217C208.088 65.2039 208.235 63.8684 208.277 62.5275C210.02 64.2082 209.588 66.8125 209.588 66.8125L214.117 77.0377L216.31 67.998L215.581 66.8317L218.587 63.2592C219.616 64.6241 220.934 65.7448 222.447 66.5409C228.286 69.4423 216.31 80.2427 216.31 80.2427Z" fill="black"/>'+
'</g>'+
'<g id="Group_10" opacity="0.1">'+
'<path id="Vector_46" opacity="0.1" d="M222.297 108.26C222.297 108.26 215.658 107.733 209.898 107.483L209.32 107.458C208.501 107.426 207.721 107.4 206.956 107.381C201.366 107.247 195.044 105.295 193.97 104.953C194.373 104.329 194.808 103.726 195.274 103.147L204.04 105.065C204.04 105.065 205.421 105.506 208.491 106.864L203.455 103.147L218.805 105.921C218.805 105.921 219.339 105.854 222.162 107.432L222.297 108.26Z" fill="black"/>'+
'</g>'+
'<path id="Vector_47" d="M216.31 68.5667L215.581 67.4004L218.824 63.5244C218.824 63.5244 225.51 66.7997 227.263 66.0807C227.263 66.0807 231.5 69.5957 231.644 71.6279C231.644 71.6279 225.51 73.6698 225.654 76.7405C225.798 79.8113 222.744 86.3714 222.744 86.3714L221.465 91.6183C220.678 94.798 220.569 98.1077 221.145 101.332L222.313 107.828C222.313 107.828 213.109 107.1 206.963 106.953C200.816 106.806 193.816 104.473 193.816 104.473L197.401 96.9354C198.694 94.2151 199.327 91.2288 199.249 88.2184L198.93 76.0152C198.93 76.0152 198.639 69.8864 193.813 68.8639C193.813 68.8639 196.442 63.4637 200.529 63.9015C200.529 63.9015 206.483 61.4187 208.251 63.0962C210.02 64.7738 209.585 67.4036 209.585 67.4036L214.113 77.6289L216.31 68.5667Z" fill="#ED677B"/>'+
'<g id="Group_11" opacity="0.1">'+
'<path id="Vector_48" opacity="0.1" d="M204.001 51.5035C205.174 51.5035 206.095 50.2605 207.269 50.3244C207.877 50.3563 208.398 50.743 208.9 51.0913C210.797 52.404 212.908 53.3771 215.139 53.9671C216.006 54.1972 216.923 54.3698 217.793 54.1589C218.663 53.948 219.479 53.2642 219.578 52.3726C219.602 51.9797 219.55 51.5858 219.424 51.2127C218.439 47.7848 216.212 44.8466 213.175 42.9718C211.96 42.2273 210.476 41.6585 209.13 42.125C207.915 42.5436 207.131 43.6812 206.252 44.6174C205.589 45.3185 204.837 45.9288 204.014 46.4324C203.374 46.819 202.415 47.0715 202.047 47.7809C201.353 49.1038 202.443 51.4907 204.001 51.5035Z" fill="black"/>'+
'</g>'+
'<path id="Vector_49" d="M204.001 51.2127C205.174 51.2127 206.095 49.9697 207.269 50.0336C207.877 50.0656 208.398 50.4522 208.9 50.8005C210.797 52.1132 212.908 53.0863 215.139 53.6764C216.006 53.9064 216.923 54.079 217.793 53.8681C218.663 53.6572 219.479 52.9734 219.578 52.0819C219.602 51.6889 219.55 51.295 219.424 50.9219C218.439 47.494 216.212 44.5559 213.175 42.681C211.96 41.9365 210.476 41.3677 209.13 41.8343C207.915 42.2528 207.131 43.3904 206.252 44.3267C205.589 45.0277 204.837 45.638 204.014 46.1416C203.374 46.5283 202.415 46.7807 202.047 47.4901C201.353 48.8258 202.443 51.1967 204.001 51.2127Z" fill="#85555C"/>'+
'<path id="Vector_50" opacity="0.05" d="M200.461 84.5468C200.461 84.5468 207.618 87.1734 212.294 85.1315L214.631 85.2785C214.631 85.2785 218.517 88.001 222.626 86.7835" fill="black"/>'+
'<path id="Vector_51" opacity="0.05" d="M234.349 80.1691C234.349 80.1691 233.182 82.9427 233.764 83.8182Z" fill="black"/>'+
'<path id="Vector_52" opacity="0.05" d="M187.753 79.2936C187.753 79.2936 188.338 82.0672 187.753 82.9427Z" fill="black"/>'+
'</g>'+
'<defs>'+
'<linearGradient id="paint0_linear_165:3" x1="167.747" y1="239.038" x2="167.747" y2="7.69141" gradientUnits="userSpaceOnUse">'+
'<stop stop-color="#808080" stop-opacity="0.25"/>'+
'<stop offset="0.54" stop-color="#808080" stop-opacity="0.12"/>'+
'<stop offset="1" stop-color="#808080" stop-opacity="0.1"/>'+
'</linearGradient>'+
'<linearGradient id="paint1_linear_165:3" x1="55964.8" y1="79489.2" x2="55964.8" y2="23923.1" gradientUnits="userSpaceOnUse">'+
'<stop stop-color="#808080" stop-opacity="0.25"/>'+
'<stop offset="0.54" stop-color="#808080" stop-opacity="0.12"/>'+
'<stop offset="1" stop-color="#808080" stop-opacity="0.1"/>'+
'</linearGradient>'+
'</defs>'+
'</svg>';

/*SVG Creating */
createClock();