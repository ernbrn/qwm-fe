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
import { connect } from 'react-redux';
import { getWorkTypesSuccess } from 'work-types/work-types.actions';
import { getWorkTypes } from 'work-types/work-types.service';
import { ADD_NEW } from 'application.constants';

class WorkForm extends React.Component {
  static propTypes = {
    dispatchGetWorkTypesSuccess: PropTypes.func.isRequired,
    CreatorSearch: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    CreatorSearch: null,
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

  render() {
    const { workTypes } = this.state;
    const { CreatorSearch, onSubmit } = this.props;
    return (
      <Form onSubmit={onSubmit}>
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
                            <MenuItem value={ADD_NEW}>
                              I don't see the right type. Add my own.
                            </MenuItem>
                          </Select>
                        </FormControl>
                      )}
                    </Field>
                  </Grid>
                  {values.work_type_id === ADD_NEW && (
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
                  {CreatorSearch && (
                    <Grid item xs={12}>
                      <Field name="creator" component={CreatorSearch} />
                    </Grid>
                  )}
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
