import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from '../include/Header';
import CreateStory from './section_page/CreateStory';
import SearchMember from './member/SearchMember';
import Message from './section_page/Message';
import MyHome from './section_page/MyHome';
import Home from './Home';
import SignUp from './member/SignUp';
import SignIn from './member/SignIn';
import Modify from './member/Modify';
import Error from './Error';
import Nav from '../include/Nav';
import { useSelector } from 'react-redux';

const Wrap = () => {

    const sessionID = useSelector(store => store.sessionID);

    return (
        <>
            {
                sessionID !== null
                ?
                <>                    
                <nav>
                    <Nav/>
                </nav>                    
                <section>
                    <Header/>                 
                    <Routes>{/* views */}
                        <Route path='/' element={<Home/>}></Route>
                        <Route path='/member/modify_form' element={<Modify/>}></Route>
                        <Route path='/member/search_member_form' element={<SearchMember/>}></Route>
                        <Route path='/member/message' element={<Message/>}></Route>
                        <Route path='/story/create_story' element={<CreateStory/>}></Route>
                        <Route path='/member/my_home' element={<MyHome/>}></Route>
                        <Route path='/*' element={<Error/>}></Route>
                    </Routes>
                </section>            
                </>
                :
                <Routes>{/* views */}
                    <Route path='/' element={<SignIn/>}></Route>                       
                    <Route path='/member/sign_up_form' element={<SignUp/>}></Route>
                </Routes>
                }
        </>
    )
}

export default Wrap;