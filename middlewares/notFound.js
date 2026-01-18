export function notFound(req, res) {
  res.status(404).json({
    success: false,
    error: `Ruta ${req.method} ${req.url} no encontrada`
  });
}
