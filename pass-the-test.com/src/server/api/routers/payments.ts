import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';
import { createPaymentIntent } from '../../../../payment_processor/stripeUtilities';


export const paymentRouter = createTRPCRouter({
  createPaymentIntent: publicProcedure
    .input(z.object({ amount: z.number() }))
    .mutation(async ({ input }) => {
      const { amount } = input;

      try {
        const clientSecret = await createPaymentIntent(amount);
        return { clientSecret };
      } catch (error) {
        console.error('Error creating payment intent:', error);
        throw new Error('Failed to create payment intent');
      }
    }),
});