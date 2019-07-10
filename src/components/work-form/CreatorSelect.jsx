import React, { useState } from 'react';
import Downshift from 'downshift';
import { MenuItem, Paper, TextField } from '@material-ui/core';

export default function CreatorSelect({
  input, meta, placeholder, ...rest
}) {
  const NO_RESULTS = 'Add creator';

  const itemToString = item => item || '';
  const [items, setItems] = useState([]);

  function fakePI(ms = 300) {
    return new Promise(resolve => setTimeout(() => {
      setItems([]);
      return resolve;
    }));
  }

  return (
    <Downshift
      {...input}
      onInputValueChange={(inputValue) => {
        console.log(inputValue);
        input.onChange(inputValue);
        fakePI();
      }}
      itemToString={itemToString}
      selectedItem={input.value}
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
        const { onBlur, onFocus, ...inputProps } = getInputProps({
          name: input.name,
          placeholder,
        });

        return (
          <div>
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
                        key={item}
                        {...getItemProps({ item })}
                        selected={highlightedIndex === index}
                        component="div"
                      >
                        {item}
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
