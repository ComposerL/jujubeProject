import React, { useEffect } from 'react'
import '../../css/myHome.css';
import axios from 'axios';
import $ from 'jquery';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


axios.defaults.withCredentials = true;

const MyHome = () => {

    //hook
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("MyHome useEffect()");
        axios_get_member();
    }, []);

    const axios_get_member = () => {
        console.log("axios_get_member()");
        axios.get(`${process.env.REACT_APP_HOST}/member/get_member`, {
            
        })
       .then(respones => {
            console.log('AXIOS GET MEMBER COMMUNICATION SUCCESS');
            console.log(respones.data);
            if(respones.data === -1){
                console.log("Home session out!!");
                sessionStorage.removeItem('sessionID');
                dispatch({
                    type:'session_out',
                });
                navigate('/');
            }else{
    
                if(respones.data === null){
                    console.log("undefined member");
                    console.log("Home session out!!");
                    sessionStorage.removeItem('sessionID');
                    dispatch({
                        type:'session_out',
                    });
                    navigate('/');
                }else{
                    console.log("member_id: " + respones.data.member.M_ID);
                    dispatch({
                        type:'session_enter',
                        loginedMember: respones.data.member.M_ID,
                    });
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

  return (
    <div id='my_profile_wrap'>
        <div className='profile_member_name'>
            <p>gildong</p>
        </div>
        
        <div className='profile_header'>
            <img src="/imgs/profile_default.png" alt="" />
            <div className='post'>
                <div>100</div>
                <div>post</div>
            </div>
            <div className='followers'>
                <div>200</div>
                <div>follower</div>
            </div>    
            <div className='following'>
                <div>200</div>
                <div>following</div>
            </div>
        </div>
        <div className='profile_self_intro'>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis perferendis praesentium deserunt consequuntur in alias asperiores earum accusantium. Enim minus impedit quaerat eligendi ullam fuga eos odit ad ratione veritatis?</p>
        </div>
        <div className='profile_follow_btn'>
            <input type="button" value='팔로우' />
        </div>
        <div className='profile_img'>
            <div>게시물</div>

            <div className='profile_item'>
                <div>a</div>
                <div>b</div>
                <div>c</div>
                <div>d</div>
                <div>e</div>
                <div>f</div>
                <div>g</div>
                <div>h</div>
                <div>g</div>
            </div>
        </div>
    </div>
  )
}

export default MyHome;