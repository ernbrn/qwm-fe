import React from 'react';
import PropTypes from 'prop-types';
import CrazySelect from 'shared/multi-select/CrazySelect';
import { getWorks, postWorks } from 'works/works.service';
import WorkModal from 'work-form/WorkModal';

function WorkSelect({ input }) {
  return (
    <CrazySelect
      input={input}
      searchPlaceholder="Search for works"
      searchLabel="Works"
      addNewText="Add a new work"
      getResource={getWorks}
      postNewResource={postWorks}
      AddNewModal={WorkModal}
      displayAttribute="title"
    />
  );
}

WorkSelect.propTypes = {
  input: PropTypes.shape({}).isRequired,
};

export default WorkSelect;
