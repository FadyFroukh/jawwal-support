import styles from '../../../Styles/utils.module.css'
const Message = ({message}) => {
  return (
    <div className={`${styles.flex_col}`} style={message.sentBy !== message.userId ? {alignItems:"flex-end"} : {justifyContent:"flex-start"}}>
        <p>{message.text}</p>
        <p>
            <small>
                {new Date(message.timestamp).toLocaleString()}
            </small>
        </p>
    </div>
  )
}

export default Message
