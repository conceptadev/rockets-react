import { FC } from 'react'
import { Box, Button, Text } from '@concepta/react-material-ui'
import { withTheme, FormValidation, UiSchema, ISubmitEvent } from '@rjsf/core'
import { Theme } from '@rjsf/material-ui/v5'
import { JSONSchema7 } from 'json-schema'
import { CustomTextField } from 'app/styles/CustomWidgets'
import emailValidation from 'app/utils/emailValidation/emailValidation'

type FormData = {
  name: string
  email: string
}

const SimpleForm: FC = () => {
  const Form = withTheme(Theme)

  const widgets = {
    TextWidget: CustomTextField,
  }

  const schema: JSONSchema7 = {
    type: 'object',
    required: ['name', 'email'],
    properties: {
      name: { type: 'string', title: 'Name' },
      email: { type: 'string', title: 'Email' },
    },
  }

  const uiSchema: UiSchema = {
    email: { 'ui:widget': 'email' },
  }

  const validate = (formData: FormData, errors: FormValidation) => {
    if (!emailValidation(formData.email)) {
      errors.email.addError('please enter a valid email')
    }

    return errors
  }

  const handleSubmit = (
    values: ISubmitEvent<FormData>,
    nativeEvent: React.FormEvent<HTMLFormElement>,
  ) => {
    console.log('values', values)
    console.log('nativeEvent', nativeEvent)
  }

  return (
    <>
      <Text
        variant="h4"
        fontFamily="Inter"
        fontSize={24}
        fontWeight={800}
        mt={4}
        gutterBottom
      >
        Simple form
      </Text>

      <Box>
        <Form
          schema={schema}
          uiSchema={uiSchema}
          onSubmit={handleSubmit}
          widgets={widgets}
          validate={validate}
          noHtml5Validate={true}
          showErrorList={false}
          onError={err => console.log('errors', err)}
        >
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Add contact
          </Button>
        </Form>
      </Box>
    </>
  )
}

export default SimpleForm
