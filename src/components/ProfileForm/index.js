import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { withRouter } from 'react-router';
import { withProps } from 'recompose';
import Input from '../Input';
import Textarea from '../Textarea';
import onRouteLeave from '../../utils/routeLeaveHook';

export class ProfileFormComponent extends Component {
  static propTypes = {
    error: PropTypes.string,
    handleProfileUpdate: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitSucceeded: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    router: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    dirty: PropTypes.bool.isRequired,
  };

  componentWillReceiveProps() {
    const { dirty, router, route } = this.props;
    onRouteLeave(router, route, dirty);
  }

  render() {
    const { error, handleProfileUpdate, handleSubmit, submitSucceeded,
    submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(handleProfileUpdate)} noValidate>
        <Field
          name="image"
          component={Input}
          label="Profile Image"
          type="file"
        />
        <Field
          name="firstname"
          component={Input}
          label="First Name"
          type="text"
          placeholder="First Name"
          maxLength="30"
        />
        <Field
          name="lastname"
          component={Input}
          label="Last Name"
          type="text"
          placeholder="Last Name"
          maxLength="30"
        />
        <Field
          name="bio"
          component={Textarea}
          label="Bio"
          placeholder="Bio"
          maxLength="1000"
        />
        {submitSucceeded && !submitting && <p>Profile Updated</p>}
        {error && <p>{error}</p>}
        <button type="submit" disabled={submitting}>Update</button>
      </form>
    );
  }
}

export default withProps(({ user }) => ({
  initialValues: {
    bio: user.get('bio'),
    firstname: user.get('firstname'),
    lastname: user.get('lastname'),
  },
}))(withRouter(reduxForm({
  form: 'ProfileForm',
})(ProfileFormComponent)));
