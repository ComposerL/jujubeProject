import { jwtDecode } from "jwt-decode";

export const session_check = () => {

    let token = sessionStorage.getItem('sessionID');
        if(token === undefined){
            sessionStorage.removeItem('sessionID');
            return null; 
        }else {
            console.log('token in session storage: ', jwtDecode(token)) ;
            let tokenExp = jwtDecode(token).exp;
            let date = (new Date().getTime() + 1) / 1000;
            if(date >= tokenExp ) {
                return null;
            }else{
                return token;
            }
        }
        
}