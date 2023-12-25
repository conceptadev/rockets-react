'use client';

import type { RJSFSchema } from '@rjsf/utils';

import { useState } from 'react';
import { SchemaForm } from '@concepta/react-material-ui/dist';
import { Text } from '@concepta/react-material-ui';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

import {
  CustomTextFieldWidget,
  CustomEmailFieldWidget,
} from '@concepta/react-material-ui/dist/styles/CustomWidgets';
import { AdvancedProperty } from '@concepta/react-material-ui/dist/components/SchemaForm/types';

export interface FeedbackFormData {
  topic: number | null;
  customTopic: string;
  description: string;
  file: string | null;
}

export const schema: RJSFSchema = {
  type: 'object',
  required: ['topic', 'description'],
  properties: {
    topic: {
      type: 'number',
      title: 'Topic',
      description: 'Choose a topic related to your feedback',
      oneOf: [
        { const: 1, title: 'One' },
        { const: 2, title: '2' },
        { const: 3, title: 'Three' },
      ],
    },
    customTopic: { type: 'string', title: 'Custom topic', minLength: 3 },
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

const Feedback = () => {
  const [formData, setFormData] = useState<FeedbackFormData>({
    topic: null,
    customTopic: '',
    description: '',
    file: null,
  });

  const handleSubmit = async (values: FeedbackFormData) => {
    // eslint-disable-next-line no-console
    console.log('values', values);
  };

  return (
    <Container maxWidth="xs" sx={{ textAlign: 'center', padding: '48px 0' }}>
      <Text
        variant="h4"
        fontFamily="Inter"
        fontSize={30}
        fontWeight={800}
        mt={1}
        gutterBottom
      >
        Feedback
      </Text>

      <Card sx={{ marginTop: '26px', padding: '24px' }}>
        <SchemaForm.Form
          schema={schema}
          formData={formData}
          onChange={({ formData }) => {
            setFormData(formData);
          }}
          onSubmit={({ formData }) =>
            handleSubmit(formData as FeedbackFormData)
          }
          widgets={widgets}
          noHtml5Validate={true}
          showErrorList={false}
          advancedProperties={advancedProperties}
        >
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            mt={2}
          >
            <Button
              type="submit"
              variant="contained"
              disabled={false}
              sx={{ flex: 1 }}
            >
              Submit
            </Button>
          </Box>
        </SchemaForm.Form>
      </Card>
    </Container>
  );
};

export default Feedback;
