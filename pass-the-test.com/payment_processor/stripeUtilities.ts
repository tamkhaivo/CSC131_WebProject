import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-11-20.acacia' });

/**
 * Create a payment intent
 * @param amount - The amount to be charged (in the smallest currency unit)
 * @param currency - The currency for the payment (e.g., 'usd')
 * @returns The client secret for confirming the payment
 */
export const createPaymentIntent = async (amount: number, currency: string = 'usd') => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ['card'],
    });
    return paymentIntent.client_secret;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw new Error('Unable to create payment intent');
  }
};

/**
 * Create a customer in Stripe
 * @param email - Customer's email address
 * @returns The created customer object
 */
export const createCustomer = async (email: string) => {
  try {
    const customer = await stripe.customers.create({ email });
    return customer;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw new Error('Unable to create customer');
  }
};