import { useHistory } from "react-router-dom";

const API_URL = 'https://strangers-things.herokuapp.com/api/2206-FTB-ET-WEB-FT-B'

const NewPost = (props) => {
    const { setAlertMessage, token } = props;
    const history = useHistory();
    
    const makePost = async (event) => {
        const title = document.getElementById("np-title").value;
        const description = document.getElementById("np-description").value;
        const price = document.getElementById("np-price").value;
        const location = document.getElementById("np-location").value;
        const deliver = document.getElementById('np-deliver').checked;
        event.preventDefault()
        
        let userPost = {
          title,
          description,
          price,
          location,
          willDeliver: deliver
        }

        console.log(userPost)

        await getUserInfo(userPost)
    
    }

    const getUserInfo = async (userPost) => {
      if (!userPost.location) {
        userPost.location = "[On Request]"
      }

      const newPost = await fetch(`${API_URL}/posts`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            post: {
              title: userPost.title,
              description: userPost.description,
              price: userPost.price,
              location: userPost.location,
              willDeliver: userPost.willDeliver
            }
          })
        }).then(response => response.json())
          .then(result => {
            console.log(result);
            if (!result.error) {
              setAlertMessage("Your post has been added!")
              history.push('/')
            } else {
              setAlertMessage("There was an error adding your post.")
            }
          })
          .catch(console.error);
  }


    return (
        <div className="new-post">
            <h2>Create New Post</h2>
                <form>
                    <div className="inputs">
                        <input id="np-title" placeholder="Title * " required></input>
                        <br />
                        <input id="np-description" placeholder="Description * " required></input>
                        <br />
                        <input id="np-price" placeholder="Price * " required></input>
                        <br />
                        <input id="np-location" placeholder="Location"></input>
                        <br />
                        <input id="np-deliver" type='checkbox'></input>
                        <label>Willing To Deliver?</label>
                        <br />
                    </div>
                    <div className="submit-button">
                        <button type='submit' onClick={makePost}>CREATE</button>
                    </div>

                </form>
        </div>
    )
}

export default NewPost