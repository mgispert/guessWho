class Game {
  constructor(numOfCharacters = 24) {
    this.numOfCharacters = numOfCharacters;
    this.listOfCharacters = [];
    this.botSelectedCharacter = null;
  }

  setupIntro() {
    const introElement = document.getElementById("intro");
    const startButtonElement = document.createElement("button");
    startButtonElement.innerText = "START";
    startButtonElement.addEventListener("click", () => {
      this.start();
      introElement.remove();
    });
    introElement.appendChild(startButtonElement);
  }

  restart() {
    this.listOfCharacters = [];
    this.start();
  }

  start() {
    this.setupBoard();
    this.selectCharacterByBot();
    this.displayCategories();
    console.log("botSelectedCharacter", this.botSelectedCharacter);
  }

  setupBoard() {
    const bodyElement = document.querySelector("body");

    const boardElement = document.createElement("div");
    boardElement.id = "board";
    bodyElement.appendChild(boardElement);
    const categoriesElement = document.createElement("div");
    categoriesElement.id = "categories";
    boardElement.appendChild(categoriesElement);
    const questionsElement = document.createElement("div");
    questionsElement.id = "questions";
    boardElement.appendChild(questionsElement);
    const charactersElement = document.createElement("div");
    charactersElement.id = "characters";
    bodyElement.appendChild(charactersElement);

    this.createCharacters();
    this.displayCharacters();
  }

  createCharacters() {
    for (let i = 0; i < this.numOfCharacters; i++) {
      const character = new Character().randomizeCharacter(i);
      this.listOfCharacters.push(character);
    }
  }

  displayCharacters() {
    const charactersElement = document.getElementById("characters");
    charactersElement.innerHTML = "";
    this.listOfCharacters.forEach((character) => {
      const characterElement = new Character().drawCharacter(character);
      characterElement.addEventListener("click", () => {
        if (!character.noMatch) {
          this.selectCharacterByUser(character.id);
        }
      });
      charactersElement.appendChild(characterElement);
    });
  }

  selectCharacterByBot() {
    this.botSelectedCharacter =
      this.listOfCharacters[
        Math.round(Math.random() * (this.numOfCharacters - 0) + 0)
      ];
  }

  selectCharacterByUser(id) {
    console.log(id === this.botSelectedCharacter.id);
    if (id === this.botSelectedCharacter.id) {
      this.victory();
    } else {
      this.loss();
    }
  }

  displayCategories() {
    const categoriesElement = document.getElementById("categories");
    CATEGORIES.forEach((category) => {
      const categoryElement = document.createElement("button");
      categoryElement.innerText = category;
      categoryElement.addEventListener("click", () => {
        this.displayQuestions(category);
      });
      categoriesElement.appendChild(categoryElement);
    });
  }

  displayQuestions(category) {
    const questionsElement = document.getElementById("questions");
    for (const key in QUESTIONS_BY_CATEGORY[category]) {
      const question = QUESTIONS_BY_CATEGORY[category][key];
      const questionElement = document.createElement("button");
      questionElement.innerText = question;
      questionElement.addEventListener("click", () => {
        this.filterCharacters(category, key);
        questionElement.remove();
      });
      questionsElement.appendChild(questionElement);
    }
  }

  filterCharacters(category, questionValue) {
    this.listOfCharacters = this.listOfCharacters.map((character) => {
      const questionValueParsed =
        questionValue === "true" ? true : questionValue;
      const CHARACTER_MATCHES_QUESTION =
        character[category] === questionValueParsed;
      const BOT_MATCHES_QUESTION =
        this.botSelectedCharacter[category] === questionValueParsed;

      if (BOT_MATCHES_QUESTION) {
        return CHARACTER_MATCHES_QUESTION
          ? character
          : { ...character, noMatch: true };
      } else {
        return !CHARACTER_MATCHES_QUESTION
          ? character
          : { ...character, noMatch: true };
      }
    });
    this.displayCharacters();
  }

  victory() {
    document.querySelector("#board").remove();
    document.querySelector("#characters").remove();
    const bodyElement = document.querySelector("body");

    const victoryElement = document.createElement("div");
    victoryElement.id = "victory";
    victoryElement.innerHTML = "YOU WON!";
    bodyElement.appendChild(victoryElement);

    const startButtonElement = document.createElement("button");
    startButtonElement.innerText = "PLAY AGAIN";
    startButtonElement.addEventListener("click", () => {
      this.restart();
      victoryElement.remove();
    });
    victoryElement.appendChild(startButtonElement);
  }

  loss() {
    document.querySelector("#board").remove();
    document.querySelector("#characters").remove();
    const bodyElement = document.querySelector("body");

    const lossElement = document.createElement("div");
    lossElement.id = "loss";
    lossElement.innerHTML = "OH NO, YOU LOST!";
    bodyElement.appendChild(lossElement);

    const startButtonElement = document.createElement("button");
    startButtonElement.innerText = "PLAY AGAIN";
    startButtonElement.addEventListener("click", () => {
      this.restart();
      lossElement.remove();
    });
    lossElement.appendChild(startButtonElement);
  }
}

const game = new Game(24);
game.setupIntro();
