const terminal = document.getElementById("terminal");

const fullText = `
ORGANIZACIÓN OMEGA - DIVISIÓN ECLIPSE
CLASIFICACIÓN: XK-9 - ULTRA SECRETO

INFORME DE OPERACIÓN: SOMBRA ETERNA

CLASIFICADO XK-9
ACCESO RESTRINGIDO - AUTORIZACIÓN SOLO PARA AGENTES DE NIVEL ALFA
DESTINATARIO: DIRECTOR EJECUTIVO, DIVISIÓN ECLIPSE
FECHA: 07-07-2025
ESTADO: EN CURSO

Introducción
Registrando hallazgos preliminares de la Operación Sombra Eterna, una misión encubierta diseñada para investigar anomalías cuánticas detectadas en el Sector Nebuloso-7. Este informe detalla encuentros con entidades no identificadas y los métodos empleados para contener las brechas espacio-temporales. Advertencia: los datos aquí contenidos podrían comprometer la estabilidad psíquica del personal no autorizado.

Detalles de la Operación
Comenzando con la infiltración en las ruinas de la Colonia X-14, nuestro equipo de agentes de élite, designados como Unidad Theta-9, reportó la presencia de un obelisco negro emitiendo pulsos de energía desconocida. Los sujetos de prueba expuestos a dichos pulsos mostraron síntomas de desintegración molecular y alucinaciones catastróficas.

- Ubicación: Coordenadas cifradas - Sector Nebuloso-7, Cuadrante 472.
- Recursos Desplegados: 12 agentes, 3 drones de reconocimiento, 1 dispositivo de contención de fase.
- Pérdidas: 4 agentes neutralizados por exposición directa; estado de los cuerpos: irreconocible.

Observaciones
Las grabaciones de los drones revelan siluetas humanas siendo consumidas por haces de luz emitidos desde el obelisco. Los análisis iniciales sugieren una inteligencia alienígena manipulando las anomalías. Se ha autorizado el uso de Protocolo Épsilon-3, incluyendo experimentos con sujetos voluntarios de bajo perfil.

Recomendaciones
Recomendando el despliegue inmediato de la Unidad Psi-7 para neutralizar la amenaza. Sugerimos también la eliminación de testigos y la supresión de datos en la red pública. Todo rastro de esta operación debe ser borrado para preservar la integridad de la Organización O`;

const typingSound = new Audio("typewriter.mp3");
typingSound.volume = 0.2;

const interferenceSound = new Audio("interference.mp3");
interferenceSound.volume = 1.0;

let index = 0;
const typingSpeed = 10;

function typeChar() {
  if (index < fullText.length) {
    terminal.textContent += fullText[index];
    typingSound.currentTime = 0;
    typingSound.play();
    if (fullText.substring(index - 30, index).includes("Todo rastro de esta operación")) {
      setTimeout(() => {
        interferenceSound.play();
        setTimeout(() => {
          window.location.href = "redacted.html";
        }, 2000);
      }, 500);
      return;
    }
    index++;
    setTimeout(typeChar, typingSpeed);
  }
}

window.onload = typeChar;
