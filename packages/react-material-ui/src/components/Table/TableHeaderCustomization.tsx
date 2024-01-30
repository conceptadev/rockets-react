'use client';

import React, { useState } from 'react';
import ListItem from '@mui/material/ListItem';

import { useTableRoot } from './hooks/useTableRoot';
import {
  Box,
  Checkbox,
  IconButton,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Menu,
} from '@mui/material';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DragIndicator, SettingsSuggest } from '@mui/icons-material';

function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <ListItem
        key={props.id}
        secondaryAction={
          <Checkbox
            edge="end"
            onChange={props.handleToggle(props.id)}
            checked={props.checked.indexOf(props.id) !== -1}
            inputProps={{ 'aria-labelledby': props.labelId }}
          />
        }
        disablePadding
      >
        <ListItemButton>
          <ListItemAvatar>
            <DragIndicator {...listeners} />
          </ListItemAvatar>
          <ListItemText id={props.labelId} primary={props.label} />
        </ListItemButton>
      </ListItem>
    </div>
  );
}

export const TableHeaderCustomization = () => {
  const { headers, setHeaders } = useTableRoot();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [checked, setChecked] = useState(
    headers.filter((header) => !header.disabled).map((h) => h.id),
  );

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setHeaders((prevState) =>
      prevState.map((header) => ({
        ...header,
        disabled: newChecked.includes(header.id) ? false : true,
      })),
    );

    setChecked(newChecked);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setHeaders((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <Box display="flex" justifyContent="flex-end" mb={2}>
      <IconButton
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          setAnchorEl(event.currentTarget);
        }}
      >
        <SettingsSuggest />
      </IconButton>
      <Menu open={open} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={headers}
            strategy={verticalListSortingStrategy}
          >
            {headers?.map((header) => {
              if (!header.label) return null;

              const labelId = `checkbox-list-secondary-label-${header.id}`;

              return (
                <SortableItem
                  key={header.id}
                  id={header.id}
                  checked={checked}
                  label={header.label}
                  handleToggle={handleToggle}
                  labelId={labelId}
                />
              );
            })}
          </SortableContext>
        </DndContext>
      </Menu>
    </Box>
  );
};
