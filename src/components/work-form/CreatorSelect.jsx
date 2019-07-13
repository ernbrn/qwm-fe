import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import {
  Chip, MenuItem, Paper, TextField,
} from '@material-ui/core';
import { throttle } from 'throttle-debounce';
import { getCreators, postCreators } from 'creators/creators.service';
import CreatorModal from 'creator-form/CreatorModal';
import SelectedItems from 'shared/multi-select/SelectedItems';

export default function CreatorSelect({ input, placeholder }) {
  const ADD_CREATOR = 'addCreator';

  const itemToString = item => item || '';
  const noResultsItem = { id: ADD_CREATOR, name: 'Add new creator' };
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [addCreatorModalOpen, setAddCreatorModalOpen] = useState(false);
  const { onChange, ...restInput } = input;

  function searchCreators(inputChange) {
    // Don't get all creators if there's no value
    if (!inputChange) {
      return null;
    }

    return getCreators({ name: inputChange }).then((response) => {
      setItems([...response.data, noResultsItem]);
    });
  }

  const throttleSearch = useRef(throttle(500, searchCreators)).current;

  function handleSelection(selectValue) {
    // On selection, clear out the input value to reset the search
    setInputValue('');

    if (selectValue.id === ADD_CREATOR) {
      setAddCreatorModalOpen(true);
      return;
    }

    setSelectedItems((prevState) => {
      // TODO: this might could use a refactor to something more efficent
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

  function onCreatorSubmit(formData) {
    return postCreators(formData).then((response) => {
      setAddCreatorModalOpen(false);
      handleSelection(response.data);
    });
  }

  function handleCreatorModalClose() {
    setAddCreatorModalOpen(false);
  }

  return (
    <React.Fragment>
      <CreatorModal
        onSubmit={onCreatorSubmit}
        open={addCreatorModalOpen}
        handleClose={handleCreatorModalClose}
      />
      <Downshift
        {...restInput}
        defaultHighlightedIndex={0}
        inputValue={inputValue}
        onInputValueChange={(inputChange) => {
          // When you select an item, the inputChange
          // becomes the object selected, so don't set
          // that as the input
          if (typeof inputChange === 'string') {
            setInputValue(inputChange);
            throttleSearch(inputChange);
          }
        }}
        itemToString={itemToString}
        selectedItem={input.value}
        onSelect={(selectValue) => {
          // Make sure selectValue is something.
          // If you press esc when the menu is open
          // selectValue will be undefined and break EVERYTHING
          if (selectValue) {
            handleSelection(selectValue);
          }
        }}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          highlightedIndex,
          isOpen,
        }) => {
          const { onBlur, onFocus, ...inputProps } = getInputProps({
            name: input.name,
            placeholder,
          });

          return (
            <div>
              <div>
                {selectedItems && (
                  <SelectedItems selectedItems={selectedItems} handleDelete={handleDelete} />
                )}
              </div>
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
    </React.Fragment>
  );
}

CreatorSelect.propTypes = {
  input: PropTypes.shape({}).isRequired,
  placeholder: PropTypes.string.isRequired,
};
