import type { LoginReq, LoginRes } from "../entities/auth.entity";

export interface AuthRepositoryC {
  login: (dto: LoginReq) => Promise<LoginRes>;
}
