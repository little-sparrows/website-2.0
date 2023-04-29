
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
let inputText = document.getElementsByTagName("input")[0];
function Changetimer() {
    if (counter >= 0) {
        timer.innerHTML = `00:${counter}`
        counter -= 1;
    }
    if (counter == 0) {
        inputText.readOnly = true;
        //   main();
    }
}
setInterval(Changetimer, 1000);
//



//get text /Press "Enter"/
let needEnter = document.querySelectorAll(".needEnter");
let arr = Array.from(needEnter);
let counterEnter = 3;
let myString = arr[0].innerText;
let myArray = myString.split("");

console.log(myArray);
let myArray2 = [];

function getText() {
    document.querySelector("input").addEventListener("keydown", function (e) {
        if (e.code === "Enter") {
            let enteredText = this.value;
            myArray2 = enteredText.split("");
            console.log(myArray2);

            let output = "";
            for (let i = 0; i < myArray.length; i++) {
                if (myArray[i] !== myArray2[i]) {
                    output += "<span style='color:red'>" + myArray[i] + "</span>";
                } else {
                    output += myArray[i];
                }
            }
            for (let j = 0; j < counterEnter + 1; j++) {
                inputText.placeholder = `Введите текст ${counterEnter} раз(а)`;
                counterEnter -= 1;
                inputText.value = "";
            }
            if (counterEnter < 0) {
                inputText.readOnly = true;
                //   main();
            }
            arr[0].innerHTML = output;
        }
    });
}

getText();
