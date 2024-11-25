import { type AppRouter } from "~/server/api/root";
import { createTRPCReact } from "@trpc/react-query";
import type { ReactNode } from "react";

export const api = createTRPCReact<AppRouter>();
export const HydrateClient = ({ children }: { children: ReactNode }) => children;
