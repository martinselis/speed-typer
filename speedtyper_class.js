let speedInput = document.getElementsByClassName("typer")[0]
let myText = document.getElementsByClassName("first_one")[0]

let myString = 'Try typing really Fast backspace works what does the fox say if as when run faster tremendous logical please therefore lie or and hungry super timmy forest gump precision we not here take accommodate we conscience and thats where you find by over I mean that the same but different and have to write fast but not slow with the same and positive effects';

// Splits the above string into list. Typing verification happens by pulling word from list and verifying letter by letter.
let myCopy = myString.split(' ');
myText.textContent = myCopy.join(' ');

// Initialize variables that will be used.
let colorCopy = myCopy;
let [i, wordCounter, letterCounter, errorCounter] = [0, 0, 0, 0, 0];
let [myCopyWithColors, newWord, letterColor, previousKey, currentKey] = ['', '', '', '', ''];
let letterCopy = myCopy;
let clearSpace = true;
let activeError = false;
let specialChar = false;
let previousChar = '';

// Check if all words have been typed out.
if (wordCounter < myCopy.length) {
speedInput.onkeypress = function(event) {
 // Check pressed letters against ASCII code.
  var x = event.which || event.keyCode;
  if (myASCII[x] == myCopy[0][0]) {
    perfTimeVar.timerStart();
  }
  try {

      // If letter isn't correct or isn't space, error.
    if (!(myASCII[x] == myCopy[wordCounter][letterCounter] || myASCII[x] == ' ')) {
      player.errorUpdate();
        activeError = true;
        keyLight();

      typerClass.changeColor(wordCounter);

    // If matches letter, move on to next letter and clear red keylight.
    } else if (myCopy[wordCounter][letterCounter] == myASCII[x]) {
        activeError = false;
      letterCounter += 1;
      newWord += myASCII[x];
      typerClass.letterUnderscore(wordCounter);
        keyLight();
      typerClass.fixColor();

    }

    // On space press, verify if word was correct.
    if (myASCII[x] == ' ') {
        if (newWord == myCopy[wordCounter]) {
          typerClass.clearTextBox();
          typerClass.fixColor();
          wordCounter += 1;
          letterCounter = 0;
          newWord = '';
          perfTimeVar.timerMid();
            activeError=false;
          typerClass.letterUnderscore(wordCounter);
            keyLight();
          typerClass.fixColor();
          typerClass.checkFinish();

        } else {
          console.log('word was not correct');
        }
      }
    } catch(err) {
    console.log(err)
  }
}
}
function changeBeige(item) {
    document.getElementById(item).style.backgroundColor="beige";

}
function changeRed(item) {
    document.getElementById(item).style.backgroundColor="red";

}

function revertBack(item) {
    document.getElementById(item).style.backgroundColor="";

}

// Function to light keys through the DOM
function keyLight (){

    if (letterCounter > 0) {
        revertBack('leftShift');

    }
    currentKey = myCopy[wordCounter][letterCounter];

    if (typeof(currentKey) === 'undefined') {
        changeBeige('space')
    }
    try {
    if (currentKey != currentKey.toLowerCase()) {
        changeBeige('leftShift');
        leftShift = true;
        currentKey = currentKey.toLowerCase();
        changeBeige(currentKey);
    } }catch (err) {
        revertBack('leftShift');
    }

    if (activeError === true) {
        changeRed("backspace")
    } else {
        revertBack("backspace")

    }

    if (clearSpace == true) {
        revertBack("space")
    }


    if (typeof(currentKey) == 'string' && currentKey == currentKey.toLowerCase()) {
        currentKey = currentKey.toLowerCase()
        changeBeige(currentKey)

    }

    else {
        changeBeige("space");
        clearSpace = true;
    }

    try {
        previousKey = myCopy[wordCounter][letterCounter - 1];
        previousKey = previousKey.toLowerCase();
        document.getElementById(previousKey).style.backgroundColor="";
    }
    catch (err) {

    }
}

// Class to track active words in the text - underscore, lighter color, error. Also tracks letters.
  class Typer {
    changeColor(wordCounter) {
      colorCopy = myCopy;
      colorCopy[wordCounter] = "<span style='background-color:#adb3bc;font-weight:bold;color:red;'>" + myCopy[wordCounter] + "</span>";
      myText.innerHTML = colorCopy.join(' ');
      myCopy = myString.split(' ');
    }

    letterUnderscore(wordCounter) {
      letterCopy = myCopy;
      letterColor = '';
      try {
        for (let num = 0; num < myCopy[wordCounter].length; num++) {
          if (num !== letterCounter) {
            letterColor = letterColor + myCopy[wordCounter][num];
          } else if ( num !== letterCounter || myCopy[wordCounter].length >= letterCounter + 1) {
            letterColor = letterColor + "<span style='background-color:#adb3bc;font-weight:bold;text-decoration:underline;'>" + myCopy[wordCounter][num] + "</span>";
          }
        }
        return letterColor;
        }
        catch(err) {
        document.getElementsByClassName("wpm")[0].textContent = "WPM: " + perfTimeVar.wpm + " - final speed!";
        }
      }

    fixColor() {
      colorCopy = myCopy;
      if (wordCounter > 0) {
        colorCopy[0] = "<span style='color:gray;'>" + colorCopy[0]
      }
      colorCopy[wordCounter] = "</span><span style='background-color:#adb3bc;font-weight:bold;color:black;'>" + letterColor + "</span>"; /*was + myCopy[wordCounter] */
      myText.innerHTML = myCopy.join(' ');
      myCopy = myString.split(' ');
    }
    checkFinish() {
      if (wordCounter == myCopy.length) {
        perfTimeVar.timerEnd()
      }
    }
    clearTextBox() { // input field cleared when moving to next word
      if (wordCounter % 1 == 0) {
        document.getElementById("myTyper").value = '';
      }
    }

  }

// Calculates WPM and performance
class Timer {
  constructor() {
    this.perfStart = 0;
    this.perfMid = 0;
    this.perfEnd = 0;
    this.speed = 0;
    this.wpm = 0;
  }
  timerStart() {
    this.perfStart = Date.now();
  }
  timerMid() {
    this.perfMid = Date.now();
    this.speed = (this.perfMid - this.perfStart) / 1000;
    this.wpm = Math.round((wordCounter / this.speed) * 60);
    player.wordUpdate(this.wpm);
  }
  timerEnd() {
    this.perfEnd = Date.now();
    this.speed = (this.perfEnd - this.perfStart) / 1000;
    this.wpm = Math.round((wordCounter / this.speed) * 60);
    player.wordUpdate(this.wpm);
  }

}

class PerformanceSummary {
  constructor(errorCounter) {
    this.errors = errorCounter;
    this.wordUpdate = function(speed) {
      document.getElementsByClassName("wpm")[0].textContent = "WPM: " + speed;
      console.log('perfstart:' + perfTimeVar.perfStart + '. perfmid: ' + perfTimeVar.perfMid)
    }
    this.errorUpdate = function() {
      this.errors += 1;
      document.getElementsByClassName("errors")[0].textContent = "Mistypes: " + this.errors;
    };
}
}



let typerClass = new Typer();
let perfTimeVar = new Timer();
let player = new PerformanceSummary(errorCounter);
keyLight();
typerClass.letterUnderscore(wordCounter);
typerClass.fixColor(wordCounter);




var myASCII = { 32: " ", 97: "a", 98: "b", 33: "!",
65:"A",34:  '"', 66:  "B", 35:  "#", 67: "C", 99: "c",
36: "$", 68: "D", 100: "d", 37: "%", 69: "E", 101:"e",
38:  "&", 70: "F", 102: "f", 39:  "'", 71: "G", 103:"g",
40:  "(", 72: "H", 104: "h", 41:  ")", 73: "I", 105: "i",
42:  "*", 74: "J", 106:  "j",
43: "+",         75: "K",        107:  "k",
44: ",",         76: "L",        108:  "l",
45: "-",         77: "M",        109:  "m",
46: ".",         78: "N",        110:  "n",
47: "/",         79: "O",        111:  "o",
48: "0",         80: "P",        112:  "p",
49: "1",         81: "Q",        113:  "q",
50: "2",         82: "R",        114:  "r",
51: "3",         83: "S",        115:  "s",
52: "4",         84: "T",        116:  "t",
53: "5",         85: "U",        117:  "u",
54: "6",         86: "V",        118:  "v",
55: "7",         87: "W",        119:  "w",
56: "8",         88: "X",        120:  "x",
57: "9",         89: "Y",        121:  "y",
58: ":",         90: "Z",        122:  "z",
59: ";",         91: "[",        123:  "{",
60: "<",                 124:  "|",
61: "=",         93:  "]",        125:  "}",
62: ">",         94:  "^",       126:  "~",
63: "?",         95:  "_", 127: 'del'}
