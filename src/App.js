import React from 'react';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter} from 'react-router-dom';
import './css/common.css';
import './App.css';
import Wrap from './component/Wrap';

//reducer setting
const initial_state = {
    sessionID: sessionStorage.getItem('sessionID'),
}

const reducer = (currentState = initial_state , action) => {
    console.log("App reducer()");

    switch(action.type){
        case 'session_out':
            return {...currentState, sessionID: sessionStorage.getItem('sessionID')};
        case 'session_enter':
            console.log("session_enter loginedMember: ", action.loginedMember);
            return {...currentState, sessionID: sessionStorage.getItem('sessionID'), loginedMember: action.loginedMember};
        case 'sign_in_success':
            return {...currentState, sessionID: sessionStorage.getItem('sessionID'), loginedMember: action.loginedMember};
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

