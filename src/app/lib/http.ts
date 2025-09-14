import axios from "axios";

const API_ROUTES = {
  AUTH: {
    SIGN_UP: '/auth/signup',
    SIGN_IN: '/auth/signin',
  }
} as const;

const axiosInstnace = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

export interface ApiResponse<T> {
  ok: boolean;
  data: T;
  error_code: string;
  message: string;
}

interface FetchSignUpRequest {
  email: string;
  password: string;
  name: string;
}

export const fetchSignUp = ({ email, password, name }: FetchSignUpRequest) => axiosInstnace.post<ApiResponse<boolean>>(API_ROUTES.AUTH.SIGN_UP, { 
      email, password, name
    });

    export interface UserData {
      id: string;
      email: string;
      password: string;
      name: string;
      createdAt: number;
    }
    

    type SignInResponseType = UserData | null;
export const fetchSignIn = async ({ email, password }: { email: string; password: string; }) => {
  const response = await axiosInstnace.post<ApiResponse<SignInResponseType>>(API_ROUTES.AUTH.SIGN_IN, { 
    email, password
  })

  console.log('response',response)
  return response;
};