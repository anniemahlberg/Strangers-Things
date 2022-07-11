import { useEffect } from "react";
import { useHistory } from "react-router-dom";


const Logout = (props) => {
    const { setToken, setUserName, setAlertMessage, setLogText } = props;
    const history = useHistory();

    useEffect(() => {
        setToken("");
        setUserName("");
        setLogText("LOGIN")
        history.push('/')
        setAlertMessage("You have logged out.")
    }, [])
}

export default Logout;