'use client';

import type { RJSFSchema } from '@rjsf/utils';
import type { AdvancedProperty } from '@concepta/react-material-ui/dist/components/SchemaForm/types';

import {
  CustomTextFieldWidget,
  CustomEmailFieldWidget,
} from '@concepta/react-material-ui/dist/styles/CustomWidgets';

export interface FeedbackFormData {
  topic: number | null;
  customTopic: string;
  description: string;
  file: string;
}

export const schema: RJSFSchema = {
  type: 'object',
  required: ['topic', 'description'],
  properties: {
    topic: {
      type: 'number',
      title: 'Topic',
      oneOf: [
        { const: 1, title: 'Feature' },
        { const: 2, title: 'Suggestion' },
        { const: 3, title: 'Bug' },
      ],
    },
    customTopic: { type: 'string', title: 'Custom topic' },
    description: { type: 'string', title: 'Description', minLength: 3 },
    file: { type: 'string', title: 'File' },
  },
};

export const advancedProperties: Record<string, AdvancedProperty> = {
  topic: {
    type: 'radio',
  },
};

export const widgets = {
  TextWidget: CustomTextFieldWidget,
  EmailWidget: CustomEmailFieldWidget,
};

export const processFile = (files: FileList) => {
  const file = files[0];

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (!event?.target?.result) {
        reject();
      } else {
        resolve(event.target.result);
      }
    };

    reader.readAsDataURL(file);
  });
};
