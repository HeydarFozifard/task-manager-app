import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("ایمیل معتبر وارد کنید"),

  password: z
    .string()
    .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد"),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "نام باید حداقل 3 حرف باشد"),

  email: z
    .string()
    .email("ایمیل معتبر وارد کنید"),

  password: z
    .string()
    .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد"),
});