import React, { ReactNode } from 'react';

import type { RJSFSchema, UiSchema } from '@rjsf/utils';
import type { IChangeEvent } from '@rjsf/core';

import type { AdvancedProperty } from '../../SchemaForm/types';
import type { ValidationRule } from '../../../utils/form/validation';

import { useState } from 'react';
import useDataProvider, { useQuery } from '@concepta/react-data-provider';
import validator from '@rjsf/validator-ajv6';
import { Box, Button, Container, Card, CircularProgress } from '@mui/material';

import Text from '../../../components/Text';
import { Link } from '../../../components/Link';
import { SchemaForm } from '../../../components/SchemaForm';
import { Image } from '../../../components/Image';

import { CustomTextFieldWidget } from '../../../styles/CustomWidgets';

import { validateForm } from '../../../utils/form/validation';

import {
  defaultAuthUiSchema,
  signInFormSchema,
  signUpFormSchema,
  forgotPasswordFormSchema,
  resetPasswordFormSchema,
} from './constants';
import { useAuth } from '@concepta/react-auth-provider';

const widgets = {
  TextWidget: CustomTextFieldWidget,
};

type Route = 'signIn' | 'signUp' | 'forgotPassword' | 'resetPassword';

type Query = {
  uri?: string;
  method?: string;
  onSuccess?: ((data: unknown) => void) | null;
  onError?: ((error: unknown) => void) | null;
};

type FormData = Record<string, unknown> | null;

export interface AuthFormSubmoduleProps {
  route: Route;
  query?: Query;
  title?: string | ReactNode;
  hideTitle?: boolean;
  formSchema?: RJSFSchema;
  formUiSchema?: UiSchema;
  advancedProperties?: Record<string, AdvancedProperty>;
  formData?: FormData;
  signInRequestPath?: string;
  signInPath?: string;
  signUpPath?: string;
  forgotPasswordPath?: string;
  customValidation?: ValidationRule<Record<string, string>>[];
  submitButtonTitle?: string;
  logoSrc?: string;
  hideLogo?: boolean;
  headerComponent?: ReactNode;
  overrideDefaults?: boolean;
  submitDataFormatter?: (data: FormData) => FormData;
}

const renderTitle = (title: string | ReactNode) => {
  if (typeof title === 'string') {
    return (
      <Text
        variant="h4"
        fontFamily="Inter"
        fontSize={30}
        fontWeight={800}
        mt={1}
        gutterBottom
      >
        {title}
      </Text>
    );
  }

  return title;
};

const AuthFormSubmodule = (props: AuthFormSubmoduleProps) => {
  const [formData, setFormData] = useState<Record<string, unknown>>({});

  const searchParams = new URLSearchParams(window.location.search);
  const passcode = searchParams?.get('token');

  const { post, patch, put } = useDataProvider();
  const { doLogin, isPending: isLoadingSignIn } = useAuth();

  const query =
    {
      post: post,
      patch: patch,
      put: put,
    }[props.query?.method || 'post'] || post;

  const { execute: performRequest, isPending: isLoadingRequest } = useQuery(
    (body: Record<string, unknown>) =>
      query({
        uri: props.query?.uri || '',
        body,
      }),
    false,
    {
      onSuccess: async (data) => {
        // request para /me

        // set no user using setUser
        props.query?.onSuccess?.(data);
      },
      onError: (error) => props.query?.onError?.(error),
    },
  );

  const handleSubmit = async (values: IChangeEvent<Record<string, string>>) => {
    const fields = values.formData || {};

    if (props.route === 'signIn') {
      const { username, password } = fields;
      const loginData = props.submitDataFormatter
        ? props.submitDataFormatter(fields)
        : { username, password, loginPath: props.signInRequestPath };
      doLogin(loginData);
      return;
    }

    if (props.route === 'resetPassword') {
      const fieldsWithPasscode = { ...fields, passcode };
      const resetPassData = props.submitDataFormatter
        ? props.submitDataFormatter(fieldsWithPasscode)
        : fieldsWithPasscode;
      await performRequest(resetPassData);
      return;
    }

    performRequest(fields);
  };

  const isLoading = isLoadingSignIn || isLoadingRequest;

  const defaultRouteTitle = {
    signIn: 'Sign in',
    signUp: 'Sign up',
    forgotPassword: 'Recover password',
    resetPassword: 'Reset password',
  }[props.route];

  const defaultFormSchema =
    {
      signIn: signInFormSchema,
      signUp: signUpFormSchema,
      forgotPassword: forgotPasswordFormSchema,
      resetPassword: resetPasswordFormSchema,
    }[props.route] || {};

  return (
    <Container sx={{ textAlign: 'center', padding: '48px 0' }}>
      {!props.hideLogo && (
        <Image src={props.logoSrc || '/logo.svg'} alt="logo" />
      )}

      {props.headerComponent || null}

      <Container maxWidth="xs">
        <Card sx={{ padding: '24px', marginTop: '32px' }}>
          {!props.hideTitle && renderTitle(props.title ?? defaultRouteTitle)}

          <SchemaForm.Form
            schema={
              props.overrideDefaults && props.formSchema
                ? props.formSchema
                : {
                    ...defaultFormSchema,
                    ...props.formSchema,
                    required: [
                      ...(defaultFormSchema.required || []),
                      ...(props.formSchema?.required || []),
                    ],
                    properties: {
                      ...defaultFormSchema.properties,
                      ...props.formSchema?.properties,
                    },
                  }
            }
            uiSchema={
              props.overrideDefaults && props.formUiSchema
                ? props.formUiSchema
                : { ...defaultAuthUiSchema, ...props.formUiSchema }
            }
            validator={validator}
            formData={props.formData || formData}
            onChange={({ formData }) => setFormData(formData)}
            onSubmit={handleSubmit}
            noHtml5Validate={true}
            showErrorList={false}
            advancedProperties={props.advancedProperties}
            customValidate={
              props.customValidation
                ? (formData, errors) =>
                    validateForm(formData, errors, props.customValidation)
                : undefined
            }
            widgets={widgets}
          >
            {props.forgotPasswordPath ? (
              <Text fontSize={14} fontWeight={500} gutterBottom sx={{ mt: 2 }}>
                <Link href={props.forgotPasswordPath} color="primary.dark">
                  Forgot your password?
                </Link>
              </Text>
            ) : null}

            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              mt={2}
            >
              <Button
                type="submit"
                variant="contained"
                disabled={Boolean(isLoading)}
                sx={{ flex: 1 }}
              >
                {isLoading ? (
                  <CircularProgress sx={{ color: 'white' }} size={24} />
                ) : (
                  props.submitButtonTitle || 'Send'
                )}
              </Button>
            </Box>
          </SchemaForm.Form>

          {props.signInPath ? (
            <Text fontSize={14} fontWeight={500} gutterBottom sx={{ mt: 3 }}>
              <Link href={props.signInPath} color="primary.dark">
                Already have an account? Sign in
              </Link>
            </Text>
          ) : null}

          {props.signUpPath ? (
            <Text fontSize={14} fontWeight={500} gutterBottom sx={{ mt: 3 }}>
              <Link href={props.signUpPath} color="primary.dark">
                No account? Sign up
              </Link>
            </Text>
          ) : null}
        </Card>
      </Container>
    </Container>
  );
};

export default AuthFormSubmodule;
