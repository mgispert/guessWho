const FEMALE_NAMES = ["Elle", "Nadia", "Pasiphae"];
const MALE_NAMES = ["Logan", "Neil", "Pau"];
const GENDERS = ["male", "female"];
const HAIR_COLOUR = ["blonde", "brunette", "ginger"];
const EYE_COLOUR = ["blue", "green"];
const CATEGORIES = [
  "gender",
  "hairColour",
  "hasBeard",
  "hasGlasses",
  "name",
  "eyeColour",
];
const QUESTIONS_BY_CATEGORY = {
  gender: {
    male: "Are they male?",
    female: "Are they female?",
  },
  hairColour: {
    blonde: "Are they blonde?",
    brunette: "Are they brunette?",
    ginger: "Are they ginger?",
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
    console.log("botSelectedCharacter", this.botSelectedCharacter);
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
      // const characterElement = document.createElement("button");
      // characterElement.innerText = `${JSON.stringify(character)}`;
      const characterElement = this.drawCharacter(character);
      if (character.noMatch) characterElement.disabled = true;

      characterElement.addEventListener("click", () => {
        this.selectCharacterByUser(character.id);
      });

      charactersElement.appendChild(characterElement);
    });
  }

  drawCharacter(character) {
    const characterElement = document.createElement("div");
    characterElement.classList.add("character", character.gender);
    characterElement.innerText = character.name;

    const headElement = document.createElement("div");
    headElement.classList.add("head");
    characterElement.appendChild(headElement);

    const hairElement = document.createElement("div");
    hairElement.classList.add("hair", character.hairColour);
    headElement.appendChild(hairElement);

    const eyesElement = document.createElement("div");
    eyesElement.classList.add("eyes");
    headElement.appendChild(eyesElement);

    const eyeLeftElement = document.createElement("div");
    eyeLeftElement.classList.add("eye", "left");
    eyesElement.appendChild(eyeLeftElement);

    const eyeRightElement = document.createElement("div");
    eyeRightElement.classList.add("eye", "right");
    eyesElement.appendChild(eyeRightElement);

    const irisElement = document.createElement("div");
    irisElement.classList.add("iris", character.eyeColour);
    const irisCloneElement = irisElement.cloneNode(true);
    eyeLeftElement.appendChild(irisElement);
    eyeRightElement.appendChild(irisCloneElement);

    const pupilElement = document.createElement("div");
    pupilElement.classList.add("pupil");
    const pupilCloneElement = pupilElement.cloneNode(true);
    irisElement.appendChild(pupilElement);
    irisCloneElement.appendChild(pupilCloneElement);

    const earsElement = document.createElement("div");
    earsElement.classList.add("ears");
    headElement.appendChild(earsElement);

    const noseElement = document.createElement("div");
    noseElement.classList.add("nose");
    headElement.appendChild(noseElement);

    const mouthElement = document.createElement("div");
    mouthElement.classList.add("mouth");
    headElement.appendChild(mouthElement);

    return characterElement;
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

  filterCharacters(category) {
    this.listOfCharacters = this.listOfCharacters.map((character) => {
      if (character[category] === this.botSelectedCharacter[category]) {
        return character;
      } else {
        return { ...character, noMatch: true };
      }
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
    const eyeColourRandomIndex = this.randomIndex(EYE_COLOUR.length - 1);
    const eyeColour = EYE_COLOUR[eyeColourRandomIndex];

    return {
      gender: gender,
      name: name[nameRandomIndex],
      hairColour: HAIR_COLOUR[hairColourRandomIndex],
      hasGlasses: this.randomBoolean(),
      hasBeard: isMale ? this.randomBoolean() : false,
      eyeColour: eyeColour,
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
