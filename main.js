const FEMALE_NAMES = ["Elle", "Nadia", "Pasiphae"];
const MALE_NAMES = ["Logan", "Neil", "Pau"];
const GENDERS = ["male", "female"];
const HAIR_COLOUR = ["blonde", "brunette", "ginger"];
const CATEGORIES = ["gender", "hairColour", "hasBeard", "hasGlasses", "name"];
const QUESTIONS_BY_CATEGORY = {
  gender: {
    male: "Is it male?",
    female: "Is it female?",
  },
};

class Game {
  constructor(numOfCharacters = 10) {
    this.numOfCharacters = numOfCharacters;
    this.listOfCharacters = [];
    this.botSelectedCharacter = null;
  }
  start() {
    this.setupBoard();
    this.selectCharacterByBot();
    this.displayCategories();
  }

  setupBoard() {
    this.createCharacters();
    this.displayCharacters();
  }

  createCharacters() {
    for (let i = 0; i < this.numOfCharacters; i++) {
      const character = new Character(i).randomizeCharacter();
      this.listOfCharacters.push(character);
    }
  }

  displayCharacters() {
    const charactersElement = document.getElementById("characters");
    charactersElement.innerHTML = "";
    this.listOfCharacters.forEach((character) => {
      const characterElement = document.createElement("button");
      characterElement.innerText = `${character.id} ${character.name}`;
      characterElement.addEventListener("click", () => {
        this.selectCharacterByUser(character.id);
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

  filterCharacters(category, value) {
    this.listOfCharacters = this.listOfCharacters.filter((character) => {
      return character[category] === value;
    });
    this.displayCharacters();
  }
}

class Character {
  constructor(id) {
    this.id = id;
  }
  randomizeCharacter() {
    const genderRandomIndex = this.randomIndex(GENDERS.length - 1);
    const gender = GENDERS[genderRandomIndex];
    const isMale = gender === "male";
    const name = isMale ? MALE_NAMES : FEMALE_NAMES;
    const nameRandomIndex = this.randomIndex(name.length - 1);
    const hairColourRandomIndex = this.randomIndex(HAIR_COLOUR.length - 1);

    return {
      gender: gender,
      name: name[nameRandomIndex],
      hairColour: HAIR_COLOUR[hairColourRandomIndex],
      hasGlasses: this.randomBoolean(),
      hasBeard: isMale ? this.randomBoolean() : false,
      id: this.id,
    };
  }

  randomIndex(numMax) {
    return Math.round(Math.random() * (numMax - 0) + 0);
  }

  randomBoolean() {
    return Math.random() < 0.5;
  }
}

const game = new Game();
game.start();
