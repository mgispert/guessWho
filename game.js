class Game {
  constructor(numOfCharacters = 24) {
    this.numOfCharacters = numOfCharacters;
    this.listOfCharacters = [];
    this.botSelectedCharacter = null;
  }

  start() {
    this.setupBoard();
    this.selectCharacterByBot();
    this.displayCategories();
    console.log("botSelectedCharacter", this.botSelectedCharacter);
  }

  setupBoard() {
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
    return id === this.botSelectedCharacter.id;
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
}

const game = new Game(24);
game.start();
