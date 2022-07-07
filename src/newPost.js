const API_URL = 'https://strangers-things.herokuapp.com/api/2206-FTB-ET-WEB-FT-B'

const NewPost = (props) => {
    const { userName, setAlertMessage, localStorage } = props;
    
    const makePost = async (postData) => {
        const title = document.getElementById("np-title").value;
        const description = document.getElementById("np-description").value;
        const price = document.getElementById("np-price").value;
        const location = document.getElementById("np-location").value;
        const deliver = document.getElementById('np-deliver').value;

        // still working on this!!! need to make another function similar to log in// 

        const newPost = await fetch(`${API_URL}/posts`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage}`
            },
            body: JSON.stringify({
              post: {
                title: title,
                description: description,
                price: price,
                location: location,
                willDeliver: deliver
              }
            })
          }).then(response => response.json())
            .then(result => {
              console.log(result);
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