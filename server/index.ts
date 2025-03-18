import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // This constant should match the one in client/src/lib/constants.ts
  const BASE_PATH = "/commercial";
  
  // Add a fallback route to redirect to BASE_PATH for any unmatched routes
  app.use('*', (req, res, next) => {
    // Only redirect the root path to avoid redirect loops
    if (req.originalUrl === '/' || req.originalUrl === '') {
      return res.redirect(BASE_PATH + '/');
    }
    next();
  });
  
  // Try to find an available port starting from 5000
  const startPort = 5000;
  let currentPort = startPort;
  
  function startServer(port: number) {
    const serverInstance = server.listen({
      port,
      host: "localhost",
    });
    
    serverInstance.on('listening', () => {
      log(`Server running at http://localhost:${port}/commercial/`);
    });
    
    serverInstance.on('error', (err: any) => {
      if (err.code === 'EADDRINUSE') {
        log(`Port ${port} is in use, trying port ${port + 1}`);
        currentPort++;
        startServer(currentPort);
      } else {
        console.error('Server error:', err);
      }
    });
  }
  
  startServer(currentPort);
})();
