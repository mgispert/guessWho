class Character {
  randomizeCharacter() {
    const genderRandomIndex = this.randomIndex(GENDERS.length - 1);
    const gender = GENDERS[genderRandomIndex];
    const isMale = gender === "male";
    const hairColourRandomIndex = this.randomIndex(HAIR_COLOUR.length - 1);
    const hairColour = HAIR_COLOUR[hairColourRandomIndex];
    const eyeColourRandomIndex = this.randomIndex(EYE_COLOUR.length - 1);
    const eyeColour = EYE_COLOUR[eyeColourRandomIndex];

    return {
      gender,
      hairColour,
      hasGlasses: this.randomBoolean(),
      hasBeard: isMale ? this.randomBoolean() : false,
      eyeColour,
    };
  }

  createElement(tagName, classNames) {
    const element = document.createElement(tagName);
    classNames?.forEach((className) => element.classList.add(className));
    return element;
  }

  drawCharacter(character) {
    const characterElement = this.createElement("div", [
      "character",
      character.gender,
    ]);
    const isCharacterAMatch = !character.noMatch;
    !isCharacterAMatch && characterElement.classList.add("disabled");

    const headElement = this.createElement("div", ["head"]);
    characterElement.appendChild(headElement);

    const hairElement = this.createElement("div", [
      "hair",
      character.hairColour,
    ]);
    headElement.appendChild(hairElement);

    if (character.hasGlasses) {
      const glassesElement = this.createElement("div", ["glasses"]);
      headElement.appendChild(glassesElement);
    }

    const eyesElement = this.createElement("div", ["eyes"]);
    headElement.appendChild(eyesElement);

    const eyeLeftElement = this.createElement("div", ["eye", "left"]);
    eyesElement.appendChild(eyeLeftElement);

    const eyeRightElement = this.createElement("div", ["eye", "right"]);
    eyesElement.appendChild(eyeRightElement);

    const irisElement = this.createElement("div", [
      "iris",
      character.eyeColour,
    ]);
    const irisCloneElement = irisElement.cloneNode(true);
    eyeLeftElement.appendChild(irisElement);
    eyeRightElement.appendChild(irisCloneElement);

    const pupilElement = this.createElement("div", ["pupil"]);
    const pupilCloneElement = pupilElement.cloneNode(true);
    irisElement.appendChild(pupilElement);
    irisCloneElement.appendChild(pupilCloneElement);

    const earsElement = this.createElement("div", ["ears"]);
    headElement.appendChild(earsElement);

    const noseElement = this.createElement("div", ["nose"]);
    headElement.appendChild(noseElement);

    if (character.hasBeard) {
      const beardElement = this.createElement("div", ["beard"]);
      headElement.appendChild(beardElement);
    }

    const mouthElement = this.createElement("div", ["mouth"]);
    headElement.appendChild(mouthElement);

    return characterElement;
  }

  randomIndex(numMax) {
    return Math.round(Math.random() * (numMax - 0) + 0);
  }

  randomBoolean() {
    return Math.random() < 0.5;
  }
}
