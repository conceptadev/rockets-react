export const signInModuleProps = {
  signInRequestPath: '/auth/login',
  forgotPasswordPath: '/forgot-password',
  signUpPath: '/sign-up',
  query: {
    uri: '',
    method: '',
  },
};

export const signUpModuleProps = {
  signInPath: '/sign-in',
  query: {
    uri: '/user',
    method: 'post',
  },
};

export const forgotPasswordModuleProps = {
  signInPath: '/sign-in',
  query: {
    uri: '/auth/recovery/password',
    method: 'post',
  },
};

export const resetPasswordModuleProps = {
  signInPath: '/sign-in',
  query: {
    uri: '/auth/recovery/password',
    method: 'patch',
  },
};
