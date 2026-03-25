import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getTasks = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});

export const toggleTask = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, { id }) => {
    const task = await ctx.db.get(id);
    if (!task) throw new Error("Task not found");
    await ctx.db.patch(id, { isCompleted: !task.isCompleted });
  },
});

// "Normally, when you build a full-stack app, you write a backend,
// define REST endpoints or GraphQL resolvers, then call those from the frontend.
// With Convex, that entire layer doesn't exist.

// You write your server functions directly in TypeScript — here in tasks.ts —
// and call them from the frontend using api.tasks.getTasks or api.tasks.toggleTask.
// Convex generates that api object automatically.
// There's no endpoint to define, no fetch URL to type out, no JSON to parse."
