import { useEffect } from "react";
import { useHistory } from "react-router-dom";


const Logout = (props) => {
    const { setLocalStorage, setUserName, setAlertMessage, setLogText } = props;
    const history = useHistory();

    useEffect(() => {
        setLocalStorage("");
        setUserName("");
        setLogText("LOGIN")
        history.push('/')
        setAlertMessage("You have logged out.")
    }, [])
}

export default Logout;