import { FC } from 'react'
import { useNavigate } from '@concepta/react-router'
import {
  Box,
  Button,
  Container,
  Image,
  Text,
  Card,
  Link,
  Divider,
} from '@concepta/react-material-ui'
import logo from 'app/assets/images/logo.svg'
import GitHubIcon from '@mui/icons-material/GitHub'
import { withTheme, FormValidation, UiSchema } from '@rjsf/core'
import { Theme } from '@rjsf/material-ui/v5'
import { JSONSchema7 } from 'json-schema'

import { CustomTextField } from 'app/styles/CustomWidgets'
import emailValidation from 'app/utils/emailValidation/emailValidation'

import './styles.css'

type Props = {
  type: 'signIn' | 'signUp'
}

type FormData = {
  email: string
  password: string
  passwordConfirm: string
}

const Login: FC<Props> = ({ type }) => {
  const navigate = useNavigate()

  const isSingUp = type === 'signUp'

  const Form = withTheme(Theme)

  const widgets = {
    TextWidget: CustomTextField,
  }

  const validate = (formData: FormData, errors: FormValidation) => {
    if (!emailValidation(formData.email)) {
      errors.email.addError('please enter a valid email')
    }

    if (isSingUp && formData.password !== formData.passwordConfirm) {
      errors.passwordConfirm.addError("passwords don't match")
    }
    return errors
  }

  const schema: JSONSchema7 = {
    type: 'object',
    required: isSingUp
      ? ['email', 'password', 'passwordConfirm']
      : ['email', 'password'],
    properties: {
      email: { type: 'string', title: 'Email' },
      password: { type: 'string', title: 'Password', minLength: 6 },
      ...(isSingUp && {
        passwordConfirm: {
          type: 'string',
          title: 'Password Confirm',
          minLength: 6,
        },
      }),
    },
  }

  const uiSchema: UiSchema = {
    email: { classNames: 'custom-class-name', 'ui:widget': 'email' },
    password: { 'ui:widget': 'password' },
    ...(isSingUp && {
      passwordConfirm: { 'ui:widget': 'password' },
    }),
  }

  return (
    <Container maxWidth="xs" sx={{ textAlign: 'center', padding: '48px 0' }}>
      <Image src={logo} alt="Logo" />

      <Text
        variant="h4"
        fontFamily="Inter"
        fontSize={30}
        fontWeight={800}
        mt={1}
        gutterBottom
      >
        Welcome
      </Text>

      <Text fontSize={14} fontWeight={500} color="primary.dark">
        {isSingUp ? 'Sign up' : 'Sign in'} to continue!
      </Text>

      <Card sx={{ marginTop: '26px', padding: '24px' }}>
        <Box>
          <Form
            schema={schema}
            uiSchema={uiSchema}
            onSubmit={() => navigate('/home')}
            widgets={widgets}
            validate={validate}
            noHtml5Validate={true}
            showErrorList={false}
          >
            {!isSingUp && (
              <Text fontSize={14} fontWeight={500} sx={{ mt: 3 }}>
                <Link href="#" color="primary.dark">
                  Forgot your password?
                </Link>
              </Text>
            )}

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
              {isSingUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </Form>

          <Divider>
            <Text
              fontSize={14}
              fontWeight={400}
              color="text.primary"
              sx={{ my: 3 }}
            >
              Or continue with
            </Text>
          </Divider>

          <Button variant="outlined" fullWidth>
            <GitHubIcon sx={{ color: 'text.primary' }} />
          </Button>
        </Box>

        <Text fontSize={14} fontWeight={500} gutterBottom sx={{ mt: 3 }}>
          <Link href={isSingUp ? '/login' : '/sign-up'} color="primary.dark">
            {isSingUp
              ? 'Already have an account? Sign in'
              : 'No account? Sign up'}
          </Link>
        </Text>
      </Card>
    </Container>
  )
}

export default Login
