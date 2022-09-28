import { FC } from 'react'
import { Box, Button, Text } from '@concepta/react-material-ui'
import { withTheme, UiSchema, ISubmitEvent } from '@rjsf/core'
import { Theme } from '@rjsf/material-ui/v5'
import { JSONSchema7 } from 'json-schema'
import { CustomSwitchWidget } from 'app/styles/CustomWidgets'

type FormData = {
  checkboxSolo: boolean
}

const OtherFormElements: FC = () => {
  const Form = withTheme(Theme)

  const schema: JSONSchema7 = {
    type: 'object',
    properties: {
      checkboxSolo: {
        type: 'boolean',
        title: 'I agree to subscribe',
        enum: [true, false],
      },
    },
  }

  const widgets = {
    CheckboxWidget: CustomSwitchWidget,
  }

  const uiSchema: UiSchema = {
    checkboxSolo: {
      'ui:widget': 'checkbox', // Not really needed. Checkbox is default for boolean types.
    },
  }

  const handleSubmit = (values: ISubmitEvent<FormData>) => {
    console.log('values', values.formData)
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
        Switch Element
      </Text>

      <Box>
        <Form
          schema={schema}
          uiSchema={uiSchema}
          onSubmit={handleSubmit}
          widgets={widgets}
          noHtml5Validate={true}
          showErrorList={false}
          onError={err => console.log('errors', err)}
        >
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Submit
          </Button>
        </Form>
      </Box>
    </>
  )
}

export default OtherFormElements
