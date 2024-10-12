// import React from 'react';
// import { loadStripe } from '@stripe/stripe-js';

// const Cart = ({ cart, setCart, updateMenuAvailability }) => {
//   const totalPrice = Object.entries(cart).reduce((total, [key, item]) => total + item.price * item.quantity, 0);
//   const stripePromise = loadStripe("pk_test_51Q5TmSECmBLhb4FSysL4Cgnja62cGFaHpeLr0Vm8wDwZvN90engweXVNYNhyS5Pi3byB4jpGFhG5180o08FDM6OU00A58PVrhO");

// //   const handleCheckout = async () => {
// //     try {
// //         const items = Object.entries(cart).map(([key, item]) => ({
// //             id: item.id,
// //             name: item.name,
// //             price: item.price,
// //             quantity: item.quantity,
// //         }));

// //         console.log("Items for checkout:", items);

// //         const response = await fetch("http://localhost:4982/create-checkout", {
// //             method: "POST",
// //             headers: { "Content-Type": "application/json" },
// //             body: JSON.stringify({ items }),
// //         });

// //         const session = await response.json();
// //         const stripe = await stripePromise;

// //         const { error } = await stripe.redirectToCheckout({ sessionId: session.id });

// //         if (!error) {
// //             console.log("updating item quantities...");
// //             await updateItemQuantities(items);
// //         } else {
// //             console.error("Stripe checkout error:", error);
// //         }
// //     } catch (error) {
// //         console.error("Checkout error:", error);
// //     }
// // };




//   return (
//     <div>
//       <h1>Cart</h1>
//       <h1>Total: Rs. {totalPrice}</h1>
//       <ul>
//         {Object.keys(cart).length > 0 ? (
//           Object.entries(cart).map(([key, item]) => (
//             <li key={key}>
//               {item.name} - Rs. {item.price} x {item.quantity}
//             </li>
//           ))
//         ) : (
//           <h1>No items to display</h1>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default Cart;
