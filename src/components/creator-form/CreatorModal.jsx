import React from 'react';
import PropTypes from 'prop-types';
import FormModal from 'shared/multi-select/FormModal';
import CreatorForm from './CreatorForm';

export default function CreatorModal({ open, handleClose, onSubmit }) {
  return (
    <FormModal
      open={open}
      handleClose={handleClose}
      onSubmit={onSubmit}
      Form={() => <CreatorForm onSubmit={onSubmit} onCancel={handleClose} />}
      title="Add a creator"
    />
  );
}

CreatorModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};
