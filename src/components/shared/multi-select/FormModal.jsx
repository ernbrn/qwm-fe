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
  open, handleClose, Form, title,
}) {
  const classes = useStyles();

  return (
    <Dialog fullWidth open={open} onClose={handleClose} TransitionComponent={Transition}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent className={classes.content}>
        <Grid container spacing={4} justify="center">
          <Grid item>
            <Form />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

FormModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  Form: PropTypes.func.isRequired,
  title: PropTypes.string,
};

FormModal.defaultProps = {
  title: '',
};
