import React from 'react';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './css/common.css';
import Header from './include/Header';
import Footer from './include/Footer';
import Home from './component/Home';
import SignUp from './component/member/SignUp';
import SignIn from './component/member/SignIn';
import Modify from './component/member/Modify';
import Error from './component/Error';
import Nav from './include/Nav';

//reducer setting
const initial_state = { //state 초기값
    isLogin: false,
    sessionID: '',
}
const reducer = (currentState = initial_state , action) => {
    console.log("Home reducer()");

    switch(action.type){
        case 'sign_in_success':
            return {...currentState, isLogin: true, sessionID: action.sessionID};
        case 'sign_out_success':
            return {...currentState, isLogin: false, sessionID: ''};
        default:
            return currentState;
    }
}

function App() {

	//store
    const store = createStore(reducer);

	return (
		<div className="App">
			<Provider store={store}>
                <BrowserRouter>
                    <Header/>
					<Nav/>
                    <Routes>{/* views */}
                        <Route path='/' element={<Home/>}></Route>
                        <Route path='/member/sign_up_form' element={<SignUp/>}></Route>    
                        <Route path='/member/sign_in_form' element={<SignIn/>}></Route>
                        <Route path='/member/modify_form' element={<Modify/>}></Route>
                        <Route path='/*' element={<Error/>}></Route>
                    </Routes>

                    <Footer/>
                </BrowserRouter>
            </Provider>
		</div>
	);
}

export default App;
