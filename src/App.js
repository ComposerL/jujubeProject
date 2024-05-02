import React from 'react';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter} from 'react-router-dom';
import './css/common.css';
import './App.css';
import Wrap from './component/Wrap';

//reducer setting
const initial_state = { //state 초기값
    cookie: '',
    sessionID: sessionStorage.getItem('sessionID'),
    loginedMember: '',
}

const reducer = (currentState = initial_state , action) => {
    console.log("Home reducer()");

    switch(action.type){
        case 'session_out':
            return {...currentState, loginedMember: action.loginedMember, sessionID: action.sessionID};
        case 'session_enter':
            return {...currentState, loginedMember: action.loginedMember};
        case 'sign_in_success':
            return {...currentState, loginedMember: action.loginedMember, sessionID: action.sessionID};
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
                    <Wrap/>  
                </BrowserRouter>
            </Provider>			
		</div>
	);
}

export default App;

