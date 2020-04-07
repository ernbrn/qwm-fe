import React from 'react';
import PropTypes from 'prop-types';
import CrazySelect from 'shared/multi-select/CrazySelect';
import { getCreators, postCreators } from 'creators/creators.service';
import CreatorModal from 'creator-form/CreatorModal';

function CreatorSelect({ input, existingCreators }) {
  return (
    <CrazySelect
      input={input}
      searchPlaceholder="Search for creators"
      searchLabel="Creators of this work"
      addNewText="Add new creator"
      getResource={getCreators}
      postNewResource={postCreators}
      AddNewModal={CreatorModal}
      displayAttribute="name"
      incomingSelectedItems={existingCreators}
    />
  );
}

CreatorSelect.defaultProps = {
  existingCreators: [],
};

CreatorSelect.propTypes = {
  input: PropTypes.shape({}).isRequired,
  existingCreators: PropTypes.arrayOf(PropTypes.shape({})),
};

export default CreatorSelect;
