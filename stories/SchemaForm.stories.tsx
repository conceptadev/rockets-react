import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Box, Button } from '@mui/material';
import { SchemaForm } from '@concepta/react-material-ui';
// import SchemaForm from '@concepta/react-material-ui/src/components/SchemaForm';
import {
  ArrayFieldTemplate,
  CustomPasswordFieldWidget,
} from '@concepta/react-material-ui/src/styles/CustomWidgets';
import validator from '@rjsf/validator-ajv6';

const meta = {
  component: SchemaForm.Form,
  tags: ['autodocs'],
  args: {
    schema: {
      type: 'object',
      required: ['firstName', 'lastName', 'email', 'password'],
      properties: {
        name: {
          type: 'string',
          title: 'First name',
        },
        email: {
          type: 'string',
          title: 'Email',
        },
      },
    },
    uiSchema: {
      email: {
        'ui:widget': 'email',
      },
    },
  },
  argTypes: {},
} satisfies Meta<typeof SchemaForm.Form>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    schema: {
      title: 'Schema Form',
      description: 'Schema Form example',
      type: 'object',
      required: ['firstName', 'lastName', 'email', 'password'],
      properties: {
        firstName: {
          type: 'string',
          title: 'First name',
        },
        lastName: {
          type: 'string',
          title: 'Last name',
        },
        email: {
          type: 'string',
          title: 'Email',
        },
        password: {
          type: 'string',
          title: 'Password',
          minLength: 3,
        },
      },
    },
    uiSchema: {
      email: {
        'ui:widget': 'email',
      },
      password: {
        'ui:widget': 'password',
      },
    },
    validator: validator,
  },
};

export const CustomTitle: Story = {
  args: {
    schema: {
      title: 'Custom Title',
      type: 'object',
      required: ['firstName', 'lastName', 'email', 'password'],
      properties: {
        name: {
          type: 'string',
          title: 'First name',
        },
        email: {
          type: 'string',
          title: 'Email',
        },
      },
    },
  },
};

export const CustomSubmitButton: Story = {
  args: {
    children: (
      <Button
        type="submit"
        variant="contained"
        sx={{ width: '100%', backgroundColor: '#00ff44' }}
      >
        Fire
      </Button>
    ),
  },
};

export const AdvancedProperties: Story = {
  args: {
    schema: {
      type: 'object',
      properties: {
        toggle: {
          type: 'boolean',
          title: 'Toggle Switch',
        },
      },
    },
    advancedProperties: {
      toggle: {
        type: 'switch',
      },
    },
  },
};

export const InitialFormData: Story = {
  args: {
    schema: {
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
          title: 'First Name',
        },
        lastName: {
          type: 'string',
          title: 'Last Name',
        },
      },
    },
    formData: {
      firstName: 'John',
      lastName: 'Doe',
    },
  },
};

/**
 * Click on the submit button to see the automatic validation errors.
 */
export const ValidationErrors: Story = {
  args: {
    schema: {
      type: 'object',
      required: ['firstName', 'email'],
      properties: {
        firstName: {
          type: 'string',
          title: 'First Name',
        },
        email: {
          type: 'string',
          title: 'Email',
          format: 'email',
        },
      },
    },
    uiSchema: {
      email: {
        'ui:widget': 'email',
      },
    },
  },
};

const customValidator = (formData, errors) => {
  if (formData.age < 18) {
    errors.age.addError('Age must be at least 18.');
  }
  return errors;
};

/**
 * Click on the submit button to see the custom validator function in action.
 */

export const CustomValidator: Story = {
  args: {
    schema: {
      type: 'object',
      properties: {
        age: {
          type: 'integer',
          title: 'Age',
        },
      },
    },
    formData: {
      age: 16,
    },
    customValidate: customValidator,
  },
};

export const ReadOnlyFields: Story = {
  args: {
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          title: 'Username',
        },
      },
    },
    uiSchema: {
      username: {
        'ui:disabled': true,
      },
    },
    formData: {
      username: 'readonlyuser',
    },
  },
};

export const UISchema: Story = {
  args: {
    schema: {
      type: 'object',
      properties: {
        age: {
          type: 'integer',
          title: 'Age',
        },
        bio: {
          type: 'string',
          title: 'Biography',
        },
      },
    },
    uiSchema: {
      age: {
        'ui:widget': 'range',
      },
      bio: {
        'ui:widget': 'textarea',
        'ui:options': {
          rows: 5,
        },
      },
    },
  },
};

/**
 * Rockets provides custom templetes and widgets
 * to help build advanced forms with better UI.
 */
export const CustomTemplatesAndWidgets: Story = {
  args: {
    schema: {
      type: 'object',
      properties: {
        password: {
          type: 'string',
          title: 'Password',
          minLength: 3,
        },
        address: {
          type: 'array',
          title: 'Address',
          items: {
            title: 'Address',
            type: 'string',
          },
        },
      },
    },
    uiSchema: {
      password: {
        'ui:widget': CustomPasswordFieldWidget,
      },
    },
    templates: { ArrayFieldTemplate },
    formData: {
      address: [''],
    },
  },
};
