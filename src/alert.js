const CustomAlert = (props) => {
    const alertMessage = props.alertMessage;
    
    if (alertMessage) {
        return (
            <div id="alert-container">
                {alertMessage}
            </div>
        )
    }
};


export const showAlert = () => {
    const removeAlertTimer = () => {
        const removeAlert = () => {
            const alertContainer = document.getElementById('alert-container')
            alertContainer.style.display = 'none';
        }
    
        setTimeout(removeAlert, 1800)
    }

    const alertContainer = document.getElementById('alert-container');
    alertContainer.style.display = 'block';
    removeAlertTimer();
}

export default CustomAlert;