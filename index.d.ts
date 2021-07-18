import http = require("http");

export default function browsermon({
  server,
  filename,
}: {
  server: http.Server;
  filename?: string;
}): void;
