import React, { FC } from 'react';
import { ArrayFieldTemplateProps } from '@rjsf/core';
import Box from '../../components/Box';
import ArrayFieldActionButton from './ArrayFieldActionButton';

const ArrayFieldTemplate: FC<ArrayFieldTemplateProps> = (props) => {
  const { items, canAdd, onAddClick } = props;

  return (
    <Box
      id="BOX_WRAP"
      sx={{
        '& .MuiGrid-container': {
          marginTop: '0 !important',
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
    </Box>
  );
};

export default ArrayFieldTemplate;
