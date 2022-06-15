//if you just go to api.github.com all endpoints there - i need user
//"https://api.github.com/users/{user}"
//now i need input to turn into the end of the url 

const url = "https://api.github.com/users/"

//const response = document.getElementById("responseField")

//function to take in json
function renderResponse(jsonResponse){
    
    let myObj = jsonResponse
    /*
    I have the whole JSON stored in myObj (i couldnt get it to parse? it already is?)
    but it only exists here- cant console log outside (even when init outside of function scope)
    console.log(myObj)
    having looked in myObj i can see i need the following keys:
login
avatar_url
html_url
public_repos
*/

//now I will make 4 spaces to put this info in index.html
const pic = document.getElementById("userPic")
pic.src= `${myObj.avatar_url}`

const userName = document.getElementById("userName")
userName.innerHTML = `User name searched for: ${myObj.login}`

const link = document.getElementById("link")
//checks for proper grammar 
let myArr = myObj.login.split('').reverse()
if(myArr[0]==="s"){
    myArr.splice(1,0,"'")
    myArr.reverse()
          link.innerHTML = `<a href ="${myObj.html_url}">link to ${myArr.join('')} profile</a>`
} else link.innerHTML = `<a href ="${myObj.html_url}">link to ${myObj.login}'s profile</a>`
       
const repos = document.getElementById("repos")
repos.innerHTML = `Number of public repositories: ${myObj.public_repos}`

document.getElementById("justForFun").innerHTML = `Chances of employment after this display? ${myObj.hireable}`
}

//function to take input value and fetch. i have only just learnt this
//this is almost word for word from a codecademy lesson I literally just did
function takeInput(){
    myInput=input.value 
    //this was just to test .......response.innerHTML = `${myInput}`;    
    const endpoint = `${url}${myInput}`
    fetch(endpoint).then(response =>{
        if(response.ok){
            return response.json()
        } 
        throw new Error ("you probably typed the name wrong")
    }, networkError => {
        console.log(networkError.message)
    }).then((jsonResponse)=>{
        renderResponse(jsonResponse)
    }) 
}
//statement to listen for click of submit and the run function takeInput
submit.addEventListener('click',takeInput)
input.addEventListener('keydown',(function(event){
    if(event.keyCode===13){
        event.preventDefault();
    }
}))

//to stop people pressing enter
//this is from stack overflow 
//https://stackoverflow.com/questions/895171/prevent-users-from-submitting-a-form-by-hitting-enter
//*edit 
//the code didnt work and i re-purposed it into a 'keydown' event listener above


