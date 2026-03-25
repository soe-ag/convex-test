import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// 取得
export const getTasks = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});

// 作成
export const createTask = mutation({
  args: { text: v.string() },
  handler: async (ctx, { text }) => {
    const trimmedText = text.trim();
    if (!trimmedText) {
      throw new Error("Task text is required");
    }

    await ctx.db.insert("tasks", {
      text: trimmedText,
      isCompleted: false,
    });
  },
});

// 更新
export const toggleTask = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, { id }) => {
    const task = await ctx.db.get(id);
    if (!task) throw new Error("Task not found");
    await ctx.db.patch(id, { isCompleted: !task.isCompleted });
  },
});

// 削除
export const removeTask = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, { id }) => {
    const task = await ctx.db.get(id);
    if (!task) throw new Error("Task not found");
    await ctx.db.delete(id);
  },
});

// "Normally, when you build a full-stack app, you write a backend,
// define REST endpoints or GraphQL resolvers, then call those from the frontend.
// With Convex, that entire layer doesn't exist.

// You write your server functions directly in TypeScript — here in tasks.ts —
// and call them from the frontend using api.tasks.getTasks or api.tasks.toggleTask.
// Convex generates that api object automatically.
// There's no endpoint to define, no fetch URL to type out, no JSON to parse."
