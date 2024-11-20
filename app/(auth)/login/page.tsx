'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import SocialLogin from '@/components/social-login';
import { useActionState } from 'react';
import { logIn } from './actions';

export default function LogIn() {
  const [state, action] = useActionState(logIn, null);

  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Log in with email and password.</h2>
      </div>
      <form className="flex flex-col gap-3" action={action}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state?.fieldErrors.password}
        />
        <Button text="Log in" />
      </form>

      <SocialLogin />
    </div>
  );
}
