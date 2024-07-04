import styled from "styled-components";
import { useEffect, useState } from "react";
import { CartContentContext } from "./Cart/CartContentContext";
import { useContext } from "react";


// Adds items to the Cart
const AddToCart = ({ item, inStock, setInStock }) => {
  const { addToCart, cart } = useContext(CartContentContext);
  const [buttonText, setButtonText] = useState("Add to cart");

  // useEffect hook for updating the stock when the inStock prop changes
  useEffect(() => {
    setInStock(inStock);
    return () => { };
  }, [inStock, setInStock]);

  // Handler for click event on the add to cart button
  const handleClick = async () => {
    setButtonText("Adding item...");

    try {
      const response = await fetch(`https://e-wear-emporium-bb9ddc8904ce.herokuapp.com/products/${item._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      // If response is successful, update the cart, else display an error
      if (response.ok) {
        addToCart(data);
        console.log("Item added to cart:", cart);
        setButtonText("Added to cart!");

        setTimeout(() => {
          setButtonText("Add to cart");
        }, 5000);
      } else {
        setButtonText("Error");
        console.error("Failed to fetch item:", data.message);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  // Renders the button with appropriate text and style.
  return (
    <AddBTN
      onClick={handleClick}
      className={inStock ? "addToCart" : "addToCartDisabled"}
      disabled={!inStock}
    >
      {buttonText}
    </AddBTN>
  );
};

export default AddToCart;

const AddBTN = styled.button`
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  width: 15rem;
  font-weight: 400;
  margin: 0.5rem auto 2rem 2rem;

  @media (max-width: 500px) {
    margin: 0.5rem auto 3rem auto;
    position: static;
    width: 10rem;
  }

  @media (min-width: 500px) and (max-width: 800px) {
    margin: 0 auto 2.5rem auto;
  }
`;
