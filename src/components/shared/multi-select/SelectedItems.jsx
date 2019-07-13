import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@material-ui/core';

export default function SelectedItems({ selectedItems, handleDelete, className }) {
  return (
    <div className={className}>
      {selectedItems.map(selectedItem => (
        <Chip
          key={selectedItem.id}
          label={selectedItem.name}
          onDelete={handleDelete(selectedItem.id)}
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
