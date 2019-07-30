import React from 'react';
import WorkForm from 'work-form/WorkForm';
import { Card, CardContent } from '@material-ui/core';
import CreatorSearch from 'creator-form/CreatorSelect';
import { postWorks } from 'works/works.service';
import { postWorkTypes } from 'work-types/work-types.service';

// TODO import this from elsewhere
const ADD_WORK_TYPE_VALUE = 'addOwn';

export default function AddWork() {
  function onSubmit(formData) {
    console.log(formData);
    const data = { ...formData };

    if (data.work_type_id !== ADD_WORK_TYPE_VALUE) {
      delete data.workTypeName;
    }

    if (data.workTypeName) {
      return postWorkTypes({ name: data.workTypeName }).then(response => postWorks({
        title: data.title,
        work_type_id: response.data.id,
        // attn post through users so as not to have to do this
        // slash api will know who the current user is and assign
        contributor_id: 4,
      }).then(workResponse => console.log(workResponse)));
    }

    return postWorks({
      ...data,
      // attn post through users so as not to have to do this
      // slash api will know who the current user is and assign
      contributor_id: 4,
    });
  }

  return (
    <Card>
      <CardContent>
        <WorkForm onSubmit={onSubmit} CreatorSearch={CreatorSearch} />
      </CardContent>
    </Card>
  );
}
