import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";
import { connect } from "react-redux";
import { setRead } from '../../store/utils/thunkCreators';


const Messages = (props) => {
  const { messages, otherUser, userId, conversation } = props;
  // only triggers when a new message is rendered on the screen,
  // that is from a different user and hasnt been read before.  
  if(messages.length > 0)
  {
    if(messages[messages.length -1].senderId !== userId && !messages[messages.length -1].read)
    {
      // probably a little messy to call the same dispatch twice.
      props.setRead(conversation,otherUser.id);
    }
  }
    return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} otherUser={otherUser} lastread={conversation.lastread} id={message.id}/>
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser}/>
        );
      })}
    </Box>
  );
};


const mapDispatchToProps = (dispatch) => {
  return {
    setRead : (conversation,userId) =>{
      dispatch(setRead(conversation,userId))
    }
  };
};

export default connect(null, mapDispatchToProps)(Messages);

//export default Messages;
