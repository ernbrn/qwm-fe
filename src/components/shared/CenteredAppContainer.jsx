import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    minHeight: 'calc(100vh - 64px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function CenteredAppContainer({ children }) {
  const classes = useStyles();

  return <Container className={classes.container}>{children}</Container>;
}

CenteredAppContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CenteredAppContainer;
