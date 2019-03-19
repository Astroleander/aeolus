module.exports = {
  flask: {
    path: 'http://localhost',
    port: 5000,
    url: function(url) {
      return this.path +':'+ this.port + '/' + (url || '')
    }
  },
  django: {
    path: 'http://localhost',
    port: 8000,
    url: function(url) {
      return this.path + ':' + this.port + '/' + (url || '')
    }
  }
}