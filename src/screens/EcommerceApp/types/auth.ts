export type User = {
  id: number;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  gender?: string;
  email?: string;
};

export type SignInPayload = {
  username: string;
  password: string;
};

export type SignInResponse = User & {
  accessToken: string;
  refreshToken: string;
};
