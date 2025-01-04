const Notification = ({message}) => {
    if (message === null) {       
        return null
    }

    return (
        <div data-testid='noti' className="notification">
            {message}
        </div>
    )
}

export default Notification;