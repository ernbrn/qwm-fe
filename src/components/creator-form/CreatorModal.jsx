import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, DialogTitle, DialogContent, Slide, Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CreatorForm from './CreatorForm';

const useStyles = makeStyles(({ spacing }) => ({
  content: {
    padding: spacing(4),
  },
}));

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function CreatorModal({ open, handleClose, onSubmit }) {
  const classes = useStyles();

  return (
    <Dialog fullWidth open={open} onClose={handleClose} TransitionComponent={Transition}>
      <DialogTitle>Add a creator</DialogTitle>
      <DialogContent className={classes.content}>
        <Grid container spacing={4} justify="center">
          <Grid item>
            <CreatorForm onSubmit={onSubmit} onCancel={handleClose} />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

CreatorModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};
