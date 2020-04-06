import React from 'react';
// import { Grid } from '@material-ui/core';
import { getWork } from 'works/works.service';
import PropTypes from 'prop-types';
import { Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const styles = ({ spacing }) => ({
  paper: {
    padding: spacing(4),
    width: '100%',
  },
});

class ViewWork extends React.Component {
  static propTypes = {
    classes: PropTypes.shape({ paper: PropTypes.string.isRequired }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }),
    }).isRequired,
  };

  state = {
    work: {},
  };

  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    const { id } = this.props.match.params;
    return getWork(id).then(({ data: work }) => {
      this.setState({ work });
    });
  }

  render() {
    const { work } = this.state;
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <div>
          <Typography variant="h2" component="h1" align="center">
            {work.title}
          </Typography>
          {work.creators && (
            <React.Fragment>
              <Typography variant="h4">Creators</Typography>
              {work.creators.map(creator => (
                <div>
                  <Link to={`/creators/${creator.id}`} key={creator.id}>
                    {creator.name}
                  </Link>
                </div>
              ))}
            </React.Fragment>
          )}
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(ViewWork);
