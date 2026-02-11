export interface Notice {
  _id: string;
  species: Species;
  category: Category;
  title: string;
  name: string;
  birthday: string;
  comment: string;
  sex: Sex;
  location: string | Location;
  imgURL: string;
  price?: number;
  popularity?: number;
  user: string | User;
  createdAt: string;
  updatedAt: string;
}

export type NoticeListItem = Omit<Notice, 'location' | 'user'> & {
  location: string;
  user: string;
};

export type NoticeDetails = Omit<Notice, 'location' | 'user'> & {
  location: Location;
  user: User;
};

export interface Location{
_id: string;
stateEn: string;
cityEn: string;
}

export interface User {
_id: string;
email: string;
phone: string;
}

export type Category = "sell" | "free" | "lost" | "found";

export type Species =
  | "dog"
  | "cat"
  | "monkey"
  | "bird"
  | "snake"
  | "turtle"
  | "lizard"
  | "frog"
  | "fish"
  | "ants"
  | "bees"
  | "butterfly"
  | "spider"
  | "scorpion";

export type Sex = "unknown" | "female" | "male" | "multiple";



