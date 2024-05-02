import axios from 'axios';

export const axios_get_member = () => {
    console.log("axios_get_member()");
    axios.get(`${process.env.REACT_APP_HOST}/member/get_member`, {
        
    })
   .then(respones => {
        console.log('AXIOS GET MEMBER COMMUNICATION SUCCESS');
        console.log(respones.data);
        if(respones.data === -1){
            console.log("session out");
            return null;
        }else{

            if(respones.data === null){
                console.log("undefined member");
                return null;
            }else{
                console.log("member_id: " + respones.data.member.M_ID);
                return respones.data.member.M_ID;
            }

        }
   })
   .catch(error => {
        console.log('AXIOS GET MEMBER COMMUNICATION ERROR');
    
    })
    .finally(() => {
        console.log('AXIOS GET MEMBER COMMUNICATION COMPLETE');
         
    });
}
