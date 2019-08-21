import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing }) => ({
  selectedItem: {
    marginRight: spacing(1),
  },
}));

export default function SelectedItems({ selectedItems, handleDelete, className }) {
  const classes = useStyles();

  return (
    <div className={className}>
      {selectedItems.map(selectedItem => (
        <Chip
          key={selectedItem.id}
          label={selectedItem.name}
          onDelete={handleDelete(selectedItem.id)}
          className={classes.selectedItem}
        />
      ))}
    </div>
  );
}

SelectedItems.propTypes = {
  selectedItems: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleDelete: PropTypes.func.isRequired,
  className: PropTypes.string,
};

SelectedItems.defaultProps = {
  className: '',
};
