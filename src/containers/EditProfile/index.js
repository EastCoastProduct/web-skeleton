import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { profileUpdateFetch, changeEmailFetch, changePasswordFetch }
  from '../../actions/profile';
import ProfileForm from '../../components/ProfileForm';
import ChangeEmailForm from '../../components/ChangeEmailForm';
import ChangePasswordForm from '../../components/ChangePasswordForm';
import ImageEditor from '../../components/ImageEditor';

export class EditProfileComponent extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  static state = { img: null };

  constructor() {
    super();
    this.handleProfileUpdate = this.handleProfileUpdate.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handlePreviewImage = this.handlePreviewImage.bind(this);
    this.state = { img: '' };
  }

  handleProfileUpdate(values) {
    const { dispatch, user } = this.props;
    return dispatch(profileUpdateFetch(values, user.get('id')));
  }

  handleChangeEmail(values) {
    const { dispatch } = this.props;
    return dispatch(changeEmailFetch(values));
  }

  handleChangePassword(values) {
    const { dispatch } = this.props;
    const newValues = values.delete('confirmation');
    return dispatch(changePasswordFetch(newValues));
  }

  handlePreviewImage(value) {
    if (value.target.files && value.target.files[0]) {
      const dataURL = window.URL.createObjectURL(value.target.files[0]);
      this.setState({ img: dataURL });
    }
  }

  render() {
    const { user } = this.props;

    return (
      <section>
        <ProfileForm
          handleProfileUpdate={this.handleProfileUpdate}
          handlePreviewImage={this.handlePreviewImage}
          user={user}
        />
        <ChangeEmailForm
          handleChangeEmail={this.handleChangeEmail}
          user={user}
        />
        <ChangePasswordForm handleChangePassword={this.handleChangePassword} />
        <Link to="/profile">View Profile</Link>

        {this.state.img !== '' && <ImageEditor image={this.state.img} />}
      </section>
    );
  }
}

export default connect(state => ({
  user: state.get('user'),
}))(EditProfileComponent);
