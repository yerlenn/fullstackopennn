import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const Notification = ({message}) => {
  const [notification] = useContext(NotificationContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (!notification.visible) {
    return null
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
