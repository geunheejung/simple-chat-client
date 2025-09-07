'use server';

import { z } from 'zod';
import { signIn } from '@/auth';
import { fetchSignUp } from '../lib/http';
import { SignInInputType, signInSchema, SignUpInputType, signUpSchema } from './auth.validate';
import { FormActionValues, signInActionState, signUpActionState } from './auth.type';


export async function signUpAction(_prevState: unknown, formData: FormData): Promise<FormActionValues<boolean, SignUpInputType>> {
  const parsed = signUpSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    name: formData.get('name')
  });
    
  if (!parsed.success) {        
    const { fieldErrors } = z.flattenError(parsed.error)    
    return { ...signUpActionState, errors: fieldErrors ?? signUpActionState.errors };    
  }

  const { email, password, name } = parsed.data;

  try {
    const response = await fetchSignUp({ 
      email, password, name
    });    
        
    return {
      ...signUpActionState,
      ...response.data,      
    }
  } catch (error) {
    return signUpActionState;
  }
}


export async function signInAction(_prevState: unknown, formData: FormData): Promise<FormActionValues<string, SignInInputType>> {
  const parsed = signInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parsed.success) {
    const { fieldErrors } = z.flattenError(parsed.error);

    return { ...signInActionState, errors: fieldErrors ?? signInActionState.errors }
  }

  const { email, password } = parsed.data;

    try {
      const res = await signIn('credentials', { email, password, redirect: false });
      
      return {
        ...signInActionState,
        data: res,
      };
    } catch (error) {
      console.log('error',error);
      return signInActionState;
    }
}

