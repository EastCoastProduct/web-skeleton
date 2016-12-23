import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { emailConfirmFetch } from '../../actions/auth';
import { REDIRECTION } from '../../constants/application';
import ErrorMsg from '../../components/ErrorMsg';

export class EmailConfirmComponent extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    emailConfirm: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { dispatch, params, router } = this.props;
    return dispatch(emailConfirmFetch({ token: params.code }, () =>
      setTimeout(() => router.push('/'), REDIRECTION),
    ));
  }

  render() {
    const { emailConfirm } = this.props;

    return (
      <main>
        <p>Checking your email...</p>
        {emailConfirm.get('confirmationSuccess') &&
          <p>Email successfully checked. Redirecting...</p>
        }
        {emailConfirm.get('confirmationError') &&
          <ErrorMsg>{emailConfirm.get('confirmationError')}</ErrorMsg>
        }
      </main>
    );
  }
}

export default connect(state => ({
  emailConfirm: state.get('emailConfirm'),
}))(withRouter(EmailConfirmComponent));
