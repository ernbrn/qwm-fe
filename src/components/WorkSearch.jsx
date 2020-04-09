import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { MenuItem, Paper, TextField } from '@material-ui/core';
import { throttle } from 'throttle-debounce';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { getWorks } from 'works/works.service';
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

export default function WorkSearch({
  searchPlaceholder,
  searchLabel,
  addNewText,
}) {
  const history = useHistory();
  const noResultsItem = { id: ADD_NEW, title: addNewText };
  const itemToString = item => item || '';
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const classes = useStyles();

  function searchResource(inputChange) {
    // Don't get all items if there's no value
    if (!inputChange) {
      return null;
    }

    return getWorks({ name: inputChange }).then((response) => {
      setItems([...response.data, noResultsItem]);
    });
  }

  const throttleSearch = useRef(throttle(500, searchResource)).current;

  function handleSelection(selectValue) {
    if (selectValue.id === ADD_NEW) {
      history.push('/works/new');
      return;
    }

    history.push(`/works/${selectValue.id}`);
  }

  return (
    <React.Fragment>
      <Downshift
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
        // selectedItem={input.value}
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
            name: 'NAME',
            placeholder: searchPlaceholder,
          });

          return (
            <div>
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
                        {item.title}
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

WorkSearch.propTypes = {
  searchPlaceholder: PropTypes.string.isRequired,
  searchLabel: PropTypes.string.isRequired,
  addNewText: PropTypes.string.isRequired,
};
