// const FEMALE_NAMES = [
//   "Elle",
//   "Nadia",
//   "Pasiphae",
//   "Khione",
//   "Clarisse",
//   "Sekhmet",
//   "Lethe",
//   "Niobe",
//   "Em",
//   "Alex",
//   "Sam",
//   "Isis",
// ];
// const MALE_NAMES = [
//   "Logan",
//   "Neil",
//   "Pau",
//   "Percy",
//   "James",
//   "William",
//   "Wilde",
//   "Charlie",
//   "Nathan",
//   "Cam",
//   "Carter",
//   "Hugh",
// ];
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
    true: "Do they have a beard?",
  },
  hasGlasses: {
    true: "Do they wear glasses?",
  },
};
