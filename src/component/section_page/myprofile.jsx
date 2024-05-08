import React from 'react';

const MyProfile = ({loginedMember}) => {

    return (
        <div id='my_profile_wrap'>
        <div className='profile_member_name'>
            <p>{loginedMember}</p>
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
    );
};

export default MyProfile;
