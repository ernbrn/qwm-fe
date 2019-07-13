import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, Dialog, Slide, Typography, Toolbar, IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import CreatorForm from './CreatorForm';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function CreatorModal({ open, handleClose, onSubmit }) {
  const classes = useStyles();

  return (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar color="default">
        <Toolbar>
          <Typography className={classes.title}>Add a creator</Typography>
          <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="Close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <CreatorForm onSubmit={onSubmit} />
    </Dialog>
  );
}

CreatorModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};
