let wordList = ["tree", "door", "rain", "star"]; // Add more 4-letter words to this list
let targetWord = wordList[Math.floor(Math.random() * wordList.length)];
let attempts = 4;

function createGrid() {
  const grid = document.getElementById("grid");
  for (let row = 0; row < attempts; row++) {
    let rowEl = document.createElement("div");
    rowEl.className = "grid-row";
    grid.appendChild(rowEl);

    for (let col = 0; col < 4; col++) {
      let letter = document.createElement("input");
      letter.type = "text";
      letter.className = "guess-letter";
      letter.maxLength = 1;
      letter.dataset.row = row;
      letter.dataset.col = col;
      letter.disabled = row !== 0;

      letter.addEventListener("keydown", handleKeyDown);

      rowEl.appendChild(letter);
    }
  }
}

function handleKeyDown(e) {
  let letterInput = e.target;
  let row = parseInt(letterInput.dataset.row);
  let col = parseInt(letterInput.dataset.col);

  if (e.key === "Enter") {
    e.preventDefault();
    checkWord(row);

    if (row < attempts - 1) {
      let nextRow = row + 1;
      let newRow = document.querySelector(`input[data-row="${nextRow}"][data-col="0"]`);
      newRow.focus();
      newRow.disabled = false;
    }
  } else if (e.key === "Backspace") {
    if (col > 0 && letterInput.value === "") {
      e.preventDefault();
      document.querySelector(`input[data-row="${row}"][data-col="${col - 1}"]`).focus();
    }
  } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && /^[a-zA-Z]$/.test(e.key)) {
    e.preventDefault();
    letterInput.value = e.key.toUpperCase();

    if (col < 3) {
      setTimeout(() => {
        document.querySelector(`input[data-row="${row}"][data-col="${col + 1}"]`).focus();
      }, 0);
    } else if (row < attempts - 1) {
      setTimeout(() => {
        let nextRow = row + 1;
        let newRow = document.querySelector(`input[data-row="${nextRow}"][data-col="0"]`);
        newRow.focus();
        newRow.disabled = false;
      }, 0);
    }
  }
}

  

function checkWord(row) {
  let guess = "";
  let inputs = document.querySelectorAll(`input[data-row="${row}"]`);

  inputs.forEach((input) => {
    guess += input.value.toLowerCase();
    input.disabled = true;
    input.classList.remove("correct");
    input.classList.remove("incorrect");
  });

  if (guess === targetWord) {
    inputs.forEach((input) => {
      input.classList.add("correct");
    });
    document.getElementById("message").textContent = "Congratulations! You've found the word: " + targetWord;
    disableAllInputs();
  } else {
    inputs.forEach((input, index) => {
      if (input.value.toLowerCase() === targetWord[index]) {
        input.classList.add("correct");
      } else if (targetWord.includes(input.value.toLowerCase())) {
        input.classList.add("incorrect");
      }
    });

    if (row === attempts - 1) {
      document.getElementById("message").textContent = "Game over! The correct word was: " + targetWord;
      disableAllInputs();
    }
  }
}

function disableAllInputs() {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.disabled = true;
  });
}

createGrid();
