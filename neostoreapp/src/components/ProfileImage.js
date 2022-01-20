import React, { useState, useEffect } from 'react';
import { getProfileData, updateProfileImage } from '../config/Myservice';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 8px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));


export default function ProfileImage() {
    const [loginUser, setLoginUser] = useState([]);
    const [files, setFiles] = useState(null);
    const [flagUpdate, setFlagUpdate] = useState(false);
    const [flagUpdated, setFlagUpdated] = useState(true);


    useEffect(() => {
        let loginUser = localStorage.getItem('LoginUser');

        getProfileData(loginUser)
            .then(res => {
                if (res.data.err == 0) {

                    setLoginUser(res.data.loginuser);
                    // console.log(res.data.loginuser)
                }
                if (res.data.err == 1) {
                    console.log(res.data)
                }
            })
    }, [])
    const update = () => {

        let fd = new FormData();
        fd.append("email", loginUser.email);
        fd.append("profile_image", files);

        updateProfileImage(fd)
        // console.log(files)
        setFlagUpdate(false)
        setFlagUpdated(true);


    }

    const changeProfile = () => {
        setFlagUpdate(true);
        setFlagUpdated(false);
    }


    return (
        <div>



            {/* <p>profile image</p><input type="file" onChange={(e) => setFiles(e.target.files[0])} />
            <button onClick={update}>updtae</button> */}

            <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
            >
                <Avatar alt={loginUser.name} src={`Assest/Profile_Images/${loginUser.profile_image}`} sx={{ width: 170, height: 170 }} style={{ border: "2px solid blue" }} />
            </StyledBadge>

            <br />
            <br />

            <h5> {loginUser.first_name} {loginUser.last_name}</h5>

            {flagUpdated &&
                <div>
                    <button className="btn btn-primary btn-sm" onClick={changeProfile}>

                        Update Profile Image

                    </button>
                </div>}
            {flagUpdate &&
                <div  >
                    <input type="file" onChange={(e) => setFiles(e.target.files[0])} />
                    <br /> <br />
                    <button className='btn btn-primary btn-sm' onClick={update}>update</button>
                </div>}



        </div>
    )
}
