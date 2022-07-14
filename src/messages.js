import { useHistory } from "react-router-dom";

const API_URL = 'https://strangers-things.herokuapp.com/api/2206-FTB-ET-WEB-FT-B'

const Messages = (props) => {
    const { token, userName, setPostID, setPostIndex, setAlertMessage } = props;
    const history = useHistory();

    const fetchPosts = async () => {
        try {
            const posts = await fetch(`${API_URL}/posts`);
            const postsResults = await posts.json();
            return postsResults.data.posts;

        } catch (err) {
            console.error('Unable to fetch posts', err);
        }
    }

    const getMessages = async () => {
        try {
            const messages = await fetch(`${API_URL}/users/me`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },})
            const messagesResults = await messages.json();
            return messagesResults.data.messages;
        } catch (err) {
            console.error('Unable to fetch messages', err);
        }
    }

    const renderMessages = (messageList) => {    
        let inboxContainer = document.getElementById('inbox')
        let sentContainer = document.getElementById('sent')
        let inboxContainerHTML = '';
        let sentContainerHTML = '';
        
        for (let i = 0; i < messageList.length; i++) {
            const message = messageList[i];
            let inboxHTML = ""
            let sentHTML = ""

            if (message.fromUser.username !== userName) {
                inboxHTML += 
                `<div class='single-message'>
                    <div class='sm-header'>
                        <div class='sm-title'>
                            <h2>${message.post.title}</h2>
                        </div>
                        <div class='sm-button'>
                            <button class="sm-view" data-id=${message.post._id}>View Post</button>
                        </div>
                    </div>
                    <div class='sm-content'>
                        <p>${message.content}</p>
                    </div>
                    <div class='sm-author'>
                        <h3>From: ${message.fromUser.username !== userName ? message.fromUser.username : "ME"}</h3>
                    </div>
                </div>`;
            } else {
                sentHTML +=
                `<div class='single-message'>
                    <div class='sm-header'>
                        <div class='sm-title'>
                            <h2>${message.post.title}</h2>
                        </div>
                        <div class='sm-button'>
                            <button class="sm-view" data-id=${message.post._id}>View Post</button>
                        </div>
                    </div>
                    <div class='sm-content'>
                        <p>${message.content}</p>
                    </div>
                    <div class='sm-author'>
                        <h3>From: ${message.fromUser.username !== userName ? message.fromUser.username : "ME"}</h3>
                    </div>
                </div>`;
            }

            inboxContainerHTML += inboxHTML;
            sentContainerHTML += sentHTML;
        }
        inboxContainer.innerHTML = `<h2>INBOX</h2> ${inboxContainerHTML}`;
        sentContainer.innerHTML = `<h2>SENT</h2> ${sentContainerHTML}`;

        let viewMessagePostButton = [...document.getElementsByClassName('sm-view')]
        for (let x = 0; x < viewMessagePostButton.length; x++) {
            const button1 = viewMessagePostButton[x];
            button1.addEventListener('click', () => {
                setPostID(button1.dataset.id);
                fetchPosts().then((result) => {
                    for (let k = 0; k < result.length; k++) {
                        let currentObject = result[k]
                        if (currentObject._id === button1.dataset.id) {
                            setPostIndex(k)
                            history.push('/viewPost')
                        } else {
                            button1.setAttribute("disabled", "")
                            button1.innerHTML = "This post has been deleted"
                            setAlertMessage("This post has been deleted and no longer exists.")
                        }
                    }
                })
            })
        }

    }

    const initialMessages = async () => {
        const messages = await getMessages();
        renderMessages(messages)
    }

    initialMessages();

    return (
        <div id="message-container">
            <div id="inbox"></div>
            <div id="sent"></div>
        </div>
    )
}

export default Messages;