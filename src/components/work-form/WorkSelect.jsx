import React from 'react';
import PropTypes from 'prop-types';
import CrazySelect from 'shared/multi-select/CrazySelect';
import { getWorks, postWorks } from 'works/works.service';
import WorkModal from 'work-form/WorkModal';

function WorkSelect({ input, existingWorks }) {
  return (
    <CrazySelect
      input={input}
      searchPlaceholder="Search for works"
      searchLabel="Works"
      addNewText="No matches! Click here to add it!"
      getResource={getWorks}
      postNewResource={postWorks}
      AddNewModal={WorkModal}
      displayAttribute="title"
      incomingSelectedItems={existingWorks}
    />
  );
}

WorkSelect.defaultProps = {
  existingWorks: [],
};

WorkSelect.propTypes = {
  input: PropTypes.shape({}).isRequired,
  existingWorks: PropTypes.arrayOf(PropTypes.shape({})),
};

export default WorkSelect;
