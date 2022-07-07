import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Register from './register';
import Posts from './posts';
import Login from './login';
import CustomAlert, { showAlert } from './alert';
import Logout from './logout'
import NewPost from './newPost';


const App = () => {
    const [userName, setUserName] = useState('')
    const [alertMessage, setAlertMessage] = useState("Welcome to Stranger's Things, make an account to begin!");
    const [localStorage, setLocalStorage] = useState('');
    const [logText, setLogText] = useState('LOGIN')
    const isMounted = useRef(false);

    useEffect(() => {
     if (isMounted.current) {
         showAlert()
     } else {
         isMounted.current = true;
     }}, [alertMessage]);

    useEffect(() => {
        console.log("token: ", localStorage)    
    }, [localStorage])

    useEffect(()=> {
        console.log("username: ", userName)
    }, [userName])
    
    return (
        <BrowserRouter>
            <div className='header'>
                <div className='title'>
                    <h1>STRANGER'S THINGS</h1>
                </div>
                <nav className='nav'>
                    <Link to="/" className='nav-link' id='nav-home'>HOME</Link>
                    { userName ? <Link to="/messages" className='nav-link' id='nav-messages'>MESSAGES</Link> : null}
                    <Link to={logText === "LOGIN" ? "/login" : "/logout"} className='nav-link' id='nav-login'>{logText}</Link>
                </nav>
            </div>
            <div className='main'>
                <Route exact path="/">
                    <Posts 
                    userName={userName}
                    setAlertMessage={setAlertMessage} />
                </Route>
                <Route exact path="/login">
                    <Login 
                    userName={userName}
                    setUserName={setUserName}
                    setAlertMessage={setAlertMessage}
                    setLocalStorage={setLocalStorage}
                    logText={logText}
                    setLogText={setLogText} />
                </Route>
                <Route exact path="/register">
                    <Register 
                    userName={userName}
                    setUserName={setUserName}
                    setAlertMessage={setAlertMessage}
                    setLocalStorage={setLocalStorage}
                    setLogText={setLogText} />
                </Route>
                <Route exact path="/logout">
                    <Logout 
                    setAlertMessage={setAlertMessage}
                    setUserName={setUserName}
                    setLocalStorage={setLocalStorage}
                    setLogText={setLogText} />
                </Route>
                <Route exact path="/newPost">
                    <NewPost
                    userName={userName}
                    setAlertMessage={setAlertMessage}
                    localStorage={localStorage} />
                </Route>
            </div>
            <div className='alert'>
                <CustomAlert alertMessage={alertMessage} />
            </div>
        </BrowserRouter>
    )
}

const appElement = document.getElementById('app');

ReactDOM.render(<App />, appElement);