'use client';

import type { UiSchema, WidgetProps } from '@rjsf/utils';

import { useState } from 'react';
import { SchemaForm } from '@concepta/react-material-ui/dist';
import { Box, Container, Card, Button } from '@mui/material';

import {
  type FeedbackFormData,
  schema,
  advancedProperties,
  widgets,
  processFile,
} from './constants';

const FileWidget = (props: WidgetProps) => {
  return (
    <input
      type="file"
      required={props.required}
      onChange={async (event) => {
        if (!event?.target?.files) {
          return;
        }

        const base64 = await processFile(event.target.files);

        props.onChange(base64);
      }}
    />
  );
};

const uiSchema: UiSchema = {
  file: {
    'ui:widget': FileWidget,
  },
};

const Feedback = () => {
  const [formData, setFormData] = useState<FeedbackFormData>({
    topic: null,
    customTopic: '',
    description: '',
    file: '',
  });

  const handleSubmit = async (values: FeedbackFormData) => {
    // eslint-disable-next-line no-console
    console.log('values', values);
  };

  return (
    <Container maxWidth="xs" sx={{ textAlign: 'center', padding: '48px 0' }}>
      <h1>Feedback</h1>
      <Card sx={{ marginTop: '48px', padding: '24px' }}>
        <SchemaForm.Form
          schema={schema}
          uiSchema={uiSchema}
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
