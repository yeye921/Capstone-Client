import React from "react";
import IconHeader from "../components/common/IconHeader";
import ChatContainer from "../containers/chat/ChatContainer";
import { useLocation } from "react-router-dom";

const Chat = () => {
	const { state } = useLocation();
	return (
		// backgroundColor: '#9bbbd4',
		<div style={{ display: "flex", flexDirection: "column" }}>
			<IconHeader name={state.title} />
			<ChatContainer state={state} />
		</div>
	);
};

export default Chat;
