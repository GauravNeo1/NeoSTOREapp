import React from "react";
import SocialLogin from "react-social-login";
import Button from '@mui/material/Button';


class SocialButton extends React.Component {
  render() {
    const { children, triggerLogin, ...props } = this.props;
    return (
      <Button onClick={triggerLogin} {...props} className="btn btn-primary">
        {children}
      </Button>
    );
  }
}

export default SocialLogin(SocialButton);