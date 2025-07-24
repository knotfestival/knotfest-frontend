import {useState} from "react";
import {useNavigate} from "react-router-dom";
import TicketInfo from "../components/TicketInfo.jsx";

function Tickets() {

    const[input, setInput] = useState("");

    const navigate = useNavigate();
    const sendInput = () => {
        navigate("/signup", {state: {email: input}});
        setInput("");
        console.log(input);
        console.log(
            "You have entered: " + input
        )
    }



    return(
        <>
        <h1>Festival Tickets</h1>
            <TicketInfo/>
        <label>Get early-bird festival passes alert! And signup for more exclusive content!</label>
        <input id="email"
               type="email"
               value={input}
               placeholder="Enter your email"
               onChange={e => setInput(e.target.value)}/>
            <button onClick={sendInput}>Send</button>

        </>
    );
}

export default Tickets;