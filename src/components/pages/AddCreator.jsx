import React from 'react';
import CreatorForm from 'creator-form/CreatorForm';
import { Card, CardContent, Typography } from '@material-ui/core';
import WorkSearch from 'work-form/WorkSelect';
import { postCreators } from 'creators/creators.service';
import { useHistory } from 'react-router-dom';

export default function AddCreator() {
  const history = useHistory();

  function onSubmit(data) {
    return postCreators(data).then(({ data: creator }) => {
      history.push(`/creators/${creator.id}`);
    });
  }

  return (
    <React.Fragment>
      <Typography variant="h3" component="h1" align="center">
        Add a creator
      </Typography>
      <Card>
        <CardContent>
          <CreatorForm onSubmit={onSubmit} WorkSearch={WorkSearch} />
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
