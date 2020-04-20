if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('Registered Service Worker', reg))
      .catch(err => console.warn('Error Encountered in Registering Service Worker', err))
  }