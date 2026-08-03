// login request
export interface LoginReq {
  dni: string;
  password: string;
}

// login response
export interface LoginRes {
  success: boolean;
  path: string;
  timestamp: string;
  data: Data;
}

export interface Data {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  user: User;
}

type UserRole = "CITIZEN";

export interface User {
  id: string;
  dni: string;
  email: string | null;
  name: string;
  lastName: string | null;
  phone: string | null;
  role: UserRole;
  status: string;
}
