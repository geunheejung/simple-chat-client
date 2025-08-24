'use client';

import SignUpForm from '@/app/sign-up/_components/SignUpForm';
import BaseModal from '@/app/components/BaseMoadal';

export default function SignUpModal() {
  return (
    <BaseModal
      title="Sign Up"
      footer={
        <p className="text-center text-xs text-zinc-500">
          Already have an account?{' '}
          <span className="font-medium text-zinc-700">Sign in</span>
        </p>
      }
    >
      <SignUpForm />
    </BaseModal>
  );
}
