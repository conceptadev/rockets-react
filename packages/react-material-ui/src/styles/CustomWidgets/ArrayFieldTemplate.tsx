import React from 'react';
import {
  ArrayFieldTemplateProps,
  FormContextType,
  getTemplate,
  getUiOptions,
  RJSFSchema,
  StrictRJSFSchema,
} from '@rjsf/utils';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrayFieldActionButton from './ArrayFieldActionButton';

function ArrayFieldTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: ArrayFieldTemplateProps<T, S, F>) {
  const {
    items,
    canAdd,
    onAddClick,
    registry,
    uiSchema,
    schema,
    required,
    idSchema,
    title,
  } = props;

  const uiOptions = getUiOptions(uiSchema);
  const ArrayFieldTitleTemplate = getTemplate<
    'ArrayFieldTitleTemplate',
    T,
    S,
    F
  >('ArrayFieldTitleTemplate', registry, uiOptions);

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        '& .MuiGrid-container': {
          marginTop: '0 !important',
        },
        '& .field': {
          flex: 1,
        },
      }}
    >
      <ArrayFieldTitleTemplate
        idSchema={idSchema}
        title={uiOptions.title ?? title}
        schema={schema}
        uiSchema={uiSchema}
        required={required}
        registry={registry}
      />

      {items.map((el, i) => {
        const child = {
          ...el.children,
          props: { ...el.children.props, required: props.required },
        };

        return (
          <Box key={el.key} display="flex" mt={2}>
            {child}

            {i === 0 && canAdd && (
              <ArrayFieldActionButton type="add" onClick={onAddClick} />
            )}

            {i > 0 && el.hasRemove && (
              <ArrayFieldActionButton
                type="remove"
                onClick={() => {
                  el.onDropIndexClick(i)();
                }}
              />
            )}
          </Box>
        );
      })}
      {schema.description && (
        <Typography component="span" variant="caption" color="#9CA3AF">
          {schema.description}
        </Typography>
      )}
    </Box>
  );
}

export default ArrayFieldTemplate;
