class Marcas {
  constructor(data = {}) {
    this.marca_nombre = data.marca_nombre || '';
    this.marca_descripcion = data.marca_descripcion || '';
    this.marca_imagen = data.marca_imagen || 'default.png';
    this.marca_estado = data.marca_estado || 'AC'
    this.created_at = data.created_at || new Date();;
  }
}

module.exports = Marcas;