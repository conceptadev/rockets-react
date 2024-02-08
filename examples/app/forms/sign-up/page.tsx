'use client';

import dynamic from 'next/dynamic';

const AuthModule = dynamic(
  () => import('@concepta/react-material-ui/dist/modules/auth'),
  { ssr: false },
);

import { schema } from './constants';

const SignUp = () => {
  return (
    <AuthModule
      route="signUp"
      moduleProps={{
        logoSrc: '/next.svg',
        queryUri: '/api/sign-up',
        signInPath: '/forms/login',
      }}
      formProps={{ formSchema: schema, overrideDefaults: true }}
    />
  );
};

export default SignUp;
