import React from 'react';
import PropTypes from 'prop-types';
import CrazySelect from 'shared/multi-select/CrazySelect';
import { getCreators, postCreators } from 'creators/creators.service';
import CreatorModal from 'creator-form/CreatorModal';

function CreatorSelect({ input }) {
  return (
    <CrazySelect
      input={input}
      searchPlaceholder="Search for creators"
      searchLabel="Creators"
      addNewText="Add new creator"
      getResource={getCreators}
      postNewResource={postCreators}
      AddNewModal={CreatorModal}
      displayAttribute="name"
    />
  );
}

CreatorSelect.propTypes = {
  input: PropTypes.shape({}).isRequired,
};

export default CreatorSelect;
