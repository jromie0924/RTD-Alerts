exports.writeResponse = (res, code) => {
  res.writeHead(code, "application/json");
}
