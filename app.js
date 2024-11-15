// Verifica si el navegador soporta Service Workers y Notificaciones
if ('serviceWorker' in navigator && 'Notification' in window) {
    // Registra el Service Worker
    navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
            console.log('Service Worker registrado:', registration);

            // Solicitar permiso para notificaciones
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    console.log('Permiso para notificaciones concedido.');
                } else {
                    console.log('Permiso para notificaciones denegado.');
                }
            });
        })
        .catch(error => {
            console.error('Error al registrar el Service Worker:', error);
        });
} else {
    alert('Tu navegador no soporta Service Workers o Notificaciones.');
}

// Función para enviar una notificación
function subscribe() {
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(registration => {
            registration.showNotification('¡Hola desde tu PWA!', {
                body: 'Esta es una notificación desde tu dispositivo Android.',
                icon: '/icon.png',
                vibrate: [200, 100, 200], // Vibración en dispositivos compatibles
                tag: 'notificacion-ejemplo', // Identificador único
            });
        });
    } else {
        alert('Por favor, concede permiso para mostrar notificaciones.');
    }
}
