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

function formatWorks(works) {
  return works.reduce((newObject, work) => {
    const existing = newObject[work.work_type.name] || [];

    return {
      ...newObject,
      [work.work_type.name]: [...existing, work],
    };
  }, {});
}

function formatPayload(creator) {
  return {
    ...creator,
    works: formatWorks(creator.works),
  };
}

function formatWorkType(workType) {
  return `${workType.toUpperCase()}S`;
}

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
    return getCreator(id).then(({ data }) => {
      this.setState({ creator: formatPayload(data) });
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
          <Link to={`/creators/${creator.id}/edit`}>Edit</Link>
          {creator.works && (
            <React.Fragment>
              <Typography variant="h4">Works</Typography>
              {Object.keys(creator.works).map(workType => (
                <div key={workType}>
                  <Typography variant="h5">
                    {formatWorkType(workType)}
                  </Typography>
                  {creator.works[workType].map(work => (
                    <div key={work.id}>
                      <Link to={`/works/${work.id}`}>{work.title}</Link>
                    </div>
                  ))}
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
