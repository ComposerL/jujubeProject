import React from 'react';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter} from 'react-router-dom';
import './css/common.css';
import './App.css';
import Wrap from './component/Wrap';

//reducer setting
const initial_state = { //state 초기값
    isLogin: false,
    cookie: '',
}

const reducer = (currentState = initial_state , action) => {
    console.log("Home reducer()");

    switch(action.type){
        case 'session_out':
            return {...currentState, isLogin: false, cookie: action.cookie};
        case 'sign_in_success':
            return {...currentState, isLogin: true, cookie: action.cookie};
        case 'sign_in_fail':
            return {...currentState, isLogin: false, cookie: action.cookie} 
        case 'sign_out_success':
            return {...currentState, isLogin: false, cookie: action.cookie};
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

