import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { stripe } from "../../stripe/index";

export const postRouter = createTRPCRouter({
  getAllProducts: publicProcedure.query(({ ctx }) => {
    return ctx.db.product.findMany();
  }),

  getProductById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.product.findFirst({
        where: { id: input.id },
      });
    }),

  createCheckoutSession: publicProcedure
    .input(z.object({
      products: z.array(z.object({
        id: z.string(),
        quantity: z.number(),
        price: z.number(),
        title: z.string()
      }))
    }))
    .mutation(async ({ ctx, input }) => {
      const baseUrl = process.env.NEXTAUTH_URL ?? 'http://localhost:3000';
      
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: input.products.map(item => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.title,
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        })),
        mode: "payment",
        success_url: `${baseUrl}/payment/success`,
        cancel_url: `${baseUrl}/cart`,
      });
      return { url: session.url };
    }),

  recordTransaction: publicProcedure
    .input(z.object({
      paymentIntentId: z.string(),
      products: z.array(z.object({
        productId: z.string(),
        quantity: z.number()
      }))
    }))
    .mutation(async ({ ctx, input }) => {
      const paymentIntent = await stripe.paymentIntents.retrieve(input.paymentIntentId);
      
      if (paymentIntent.status !== 'succeeded') {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Payment has not been completed'
        });
      }

      // Record transaction in database
      await ctx.db.transactions.create({
        data: {
          transaction_id: input.paymentIntentId,
          amount: paymentIntent.amount,
          transaction_date: new Date().toISOString(),
          product_id: input.products[0]?.productId ?? 'unknown',
          user_id: ctx.session?.user?.id ?? 'anonymous'
        }
      });

      return { success: true };
    }),
});
