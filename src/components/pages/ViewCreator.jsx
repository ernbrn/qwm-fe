import React from 'react';
// import { Grid } from '@material-ui/core';
import { getCreator } from 'creators/creators.service';
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

class ViewCreator extends React.Component {
  static propTypes = {
    classes: PropTypes.shape({ paper: PropTypes.string.isRequired }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }),
    }).isRequired,
  };

  state = {
    creator: {},
  };

  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    const { id } = this.props.match.params;
    return getCreator(id).then(({ data: creator }) => {
      this.setState({ creator });
    });
  }

  render() {
    const { creator } = this.state;
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <div>
          <Typography variant="h2" component="h1" align="center">
            {creator.name}
          </Typography>
          {creator.works && (
            <React.Fragment>
              <Typography variant="h4">Works</Typography>
              {creator.works.map(work => (
                <div>
                  <Link to={`/works/${work.id}`} key={work.id}>
                    {work.title}
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

export default withStyles(styles)(ViewCreator);
