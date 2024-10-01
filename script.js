const colors = [
    "#FF0018", // Rojo
    "#FFA52C", // Naranja
    "#FFFF41", // Amarillo
    "#008018", // Verde
    "#0000F9", // Azul
    "#86007D", // Púrpura
    "#FF00FF", // Magenta intenso
    "#00FFFF", // Cian fuerte
    "#FF66CC"  // Rosa eléctrico
];

function randomizeEffect() {
    const title = document.getElementById('title');
    
    // Cambia la posición y rotación aleatoria
    const randomX = Math.random() * 20 - 10;
    const randomY = Math.random() * 20 - 10;
    const randomRotation = Math.random() * 360 - 180;
    title.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg)`;
    
    // Efecto de cambio de color ultra rápido
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    title.style.color = randomColor;
    
    // Efecto de zoom
    const randomScale = 1 + Math.random() * 0.2;
    title.style.transform += ` scale(${randomScale})`;
}

// Cambia el efecto cada 100 milisegundos
setInterval(randomizeEffect, 100);
