import { z } from "zod";

export const LoginDto = z.object({
      email: z.email(),
      password: z.string().min(8),
});

export type LoginDtoType = z.infer<typeof LoginDto>;

export const LoginResponseDto = z.object({
      user: z.object({
            id: z.string(),
            email: z.string(),
      }),
});

export type LoginResponseDtoType = z.infer<typeof LoginResponseDto>;