import axios from 'axios';
import swal from 'sweetalert';

export const register = newUser =>{
    return axios
    .post('api/users/register',{
      firstName:newUser.firstName,
      lastName:newUser.lastName,
      email:newUser.email,
      mobile:newUser.mobile,
      company:newUser.company,
      package:newUser.package,
      userType:newUser.userType,
      password:newUser.password
    })
    .then(res =>{
         if(res.data != null){
            localStorage.setItem('usertoken',res.data.token); //create the session
            console.log("Data :" +res.data.token);
            return res.data
        }
    })
    .then(res =>{
        swal({
            title: "Congratulations!",
            text: "Registered Successfully!",
            icon: "success",
            button: "Back to Login",
        })

    })
    .catch(err =>{
        console.log(err)
    });
}


