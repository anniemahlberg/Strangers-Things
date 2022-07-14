import { useHistory } from "react-router-dom";

const API_URL = 'https://strangers-things.herokuapp.com/api/2206-FTB-ET-WEB-FT-B'

const ViewPost = (props) => {
    const { postIndex, userName, token, postID, setAlertMessage } = props;
    const history = useHistory();

    const fetchThisPost = async () => {
        try {
            const posts = await fetch(`${API_URL}/posts`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application.json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const postsResults = await posts.json();
            return postsResults.data.posts[postIndex];

        } catch (err) {
            console.error('Unable to fetch posts', err);
        }
    }

    const renderPost = (postInfo) => {
        let postDiv = document.getElementById("post-div")
        
        if (!postInfo) {
            postDiv.innerHTML = "No such post exists."
        } else if (userName === postInfo.author.username) {
            postDiv.innerHTML = `
                <div class="single-post-container">
                    <div class="single-post-title">
                        <h2>${postInfo.title}</h2>
                    </div>
                    <div class="single-post-description">
                        <p>${postInfo.description}</p>
                    </div>
                    <div class="single-post-price">
                        <p>Price: ${postInfo.price}</p>
                    </div>
                    <div class="single-post-location">
                        <p>Location: ${postInfo.location}
                    </div>
                    <div class="single-post-author">
                        <p>Seller: ${postInfo.author.username}</p>
                    </div>
                </div>
                <div class="single-post-buttons">
                    <div class="single-post-edit">
                        <button class="edit-post-button">EDIT POST</button>
                        <button class="delete-post-button">DELETE POST</button>
                    </div>
                </div>
                <div class="post-messages-container">
                ${postInfo.messages.map(message =>
                    `<div class='single-message'>
                     <div class='sm-author'>
                         <h3>From: ${message.fromUser.username !== userName ? message.fromUser.username : "ME"}</h3>
                     </div>
                     <div class='sm-content'>
                         <p>${message.content}</p>
                     </div>
                 </div>`)}
                </div>`
        } else {
            postDiv.innerHTML = `
            <div class="single-post-container">
                <div class="single-post-title">
                    <h2>${postInfo.title}</h2>
                </div>
                <div class="single-post-description">
                    <p>${postInfo.description}</p>
                </div>
                <div class="single-post-price">
                    <p>Price: ${postInfo.price}</p>
                </div>
                <div class="single-post-location">
                    <p>Location: ${postInfo.location}
                </div>
                <div class="single-post-author">
                    <p>Seller: ${postInfo.author.username}</p>
                </div>
            </div>
            <div class="single-post-message">
                <h3>Message User About This Post</h3>
                <textarea placeholder="Type Message Here" id="message-input"></textarea>
                <div class="single-post-message-button">
                    <button class="send-message-button">SEND MESSAGE</button>
                </div>
            </div>`
        }

        let deletePostButtons = [...document.getElementsByClassName('delete-post-button')]
        for (let j = 0; j < deletePostButtons.length; j++) {
            const button = deletePostButtons[j];
            button.addEventListener('click', () => {
                deletePost();
                setAlertMessage("Your post has been deleted.")
                history.push('/')
            });
        }

        let editPostButtons = [...document.getElementsByClassName('edit-post-button')]
        for (let j = 0; j < editPostButtons.length; j++) {
            const button = editPostButtons[j];
            button.addEventListener('click', () => {
                editPostForm();
            });
        }

        let messageButtons = [...document.getElementsByClassName('send-message-button')]
        for (let j = 0; j < messageButtons.length; j++) {
            const button = messageButtons[j];
            button.addEventListener('click', () => {
                sendMessage();
            });
        }

        const editPostForm = () => {
            const editPostDiv = document.getElementById("edit-post-div")

            editPostDiv.innerHTML = 
                `<div class='edit-post-form'>
                    <h2>Edit Your Post</h2>
                    <div class='inputs'>
                        <div class='input-group'>
                            <label for="ep-title">Title</label>
                            <input id="ep-title" placeholder="Title" value="${postInfo.title}"></input>
                        </div>
                        <div class='input-group'>
                            <label for="ep-description">Description</label>
                            <input id="ep-description" placeholder="Description" value="${postInfo.description}"></input>
                        </div>
                        <div class='input-group'>
                            <label for="ep-price">Price</label>
                            <input id="ep-price" placeholder="Price" value="${postInfo.price}"></input>
                        </div>
                        <div class='input-group'>
                            <label for="ep-location">Location</label>
                            <input id="ep-location" placeholder="Location" value="${postInfo.location}"></input>
                        </div>
                        <br />
                        <input id="ep-deliver" type="checkbox" ${postInfo.willDeliver ? "checked" : null}></input>
                        <label>Willing To Deliver?</label>
                    </div>
                    <div class='submit-button'>
                        <button class='edit-submit-button'>EDIT POST</button>
                    </div>
                </div>`
            
            let editSubmitButtons = [...document.getElementsByClassName('edit-submit-button')]
            for (let j = 0; j < editSubmitButtons.length; j++) {
                const button = editSubmitButtons[j];
                button.addEventListener('click', () => {
                    editPost();
                    setAlertMessage("Your post has been edited!")
                    history.push('/');
                });
            }
        }
    }

    const showPost = async () => {
        const post = await fetchThisPost()
        renderPost(post);
    }

    showPost();

    const deletePost = async () => {
        await fetch(`${API_URL}/posts/${postID}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        }).then(response => response.json())
        .catch(console.error);
    }

    const editPost = async () => {
        let editTitle = document.getElementById("ep-title").value;
        let editDescription = document.getElementById("ep-description").value;
        let editPrice = document.getElementById("ep-price").value;
        let editLocation = document.getElementById("ep-location").value;
        let editDeliver = document.getElementById("ep-deliver").checked;

        await fetch(`${API_URL}/posts/${postID}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            post: {
            title: editTitle,
            description: editDescription,
            price: editPrice,
            location: editLocation,
            willDeliver: editDeliver
            }
        })
        }).then(response => response.json())
        .catch(console.error);
    }

    const sendMessage = () => {
        const messageInput = document.getElementById("message-input").value;
        
        fetch(`${API_URL}/posts/${postID}/messages`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                message: {
                content: messageInput
                }
            })
            }).then(response => response.json())
            .then(result => {
                history.push('/messages');
                setAlertMessage("Your message has been sent!")
            })
            .catch(console.error);
    }

    return (
        <>
            <div id="post-div"></div>
            <div id="edit-post-div"></div>
        </>
    )
}

export default ViewPost;