import React from 'react';
import WorkForm from 'work-form/WorkForm';
import CreatorSearch from 'creator-form/CreatorSelect';
import { getWork, patchWork } from 'works/works.service';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

class EditWork extends React.Component {
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
    work: { creators: [] },
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
    const { history } = this.props;

    function EditingCreatorSearch({ input }) {
      return <CreatorSearch input={input} existingCreators={work.creators} />;
    }

    function onSubmit(data) {
      return patchWork(work.id, data).then(() => history.push(`/works/${work.id}`),);
    }

    return (
      <React.Fragment>
        <Typography variant="h3" component="h1" align="center">
          Edit
        </Typography>
        <WorkForm
          onSubmit={onSubmit}
          CreatorSearch={EditingCreatorSearch}
          work={work}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(EditWork);
