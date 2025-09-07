import z from "zod";

export const signUpSchema = z.object({
  email: z.email('올바른 이메일을 입력해주세요.'),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다.'),
  name: z.string().min(1, '이름은 필수입니다.')
})

export type SignUpInputType = z.infer<typeof signUpSchema>;


export const signInSchema = z.object({
  email: z.email('올바른 이메일을 입력해주세요.'),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다.'),
})

export type SignInInputType = z.infer<typeof signInSchema>;
