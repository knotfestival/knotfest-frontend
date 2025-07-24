import React, { useState, useEffect } from 'react';

function TicketPurchase() {
    const [quantities, setQuantities] = useState({
        day26: 0,
        day27: 0,
        day28: 0,
        full: 0,
        early: 0,
    });
    const [selectedDay, setSelectedDay] = useState('day26');
    const [total, setTotal] = useState(0);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showEarlyBirdErrorMessage, setShowEarlyBirdErrorMessage] = useState(false)

    const prices = {
        day26: 30,
        day27: 30,
        day28: 30,
        full: 80,
        early: 69,
    };
    const isEarlyBirdAvailable = new Date().getMonth() === 5 && new Date().getDate() === 21

    useEffect(() => {
        let newTotal = 0;
        for (const key in prices) {
            newTotal += prices[key] * quantities[key];
        }
        setTotal(newTotal);
    }, [prices, quantities]);

    const updateQuantity = (type, change) => {
        setShowEarlyBirdErrorMessage(false)
        setQuantities((prevQuantities) => {
            const newQuantities = { ...prevQuantities };

            if (type === 'early') {
                if (!isEarlyBirdAvailable) {
                    setShowEarlyBirdErrorMessage(true);
                    return prevQuantities;
                }
                const newQuantity = prevQuantities.early + change;
                if (newQuantity >= 0) {
                    newQuantities.early = newQuantity;
                }
            } else if (type === 'daily') {
                const currentDailyQuantity = newQuantities[selectedDay];
                const newDailyQuantity = currentDailyQuantity + change;
                if (newDailyQuantity >= 0) {
                    newQuantities[selectedDay] = newDailyQuantity;
                }
            } else {
                const newQuantity = prevQuantities[type] + change;
                if (newQuantity >= 0) {
                    newQuantities[type] = newQuantity;
                }
            }
            return newQuantities;
        });
    };

    const getTotalDailyDisplay = () => {
        return quantities.day26 + quantities.day27 + quantities.day28;
    };

    const finalizePurchase = () => {
        const totalQuantity = Object.values(quantities).reduce((a, b) => a + b, 0);
        if (totalQuantity > 0) {
            setShowSuccessMessage(true);
            setShowEarlyBirdErrorMessage(false);
        } else {
            alert('Please select at least one ticket before purchasing.');
        }
    };

    useEffect(() => {
        if (showSuccessMessage) {
            const timer = setTimeout(() => {
                setShowSuccessMessage(false);

                setQuantities({
                    day26: 0,
                    day27: 0,
                    day28: 0,
                    full: 0,
                    early: 0,
                });
                setSelectedDay('day26');

            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [showSuccessMessage]);
    useEffect(() => {
        if (showEarlyBirdErrorMessage) {
            const timer = setTimeout(() => {
                setShowEarlyBirdErrorMessage(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [showEarlyBirdErrorMessage]);

    return (
        <div className="ticket-container">
            <h1>Tickets</h1>

            <div className="tickets">
                <section className="ticket-type">
                    <h2>One day ticket</h2>
                    <h4>30€</h4>
                    <label htmlFor="day-select">Choose a day:</label>
                    <select
                        id="day-select"
                        value={selectedDay}
                        onChange={(e) => setSelectedDay(e.target.value)}
                    >
                        <option value="day26">June 26</option>
                        <option value="day27">June 27</option>
                        <option value="day28">June 28</option>
                    </select>
                    <div className="controls">
                        <br />
                        <button id="minus-daily" onClick={() => updateQuantity('daily', -1)}>
                            –
                        </button>
                        <span id="quantity-daily">{getTotalDailyDisplay()}</span>
                        <button id="plus-daily" onClick={() => updateQuantity('daily', 1)}>
                            +
                        </button>
                    </div>
                </section>

                <section className="ticket-type">
                    <h2>Early Bird Festival Pass</h2>
                    <h4>69€</h4>
                    <p>Get your festival pass at a special price - purchase on June 21st -</p>
                    <div className="controls">
                        <button id="minus-early" onClick={() => updateQuantity('early', -1)}>
                            –
                        </button>
                        <span id="quantity-early">{quantities.early}</span>
                        <button id="plus-early" onClick={() => updateQuantity('early', 1)}>
                            +
                        </button>
                    </div>
                </section>

                <section className="ticket-type">
                    <h2>3 day Festival Pass</h2>
                    <h4>80€</h4>
                    <div className="controls">
                        <button id="minus-full" onClick={() => updateQuantity('full', -1)}>
                            –
                        </button>
                        <span id="quantity-full">{quantities.full}</span>
                        <button id="plus-full" onClick={() => updateQuantity('full', 1)}>
                            +
                        </button>
                    </div>
                </section>

                <h3>
                    Total: <span id="total">{total}€</span>
                </h3>

                <button id="buy-button" className="buy-button" onClick={finalizePurchase}>
                    Buy now
                </button>

                <p id="success-message" className={showSuccessMessage ? '' : 'hidden'}>
                    Your purchase was successful!
                </p>
            </div>
        </div>
    );
}

export default TicketPurchase;