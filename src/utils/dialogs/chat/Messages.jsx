import Message from "./Message"

const Messages = ({messages}) => {
  return (
    <>
        {
            messages?.map((message, index) => (
                <Message key={index} message={message}/>
            ))
        }
    </>
  )
}

export default Messages
