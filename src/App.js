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
    button: "",
    story: [],
    user: '',
    info: null,
    friend: 0
,}

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

        // 프로필 관련    
        case 'test':
            console.log("test: ", action.story);
            return {...currentState, button:action.button, story:action.story, info:action.info, user:action.user, friend:action.friend};
            
        case 'set_my_info'://내 정보 가져오기
            console.log("set_my_info: ");
            return {...currentState, button:action.button};

        case 'set_my_stories'://내 스토리 가져오기
            console.log("set_my_stories: ", action.story);
            return {...currentState, story:action.story};

        case 'set_my_friend':
            console.log('set_my_friend', action.friend);
            return {...currentState, friend:action.friend};    
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

