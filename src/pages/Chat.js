import React from 'react';
import Button from '../components/common/Button';

const Chat = () => {

    const onClick = (e) => {
        e.target.disabled = !e.target.disabled
        console.log(e.target.disabled)
    }

    return (
        <>
            <Button onClick={onClick}>
                모집마감
            </Button>
        </>
    )
}

export default Chat;