import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from "@react-native-firebase/app";
// import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

function Chat({ route, }) {
  console.log('name:', route.params);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // firebase
    auth()
      .signInAnonymously()
      .then(() => {
        //get messages from db
        //order them by date of creation
        firebase
          .database()
          .ref("chats")
          .orderByChild("createdAt")
          .on("child_added", snap => {
            //child_added listens to the new updates at the chats node
            // console.log(snap);
            let data = snap.val();
            console.log('snap', snap);

            this.setState(prev => ({
              isAuthenticated: true,
              messages: GiftedChat.append(prev.messages, data)
            }));
          });
      })
      .catch(err => {
        console.log("err:" + JSON.stringify(err))
      });

    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 3,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 4,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {

    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))

    firebase
      .database()
      .ref("/chats")
      .push(messages[0])
      .catch(err => {
        alert("failed to send message:" + err);
      });
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: route.params.id,
        name: route.params.name,
        avatar: 'https://placeimg.com/140/140/any',
      }}
    />
  )
}

export default Chat;