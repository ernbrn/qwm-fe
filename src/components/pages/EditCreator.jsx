import React from 'react';
import CreatorForm from 'creator-form/CreatorForm';
import WorkSearch from 'work-form/WorkSelect';
import { getCreator, patchCreator } from 'creators/creators.service';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

class EditCreator extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }),
    }).isRequired,
  };

  state = {
    creator: { works: [] },
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
    const { history } = this.props;

    function EditingWorkSearch({ input }) {
      return <WorkSearch input={input} existingWorks={creator.works} />;
    }

    function onSubmit(data) {
      return patchCreator(creator.id, data).then(() => history.push(`/creators/${creator.id}`),);
    }

    return (
      <React.Fragment>
        <Typography variant="h3" component="h1" align="center">
          Edit
        </Typography>
        <Card>
          <CardContent>
            <CreatorForm
              onSubmit={onSubmit}
              WorkSearch={EditingWorkSearch}
              creator={creator}
            />
          </CardContent>
        </Card>
      </React.Fragment>
    );
  }
}

export default withRouter(EditCreator);
