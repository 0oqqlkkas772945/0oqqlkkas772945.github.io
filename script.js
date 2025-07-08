const terminal = document.getElementById("terminal");

const fullText = `
[HIPERVÍNCULO BLOQUEADO]
CLASIFICACIÓN: XK-9 - ULTRA SECRETO

INFORME DE OPERACIÓN: LA NOCHE MÁS OSCURA

CLASIFICADO XK-9
ACCESO RESTRINGIDO - AUTORIZACIÓN SOLO PARA MTF DE RANGO ALFA
DESTINATARIO: DIVISIÓN [REDACTED]
FECHA: 07-07-2025
ESTADO: EN CURSO

Descripción de la situación
Registrando hallazgos preliminares de la Operación Sombra Eterna, una misión encubierta diseñada para experimentar con anomalías detectadas en [REDACTED]. Este informe detalla encuentros con entidades no identificadas y los métodos empleados para su contención.
Advertencia: los datos aquí contenidos podrían comprometer la estabilidad psíquica del personal no autorizado.

Detalles de la Operación
Comenzó con la infiltración en las ruinas del laboratorio subterráneo. La Unidad Theta-9 reportó la presencia de un obelisco negro ominoso emergente de un sumidero, cuya profundidad no se pudo determinar, emitiendo pulsos de energía desconocida. Los sujetos de prueba expuestos a dichos pulsos mostraron síntomas de [REDACTED].

- Ubicación: 41.595830, 1.825195.
- Recursos Desplegados: 16 agentes, 3 drones de reconocimiento, 1 dispositivo de contención de fase.
- Pérdidas: [REDACTED]; estado de los cuerpos: irreconocible.

Observaciones
Las grabaciones de los drones revelan [REDACTED] desde el obelisco. Los análisis iniciales sugieren que dichas anomalías no ocurren aleatoriamente. Se ha autorizado el uso de Protocolo Épsilon-3, incluyendo experimentos con sujetos voluntarios de bajo perfil.

Recomendaciones
Recomendando el despliegue inmediato de la Unidad Psi-7 para neutralizar la amenaza. Sugerimos también la eliminación de testigos y la supresión de datos en la red pública. Todo rastro de esta operación debe ser borrado para preservar la integridad de la Organización O`;

const typingSound = new Audio("typewriter.mp3");
typingSound.volume = 0.3;

const interferenceSound = new Audio("interference.mp3");
interferenceSound.volume = 1.0;

let index = 0;
const typingSpeed = 2;

// Frase clave exacta a buscar
const triggerPhrase = "Todo rastro de esta operación debe ser borrado para preservar la integridad de la Organización O";

function typeChar() {
  if (index < fullText.length) {
    terminal.textContent += fullText[index];
    typingSound.currentTime = 0;
    typingSound.play();

    // Verifica si ya se imprimió la frase clave
    const currentText = terminal.textContent;
    if (currentText.includes(triggerPhrase)) {
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
