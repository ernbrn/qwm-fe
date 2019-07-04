import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import LoginModal from 'modals/LoginModal';
import LogOutButton from 'shared/LogOutButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

export default function HeaderBar() {
  const classes = useStyles();

  return (
    <AppBar color="default">
      <Toolbar>
        <Typography className={classes.title}>Queer Works Map</Typography>
        <LogOutButton />
        <LoginModal />
      </Toolbar>
    </AppBar>
  );
}
