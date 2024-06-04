'use client';

import type { UiSchema, WidgetProps } from '@rjsf/utils';
import type { IChangeEvent } from '@rjsf/core';

import { useState } from 'react';
import { SchemaForm } from '@concepta/react-material-ui/dist';
import {
  Box,
  Container,
  Card,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';
import useDataProvider, { useQuery } from '@concepta/react-data-provider';

import {
  type FeedbackFormData,
  schema,
  advancedProperties,
  widgets,
  processFile,
} from './constants';

const uri = '/api/feedback';

const FileWidget = (props: WidgetProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <label htmlFor="file-input">
        <Typography sx={{ fontSize: '14px' }}>{`${props.label} ${
          props.required ? '*' : ''
        }`}</Typography>
      </label>
      <Box sx={{ padding: '4px 0' }}>
        <input
          id="file-input"
          name="file-input"
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
      </Box>
    </Box>
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

  const { post } = useDataProvider();

  const { execute: sendFeedback, isPending } = useQuery(
    (body) => post({ uri, body }),
    false,
  );

  const handleSubmit = async (values: IChangeEvent<FeedbackFormData>) => {
    await sendFeedback(values.formData);
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
          onSubmit={handleSubmit}
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
              {isPending ? (
                <CircularProgress sx={{ color: 'white' }} size={24} />
              ) : (
                'Submit'
              )}
            </Button>
          </Box>
        </SchemaForm.Form>
      </Card>
    </Container>
  );
};

export default Feedback;
