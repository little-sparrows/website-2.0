import { TypingDNA } from "./typingdna.js";
import { getUserID } from "./backend_bridge.js";


//ID
function loadFingerprintId(callbackFunction) {
    const fpPromise = import('https://openfpcdn.io/fingerprintjs/v3')
        .then(FingerprintJS => FingerprintJS.load())

    fpPromise
        .then(fp => fp.get())
        .then(result => {
            const visitorId = result.visitorId
            callbackFunction(visitorId)
        })
}

function loadWeakFingerprintId(callbackFunction) {
    return loadFingerprintId(callbackFunction)
}

let fingerprintId, weakFingerprintId;

loadFingerprintId(o=>fingerprintId=o)
loadWeakFingerprintId(o=>weakFingerprintId=o)


function showUserId(userId) {
    let labelId = document.querySelector(".showid");
    labelId.textContent = userId;
    console.log(userId);
}


//timer
let timer = document.querySelector(".time");
let counter = 30;
let inputText = document.getElementsByTagName("input")[0]
function Changetimer() {
    if (counter >= 0) {
        timer.innerHTML = `00:${counter}`
        counter -= 1;
    }
    if (counter === 3) {
        loadUserID().then();
    }
    if (counter === 0) {
        inputText.readOnly = true;
    }
}
setInterval(Changetimer, 100);
//


let tdna = new TypingDNA();


function loadDNATracking() {
    tdna.addTarget("tdna-source");
}


loadDNATracking();


let collectedTypingPatterns = [];


function triggerInputDone(requestedText) {
    let pattern = tdna.getTypingPattern({type: 1, text: requestedText})
    if (!collectedTypingPatterns.includes(pattern)) {
        collectedTypingPatterns.append(pattern);
    }
}


async function loadUserID() {
    let res = await getUserID(
        fingerprintId,
        weakFingerprintId,
        collectedTypingPatterns,
    );

    showUserId(res);
}


//get text /Press "Enter"/
let needEnter = document.querySelectorAll(".needEnter");
let arr = Array.from(needEnter);

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
            arr[0].innerHTML = output;
        }
    });
}

getText();
