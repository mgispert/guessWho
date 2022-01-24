const FEMALE_NAMES = [
  "Elle",
  "Nadia",
  "Pasiphae",
  "Khione",
  "Clarisse",
  "Sekhmet",
  "Lethe",
  "Niobe",
  "Em",
  "Alex",
  "Sam",
  "Isis",
];
const MALE_NAMES = [
  "Logan",
  "Neil",
  "Pau",
  "Percy",
  "James",
  "William",
  "Wilde",
  "Charlie",
  "Nathan",
  "Cam",
  "Carter",
  "Hugh",
];
const GENDERS = ["male", "female"];
const HAIR_COLOUR = ["blonde", "brunette", "ginger", "green", "blue", "pink"];
const EYE_COLOUR = ["blue", "green", "brown", "gray"];
const CATEGORIES = [
  "gender",
  "hairColour",
  "hasBeard",
  "hasGlasses",
  "eyeColour",
];
const QUESTIONS_BY_CATEGORY = {
  gender: {
    male: "Are they male?",
    female: "Are they female?",
  },
  hairColour: {
    blonde: "Do they have blonde hair?",
    brunette: "Do they have brunette hair?",
    ginger: "Do they have ginger hair?",
    green: "Do they have green hair?",
    blue: "Do they have blue hair?",
    pink: "Do they have pink hair?",
  },
  eyeColour: {
    blue: "Do they have blue eyes?",
    green: "Do they have green eyes?",
    brown: "Do they have brown eyes?",
    gray: "Do they have gray eyes?",
  },
  hasBeard: {
    hasBeard: "Do they have a beard?",
    noBeard: "don't they have a bear?",
  },

  hasGlasses: {
    true: "Do they wear glasses?",
    false: "Don't they wear classes?",
  },
};

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
      const character = new Character(i).randomizeCharacter();
      this.listOfCharacters.push(character);
    }
  }

  displayCharacters() {
    const charactersElement = document.getElementById("characters");
    charactersElement.innerHTML = "";
    this.listOfCharacters.forEach((character) => {
      const characterElement = this.drawCharacter(character);

      const isCharacterAMatch = !character.noMatch;

      !isCharacterAMatch && characterElement.classList.add("disabled");
      characterElement.addEventListener("click", () => {
        if (isCharacterAMatch) {
          this.selectCharacterByUser(character.id);
        }
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

    const glassesElement = document.createElement("div");
    glassesElement.classList.add(character.hasGlasses && "glasses");
    headElement.appendChild(glassesElement);

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

    const beardElement = document.createElement("div");
    beardElement.classList.add(character.hasBeard && "beard");
    headElement.appendChild(beardElement);

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

  filterCharacters(category, questionValue) {
    this.listOfCharacters = this.listOfCharacters.map((character) => {
      const characterMatchesQuestion = character[category] === questionValue;
      const botMatchesQuestion =
        this.botSelectedCharacter[category] === questionValue;

      if (botMatchesQuestion) {
        return characterMatchesQuestion
          ? character
          : { ...character, noMatch: true };
      } else {
        return !characterMatchesQuestion
          ? character
          : { ...character, noMatch: true };
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
