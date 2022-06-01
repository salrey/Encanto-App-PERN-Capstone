import { CometChat } from '@cometchat-pro/chat';
import React from 'react'
import {useParams} from "react-router-dom";
import {useState, useEffect } from 'react';
import Footer from "../Components/Footer";
// import "../Styles/EachConversation.css"

// Import MUI components
import { Box, Container, Typography } from "@mui/material";
import AppBar from '@mui/material/AppBar';
// import { TextField} from "@mui/material";
// import IcecreamOutlinedIcon from '@mui/icons-material/IcecreamOutlined';
import IcecreamIcon from '@mui/icons-material/Icecream';
import IconButton from '@mui/material/IconButton';


// Import images from assets
import Avatar from '../Assets/avatar2.jpg';

const EachConversation = ({currentUser}) => {

const { theOtherPerson_id } = useParams();
const [text, setText] = useState("");
const [sent, setSent] = useState([]);
const [received, setReceived] = useState([]);
const [convoHistory, setConvoHistory] = useState([]);

console.log("are we getting the id from URL? :",  theOtherPerson_id)

let receiverID = theOtherPerson_id.toString();
const handleSubmit = (event) => {

    event.preventDefault();

    let messageText = text;
    let receiverType = CometChat.RECEIVER_TYPE.USER;
    let textMessage = new CometChat.TextMessage(receiverID, messageText, receiverType);


CometChat.sendMessage(textMessage).then(
message => {
    console.log("are you working conv?: ", sent, "What are you message: ", message)
    setSent([...sent, message.data.text])
    console.log("Message sent successfully:", message);
    }, error => {
    console.log("Message sending failed with error:", error);
    }
)
    setText("");
}

const receivedMessage = () => {
let listenerID = theOtherPerson_id.toString();

CometChat.addMessageListener(
    listenerID,
    new CometChat.MessageListener({
        onTextMessageReceived: textMessage => {
            setReceived([...received,textMessage.data.text ])
            console.log(received)
            console.log("Text message received successfully", textMessage);
        },
        onMediaMessageReceived: mediaMessage => {
            console.log("Media message received successfully", mediaMessage);
        },
        onCustomMessageReceived: customMessage => {
            console.log("Custom message received successfully", customMessage);
        }
    })
)
}; receivedMessage()
    console.log("text: ", text)
    console.log("conversation  : ", sent)


    useEffect(() => {
        const fetchData = async () => {
            try {
                let UID = theOtherPerson_id.toString();
                let limit = 30;
                let messagesRequest = new CometChat.MessagesRequestBuilder()
                                                                .setUID(UID)
                                                                .setLimit(limit)
                                                                .build();
                messagesRequest.fetchPrevious().then(
                messages => {
                    console.log("Message list fetched:", messages);

                    setConvoHistory(messages)
                }, error => {
                    console.log("Message fetching failed with error:", error);
                }
                );
                
            }catch(error) {
                console.log(error)
            }
        };
        fetchData()
    }, [theOtherPerson_id])


console.log("ConvoHistory: ", convoHistory)

    return (
    <article>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{backgroundColor:"#9C7755", padding:2}}>
                <Box sx={{display:"flex", justifyContent:"center"}}>
                    <img src={Avatar} alt="avatar" style={{height:"6vh", width:"6vh", borderRadius:"50px"}}/>
                </Box>
            </AppBar>
      </Box>
        <Container maxWidth="xs" sx={{backgroundColor:"black", height:"844px"}}>
            <Box sx={{position:"fixed", top:'auto', bottom: 70,}}>
            <Box>  
                <div style={{overflow:"scroll", color: "white"}} >
                    {convoHistory.map((convo, i) => (<p key={i}>{convo.data.text}</p>))}
                </div>
                <div className='sent'>{sent.map((send, i) => (<p style={{fontSize: "25px", color: "white", textAlign:"right",}}key={send + i}>
                    You said: {send}</p>))}
                </div>
                <div className='received'>{received.map((rec, i) => (<p style={{fontSize: "25px", color: "white", textAlign:"left",}} key={rec + i}>
                    Friend said: {rec}</p>))}
                </div>
            </Box>
        <form onSubmit={handleSubmit}>
                <input
                    label='Text'
                    id="text"
                    name="text"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    placeholder="Say something..."
                    type="text"
                    style={{
                        border:"0.2px solid grey", 
                        backgroundColor:"transparent", 
                        borderRadius:"50px",
                        height:"4vh",
                        width:"35vh",
                        textAlign:"center",
                        color:"white"
                    }}
                />
                <button type='submit' style={{backgroundColor:"transparent", border:"none"}}> 
                <IconButton aria-label="chat-icon">
                <IcecreamIcon fontSize="large" sx={{color:"white"}}/>
                </IconButton>
                </button>
            </form>
            </Box>
        </Container>
       <Footer />
    </article>
    )
}

export default EachConversation