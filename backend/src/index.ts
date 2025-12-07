import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import gradeRouter from "./routes/grade";
import quizRouter from "./routes/quiz";

const app = new Hono();

app.use("*", logger());
app.use(
  "/*",
  cors({
    origin: ["http://localhost:3000", "https://*.vercel.app"],
    allowMethods: ["GET", "POST"],
    allowHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.get("/", (c) => {
  return c.json({
    message: "Enrolla Quiz API",
    status: "healthy",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    endpoints: {
      quiz: "/api/quiz",
      grade: "/api/grade",
    },
  });
});

app.route("/api/quiz", quizRouter);
app.route("/api/grade", gradeRouter);

app.notFound((c) => {
  return c.text("404 Not Found", 404);
});

app.onError((err, c) => {
  return c.text(err.message, 500);
});

export default app;
