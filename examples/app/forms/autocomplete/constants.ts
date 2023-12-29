import type { RJSFSchema } from '@rjsf/utils';

import { CustomTextFieldWidget } from '@concepta/react-material-ui/dist/styles/CustomWidgets';

export interface Category {
  id: number;
  name: string;
}

export interface BookFormData {
  title: string;
  categoryId: number | null;
  pages: string;
  price: string;
}

export const schema: RJSFSchema = {
  type: 'object',
  required: ['title', 'categoryId', 'pages', 'price'],
  properties: {
    title: { type: 'string', title: 'Title', minLength: 3 },
    categoryId: { type: 'number', title: 'Category' },
    pages: { type: 'string', title: 'Pages' },
    price: { type: 'string', title: 'Price' },
  },
};

export const widgets = {
  TextWidget: CustomTextFieldWidget,
};

export const getMaskedPageNumber = (value: string) => {
  const numericInput = value.replace(/\D/g, '');
  const truncatedInput = numericInput.slice(0, 10);
  const pageNumberFormat = /^(\d{5})?$/;
  const formattedNumber = truncatedInput.replace(pageNumberFormat, (_, p1) => {
    const formattedGroups = [p1 && `${p1}`];
    return formattedGroups.filter(Boolean).join('');
  });

  return formattedNumber;
};

export const getMaskedCurrency = (text: string, decimalPlaces = 2) => {
  let input = text.replace(/^0+|[^0-9]/g, '');

  if (!input) {
    input = '0';
  }

  const numberValue = Number(input) / Math.pow(10, decimalPlaces);
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });

  return formatter.format(numberValue);
};

export default getMaskedCurrency;
