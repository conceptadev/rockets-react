import { FC } from 'react'
import { Box, Button, Text } from '@concepta/react-material-ui'
import { withTheme, FormValidation, UiSchema } from '@rjsf/core'
import { Theme } from '@rjsf/material-ui/v5'
import { JSONSchema7 } from 'json-schema'
import {
  CustomTextField,
  ArrayFieldTemplate,
  CustomSelectWidget,
} from '@concepta/react-material-ui/dist/styles/CustomWidgets'

type Address = {
  name: string
  city: string
}

type FormData = {
  name: string
  address: Address[]
}

const ArrayForm: FC = () => {
  const Form = withTheme(Theme)

  const widgets = {
    TextWidget: CustomTextField,
    SelectWidget: CustomSelectWidget,
  }

  const schema: JSONSchema7 = {
    type: 'object',
    required: ['name', 'address'],
    properties: {
      name: { type: 'string', title: 'Name' },
      address: {
        type: 'array',
        title: 'Address',
        items: {
          type: 'object',
          required: ['name', 'city'],
          properties: {
            name: {
              title: 'Adress',
              type: 'string',
            },
            city: {
              title: 'City',
              type: 'string',
            },
            addressType: {
              title: 'Type of address',
              type: 'string',
              enum: ['House', 'Apartment', 'Comercial building'],
            },
            isPrimaryAddress: {
              title: 'Is home address',
              type: 'boolean',
              enum: [true, false],
            },
          },
        },
      },
    },
  }

  const uiSchema: UiSchema = {
    adress: {
      items: {
        isPrimaryAddress: {
          'ui:widget': 'radio',
        },
        addressType: {
          'ui:widget': 'select',
        },
      },
    },
  }

  const log = (type: string) => console.log.bind(console, type)

  const formData = {
    address: [{ name: '', city: '' }],
  }

  const validate = (formData: FormData, errors: FormValidation) => {
    if (!formData?.address?.length) {
      errors.address.addError('Address is required')
    }
    return errors
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
        Multiple Fields Array form
      </Text>

      <Box>
        <Form
          schema={schema}
          uiSchema={uiSchema}
          formData={formData}
          onChange={log('changed')}
          onSubmit={values => console.log('values', values)}
          onError={log('errors')}
          widgets={widgets}
          ArrayFieldTemplate={ArrayFieldTemplate}
          noHtml5Validate={true}
          showErrorList={false}
          validate={validate}
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
