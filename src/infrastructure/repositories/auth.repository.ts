import type { AxiosInstance } from "axios";
import axiosInstance from "../api/axios-client";
import type { LoginReq, LoginRes } from "@/core/entities/auth.entity";

class AuthRepository implements AuthRepository {
  private readonly prefix = "/auth";
  private readonly http: AxiosInstance = axiosInstance;

  async login(dto: LoginReq): Promise<LoginRes> {
    const { data } = await this.http.post<LoginRes>(
      `${this.prefix}/mobile-login`,
      dto,
    );
    return data;
  }
}

export const authRepository = new AuthRepository();
