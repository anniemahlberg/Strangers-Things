import { useHistory } from "react-router-dom";

const API_URL = 'https://strangers-things.herokuapp.com/api/2206-FTB-ET-WEB-FT-B'

const Register = (props) => {
    const { setUserName, setAlertMessage, setToken, setLogText } = props;
    const history = useHistory();
    
    const postUser = async (userData) => {
        const newUser = await fetch(`${API_URL}/users/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: userData.username,
                    password: userData.password
                }
            })
        }).then(response => response.json())
        .then(result => {
            console.log(result);
            if (!result.error) {
                setAlertMessage(result.data.message);
                setToken(result.data.token);
                setUserName(userData.username);
                setLogText("LOGOUT")
                return history.push('/');
            } else {
                setAlertMessage(result.error.message);
            }
        })
        .catch(console.error)
    }

    const submitRegistration = async (event) => {
        const usernameInput = document.getElementById('register-username').value;
        const password1Input = document.getElementById('register-password1').value;
        const password2Input = document.getElementById('register-password2').value;
        let userData = {};
        event.preventDefault();
        
        if (usernameInput === "" || password1Input === "" || password2Input === "") {
            setAlertMessage("Make sure to fill out each input.");
        } else if (usernameInput.length < 6 || password1Input.length < 6 || password2Input < 6) {
            setAlertMessage("Username and password must be at least 6 characters long.")
        } else if (password1Input === password2Input) {
            userData = {
                username: usernameInput,
                password: password1Input
            };
            await postUser(userData);
        } else {
            setAlertMessage("The passwords you entered do not match, try again!")
        } 
    }
    
    return (
        <div className="register">
            <h1>REGISTER</h1>
            <div id="form-container">
                <form id='register-form'>
                    <div className="inputs">
                        <label>Username:</label>
                        <input id='register-username' type='text' placeholder="Create a Username"></input>
                        <br />
                        <label>Password:</label>
                        <input id='register-password1' type='password' placeholder="Create a Password"></input>
                        <br />
                        <label>Confirm Password:</label>
                        <input id='register-password2' type='password' placeholder="Confirm Password"></input>
                        <br />
                    </div>
                    <div className="submit-button">
                        <button type="submit" onClick={submitRegistration}>SUBMIT</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;