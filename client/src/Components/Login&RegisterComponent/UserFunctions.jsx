import axios from 'axios';
import swal from 'sweetalert';

import VerifySecureCode from './VerifySecureCode';

export const register = newUser =>{
    return axios
    .post('api/users/register',{
      firstName:newUser.firstName,
      lastName:newUser.lastName,
      email:newUser.email,
      mobile:newUser.mobile,
      company:newUser.company,
      packageName:newUser.packageName,
      userType:newUser.userType,
      password:newUser.password
    })
    .then(res =>{
         if(res.data != null){

            localStorage.setItem('usertoken',res.data.token); //create the session
            console.log("Data :" +res.data.token);


            return res.data.token
        }
    })
    .catch(err =>{
        console.log(err)
        if(err.response.status === 400){
            swal({
                title: "Oops!!!",
                text: "User Email Already Exists",
                icon: "error",
                button: "Back to Login",
            })
        }
    });


}

export const addCompany = newUser =>{
    
    return axios
    .post('api/companies/add',{
        company:newUser.company,
        mobile:newUser.mobile,
        email:newUser.email,
        packageName:newUser.packageName
    })
    .then(()=>{
        console.log('company saved')
    })
    .catch(err=>{
        console.log(err)
    })
}


export const login = loggedUser =>{
    return axios
    .post('api/users/login',{
        email:loggedUser.email,
        password:loggedUser.password
    })
    .then(res =>{
        
        localStorage.setItem('userLoginToken',res.data.token); //create the login session
      //  localStorage.setItem('loggedUserFirstName',res.data.firstName);

        console.log("Fisrt Name :" +res.data.firstName)
        console.log("Login Token :" +localStorage.userLoginToken);
        console.log("SecurtyKeyStatus :" +res.data.secureKeyVerifyStatus);

        return res.data.token
    })
    .catch(err =>{
        if(err.response.status === 400){
            swal({
                title: "Oops!!!",
                text: "Your Password is Incorrect",
                icon: "error",
                button: "Back to Login",
            })
        }
        else if(err.response.status === 403){
            const el = document.createElement('div')
            el.innerHTML = "<a href='http://localhost:3000/ResendEmail'>Click Here to Resend Eamil </a>"
            swal({
                title: "Oops!!!",
                text: "Verify your Security Key First",
                icon: "error",
                button: "Back to Login",
                content:el
            })
        }
        else if(err.response.status === 404){
            swal({
                title: "Oops!!!",
                text: "User Does not Exist in the System",
                icon: "error",
                button: "Back to Login",
            })
        }
    })
}

export const resendEmail = resendEmail =>{
    return axios
    .post('api/users/resendEmail',{
        email:resendEmail.email,
    })
    .then(res =>{

            localStorage.setItem('usertoken',res.data.token); //create the session
            console.log("Resend Email Data :" +res.data.token);
            return res.data.token

    })
    .catch(err=>{
        if(err.response.status === 404){
            swal({
                title: "Oops!!!",
                text: "Invalid Email",
                icon: "error",
                button: "Back to Login",
            })
        }
     
    })
}


export const forgotPassword = forgotPwd =>{
    return axios
    .post('api/users/forgotPassword',{
        email:forgotPwd.email,
        mobile:forgotPwd.mobile
    })
    .then(res =>{

            localStorage.setItem('forgotPwd',res.data.token); 
            console.log('Forgot token : ',localStorage.getItem("forgotPwd"));
            return res.data.token

    })
    .catch(err=>{
        if(err.response.status === 404){
            swal({
                title: "Oops!!!",
                text: "Invalid Email",
                icon: "error",
                button: "Back",
            })
        }
        else if(err.response.status === 400){
            swal({
                title: "Oops!!!",
                text: "It's Not Your Mobile",
                icon: "error",
                button: "Back",
            })
        }
     
    }) 
}




// export const verify = userVerification =>{
//     return axios
//     .post('/api/users/verify',{
//         securecode:userVerification.securecode
//     })
//     .then(res=>{
//         swal({
//             title: "Congratulations!",
//             text: "Verified Successfully!",
//             icon: "success",
//             button: "Back to Login",
//         })
//     })
// }




