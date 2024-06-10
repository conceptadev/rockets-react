import React, { ReactNode } from 'react';

import type { RJSFSchema, UiSchema } from '@rjsf/utils';
import type { IChangeEvent } from '@rjsf/core';

import type { AdvancedProperty } from '../../SchemaForm/types';
import type { ValidationRule } from '../../../utils/form/validation';

import { useState } from 'react';
import useDataProvider, { useQuery } from '@concepta/react-data-provider';
import { useAuth } from '@concepta/react-auth-provider';
import { useSearchParams } from 'next/navigation';
import validator from '@rjsf/validator-ajv6';
import { Box, Button, Container, Card, CircularProgress } from '@mui/material';

import Text from '../../../components/Text';
import Link from '../../../components/Link';
import { SchemaForm } from '../../../components/SchemaForm';
import { Image } from '../../../components/Image';

import { CustomTextFieldWidget } from '../../../styles/CustomWidgets';

import { validateForm } from '../../../utils/form/validation';

import i18n from '../../../utils/intl/i18n';

import {
  defaultAuthUiSchema,
  signInFormSchema,
  signUpFormSchema,
  forgotPasswordFormSchema,
  resetPasswordFormSchema,
} from './constants';

const widgets = {
  TextWidget: CustomTextFieldWidget,
};

interface AuthFormSubmoduleProps {
  route: string;
  queryUri?: string;
  queryMethod?: string;
  title?: string | ReactNode;
  hideTitle?: boolean;
  formSchema?: RJSFSchema;
  formUiSchema?: UiSchema;
  advancedProperties?: Record<string, AdvancedProperty>;
  formData?: Record<string, unknown> | null;
  signInRequestPath?: string;
  signInPath?: string;
  signUpPath?: string;
  forgotPasswordPath?: string;
  customValidation?: ValidationRule<Record<string, string>>[];
  submitButtonTitle?: string;
  logoSrc?: string;
  hideLogo?: boolean;
  headerComponent?: ReactNode;
  onSuccess?: (data: unknown) => void;
  onError?: (error: unknown) => void;
  overrideDefaults?: boolean;
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

  const searchParams = useSearchParams();
  const passcode = searchParams.get('token');

  const { post, patch, put } = useDataProvider();
  const { doLogin, isPending: isLoadingSignIn } = useAuth();

  const query =
    {
      post: post,
      patch: patch,
      put: put,
    }[props.queryMethod || 'post'] || post;

  const { execute: performRequest, isPending: isLoadingRequest } = useQuery(
    (body: Record<string, unknown>) =>
      query({
        uri: props.queryUri || '',
        body,
      }),
    false,
    {
      onSuccess: props.onSuccess,
      onError: props.onError,
    },
  );

  const handleSubmit = async (values: IChangeEvent<Record<string, string>>) => {
    const fields = values.formData || {};

    if (props.route === 'signIn') {
      const { username, password } = fields;
      doLogin({ username, password, loginPath: props.signInRequestPath });

      return;
    }

    if (props.route === 'resetPassword') {
      await performRequest({ ...fields, passcode });

      return;
    }

    performRequest(fields);
  };

  const isLoading = isLoadingSignIn || isLoadingRequest;

  const defaultRouteTitle = {
    signIn: i18n.t('auth:signIn'),
    signUp: i18n.t('auth:signUp'),
    forgotPassword: i18n.t('auth:forgotPassword'),
    resetPassword: i18n.t('auth:resetPassword'),
  }[props.route];

  const defaultFormSchema =
    {
      signIn: signInFormSchema,
      signUp: signUpFormSchema,
      forgotPassword: forgotPasswordFormSchema,
      resetPassword: resetPasswordFormSchema,
    }[props.route] || {};

  return (
    <Container maxWidth="xs" sx={{ textAlign: 'center', padding: '48px 0' }}>
      {!props.hideLogo && (
        <Image src={props.logoSrc || '/logo.svg'} alt="logo" />
      )}

      {props.headerComponent || null}

      <Card sx={{ padding: '24px', marginTop: '32px' }}>
        {!props.hideTitle && renderTitle(props.title ?? defaultRouteTitle)}

        <SchemaForm.Form
          schema={{
            ...defaultFormSchema,
            ...props.formSchema,
            required: props.overrideDefaults
              ? props.formSchema?.required || []
              : [
                  ...(defaultFormSchema.required || []),
                  ...(props.formSchema?.required || []),
                ],
            properties: props.overrideDefaults
              ? props.formSchema?.properties || {}
              : {
                  ...(defaultFormSchema.properties || {}),
                  ...(props.formSchema?.properties || {}),
                },
          }}
          uiSchema={{ ...defaultAuthUiSchema, ...props.formUiSchema }}
          validator={validator}
          formData={props.formData || formData}
          onChange={({ formData }) => setFormData(formData)}
          onSubmit={handleSubmit}
          noHtml5Validate={true}
          showErrorList={false}
          advancedProperties={props.advancedProperties}
          customValidate={(formData, errors) =>
            validateForm(formData, errors, props.customValidation || [])
          }
          widgets={widgets}
        >
          {props.forgotPasswordPath ? (
            <Text fontSize={14} fontWeight={500} gutterBottom sx={{ mt: 2 }}>
              <Link href={props.forgotPasswordPath} color="primary.dark">
                {i18n.t('auth:forgotPasswordCTA')}
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
                props.submitButtonTitle || i18n.t('auth:submit')
              )}
            </Button>
          </Box>
        </SchemaForm.Form>

        {props.signInPath ? (
          <Text fontSize={14} fontWeight={500} gutterBottom sx={{ mt: 3 }}>
            <Link href={props.signInPath} color="primary.dark">
              {i18n.t('auth:signInCTA')}
            </Link>
          </Text>
        ) : null}

        {props.signUpPath ? (
          <Text fontSize={14} fontWeight={500} gutterBottom sx={{ mt: 3 }}>
            <Link href={props.signUpPath} color="primary.dark">
              {i18n.t('auth:signUpCTA')}
            </Link>
          </Text>
        ) : null}

        <Button
          onClick={() =>
            i18n.changeLanguage(i18n.language === 'en' ? 'pt' : 'en')
          }
          sx={{ mt: 2 }}
        >
          {i18n.language === 'en' ? 'Change to pt' : 'Change to en'}
        </Button>
      </Card>
    </Container>
  );
};

export default AuthFormSubmodule;
