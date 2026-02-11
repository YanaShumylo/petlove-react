import type { Notice } from "./notices";
import type { Pet } from "./pet";

export interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
  noticesFavorites: Notice[];
}

export interface FullUser{
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  token: string;
  noticesViewed: Notice[];
  noticesFavorites: Notice[];
  pets: Pet[];
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  avatar?: string;
  phone?: string;
};