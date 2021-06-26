export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // this is a messy temporary fix for a problem that will be solved in ticket 4.
  const user_id =  localStorage.getItem("user");

  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
      
    };
    newConvo.lastTime = message.createdAt;
    newConvo.latestMessageText = message.text;
    newConvo.lastread = "";
    newConvo.totalUnread = 1;
    // resort the conversations
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      convoCopy.messages.push(message);
      convoCopy.latestMessageText = message.text;
      convoCopy.lastTime = message.createdAt;
      if(!convo.active )
      {
        convoCopy.totalUnread ++;
      }
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};
  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });
  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });
  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const newConvo = { ...convo };
      newConvo.id = message.conversationId;
      newConvo.messages.push(message);
      newConvo.latestMessageText = message.text;
      newConvo.lastread = ""
      newConvo.active = true;
      newConvo.totalUnread =0;
      return newConvo;
    } else {
      convo.active = false;
      return convo;
    }
  });
};

export const updateRead = (state, conversation, userId) => {
  return state.map((convo) => {
    if(convo.id === conversation.id) {
      const newConvo = { ...convo}
      newConvo.active = true;
      const messages = newConvo.messages.map((message) => {
        if(message.senderId === userId) {
          const new_message = {...message, read:true}; 
          return new_message;
        }
        else{return message;}
      });
      newConvo.messages = messages;
      newConvo.totalUnread = 0;
      return newConvo;
    }
    else{
      convo.active = false;
      return convo;
    }
  });
};

export const foreignRead = (state, conversation) => {
  return state.map((convo) => {
    if(convo.id === conversation.conversation.id) {
      const newConvo = { ...convo, messages:conversation.messages};
      newConvo.messages.forEach(message =>
      {
        if(message.senderId !== newConvo.otherUser.id && message.read){

          newConvo.lastread = message;
        }

      });
      return newConvo;
    }
    else{return convo;}
})};
