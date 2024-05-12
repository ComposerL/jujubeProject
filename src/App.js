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
    modal: false,
    s_replys: [],
    button: true,
    story: [],
    replyFlag: true,
}

const reducer = (currentState = initial_state , action) => {
    console.log("App reducer()");

    switch(action.type){
        //story 관련
        case'story_btn_click': //reply_modal_open
            return {...currentState, 
                modal: action.modal , //modal: true
                s_no: action.s_no, //스토리 번호
            }; 

        case 'reply_modal_close': //reply_modal_close
            return {...currentState, 
                modal: action.modal, //modal: false
            }; 

        //session 관련
        case 'session_out': //서버 세션토큰 만료
            return {...currentState, 
                sessionID: sessionStorage.getItem('sessionID'), //session 토큰 체크
            };

        case 'session_enter': //서버 세션토큰 유지
            console.log("session_enter loginedMember: ", action.loginedMember);
            return {...currentState, 
                sessionID: sessionStorage.getItem('sessionID'), //session 토큰 체크
                loginedMember: action.loginedMember, //loginedMember 로그인한 멤버 ID
            };

        case 'sign_in_success':
            return {...currentState, 
                sessionID: sessionStorage.getItem('sessionID'), //session 토큰 체크
                loginedMember: action.loginedMember //loginedMember 로그인한 멤버 ID
            };  
        case 'set_my_stories':
                return {...currentState, button:action.button, story:action.story}  
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

