import { useEffect } from "react";

const API_URL = 'https://strangers-things.herokuapp.com/api/2206-FTB-ET-WEB-FT-B'

const ViewPost = (props) => {
    const { postID, token, postIndex } = props;

    const fetchThisPost = async () => {
        fetch(`${API_URL}/posts`, {
            method: "GET",
          }).then(response => response.json())
            .then(result => {
                console.log(result.data.posts[postIndex])
                const postResult = result.data.posts[postIndex]
                return postResult
            })
            .catch(console.error);
    }

    return (
        <div id="post-container"></div>
    )
}

export default ViewPost;