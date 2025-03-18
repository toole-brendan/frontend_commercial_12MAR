import express, { type Express } from "express";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer, createLogger } from "vite";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";

// This should match the BASE_PATH in client/src/lib/constants.ts
const BASE_PATH = "/commercial";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as true,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  // Use vite middlewares
  app.use(vite.middlewares);
  
  // Add a debug route to check the request handling
  app.use('/debug-path', (req, res) => {
    res.json({
      originalUrl: req.originalUrl,
      baseUrl: req.baseUrl,
      path: req.path,
      query: req.query
    });
  });
  
  // Simple routing for development:
  
  // Redirect root path to base path
  app.get("/", (_req, res) => {
    res.redirect(BASE_PATH);
  });
  
  // Rewrite defense-prefixed API requests to standard API path
  app.use(`${BASE_PATH}/api/*`, (req, res, next) => {
    req.url = req.url.replace(`${BASE_PATH}/api`, '/api');
    next();
  });
  
  // Handle direct access to the base path itself
  app.get(BASE_PATH, async (req, res) => {
    await serveClientApp(req, res, vite);
  });
  
  // Handle direct access to base path with trailing slash
  app.get(`${BASE_PATH}/`, async (req, res) => {
    await serveClientApp(req, res, vite);
  });
  
  // IMPORTANT: This is the main handler for all frontend routes
  app.get(`${BASE_PATH}/*`, async (req, res) => {
    await serveClientApp(req, res, vite);
  });
  
  // This is a catch-all redirect for non-API routes without the commercial prefix
  app.use("*", (req, res, next) => {
    if (!req.originalUrl.startsWith(BASE_PATH) && 
        !req.originalUrl.startsWith("/api") && 
        req.originalUrl !== '/debug-path') {
      return res.redirect(`${BASE_PATH}${req.originalUrl === "/" ? "" : req.originalUrl}`);
    }
    next();
  });

  // Helper function to serve the client app
  async function serveClientApp(req: any, res: any, vite: any) {
    const clientTemplate = path.resolve(
      __dirname,
      "..",
      "client",
      "index.html"
    );

    try {
      // Read the template
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      
      // Add the base tag 
      template = template.replace('<!-- BASE_TAG -->', `<base href="${BASE_PATH}/" />`);
      
      // Let Vite process the template
      const html = await vite.transformIndexHtml(req.originalUrl, template);
      
      // Send the processed HTML
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (err) {
      vite.ssrFixStacktrace(err as Error);
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }
  
  // Redirect root to the base path
  app.get("/", (_req, res) => {
    res.redirect(BASE_PATH);
  });
  
  // Rewrite commercial-prefixed API requests to standard API path
  app.use(`${BASE_PATH}/api/*`, (req, res, next) => {
    req.url = req.url.replace(`${BASE_PATH}/api`, '/api');
    next();
  });
  
  // Serve static files with the base path prefix
  app.use(BASE_PATH, express.static(distPath, {
    setHeaders: (res, path) => {
      if (path.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      } else if (path.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      } else if (path.endsWith('.woff') || path.endsWith('.woff2')) {
        res.setHeader('Content-Type', 'font/woff2');
      }
    }
  }));
  
  // Serve index.html for the base path
  app.get(BASE_PATH, (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
  
  // Serve index.html for the base path with trailing slash
  app.get(`${BASE_PATH}/`, (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
  
  // Serve index.html for all paths under the base path (SPA routing)
  app.get(`${BASE_PATH}/*`, (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
  
  // Redirect non-prefixed paths to the prefixed ones
  app.use("*", (req, res, next) => {
    if (!req.originalUrl.startsWith(BASE_PATH) && 
        !req.originalUrl.startsWith("/api") && 
        req.originalUrl !== '/debug-path') {
      return res.redirect(`${BASE_PATH}${req.originalUrl === "/" ? "" : req.originalUrl}`);
    }
    next();
  });
}
