import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';

// Configuration Stripe
const stripePromise = loadStripe('votre_clé_publique_stripe');

// Montants prédéfinis
const predefinedAmounts = [15, 30, 50, 100];

// Composant pour le formulaire de carte Stripe
const StripeDonation = ({ amount, frequency }) => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleDonation = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    try {
      // Créer un paiement via Stripe
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (error) {
        console.error(error);
        return;
      }

      // Envoyer le paiement au backend
      const response = await axios.post('/create-payment-intent', {
        amount: amount * 100, // Convertir en cents
        paymentMethodId: paymentMethod.id,
        frequency: frequency,
      });

      const { clientSecret } = response.data;

      // Confirmer le paiement
      const { error: confirmError } = await stripe.confirmCardPayment(clientSecret);

      if (confirmError) {
        console.error(confirmError);
      } else {
        alert('Paiement réussi ! Merci pour votre don.');
      }
    } catch (error) {
      console.error('Erreur lors du paiement:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleDonation}>
      <div>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      <button type="submit" disabled={loading || !stripe}>
        {loading ? 'Chargement...' : `Payer ${amount} € avec Stripe`}
      </button>
    </form>
  );
};

// Composant pour PayPal
const PayPalDonation = ({ amount, frequency }) => {
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount.toString(),
            currency_code: 'EUR',
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      alert('Paiement réussi ! Merci pour votre don.');
      console.log('Détails du paiement:', details);
    });
  };

  return (
    <PayPalButtons
      createOrder={createOrder}
      onApprove={onApprove}
      style={{ layout: 'horizontal' }}
    />
  );
};


// Composant pour Lydia
const LydiaDonation = ({ amount, frequency }) => {
  const handleLydiaDonation = async () => {
    try {
      const response = await axios.post('/create-lydia-payment', {
        amount: amount,
        frequency: frequency,
      });

      window.location.href = response.data.paymentUrl;
    } catch (error) {
      console.error('Erreur lors de la création du paiement Lydia:', error);
    }
  };

  return (
    <button onClick={handleLydiaDonation} disabled={!amount}>
      Payer avec Lydia
    </button>
  );
};

// Composant principal
const Support = () => {
  const [amount, setAmount] = useState(predefinedAmounts[0]);
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState('once'); // 'once' ou 'monthly'

  const handleAmountChange = (selectedAmount) => {
    setAmount(selectedAmount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    setCustomAmount(value);
    if (value) {
      setAmount(parseFloat(value));
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h1 style={{ textAlign: 'center' }}>Faire un don</h1>

      <div style={{ marginBottom: '20px' }}>
        <h2>Montant du don</h2>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          {predefinedAmounts.map((amt) => (
            <button
              key={amt}
              onClick={() => handleAmountChange(amt)}
              style={{
                padding: '10px 20px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                backgroundColor: amount === amt && !customAmount ? '#007bff' : '#fff',
                color: amount === amt && !customAmount ? '#fff' : '#000',
                cursor: 'pointer',
              }}
            >
              {amt} €
            </button>
          ))}
        </div>
        <div>
          <input
            type="number"
            placeholder="Montant personnalisé"
            value={customAmount}
            onChange={handleCustomAmountChange}
            style={{ padding: '10px', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Fréquence du don</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setFrequency('once')}
            style={{
              padding: '10px 20px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: frequency === 'once' ? '#007bff' : '#fff',
              color: frequency === 'once' ? '#fff' : '#000',
              cursor: 'pointer',
            }}
          >
            Don unique
          </button>
          <button
            onClick={() => setFrequency('monthly')}
            style={{
              padding: '10px 20px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: frequency === 'monthly' ? '#007bff' : '#fff',
              color: frequency === 'monthly' ? '#fff' : '#000',
              cursor: 'pointer',
            }}
          >
            Don mensuel
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Paiement</h2>
        <Elements stripe={stripePromise}>
          <StripeDonation amount={amount} frequency={frequency} />
        </Elements>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <PayPalScriptProvider options={{ 'client-id': 'votre_clé_client_paypal' }}>
          <PayPalDonation amount={amount} frequency={frequency} />
        </PayPalScriptProvider>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <LydiaDonation amount={amount} frequency={frequency} />
      </div>
    </div>
  );
};

export default Support;