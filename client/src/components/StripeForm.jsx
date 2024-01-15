import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Input } from '@chakra-ui/react';

const StripeForm = ({ handleConfirmOrder, handleCancelOrder }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { token, error } = await stripe.createToken(cardElement);

        if (error) {
            setError(error.message);
        } else {
            handleConfirmOrder(token);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input placeholder="Cardholder Name" mb="4" />
            <CardElement options={{ hidePostalCode: true }} />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Button type="button" onClick={handleCancelOrder} mr="2" mt={8}>
                Cancel
            </Button>
            <Button type="submit" disabled={!stripe} mt={8}>
                Confirm Order
            </Button>
        </form>
    );
};

export default StripeForm;
