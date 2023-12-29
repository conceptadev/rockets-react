import type { RJSFSchema } from '@rjsf/utils';

import { CustomTextFieldWidget } from '@concepta/react-material-ui/dist/styles/CustomWidgets';

export interface Category {
  id: number;
  name: string;
}

export interface BookFormData {
  title: string;
  categoryId: number | null;
  pages: number;
  price: number;
}

export const schema: RJSFSchema = {
  type: 'object',
  required: ['title', 'categoryId', 'pages', 'price'],
  properties: {
    title: { type: 'string', title: 'Title', minLength: 3 },
    categoryId: { type: 'number', title: 'Category' },
    pages: { type: 'number', title: 'Pages', minimum: 1 },
    price: { type: 'number', title: 'Price', minimum: 1 },
  },
};

export const widgets = {
  TextWidget: CustomTextFieldWidget,
};
