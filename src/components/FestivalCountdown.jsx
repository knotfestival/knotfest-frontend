import React, {useEffect, useState} from "react";

function FestivalCountdown() {

    const [countdown, setCountdown] = useState("");

    useEffect(() => {
        const festivalDate = new Date("2025-06-26T16:00:00");
        let interval;

        function updateTimer() {
            const dateDifference = festivalDate - new Date();
            if (dateDifference <= 0) {
                setCountdown("KnotFest has begun");
                clearInterval(interval);
                return;
            }
            const days = Math.floor(dateDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((dateDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((dateDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((dateDifference % (1000 * 60)) / 1000);
            setCountdown(`${days}DAYS, ${hours}HOURS ${minutes}MINUTES ${seconds}SECONDS`);
        }

        interval = setInterval(updateTimer, 1000);
        updateTimer();

        return () => clearInterval(interval);
    }, []);

    return(
        <>
            <div id="countdown" className="countdown-timer"> {countdown} </div>
        </>
    )
}

export default FestivalCountdown;