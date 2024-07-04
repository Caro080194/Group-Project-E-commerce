import { ConfirmBTN } from "./StyledComponents";
import { useState, useContext } from "react";
import { LoggedInUserContext } from "../LoginSignUp/LoggedInUserContext";
import { GuestInfoContext } from "./GuestInfoContext";
import { CartContentContext } from "../../components/Cart/CartContentContext";
import { useNavigate } from "react-router-dom";
import { OrderIdContext } from "./OrderIdContext";

//This page authenticates the user's information before confirming their order
const Confirm = () => {
    const [buttonText, setButtonText] = useState("Place order");
    const { loggedInUser, isAuthenticated } = useContext(LoggedInUserContext);
    const { cart } = useContext(CartContentContext);
    const { guestInfoCheck, guestInfo } = useContext(GuestInfoContext);
    const { updateOrderId } = useContext(OrderIdContext);
    const navigate = useNavigate();

    const placeOrderHandler = async () => {
        setButtonText("Placing your order");

        try {
            let shippingInfo;

            // If user is authenticated, use their information
            if (isAuthenticated) {
                shippingInfo = { ...loggedInUser.user };
            } else {
                shippingInfo = guestInfo;
            }

            // Extract item information from the cart
            const items = cart.map(item => ({
                itemId: item.itemId,
                quantity: item.quantity
            }));

            // Send the order data to the backend
            const response = await fetch("https://e-wear-emporium-bb9ddc8904ce.herokuapp.com/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: shippingInfo.email, shippingInfo, items })
            });

            // Check if the request was successful
            if (response.ok) {
                const orderId = await response.json();
                setButtonText("Order placed");
                navigate("/success");
                updateOrderId(orderId);
            } else {
                setButtonText("Order failed");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            setButtonText("Order failed");
        }
    };

    // Disable button if any required information is missing
    const isDisabled = !isAuthenticated && !guestInfoCheck;

    return (
        <ConfirmBTN disabled={isDisabled} onClick={placeOrderHandler}>{buttonText}</ConfirmBTN>
    );
};

export default Confirm;