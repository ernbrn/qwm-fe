import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { MenuItem, Paper, TextField } from '@material-ui/core';
import { throttle } from 'throttle-debounce';
import SelectedItems from 'shared/multi-select/SelectedItems';
import { makeStyles } from '@material-ui/core/styles';
import { ADD_NEW } from 'application.constants';

const useStyles = makeStyles(({ spacing }) => ({
  selectedItems: {
    marginBottom: spacing(2),
  },
  listbox: {
    position: 'absolute',
    zIndex: 1,
  },
}));

export default function CrazySelect({
  input,
  searchPlaceholder,
  searchLabel,
  addNewText,
  getResource,
  postNewResource,
  AddNewModal,
  displayAttribute,
  incomingSelectedItems,
}) {
  const itemToString = item => item || '';
  const noResultsItem = { id: ADD_NEW, [displayAttribute]: addNewText };
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState(incomingSelectedItems);
  const [inputValue, setInputValue] = useState('');
  const [addNewModalOpen, setAddNewModalOpen] = useState(false);
  const { onChange, ...restInput } = input;
  const classes = useStyles();

  // Update the input value with incoming initial selections
  useEffect(() => {
    onChange(incomingSelectedItems);
  }, []);

  function searchResource(inputChange) {
    // Don't get all items if there's no value
    if (!inputChange) {
      return null;
    }

    return getResource({ name: inputChange }).then((response) => {
      setItems([...response.data, noResultsItem]);
    });
  }

  const throttleSearch = useRef(throttle(500, searchResource)).current;

  function handleSelection(selectValue) {
    // On selection, clear out the input value to reset the search
    setInputValue('');

    if (selectValue.id === ADD_NEW) {
      setAddNewModalOpen(true);
      return;
    }

    setSelectedItems((prevState) => {
      // TODO: this might could use a refactor to something more efficent
      const allSelected = [
        ...prevState.filter(i => i.id !== selectValue.id),
        selectValue,
      ];
      onChange(allSelected);

      return allSelected;
    });
  }

  const handleDelete = selectedId => () => {
    setSelectedItems((prevState) => {
      const newSelectedItems = prevState.filter(i => i.id !== selectedId);
      onChange(newSelectedItems);
      return newSelectedItems;
    });
  };

  function onAddSubmit(formData) {
    return postNewResource(formData).then((response) => {
      setAddNewModalOpen(false);
      handleSelection(response.data);
    });
  }

  function handleModalClose() {
    setAddNewModalOpen(false);
  }

  return (
    <React.Fragment>
      <AddNewModal
        onSubmit={onAddSubmit}
        open={addNewModalOpen}
        handleClose={handleModalClose}
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
            placeholder: searchPlaceholder,
          });

          return (
            <div>
              {selectedItems.length > 0 && (
                <SelectedItems
                  selectedItems={selectedItems}
                  handleDelete={handleDelete}
                  className={classes.selectedItems}
                  displayAttribute={displayAttribute}
                />
              )}
              <TextField
                InputLabelProps={getLabelProps({ shrink: true })}
                InputProps={{ onBlur, onFocus }}
                {...inputProps}
                fullWidth
                label={searchLabel}
              />
              <div {...getMenuProps()} className={classes.listbox}>
                {isOpen && (
                  <Paper square>
                    {items.map((item, index) => (
                      <MenuItem
                        key={item.id}
                        {...getItemProps({ item })}
                        selected={highlightedIndex === index}
                        component="div"
                      >
                        {item[displayAttribute]}
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

CrazySelect.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
  }).isRequired,
  searchPlaceholder: PropTypes.string.isRequired,
  searchLabel: PropTypes.string.isRequired,
  addNewText: PropTypes.string.isRequired,
  getResource: PropTypes.func.isRequired,
  postNewResource: PropTypes.func.isRequired,
  AddNewModal: PropTypes.func.isRequired,
  displayAttribute: PropTypes.string.isRequired,
  // incomingSelectedItems: PropTypes.shape([]),
};

CrazySelect.defaultProps = {
  incomingSelectedItems: [],
};
