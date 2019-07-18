import React from 'react';
import PropTypes from 'prop-types';
import CrazySelect from 'shared/multi-select/CrazySelect';
import { getCreators, postCreators } from 'creators/creators.service';
import CreatorModal from 'creator-form/CreatorModal';

function CreatorSelect({ input }) {
  return (
    <CrazySelect
      input={input}
      // rename this search placeholder
      placeholder="Search for creator"
      // rename this search label
      label="Creator"
      addNewText="Add new creator"
      getResource={getCreators}
      postNewResource={postCreators}
      AddNewModal={CreatorModal}
    />
  );
}

CreatorSelect.propTypes = {
  input: PropTypes.shape({}).isRequired,
};

export default CreatorSelect;
