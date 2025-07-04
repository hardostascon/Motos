class User {
  constructor(data = {}) {
    this._id = data.id || null;
    this.name = data.name || '';
    this.email = data.email || '';
    this.password = data.password || '';
    this.perfil = data.perfil || 'PUB';
    this.created_at = data.created_at || new Date();
    this.updated_at = data.updated_at || null;
  }
}

module.exports = User;