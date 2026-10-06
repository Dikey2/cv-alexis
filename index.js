const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 4000;
const archivoHTML = path.join(__dirname, "index.html");

const server = http.createServer((req, res) => {
  const ruta = req.url.split("?")[0];

  if (ruta !== "/" && ruta !== "/index.html") {
    res.writeHead(404, {
      "Content-Type": "text/plain; charset=utf-8",
    });
    res.end("Página no encontrada");
    return;
  }

  fs.readFile(archivoHTML, (error, contenido) => {
    if (error) {
      console.error("Error al leer index.html:", error.message);

      res.writeHead(500, {
        "Content-Type": "text/plain; charset=utf-8",
      });
      res.end("No se pudo cargar el currículum");
      return;
    }

    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
    });
    res.end(contenido);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`CV disponible en el puerto ${PORT}`);
});