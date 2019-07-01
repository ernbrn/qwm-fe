import React from 'react';
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
} from '@material-ui/core';
import { Form, Field } from 'react-final-form';

export default function Login() {
  function onSubmit(data) {
    console.log(data);
  }

  return (
    <Form onSubmit={onSubmit}>
      {
        ({ handleSubmit }) => (
          <Card>
            <CardContent>
              <form onSubmit={handleSubmit} noValidate>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Field name="username">
                      {
                        ({ input, meta }) => (
                          <TextField
                            {...input}
                            label="Username"
                            fullWidth
                            variant="outlined"
                            autoComplete="new-password"
                          />
                        )
                      }
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="password">
                      {
                        ({ input, meta }) => (
                          <TextField
                            {...input}
                            label="Password"
                            fullWidth
                            type="password"
                            variant="outlined"
                            autoComplete="new-password"
                          />
                        )
                      }
                    </Field>
                  </Grid>
                  <Grid item xs={12} align="center">
                    <Button type="submit" variant="contained" color="primary">Login</Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        )
      }
    </Form>
  );
}
