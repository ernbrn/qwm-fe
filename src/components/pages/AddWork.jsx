import React from 'react';
import WorkForm from 'work-form/WorkForm';
import { Card, CardContent } from '@material-ui/core';
import CreatorSearch from 'creator-form/CreatorSelect';
import { postWorks } from 'works/works.service';
import { postWorkTypes } from 'work-types/work-types.service';
import { ADD_NEW } from 'application.constants';

export default function AddWork() {
  function onSubmit(formData) {
    const data = { ...formData };

    if (data.work_type_id !== ADD_NEW) {
      delete data.workTypeName;
    }

    if (data.workTypeName) {
      return postWorkTypes({ name: data.workTypeName }).then(response => postWorks({
        title: data.title,
        work_type_id: response.data.id,
      }).then(workResponse => console.log(workResponse)));
    }

    return postWorks(data);
  }

  return (
    <Card>
      <CardContent>
        <WorkForm onSubmit={onSubmit} CreatorSearch={CreatorSearch} />
      </CardContent>
    </Card>
  );
}
