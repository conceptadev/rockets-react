import { FC } from 'react'
import { SimpleForm } from '@concepta/react-material-ui'
import { FormType } from '@concepta/react-material-ui/dist/components/SimpleForm'
import { FormValidation } from '@rjsf/core'

type FormData = {
  email: string
  password: string
  checkbox: boolean
  checkboxes: string[]
  character: string
  address: string[]
  multiAddress: {
    name: string
    city: string
    addressType: string
    isPrimaryAddress: boolean
  }[]
  radio: string
  switch: boolean
}

const Form: FC = () => {
  const validate = (formData: FormData, errors: FormValidation) => {
    if (!formData.switch) {
      errors.switch.addError('You must accept to proceed')
    }

    return errors
  }

  const onError = (error: any) => {
    console.log('error', error)
  }

  const form: FormType = {
    title: 'Simplest form ever',
    submitButtonLabel: 'Send',
    fields: {
      email: {
        type: 'string',
        title: 'Email',
        required: true,
      },
      password: {
        type: 'password',
        title: 'Password',
        required: true,
      },
      checkbox: { type: 'checkbox', title: 'Subscribe' },
      checkboxes: {
        type: 'checkboxes',
        title: 'Your kind of drinks',
        options: ['Beer', 'Vodka', 'Champagne', 'Rum', 'Gin'],
      },
      character: {
        title: "Who's your favorite character",
        type: 'select',
        options: ['Mario', 'Sonic', 'Lara Croft', 'Pac-man'],
      },
      address: { type: 'stringArray', title: 'Address' },
      multiAddress: {
        type: 'array',
        title: 'Address',
        fields: {
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
            type: 'select',
            options: ['House', 'Apartment', 'Commercial building'],
          },
          isPrimaryAddress: {
            title: 'Is home address',
            type: 'checkbox',
          },
        },
      },
      radio: {
        type: 'radio',
        title: 'Which is your favorite for gaming?',
        options: ['PS5', 'Xbox', 'PC', 'Mobile'],
      },
      switch: {
        type: 'switch',
        title: 'Is this thing on?',
      },
    },
  }

  return (
    <SimpleForm
      form={form}
      onSubmit={values => console.log('values', values)}
      validate={validate}
      onError={onError}
    />
  )
}

export default Form
