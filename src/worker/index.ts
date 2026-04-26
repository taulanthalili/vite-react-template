import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono<{ Bindings: Env }>();

app.use("/api/*", cors());

// Initialize DB table on first use
async function ensureTable(db: D1Database) {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS subscribers (
      id        INTEGER PRIMARY KEY AUTOINCREMENT,
      email     TEXT    NOT NULL UNIQUE,
      name      TEXT,
      subscribed_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);
}

app.post("/api/subscribe", async (c) => {
  const { email, name } = await c.req.json<{ email: string; name?: string }>();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return c.json({ success: false, message: "Please enter a valid email address." }, 400);
  }

  const db = c.env.DB;
  await ensureTable(db);

  try {
    await db
      .prepare("INSERT INTO subscribers (email, name) VALUES (?, ?)")
      .bind(email.toLowerCase().trim(), name?.trim() || null)
      .run();

    return c.json({ success: true, message: "You're subscribed! Welcome aboard 🎉" });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes("UNIQUE constraint failed")) {
      return c.json({ success: false, message: "This email is already subscribed." }, 409);
    }
    console.error(err);
    return c.json({ success: false, message: "Something went wrong. Please try again." }, 500);
  }
});

// Simple health check
app.get("/api/", (c) => c.json({ status: "ok" }));

export default app;
