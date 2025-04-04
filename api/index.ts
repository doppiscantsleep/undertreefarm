// server.ts
import { Hono } from "jsr:@hono/hono";
import { serveStatic } from "jsr:@hono/hono/serve-static";
import { handle } from "jsr:@hono/hono/vercel";

const app = new Hono();

// Serve static files from /public
app.use(
  "/*",
  serveStatic({
    root: "./public",
    getContent: async (path) => {
      try {
        const file = await Deno.readFile(path);
        return new Response(file);
      } catch {
        return null;
      }
    },
  }),
);

// Fallback route to index.html
app.get("*", (c) =>
  c.html(
    `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Undertree Farm</title>
      <link rel="icon" type="image/png" href="/favicon.png">
      <style>
        body {
          margin: 0;
          font-family: sans-serif;
          background-color: #f3f3f3;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          overflow: hidden;
          position: relative;
        }
        img {
          width: 300px;
          max-width: 80vw;
        }
.bee {
  position: fixed; /* Change from absolute to fixed */
  width: 40px;
  height: 40px;
  background-image: url('/bee.png');
  background-size: contain;
  background-repeat: no-repeat;
  pointer-events: none;
  transition: transform 0.05s linear;
  top: 0;  /* Add initial position */
  left: 0;  /* Add initial position */
}
      </style>
    </head>
    <body>
      <img src="/favicon.png" alt="Undertree Farm logo">
      <div class="bee" id="bee"></div>
<script>
  const bee = document.getElementById('bee');
  document.addEventListener('mousemove', function(e) {
    if (bee) {
      const x = e.pageX - 20;  // Use pageX instead of clientX
      const y = e.pageY - 20;  // Use pageY instead of clientY
      bee.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    }
  });
</script>
    </body>
    </html>`,
  ));

  export default handle(app)
