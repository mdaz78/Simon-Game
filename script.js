let game = {
  "level": 1,
  "possibilites": ["green", "red", "yellow", "blue"],
  "simonSequence": [],
  "sound": {
    "green": new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    "red": new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    "blue": new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    "yellow": new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
  },
  'strict': false,
}

function restartGame() {
  counter = 0;
  game.level = 1;
  game.simonSequence = [];
  startGame();
}

function startGame() {
  // change the color of start
  document.querySelector('.start').style.color = 'red';

  // disable start and strict once the game runs
  document.querySelector('.start').disabled = true;
  document.querySelector('.strict').disabled = true;

  // create an array with random color
  console.log(game.simonSequence);
  game.simonSequence.push(game.possibilites[Math.floor(Math.random() * 4)]);


  // blink the pattern according to the random array
  blinkSimonSequence(game.simonSequence);

  // display the level
  document.querySelector('.display').innerText = game.level;
  game.level += 1;
  if (game.level == 20) {
    alert("You won the game!");
    restartGame();
  }

  // check if the user clicks correctly
  checkPlayerSequence();
}

function blinkSimonSequence(arr) {
  console.log(arr);
  for (let i = 1; i <= arr.length; i++) {
    setTimeout((function(i) {
      return function() {
        let colorPad = document.getElementById(arr[i - 1]);
        colorPad.style.opacity = 0.5;
        game.sound[arr[i - 1]].play();
      }
    })(i), 500 * i);

    setTimeout((function(i) {
      return function() {
        let colorPad = document.getElementById(arr[i - 1]);
        colorPad.style.opacity = 1;
        game.sound[arr[i - 1]].play();
      }
    })(i), 700 * i);

  }
}

let counter = 0;

function check(e) {
  if (e.target.id == game.simonSequence[counter]) {
    counter++;
  } else if (e.target.id !== game.simonSequence[counter]) {
    if (game.strict === false) {
      alert("Wrong Move!");
      blinkSimonSequence(game.simonSequence);
    } else {
      alert("Wrong Move...restarting!")
      restartGame();
    }
  }
  checkIfRight();
}

function checkIfRight() {
  if (counter === game.simonSequence.length) {
    counter = 0;
    startGame();
  }
}

function checkPlayerSequence() {
  let colorButton = document.querySelectorAll('.buttons');
  for (let i = 0; i < colorButton.length; i++) {
    colorButton[i].addEventListener('click', check);
  }
}

document.querySelector('.start').addEventListener('click', startGame);
document.querySelector('.restart').addEventListener('click', restartGame);
document.querySelector('.strict').addEventListener('click', () => {
  if (!game.strict) {
    game.strict = true;
    document.querySelector('.strict').style.color = 'red';
  } else {
    game.strict = false;
    document.querySelector('.strict').style.color = 'black';
  }
});