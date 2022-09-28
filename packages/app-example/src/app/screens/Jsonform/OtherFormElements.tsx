import { FC } from 'react'
import { Box, Button, Text } from '@concepta/react-material-ui'
import { withTheme, UiSchema, ISubmitEvent } from '@rjsf/core'
import { Theme } from '@rjsf/material-ui/v5'
import { JSONSchema7 } from 'json-schema'
import {
  CustomCheckboxWidget,
  CustomCheckboxesWidget,
  CustomRadioWidget,
  CustomSelectWidget,
} from '@concepta/react-material-ui/dist/styles/CustomWidgets'

type FormData = {
  checkboxSolo: boolean
  checkboxGroup: string[]
  radio: string
  select: string
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
      checkboxGroup: {
        type: 'array',
        title: 'A multiple choices list',
        items: {
          type: 'string',
          enum: ['foo', 'bar', 'fuzz', 'qux'],
        },
        uniqueItems: true,
      },
      radio: {
        type: 'string',
        title: 'Which is your favorite for gaming?',
        enum: ['PS5', 'Xbox', 'PC', 'Mobile'],
      },
      select: {
        type: 'string',
        title: "Who's your favorite character",
        enum: ['Mario', 'Sonic', 'Lara Croft', 'Pac-man'],
      },
    },
  }

  const widgets = {
    CheckboxWidget: CustomCheckboxWidget,
    CheckboxesWidget: CustomCheckboxesWidget,
    RadioWidget: CustomRadioWidget,
    SelectWidget: CustomSelectWidget,
  }

  const uiSchema: UiSchema = {
    checkboxSolo: {
      'ui:widget': 'checkbox', // Not really needed. Checkbox is default for boolean types.
    },
    checkboxGroup: {
      'ui:widget': 'checkboxes',
    },
    radio: {
      'ui:widget': 'radio',
    },
    select: {
      'ui:widget': 'select',
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
        Other Form Elements
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
