'use client';

import dynamic from 'next/dynamic';

const AuthModule = dynamic(
  () => import('@concepta/react-material-ui/dist/modules/auth'),
  { ssr: false },
);

const Login = () => {
  return <AuthModule route="signIn" moduleProps={{ logoSrc: '/next.svg' }} />;
};

export default Login;
