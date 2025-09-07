import { ApiResponse } from "../lib/http"
import { SignInInputType, SignUpInputType } from "./auth.validate"

export interface FormActionValues<T, F> extends ApiResponse<T> {
  errors: Partial<Record<keyof F, string[]>>
}

export const signUpActionState: FormActionValues<boolean, SignUpInputType> = {
    ok: false,
    errors: {
      email: [],
      password: [],
      name: [],
    },
    data: false,
    message: '',
    error_code: '', 
}


export const signInActionState: FormActionValues<string, SignInInputType> = {
  ok: false,
  errors: {
    email: [],
    password: [],
  },
  data: '',
  message: '',
  error_code: '',
}
