export function writeResponse(res, code) {
  res.writeHead(code, "application/json");
}
