import React from 'react';
import { Form, Field } from 'react-final-form';
import {
  Grid,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@material-ui/core';
import CreatorSelect from 'creator-form/CreatorSelect';
import WorkSelect from 'work-form/WorkSelect';

export default function ReferenceForm() {
  const [referencedEntityType, setReferencedEntityType] = React.useState('work');
  const [referencedByType, setReferencedByType] = React.useState('work');

  const onReferencedEntityChange = (event) => {
    setReferencedEntityType(event.target.value);
  };

  const onReferenceByChange = (event) => {
    setReferencedByType(event.target.value);
  };

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit} width="100">
          <Grid container spacing={4} justify="center">
            <Grid item xs={1}>
              The:
            </Grid>
            <Grid item xs={4}>
              <Field name="referenced-entity-type" type="radio" value={referencedEntityType}>
                {({ input }) => (
                  <FormControl fullWidth>
                    {/* <FormLabel component="legend">(Select entity referenced)</FormLabel> */}
                    <RadioGroup
                      row
                      aria-label={input.name}
                      {...input}
                      onChange={onReferencedEntityChange}
                    >
                      <FormControlLabel value="work" control={<Radio />} label="Work" />
                      <FormControlLabel value="creator" control={<Radio />} label="Creator" />
                    </RadioGroup>
                  </FormControl>
                )}
              </Field>
            </Grid>
            {referencedEntityType === 'creator' && (
              <Grid item xs={7}>
                <Field name="creator" component={CreatorSelect} />
              </Grid>
            )}
            {referencedEntityType === 'work' && (
              <Grid item xs={7}>
                <Field name="work" component={WorkSelect} />
              </Grid>
            )}
            <Grid item xs={2}>
              is referenced by the:
            </Grid>
            <Grid item xs={3}>
              <Field name="type-referencing" type="radio" value={referencedByType}>
                {({ input }) => (
                  <FormControl fullWidth>
                    {/* <FormLabel component="legend">(Select entity referenced)</FormLabel> */}
                    <RadioGroup
                      row
                      aria-label={input.name}
                      {...input}
                      onChange={onReferenceByChange}
                    >
                      <FormControlLabel value="work" control={<Radio />} label="Work" />
                      <FormControlLabel value="creator" control={<Radio />} label="Creator" />
                    </RadioGroup>
                  </FormControl>
                )}
              </Field>
            </Grid>
            {referencedByType === 'creator' && (
              <Grid item xs={7}>
                <Field name="creator" component={CreatorSelect} />
              </Grid>
            )}
            {referencedByType === 'work' && (
              <Grid item xs={7}>
                <Field name="work" component={WorkSelect} />
              </Grid>
            )}
          </Grid>
        </form>
      )}
    </Form>
  );
}
