import type { LoginReq } from "@/core/entities/auth.entity";
import { authRepository } from "@/infrastructure/repositories/auth.repository";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationKey: ["client", "web", "login"],
    mutationFn: (dto: LoginReq) => authRepository.login(dto),
  });
};
