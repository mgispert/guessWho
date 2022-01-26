class Game {
  constructor(
    numOfCharacters = 24,
    maxNumOfAttempts = 5,
    numOfCharactersToBeFound = 3,
    previewCountdownSeconds = 10,
    gameCountdownSeconds = 60,
  ) {
    this.numOfCharacters = numOfCharacters;
    this.previewCountdownSeconds = previewCountdownSeconds;
    this.gameCountdownSeconds = gameCountdownSeconds;
    this.numOfCharactersToBeFound = numOfCharactersToBeFound;
    this.maxNumOfAttempts = maxNumOfAttempts;
    this.listOfCharacters = [];
    this.botSelectedCharacters = [];
    this.numOfCharactersFound = 0;
    this.numAttemptsCount = 0;
    this.gameCountdownInterval = null;
    this.bodyElement = document.querySelector('body');
  }

  setup() {
    const introElement = document.getElementById('intro');
    const startButtonElement = document.createElement('button');
    startButtonElement.innerText = 'START';
    startButtonElement.addEventListener('click', () => {
      this.start();
      introElement?.remove();
    });
    introElement.appendChild(startButtonElement);
  }

  start() {
    this.createCharacters();
    this.selectCharactersByBot();
    this.preview();
  }

  restart() {
    this.listOfCharacters = [];
    this.botSelectedCharacters = [];
    this.numOfCharactersFound = 0;
    this.numAttemptsCount = 0;
    this.previewCountdownSeconds = 10;
    this.gameCountdownSeconds = 60;
    this.start();
  }

  preview() {
    this.showPreviewCharactersByBot();
    this.showPreviewCountdown();
  }

  removePreview() {
    const previewElement = document.getElementById('preview');
    const countdownElement = document.getElementById('preview-countdown');
    previewElement?.remove();
    countdownElement?.remove();
  }

  removeBoard() {
    const gameCountdownElement = document.getElementById('game-countdown');
    const charactersElement = document.getElementById('characters');
    gameCountdownElement?.remove();
    charactersElement?.remove();
  }

  showPreviewCharactersByBot() {
    const previewElement = document.createElement('div');
    previewElement.id = 'preview';
    this.bodyElement.appendChild(previewElement);

    this.botSelectedCharacters.forEach((character) => {
      const characterElement = new Character().drawCharacter(character);
      previewElement.appendChild(characterElement);
    });
  }

  showPreviewCountdown() {
    const countdownElement = document.createElement('div');
    countdownElement.id = 'preview-countdown';
    countdownElement.innerHTML = this.previewCountdownSeconds;
    this.bodyElement.appendChild(countdownElement);
    const countdown = setInterval(() => {
      if (this.previewCountdownSeconds <= 0) {
        clearInterval(countdown);
        this.removePreview();
        this.setupBoard();
      } else {
        countdownElement.innerHTML = this.previewCountdownSeconds;
      }
      this.previewCountdownSeconds -= 1;
    }, 1000);
  }

  showGameCountdown() {
    const countdownElement = document.createElement('div');
    countdownElement.id = 'game-countdown';
    countdownElement.innerHTML = this.gameCountdownSeconds;
    this.bodyElement.appendChild(countdownElement);
    this.gameCountdownInterval = setInterval(() => {
      if (this.gameCountdownSeconds <= 0) {
        this.loss();
      } else {
        countdownElement.innerHTML = this.gameCountdownSeconds;
      }
      this.gameCountdownSeconds -= 1;
    }, 1000);
  }

  setupBoard() {
    this.displayCharacters();
    this.showGameCountdown();
  }

  createCharacters() {
    for (let i = 0; i < this.numOfCharacters; i++) {
      const character = new Character().randomizeCharacter(i);
      this.listOfCharacters.push(character);
    }
  }

  displayCharacters() {
    const charactersElement = document.createElement('div');
    charactersElement.id = 'characters';
    this.bodyElement.appendChild(charactersElement);
    charactersElement.innerHTML = '';

    this.listOfCharacters.forEach((character) => {
      const characterElement = new Character().drawCharacter(character);
      characterElement.addEventListener('click', () => {
        const IS_DISABLED = characterElement.classList.contains('disabled');
        const IS_FOUND = characterElement.classList.contains('found');

        // Only call selectCharacterByUser when character hasn't been previously selected
        if (!IS_DISABLED && !IS_FOUND) {
          this.selectCharacterByUser(character, characterElement);
        }
      });
      charactersElement.appendChild(characterElement);
    });
  }

  selectCharactersByBot() {
    let uniqueRandomIndexes = [];
    while (uniqueRandomIndexes.length < this.numOfCharactersToBeFound) {
      // Ex: Random between 0 and (numOfCharactersToBeFound minus 1)
      const random = Math.round(
        Math.random() * (this.numOfCharacters - 1 - 0) + 0,
      );
      // When random number is not found in uniqueRandomIndexes, push it
      if (uniqueRandomIndexes.indexOf(random) === -1) {
        uniqueRandomIndexes.push(random);
      }
    }

    uniqueRandomIndexes.forEach((uniqueId) => {
      const randomCharacter = this.listOfCharacters[uniqueId];
      this.botSelectedCharacters.push(randomCharacter);
    });
  }

  // Receives characterSelected (object) and characterSelectedElement (DOM element)
  selectCharacterByUser(characterSelected, characterSelectedElement) {
    // Check if characterSelected is equal to one of the botSelectedCharacters
    const CHARACTER_FOUND_INDEX = this.botSelectedCharacters.findIndex(
      (character) =>
        JSON.stringify(character) === JSON.stringify(characterSelected),
    );

    const CHARACTER_NOT_FOUND = -1;
    // If selected character exists, add class found and increase numOfCharactersFound
    if (CHARACTER_FOUND_INDEX !== CHARACTER_NOT_FOUND) {
      characterSelectedElement.classList.add('found');
      this.numOfCharactersFound++;
    } else {
      // If character doesn't exist, increase numAttemptsCount and add a class disabled
      this.numAttemptsCount++;
      characterSelectedElement.classList.add('disabled');
    }

    if (this.numOfCharactersFound === this.numOfCharactersToBeFound) {
      this.victory();
    }

    if (this.numAttemptsCount === this.maxNumOfAttempts) {
      this.loss();
    }
  }

  showResult(id, message) {
    this.removeBoard();
    const resultElement = document.createElement('div');
    resultElement.id = id;
    resultElement.innerHTML = message;
    this.bodyElement.appendChild(resultElement);

    const startBtnElement = document.createElement('button');
    startBtnElement.innerText = 'PLAY AGAIN';
    startBtnElement.addEventListener('click', () => {
      this.restart();
      resultElement?.remove();
    });
    resultElement.appendChild(startBtnElement);
  }

  victory() {
    this.showResult('victory', 'YOU WON!');
  }

  loss() {
    clearInterval(this.gameCountdownInterval);
    this.showResult('loss', 'OH NO, YOU LOST!');
  }
}

const game = new Game(24);
game.setup();
