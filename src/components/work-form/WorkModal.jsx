import React from 'react';
import PropTypes from 'prop-types';
import FormModal from 'shared/multi-select/FormModal';
import WorkForm from './WorkForm';

export default function WorkModal({ open, handleClose, onSubmit }) {
  return (
    <FormModal
      open={open}
      handleClose={handleClose}
      onSubmit={onSubmit}
      Form={() => <WorkForm onSubmit={onSubmit} onCancel={handleClose} />}
      title="Add a work"
    />
  );
}

WorkModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};
