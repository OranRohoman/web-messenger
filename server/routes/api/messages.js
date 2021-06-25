const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");
const { Op } = require("sequelize");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;
    

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      let convPK = await Conversation.findByPk(conversationId);
      if(convPK.dataValues.user1Id == recipientId && convPK.dataValues.user2Id ==  senderId
        || convPK.dataValues.user1Id == senderId && convPK.dataValues.user2Id == recipientId ){
          
          const message = await Message.create({ senderId, text, conversationId, read:false});
          return res.json({ message, sender });
      }
      return res.sendStatus(401);
      
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
      read:false,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

router.put("/read", async (req, res, next) => {
  try{
    const { conversation,userId } = req.body;
    if (!req.user) {
      return res.sendStatus(401);
    }    
 
    const conv = await Conversation.findOne({
      where:{
        [Op.or]: {
          user1Id: req.user.id,
          user2Id: req.user.id,
        },
      }
    });
    if(conv !== null)
    {
      await Message.update({read:true},{
        where:{
          conversationId:conversation.id,
          senderId:userId,
  
        }
      });
    }
    res.json(200);

  }catch (error) {
    next(error);
  }
  
});

module.exports = router;
