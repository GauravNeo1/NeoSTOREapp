import React, { useState } from 'react'
import SocialButton from './SocialButton'
import axios from 'axios'
import { socialLogin } from '../config/Myservice';


export default function SocialLogin() {

  const handleSocialLogin = (user) => {
    console.log(user);

    console.log(user._profile.email)
    let data = {
      fname: user._profile.firstName,
      lname: user._profile.lastName,
      gender: user._profile.gender,
      email: user._profile.email,
      profile_image: user._profile.profilePicURL
    }

    console.log(data)
    socialLogin(data)
      .then(res => {
        if (res.data.err == 0) {
          console.log(res.data)

          // setFlag(true);
          localStorage.setItem("_token",res.data.token);
          // alert("logged in successfully");

          let loginUser = localStorage.setItem("LoginUser", res.data.data);
          window.location.href = "./home";

        }
        if (res.data.err == 1) {
          console.log(res.data)
          alert("Login credentials incorrect");
        }
      })


  };

  const handleSocialLoginFailure = (err) => {
    console.error(err);

  };

  return (
    <div>
      <SocialButton
        provider="google"
        appId="465516943077-bvh9l3kcd5h7sgt8asil9kdjq3aeo4gn.apps.googleusercontent.com"
        onLoginSuccess={handleSocialLogin}
        onLoginFailure={handleSocialLoginFailure}
      >
        Login with Gmail
      </SocialButton>



      <SocialButton
        provider="facebook"
        appId="291074123022305"
        onLoginSuccess={handleSocialLogin}
        onLoginFailure={handleSocialLoginFailure}
      >
        Login with Facebook
      </SocialButton>



    </div>
  )
}