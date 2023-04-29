import { TypingDNA } from "./typingdna.js";
import { getUserID } from "./backend_bridge.js";


//ID
function loadFingerprintId(callbackFunction) {
    let FingerprintJS
    const fpPromise = import('https://openfpcdn.io/fingerprintjs/v3')
        .then(FingerprintJSn => {
            FingerprintJS = FingerprintJSn;
            return FingerprintJSn.load()
        })

    fpPromise
        .then(fp => {
            fp.get().then(
                result => {
                    const fingerprintId = result.visitorId
                    let weakResult = {};
                    weakResult.canvas = result.components.canvas
                    weakResult.cpuClass = result.components.cpuClass
                    weakResult.hardwareConcurrency = result.components.hardwareConcurrency
                    weakResult.fonts = result.components.fonts
                    weakResult.platform = result.components.platform
                    weakResult.vendor = result.components.vendor
                    weakResult.videoCard = result.components.videoCard
                    const weakFingerprintId = FingerprintJS.hashComponents(weakResult)
                    callbackFunction(fingerprintId, weakFingerprintId)
                }
            );
        })
}


let fingerprintId, weakFingerprintId;

loadFingerprintId((o, o2)=> {
    fingerprintId = o;
    weakFingerprintId = o2;
})

function showUserId(userId) {
    let labelId = document.querySelector(".showid");
    labelId.textContent = userId;
}


//timer
let timer = document.querySelector(".time");
let counter = 30;
let inputText = document.getElementsByTagName("input")[0];

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
setInterval(Changetimer, 1200);


let tdna = new TypingDNA();


function loadDNATracking() {
    tdna.addTarget("tdna-source");
}


loadDNATracking();


let collectedTypingPatterns = [];


function triggerInputDone(requestedText) {
    let pattern = tdna.getTypingPattern({type: 1, text: requestedText})
    if (!collectedTypingPatterns.includes(pattern)) {
        collectedTypingPatterns.push(pattern);
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

function getTestPattern() {
    return "Привет, Мир!";
}


let testPatternLabel = document.querySelector(".needEnter");
testPatternLabel.textContent = getTestPattern();


//get text /Press "Enter"/
let needEnter = document.querySelector(".needEnter");
let counterEnter = 3;
let myString = getTestPattern();
let myArray = myString.split("");

console.log(myArray);
let myArray2 = [];

function getText() {
    document.querySelector("input").addEventListener("keydown", function (e) {
        if (e.code === "Enter") {
            let enteredText = this.value;
            myArray2 = enteredText.split("");

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
                triggerInputDone();
            }
            if (counterEnter < 0) {
                inputText.readOnly = true;
            }
            needEnter.innerHTML = output;
        }
    });
}

getText();
