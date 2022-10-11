import { FC } from 'react'
import { Box, Button, Text } from '@concepta/react-material-ui'
import { withTheme } from '@rjsf/core'
import { Theme } from '@rjsf/material-ui/v5'
import { JSONSchema7 } from 'json-schema'
import {
  CustomTextFieldWidget,
  ArrayFieldTemplate,
} from '@concepta/react-material-ui/dist/styles/CustomWidgets'

const ArrayForm: FC = () => {
  const Form = withTheme(Theme)

  const widgets = {
    TextWidget: CustomTextFieldWidget,
  }

  const schema: JSONSchema7 = {
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string', title: 'Name' },
      address: {
        type: 'array',
        title: 'Address',
        items: {
          title: 'Address',
          type: 'string',
        },
      },
    },
  }

  const log = (type: string) => console.log.bind(console, type)

  const formData = {
    address: [''],
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
        Array form
      </Text>

      <Box>
        <Form
          schema={schema}
          formData={formData}
          onChange={log('changed')}
          onSubmit={values => console.log('values', values)}
          onError={log('errors')}
          widgets={widgets}
          ArrayFieldTemplate={ArrayFieldTemplate}
          noHtml5Validate={true}
          showErrorList={false}
        >
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Send
          </Button>
        </Form>
      </Box>
    </>
  )
}

export default ArrayForm
