import axios from 'axios';
import swal from 'sweetalert';


export const login = loggedUser =>{
    return axios
    .post('api/users/login',{
        email:loggedUser.email,
        password:loggedUser.password
    })
    .then(res =>{
        
        localStorage.setItem('userLoginToken',res.data.token); //create the login session
      //  localStorage.setItem('loggedUserFirstName',res.data.firstName);

        //console.log("Fisrt Name :" +res.data.firstName)
        //console.log("Login Token :" +localStorage.userLoginToken);
        //console.log("SecurtyKeyStatus :" +res.data.secureKeyVerifyStatus);

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
            swal({
                title: "Oops!!!",
                text: "Verify your Security Key First",
                icon: "error",
                button: "Back to Login",
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