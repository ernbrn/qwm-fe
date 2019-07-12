import React, { useState, useRef } from 'react';
import Downshift from 'downshift';
import {
  Chip, MenuItem, Paper, TextField,
} from '@material-ui/core';
import { throttle } from 'throttle-debounce';
import { getCreators } from 'creators/creators.service';

export default function CreatorSelect({ input, meta, placeholder }) {
  const NO_RESULTS = 'addCreator';

  const itemToString = item => item || '';
  const noResultsItem = { id: NO_RESULTS, name: 'Add new creator' };
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const { onChange, ...restInput } = input;

  function searchCreators(inputChange) {
    return getCreators({ name: inputChange }).then((response) => {
      setItems([...response.data, noResultsItem]);
    });
  }

  const throttleSearch = useRef(throttle(500, searchCreators)).current;

  function handleSelection(selectValue) {
    setInputValue('');

    if (selectValue.id === NO_RESULTS) {
      console.log('here');
      // set some state to add a creator input or something
      // or pop a modal open????
      return;
    }

    setSelectedItems((prevState) => {
      // remove the duplicate if the incoming one is a dupe
      // there's gotta be a better way to do this
      const allSelected = [...prevState.filter(i => i.id !== selectValue.id), selectValue];
      onChange(allSelected);

      return allSelected;
    });
  }

  const handleDelete = selectedCreatorId => () => {
    setSelectedItems((prevState) => {
      const newSelectedItems = prevState.filter(i => i.id !== selectedCreatorId);
      onChange(newSelectedItems);
      return newSelectedItems;
    });
  };

  return (
    <Downshift
      {...restInput}
      inputValue={inputValue}
      onInputValueChange={(inputChange) => {
        if (typeof inputChange === 'string') {
          setInputValue(inputChange);
          throttleSearch(inputChange);
        }
      }}
      itemToString={itemToString}
      selectedItem={input.value}
      onSelect={(selectValue) => {
        // check for selectValue
        // if you press esc when the menu is open
        // selectValue will be undefined and break EVERYTHING
        if (selectValue) {
          handleSelection(selectValue);
        }
      }}
    >
      {({
        getInputProps, getItemProps, getLabelProps, getMenuProps, highlightedIndex, isOpen,
      }) => {
        const { onBlur, onFocus, ...inputProps } = getInputProps({
          name: input.name,
          placeholder,
        });

        return (
          <div>
            {selectedItems
              && selectedItems.map(si => (
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
                  {items.map((item, index) => (
                    <MenuItem
                      key={item.id}
                      {...getItemProps({ item })}
                      selected={highlightedIndex === index}
                      component="div"
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Paper>
              )}
            </div>
          </div>
        );
      }}
    </Downshift>
  );
}
