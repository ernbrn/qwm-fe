import React, { useState } from 'react';
import Downshift from 'downshift';
import {
  Chip, MenuItem, Paper, TextField,
} from '@material-ui/core';

export default function CreatorSelect({ input, meta, placeholder }) {
  const NO_RESULTS = 'Add creator';

  const itemToString = item => item || '';
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  function fakePI(inputValue) {
    if (typeof inputValue === 'string') {
      return new Promise(resolve => setTimeout(() => {
        setItems([{ id: 1, name: 'Sarah Waters' }, { id: 2, name: 'Someone else' }]);
        return resolve;
      }, 300));
    }

    return null;
  }

  const { onChange, ...restInput } = input;

  return (
    <Downshift
      {...restInput}
      onInputValueChange={(inputValue) => {
        fakePI(inputValue);
      }}
      itemToString={itemToString}
      selectedItem={input.value}
      onSelect={(selectValue) => {
        setSelectedItems((prevState) => {
          const allSelected = [...prevState, selectValue];
          onChange(allSelected);
          return allSelected;
        });
      }}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        highlightedIndex,
        inputValue,
        isOpen,
        selectedItem,
      }) => {
        let value = inputValue || '';

        if (selectedItem) {
          value = '';
        }

        const { onBlur, onFocus, ...inputProps } = getInputProps({
          name: input.name,
          placeholder,
          value,
        });

        const handleDelete = selectedCreatorId => () => {
          setSelectedItems((prevState) => {
            const newSelectedItems = prevState.filter(i => i.id !== selectedCreatorId);
            onChange(newSelectedItems);
            return newSelectedItems;
          });
        };

        return (
          <div>
            {selectedItems.map(si => (
              <Chip key={si.id} label={si.name} onDelete={handleDelete(si.id)} />
            ))}
            <TextField
              InputLabelProps={getLabelProps({ shrink: true })}
              InputProps={{ onBlur, onFocus }}
              {...inputProps}
              fullWidth
              label="Creator"
            />
            <div {...getMenuProps()}>
              {isOpen && (
                <Paper square>
                  {items.length > 0 ? (
                    items.map((item, index) => (
                      <MenuItem
                        key={item.id}
                        {...getItemProps({ item })}
                        selected={highlightedIndex === index}
                        component="div"
                      >
                        {item.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem
                      {...getItemProps({ item: NO_RESULTS })}
                      // selected={highlightedIndex === index}
                      component="div"
                    >
                      No results -- click here to add a creator
                    </MenuItem>
                  )}
                </Paper>
              )}
            </div>
          </div>
        );
      }}
    </Downshift>
  );
}
