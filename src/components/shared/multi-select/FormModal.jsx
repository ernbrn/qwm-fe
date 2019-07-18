import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, DialogTitle, DialogContent, Slide, Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing }) => ({
  content: {
    padding: spacing(4),
  },
}));

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function FormModal({
  open, handleClose, onSubmit, Form, title,
}) {
  const classes = useStyles();

  return (
    <Dialog fullWidth open={open} onClose={handleClose} TransitionComponent={Transition}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent className={classes.content}>
        <Grid container spacing={4} justify="center">
          <Grid item>
            <Form onSubmit={onSubmit} onCancel={handleClose} />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

FormModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  Form: PropTypes.func.isRequired,
  // Can make this optional
  title: PropTypes.string.isRequired,
};
