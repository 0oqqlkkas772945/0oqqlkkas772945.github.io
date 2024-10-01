const colors = [
    "#FF0018", // Rojo
    "#FFA52C", // Naranja
    "#FFFF41", // Amarillo
    "#008018", // Verde
    "#0000F9", // Azul
    "#86007D"  // Púrpura
];

let colorIndex = 0;

function changeColor() {
    const title = document.getElementById('title');
    title.style.color = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
}

setInterval(changeColor, 1000); // Cambia el color cada segundo
