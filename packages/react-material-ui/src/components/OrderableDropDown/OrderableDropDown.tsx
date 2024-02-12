'use client';

import React, { useState, ReactNode } from 'react';
import ListItem from '@mui/material/ListItem';

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
  DragEndEvent,
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

export interface ListItem {
  id: string;
  label: string;
  hide?: boolean;
  [key: string]: unknown;
}

interface Props {
  list: ListItem[];
  icon?: ReactNode;
  setList: React.Dispatch<React.SetStateAction<ListItem[]>>;
}

interface SortableItemProps {
  id: string;
  checked: string[];
  label: string;
  handleToggle: (value: string) => () => void;
  labelId: string;
}

function SortableItem(props: SortableItemProps) {
  const { id, checked, label, handleToggle, labelId } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <ListItem
        key={id}
        secondaryAction={
          <Checkbox
            edge="end"
            onChange={handleToggle(id)}
            checked={checked.indexOf(id) !== -1}
            inputProps={{ 'aria-labelledby': labelId }}
          />
        }
        disablePadding
      >
        <ListItemButton>
          <ListItemAvatar>
            <DragIndicator {...listeners} />
          </ListItemAvatar>
          <ListItemText id={labelId} primary={label} />
        </ListItemButton>
      </ListItem>
    </div>
  );
}

const OrderableDropDown = ({
  list,
  setList,
  icon = <SettingsSuggest />,
}: Props) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [checked, setChecked] = useState(
    list.filter((listItem) => !listItem.hide).map((li) => li.id),
  );

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setList((prevState) =>
      prevState.map((listItem) => ({
        ...listItem,
        hide: newChecked.includes(listItem.id) ? false : true,
      })),
    );

    setChecked(newChecked);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setList((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <Box>
      <IconButton
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          setAnchorEl(event.currentTarget);
        }}
      >
        {icon}
      </IconButton>
      <Menu open={open} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={list} strategy={verticalListSortingStrategy}>
            {list?.map((listItem) => {
              if (!listItem.label) return null;

              const labelId = `checkbox-list-secondary-label-${listItem.id}`;

              return (
                <SortableItem
                  key={listItem.id}
                  id={listItem.id}
                  checked={checked}
                  label={listItem.label}
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

export default OrderableDropDown;
