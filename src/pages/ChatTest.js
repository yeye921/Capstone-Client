// import React, { useState, useEffect } from 'react';
// import SockJS from 'sockjs-client';
// import Stomp from 'stompjs';

// const ChatTest = () => {
//   var sock = new SockJS('http://localhost:8080/chat');
//   let client = Stomp.over(sock);
//   // Connect
//   useEffect(() => {
//     client.connect({}, () => {
//       console.log('Connected : ' + auth.user.id);
//       client.send('/app/join', {}, JSON.stringify(auth.user.id));

//       // 일대일 채팅
//       // client.send(`/app/chat/${(메세지받을대상)user.id}`,{},JSON.stringify(res.data))

//       client.subscribe(
//         '/queue/addChatToClient/' + auth.user.id,
//         function (messageDTO) {
//           const messagedto = JSON.parse(messageDTO.body);
//         },
//       );
//     });
//     return () => client.disconnect();
//   }, [client, auth.user.id, dispatch]);
// };
// export default ChatTest;
