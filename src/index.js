import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Register from './register';
import Posts from './posts';
import Login from './login';
import CustomAlert, { showAlert } from './alert';
import Logout from './logout'
import NewPost from './newPost';
import ViewPost from './viewPost';
import Messages from './messages';

const App = () => {
    const [userName, setUserName] = useState('')
    const [alertMessage, setAlertMessage] = useState('');
    const [token, setToken] = useState('');
    const [logText, setLogText] = useState('LOGIN')
    const isMounted = useRef(false);
    const [postIndex, setPostIndex] = useState('');
    const [postID, setPostID] = useState('');

    useEffect(() => {
     if (isMounted.current) {
         showAlert()
     } else {
         isMounted.current = true;
     }}, [alertMessage]);
    
    return (
        <Router>
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
            <div className='main' id="html">
                <Route exact path="/">
                    <Posts
                        setPostIndex={setPostIndex}
                        userName={userName}
                        setAlertMessage={setAlertMessage}
                        setPostID={setPostID} />
                </Route>
                <Route exact path="/login">
                    <Login 
                        setUserName={setUserName}
                        setAlertMessage={setAlertMessage}
                        setToken={setToken}
                        setLogText={setLogText} />
                </Route>
                <Route exact path="/register">
                    <Register 
                        setUserName={setUserName}
                        setAlertMessage={setAlertMessage}
                        setToken={setToken}
                        setLogText={setLogText} />
                </Route>
                <Route exact path="/logout">
                    <Logout 
                        setAlertMessage={setAlertMessage}
                        setUserName={setUserName}
                        setToken={setToken}
                        setLogText={setLogText} />
                </Route>
                <Route exact path="/newPost">
                    <NewPost
                        setAlertMessage={setAlertMessage}
                        token={token} />
                </Route>
                <Route exact path="/viewPost">
                    <ViewPost 
                        postIndex={postIndex}
                        postID={postID}
                        userName={userName} 
                        token={token}
                        setAlertMessage={setAlertMessage} />
                </Route>
                <Route exact path="/messages">
                    <Messages
                        token={token}
                        userName={userName}
                        setPostID={setPostID}
                        setPostIndex={setPostIndex}
                        setAlertMessage={setAlertMessage} />
                </Route>
            </div>
            <div className='alert'>
                <CustomAlert alertMessage={alertMessage} />
            </div>
        </Router>
    )
}

const appElement = document.getElementById('app');

ReactDOM.render(<App />, appElement);