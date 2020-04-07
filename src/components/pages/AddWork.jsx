import React from 'react';
import WorkForm from 'work-form/WorkForm';
import CreatorSearch from 'creator-form/CreatorSelect';
import { postWorks } from 'works/works.service';
import { postWorkTypes } from 'work-types/work-types.service';
import { ADD_NEW } from 'application.constants';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export default function AddWork() {
  const history = useHistory();

  function onSubmit(formData) {
    const data = { ...formData };

    if (data.work_type_id !== ADD_NEW) {
      delete data.workTypeName;
    }

    if (data.workTypeName) {
      return postWorkTypes({ name: data.workTypeName })
        .then(response => postWorks({
            ...data,
            work_type_id: response.data.id,
          }),)
        .then(({ data: work }) => history.push(`/works/${work.id}`));
    }

    return postWorks(data).then(({ data: work }) => {
      history.push(`/works/${work.id}`);
    });
  }

  return (
    <React.Fragment>
      <Typography variant="h3" component="h1" align="center">
        Add a work
      </Typography>
      <WorkForm onSubmit={onSubmit} CreatorSearch={CreatorSearch} />
    </React.Fragment>
  );
}
