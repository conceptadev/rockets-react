'use client';

import React, { useEffect, useState, ReactNode } from 'react';
import ListItem from '@mui/material/ListItem';

import {
  Box,
  Button,
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
  resetFilters?: () => void;
  [key: string]: unknown;
}

interface Props {
  list: ListItem[];
  icon?: ReactNode;
  minimumItems?: number;
  hasAllOption?: boolean;
  setList: React.Dispatch<React.SetStateAction<ListItem[]>>;
  text?: string;
}

interface SortableItemProps {
  id: string;
  checked: boolean;
  label: string;
  labelId: string;
  indeterminate?: boolean;
  isHeader?: boolean;
  handleToggle: (value: string) => void;
  disabled?: boolean;
}

const SortableItem = (props: SortableItemProps) => {
  const {
    id,
    checked,
    label,
    labelId,
    indeterminate,
    isHeader = false,
    handleToggle,
    disabled = false,
  } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    touchAction: 'none',
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      data-testid="orderable-item"
    >
      <ListItem
        sx={{
          borderBottom: isHeader ? '1px solid' : undefined,
          borderColor: (theme) =>
            isHeader ? theme.palette.divider : undefined,
          paddingLeft: !isHeader ? undefined : 5,
        }}
        key={id}
        secondaryAction={
          <Checkbox
            edge="end"
            onChange={() => handleToggle(id)}
            disabled={disabled}
            checked={checked}
            inputProps={{ 'aria-labelledby': labelId }}
            indeterminate={indeterminate}
          />
        }
        disablePadding
      >
        <ListItemButton
          disabled={disabled}
          sx={{
            pointerEvents: isHeader ? 'none' : undefined,
            columnGap: 2,
          }}
        >
          {!isHeader && (
            <ListItemAvatar
              sx={{
                display: 'flex',
                minWidth: 'auto',
              }}
            >
              <DragIndicator {...listeners} />
            </ListItemAvatar>
          )}
          <ListItemText id={labelId} primary={label} />
        </ListItemButton>
      </ListItem>
    </div>
  );
};

const OrderableDropDown = ({
  list,
  setList,
  minimumItems = 0,
  hasAllOption = false,
  icon = <SettingsSuggest />,
  text,
}: Props) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 0,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [checked, setChecked] = useState(
    list.filter((listItem) => !listItem.hide).map((li) => li.id),
  );

  const handleToggleAll = (value: string) => {
    if (value !== 'all') return;

    // No options selected
    if (!checked.length) {
      setChecked(list.map((item) => item.id));
      setList((prevState) =>
        prevState.map((item) => ({
          ...item,
          hide: false,
        })),
      );
      return;
    }

    // All options selected
    if (checked.length === list.length) {
      setList((prevState) =>
        prevState.map((item) => ({
          ...item,
          hide: true,
        })),
      );
      setChecked([]);
    } else {
      // Some options selected
      setChecked((prevState) => {
        const newState = [...prevState];

        list.forEach((item) => {
          if (!prevState.includes(item.id)) {
            newState.push(item.id);
          }
        });

        return newState;
      });
      setList((prevState) =>
        prevState.map((item) => ({
          ...item,
          hide: false,
        })),
      );
    }
  };

  const handleToggle = (value: string) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setList((prevState) =>
      prevState.map((listItem) => {
        const isHidden = newChecked.includes(listItem.id) ? false : true;

        if (isHidden && listItem.resetFilters) {
          listItem.resetFilters();
        }

        return {
          ...listItem,
          hide: isHidden,
        };
      }),
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

  useEffect(() => {
    setChecked(list.filter((listItem) => !listItem.hide).map((li) => li.id));
  }, [list]);

  return (
    <Box>
      {text ? (
        <Button
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(event.currentTarget);
          }}
          startIcon={icon}
          variant="outlined"
          sx={{
            textTransform: 'capitalize',
            color: '#374151',
            borderColor: '#374151',
            textWrap: 'nowrap',
          }}
        >
          {text}
        </Button>
      ) : (
        <IconButton
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(event.currentTarget);
          }}
        >
          {icon}
        </IconButton>
      )}
      <Menu open={open} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={list} strategy={verticalListSortingStrategy}>
            {hasAllOption && (
              <SortableItem
                id="all"
                checked={list.length === checked.length}
                indeterminate={checked.length && list.length !== checked.length}
                label="Select all"
                isHeader
                handleToggle={handleToggleAll}
                labelId="all"
              />
            )}
            {list?.map((listItem) => {
              if (!listItem.label) return null;

              const labelId = `checkbox-list-secondary-label-${listItem.id}`;

              return (
                <SortableItem
                  disabled={
                    minimumItems === list.filter((item) => !item.hide).length &&
                    !listItem.hide
                  }
                  key={listItem.id}
                  id={listItem.id}
                  checked={checked.indexOf(listItem.id) !== -1}
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
