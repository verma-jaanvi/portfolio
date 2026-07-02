import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  intent: z.string().trim().max(120).optional(),
  message: z.string().trim().min(1).max(5000),
  userAgent: z.string().max(500).optional(),
  honeypot: z.string().max(0).optional(), // must be empty — bots fill this
});

// Simple in-memory cooldown: one submission per session per 60s
let lastSubmitAt = 0;
const COOLDOWN_MS = 60_000;

export async function submitContact(data: unknown): Promise<{ ok: true }> {
  // Cooldown guard
  const now = Date.now();
  if (now - lastSubmitAt < COOLDOWN_MS) {
    throw new Error("Please wait a moment before sending another message.");
  }

  const parsed = schema.parse(data);

  // Honeypot check — bots fill hidden fields, humans don't
  if (parsed.honeypot) {
    // Silently pretend success so bots don't know they were blocked
    return { ok: true as const };
  }

  const { error } = await supabase.from("contact_submissions").insert({
    name: parsed.name,
    email: parsed.email,
    intent: parsed.intent ?? null,
    message: parsed.message,
    user_agent: parsed.userAgent ?? null,
  });

  if (error) {
    console.error("[contact] insert failed", error);
    throw new Error("Could not save your message. Try again in a moment.");
  }

  lastSubmitAt = Date.now();
  return { ok: true as const };
}
