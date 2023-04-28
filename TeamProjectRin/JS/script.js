
//ID
function loadId(callbackFunction) {
    const fpPromise = import('https://openfpcdn.io/fingerprintjs/v3')
        .then(FingerprintJS => FingerprintJS.load())

    fpPromise
        .then(fp => fp.get())
        .then(result => {
            const visitorId = result.visitorId
            callbackFunction(visitorId)
        })
}

function main() {
    let labelId = document.querySelector(".showid");
    loadId((userId) => {
        labelId.textContent = userId;
    })
}
//show id
//main();

//timer
let timer = document.querySelector(".time");
let counter = 30;

function Changetimer() {
    if (counter >= 0) {
        timer.innerHTML = `00:${counter}`
        counter -= 1;
    }
}
setInterval(Changetimer, 1000);
//



//get text /Press "Enter"/
let needEnter = document.querySelectorAll(".needEnter");
let arr = Array.from(needEnter);


let myString = arr[0].innerText;
let myArray = myString.split("");

console.log(myArray);
let myArray2 = [];
let enteredText;
function getText() {
    document.querySelector("input").addEventListener("keydown", function (e) {
        if (e.code === "Enter") {
            enteredText = this.value;
            let string2 = enteredText;
            myArray2 = string2.split("");
            console.log(myArray2)
            //console.log(this.value);
            for (let i = 0; i < myArray.length; i++) {
                if (myArray[i] !== myArray2[i]) {
                    //i.style.color = "red";
                    //  arr[0].innerHTML = arr[0].innerHTML.replace(myArray[i], "<span style='color:red'>" + myArray[i] + "</span>");
                    let redChar = document.createElement("span");
                    redChar.style.color = "red";
                    redChar.textContent = myArray[i];
                    arr[0].replaceChild(redChar, arr[0].childNodes[i]);
                }
            }
        }

    })
}
getText()
