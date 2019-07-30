import React from 'react';
import CreatorForm from 'creator-form/CreatorForm';
import { Card, CardContent } from '@material-ui/core';
import WorkSearch from 'work-form/WorkSelect';

export default function AddCreator() {
  function onSubmit(data) {
    console.log(data);
  }

  return (
    <Card>
      <CardContent>
        <CreatorForm onSubmit={onSubmit} WorkSearch={WorkSearch} />
      </CardContent>
    </Card>
  );
}
