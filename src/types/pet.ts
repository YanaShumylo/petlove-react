import type { Sex, Species } from "./notices";

export interface Pet {
  _id: string;
  name: string;
  title: string;
  imgURL: string;
  species:  Species;
  birthday: string;
  sex: Sex;
}