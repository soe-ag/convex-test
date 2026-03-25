import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
  }),
});

// "The schema in schema.ts defines the shape of our data — text is a string, isCompleted is
//  a boolean. These aren't just TypeScript types that disappear at runtime. Convex validates
//  them on every read and write on the server.

// That means when I destructure { _id, text, isCompleted } here in the component,
//  TypeScript already knows the exact types — because they flow through from the schema.
//  If I tried to access a field that doesn't exist, it's a type error.
//  The database and the frontend are always in sync, by design."
