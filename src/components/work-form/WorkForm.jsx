import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import {
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  Grid,
  TextField,
  MenuItem,
  OutlinedInput,
} from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { getWorkTypesSuccess } from 'work-types/work-types.actions';
import { getWorkTypes, postWorkTypes } from 'work-types/work-types.service';
import { postWorks } from 'works/works.service';
import CreatorSelect from './CreatorSelect';

// const useStyles = makeStyles(() => ({
// }));

const ADD_WORK_TYPE_VALUE = 'addOwn';

class WorkForm extends React.Component {
  static propTypes = {
    dispatchGetWorkTypesSuccess: PropTypes.func.isRequired,
  };

  state = {
    workTypes: [],
  };

  componentDidMount() {
    const { dispatchGetWorkTypesSuccess } = this.props;
    return getWorkTypes().then(({ data }) => {
      dispatchGetWorkTypesSuccess(data);
      this.setState({ workTypes: data });
    });
  }

  onSubmit = (formData) => {
    console.log(formData);
    const data = { ...formData };

    if (data.work_type_id !== ADD_WORK_TYPE_VALUE) {
      delete data.workTypeName;
    }

    // if (data.workTypeName) {
    //   return postWorkTypes({ name: data.workTypeName }).then(response => postWorks({
    //     title: data.title,
    //     work_type_id: response.data.id,
    //     // attn post through users so as not to have to do this
    //     // slash api will know who the current user is and assign
    //     contributor_id: 4,
    //   }).then(workResponse => console.log(workResponse)));
    // }

    // return postWorks({
    //   ...data,
    //   // attn post through users so as not to have to do this
    //   // slash api will know who the current user is and assign
    //   contributor_id: 4,
    // });
  };

  render() {
    const { workTypes } = this.state;
    return (
      <Form onSubmit={this.onSubmit}>
        {({ handleSubmit, values }) => (
          <Card>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={4} justify="center">
                  <Grid item xs={12}>
                    <Field name="title">
                      {({ input }) => (
                        <TextField
                          {...input}
                          autoFocus
                          label="Title"
                          fullWidth
                          required
                          variant="outlined"
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="work_type_id" initialValue={workTypes.length && workTypes[0].id}>
                      {({ input, meta }) => (
                        <FormControl fullWidth>
                          <InputLabel variant="outlined" htmlFor={input.name}>
                            Type
                          </InputLabel>
                          <Select
                            variant="outlined"
                            input={<OutlinedInput id={input.name} />}
                            {...input}
                          >
                            {workTypes.map(workType => (
                              <MenuItem key={workType.id} value={workType.id}>
                                {workType.name}
                              </MenuItem>
                            ))}
                            <MenuItem value={ADD_WORK_TYPE_VALUE}>
                              I don't see the right type. Add my own.
                            </MenuItem>
                          </Select>
                        </FormControl>
                      )}
                    </Field>
                  </Grid>
                  {values.work_type_id === ADD_WORK_TYPE_VALUE && (
                    <Grid item xs={12}>
                      <Field name="workTypeName">
                        {({ input }) => (
                          <TextField
                            {...input}
                            label="Type of work"
                            fullWidth
                            required
                            variant="outlined"
                          />
                        )}
                      </Field>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Field name="creator" component={CreatorSelect} />
                  </Grid>
                  <Grid item>
                    <Button type="submit" color="primary" variant="contained">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        )}
      </Form>
    );
  }
}

export default connect(
  null,
  {
    dispatchGetWorkTypesSuccess: getWorkTypesSuccess,
  },
)(WorkForm);
