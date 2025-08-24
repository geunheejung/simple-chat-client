'use client';

import SignInForm from './SignInForm';
import BaseModal from '@/app/components/BaseMoadal';

export default function SignInView() {
  return (
    <BaseModal title="Sign In">
      <SignInForm />
    </BaseModal>
  );
}
