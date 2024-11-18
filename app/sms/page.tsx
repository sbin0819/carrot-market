'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { useFormState } from 'react-dom';
import { smsLogin } from './actions';

const initialState = {
  token: false,
  error: undefined,
};

export default function SMSLogin() {
  const [state, dispatch] = useFormState(smsLogin, initialState);

  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Log in</h1>
        <h2 className="text-xl">Verify your phone number.</h2>
      </div>
      <form className="flex flex-col gap-3" action={dispatch}>
        {state.token ? (
          <Input
            name="token"
            type="number"
            placeholder="Verification code"
            required
            min={100000}
            max={999999}
            errors={state.error?.formErrors}
          />
        ) : (
          <Input
            name="phone"
            type="number"
            placeholder="Phone number"
            required
            errors={state.error?.formErrors}
          />
        )}
        <Button text={state.token ? 'Verify' : 'Send verification code'} />
      </form>
    </div>
  );
}
