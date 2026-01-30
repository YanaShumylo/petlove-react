export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  name: string;
  email: string;
  token: string;
};