import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import SimpleForm, {
  FormType,
} from "@concepta/react-material-ui/dist/components/SimpleForm";

const meta = {
  component: SimpleForm,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SimpleForm>;

export default meta;

type Story = StoryObj<typeof meta>;

const basicForm: FormType = {
  fields: {
    name: {
      type: "string",
      title: "Name",
      required: true,
    },
    email: {
      type: "email",
      title: "Email",
      required: true,
    },
  },
};

export const Basic: Story = {
  args: {
    form: basicForm,
    onSubmit: fn(),
    onError: fn(),
  },
};

export const InitialData: Story = {
  args: {
    form: basicForm,
    initialData: {
      name: "John Doe",
      email: "john.doe@example.com",
    },
    onSubmit: fn(),
    onError: fn(),
  },
};

export const CustomTitle: Story = {
  args: {
    form: { ...basicForm, title: "Custom Title" },
    onSubmit: fn(),
    onError: fn(),
  },
};

export const CustomSubmitButtonLabelAndStyle: Story = {
  args: {
    form: {
      ...basicForm,
      submitButtonLabel: "Custom Button",
      submitButtonProps: {
        color: "secondary",
        sx: { height: 60, width: 200, border: "4px dashed #ffbd5b" },
      },
    },
    onSubmit: fn(),
    onError: fn(),
  },
};

const customValidate = (formData, errors) => {
  if (formData.name?.length < 3) {
    errors.name.addError("Name must be at least 3 characters long");
  }

  const validateEmailRegex = /^\S+@\S+\.\S+$/;
  if (!validateEmailRegex.test(formData.email)) {
    errors.email.addError("Email must be a valid email address");
  }

  return errors;
};

export const CustomValidation: Story = {
  args: {
    form: basicForm,
    initialData: {
      name: "Jo",
      email: "john.doe@example",
    },
    onSubmit: fn(),
    onError: fn(),
    validate: customValidate,
  },
};

const completeForm: FormType = {
  fields: {
    email: {
      type: "string",
      title: "Email",
      required: true,
    },
    password: {
      type: "password",
      title: "Password",
      required: true,
    },
    checkbox: { type: "checkbox", title: "Checkbox" },
    checkboxes: {
      type: "checkboxes",
      title: "Checkboxes",
      options: ["Skate", "Surf", "Basketball", "Soccer", "Tennis"],
    },
    select: {
      type: "select",
      title: "Select",
      options: ["Mario", "Sonic", "Lara Croft", "Pac-man"],
    },
    series: {
      type: "select",
      title: "Select (object options)",
      options: [
        { value: "strangerThings", label: "Stranger Things" },
        { value: "gameOfThrones", label: "Game of Thrones" },
        { value: "13ReasonsWhy", label: "13 Reasons Why" },
        { value: "greysAnatomy", label: "Grey's anatomy" },
        { value: "moneyHeist", label: "Money Heist" },
      ],
    },
    stringArray: { type: "stringArray", title: "String Array" },
    Array: {
      type: "array",
      title: "Array",
      fields: {
        name: {
          title: "Adress",
          type: "string",
        },
        city: {
          title: "City",
          type: "string",
        },
        addressType: {
          title: "Type of address",
          type: "select",
          options: ["House", "Apartment", "Commercial building"],
        },
      },
    },
    radio: {
      type: "radio",
      title: "Radio",
      options: [
        { value: "ps5", label: "PS5" },
        { value: "xbox", label: "Xbox" },
        { value: "pc", label: "PC" },
        { value: "mobile", label: "Mobile" },
      ],
    },
    switch: {
      type: "switch",
      title: "Switch",
    },
  },
};

export const FormFieldTypes: Story = {
  args: {
    form: completeForm,
    onSubmit: fn(),
    onError: fn(),
  },
};
