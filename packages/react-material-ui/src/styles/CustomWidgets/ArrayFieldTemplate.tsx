import React from 'react';
import { ArrayFieldTemplateProps } from '@rjsf/utils';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrayFieldActionButton from './ArrayFieldActionButton';

const ArrayFieldTemplate = (props: ArrayFieldTemplateProps) => {
  const { items, canAdd, onAddClick, schema } = props;

  return (
    <Box
      sx={{
        '& .MuiGrid-container': {
          marginTop: '0 !important',
        },
        '& .field': {
          flex: 1,
        },
      }}
    >
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
};

export default ArrayFieldTemplate;
