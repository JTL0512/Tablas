const SIMCE_PREGUNTAS = [
  {
    id: 1,
    texto: 'En la tienda de la Base Espacial, cada tanque de oxígeno para trajes espaciales cuesta $3.000 créditos. Si la capitana Sofía adquiere 7 tanques para su tripulación, ¿cuánto dinero espacial necesita en total?',
    alternativas: ['$18.000', '$21.000', '$24.000', '$28.000'],
    correcta: 1,
    explicacion: '7 tanques × $3.000 = $21.000'
  },
  {
    id: 2,
    texto: 'En el centro de mando de la estación, los ingenieros organizaron 5 paneles de control con 8 pantallas táctiles en cada panel. ¿Cuántas pantallas de navegación hay en total?',
    alternativas: ['35 pantallas', '40 pantallas', '45 pantallas', '48 pantallas'],
    correcta: 1,
    explicacion: '5 paneles × 8 pantallas = 40 pantallas'
  },
  {
    id: 3,
    texto: 'El astronauta Pedro tiene 4 cajas herméticas de herramientas lunares. En cada caja hay 6 llaves magnéticas. ¿Cuántas llaves tiene en total para reparar los rovers?',
    alternativas: ['20 llaves', '22 llaves', '24 llaves', '28 llaves'],
    correcta: 2,
    explicacion: '4 cajas × 6 llaves = 24 llaves'
  },
  {
    id: 4,
    texto: 'En la bóveda del observatorio astronómico hay 3 estantes de telescopios. En cada estante hay 9 cristales de enfoque. ¿Cuántos cristales hay en total en el observatorio?',
    alternativas: ['24 cristales', '27 cristales', '30 cristales', '36 cristales'],
    correcta: 1,
    explicacion: '3 estantes × 9 cristales = 27 cristales'
  },
  {
    id: 5,
    texto: 'En la academia espacial, se formaron 6 escuadrones de pilotos con 7 cadetes cada uno para una misión de entrenamiento. ¿Cuántos cadetes están entrenando en total?',
    alternativas: ['36 cadetes', '42 cadetes', '48 cadetes', '49 cadetes'],
    correcta: 1,
    explicacion: '6 escuadrones × 7 cadetes = 42 cadetes'
  },
  {
    id: 6,
    texto: 'La científica María preparó 8 raciones espaciales para la travesía a Marte. Si cada paquete rinde 4 días de alimento deshidratado, ¿para cuántos días de viaje tiene ración en total?',
    alternativas: ['28 días', '30 días', '32 días', '36 días'],
    correcta: 2,
    explicacion: '8 paquetes × 4 días = 32 días'
  },
  {
    id: 7,
    texto: 'En un invernadero bio-espacial en la Luna hay 9 domos de cultivo. Si en cada domo crecen 5 plantas hidropónicas, ¿cuántas plantas hay en total en la colonia lunar?',
    alternativas: ['40 plantas', '45 plantas', '50 plantas', '54 plantas'],
    correcta: 1,
    explicacion: '9 domos × 5 plantas = 45 plantas'
  },
  {
    id: 8,
    texto: 'Una nave de transporte intergaláctico tiene 10 compartimentos de pasajeros. Si en cada compartimento viajan 3 científicos estelares, ¿cuántos científicos viajan en la nave?',
    alternativas: ['25 científicos', '28 científicos', '30 científicos', '33 científicos'],
    correcta: 2,
    explicacion: '10 compartimentos × 3 científicos = 30 científicos'
  },
  {
    id: 9,
    texto: 'El comandante Carlos recolectó muestras minerales en Saturno. Tiene 2 contenedores con 8 fragmentos de meteorito cada uno, y 3 contenedores con 6 cristales cósmicos cada uno. ¿Cuántos minerales espaciales recolectó en total?',
    alternativas: ['30 minerales', '34 minerales', '36 minerales', '40 minerales'],
    correcta: 1,
    explicacion: '(2 × 8) + (3 × 6) = 16 + 18 = 34 minerales'
  },
  {
    id: 10,
    texto: 'En el astillero espacial, cada unidad de combustible de plasma cuesta $2.000 créditos y cada batería iónica cuesta $3.000 créditos. Si la nave compra 4 unidades de plasma y 3 baterías iónicas, ¿cuántos créditos gasta en total?',
    alternativas: ['$14.000', '$15.000', '$17.000', '$21.000'],
    correcta: 2,
    explicacion: '(4 × $2.000) + (3 × $3.000) = $8.000 + $9.000 = $17.000'
  }
];

let currentQuestion = 0;
let respuestas = [];

function iniciarSimce() {
    if(!window.datosEstudiante.simceDesbloqueado) {
        mostrarNotificacion('Debes aprender al menos 5 tablas para desbloquear el SIMCE', 'error');
        return;
    }
    
    navegarA('pantalla-simce');
    currentQuestion = 0;
    respuestas = Array(10).fill(null);
    
    const nav = document.getElementById('simce-nav');
    nav.innerHTML = '';
    
    for(let i=0; i<10; i++) {
        let btn = document.createElement('button');
        btn.className = 'simce-nav-btn';
        btn.textContent = i + 1;
        btn.onclick = () => mostrarPreguntaSimce(i);
        nav.appendChild(btn);
    }
    
    mostrarPreguntaSimce(0);
}

function mostrarPreguntaSimce(index) {
    currentQuestion = index;
    const q = SIMCE_PREGUNTAS[index];
    
    document.getElementById('simce-pregunta-numero').textContent = `Pregunta ${index + 1} de 10`;
    document.getElementById('simce-pregunta-texto').textContent = q.texto;
    
    const navBtns = document.querySelectorAll('.simce-nav-btn');
    navBtns.forEach((btn, i) => {
        btn.classList.remove('activa');
        if(i === index) btn.classList.add('activa');
        
        if(respuestas[i] !== null) btn.classList.add('respondida');
        else btn.classList.remove('respondida');
    });
    
    const altsContainer = document.getElementById('simce-alternativas');
    altsContainer.innerHTML = '';
    
    q.alternativas.forEach((alt, i) => {
        let btn = document.createElement('button');
        btn.className = `simce-alt ${respuestas[index] === i ? 'seleccionada' : ''}`;
        btn.textContent = String.fromCharCode(65 + i) + ') ' + alt;
        btn.onclick = () => {
            reproducirSonido('click');
            respuestas[index] = i;
            mostrarPreguntaSimce(index); // re-render to update highlights
        };
        altsContainer.appendChild(btn);
    });
    
    document.getElementById('simce-btn-anterior').style.display = index > 0 ? 'inline-block' : 'none';
    document.getElementById('simce-btn-siguiente').style.display = index < 9 ? 'inline-block' : 'none';
    document.getElementById('simce-btn-finalizar').style.display = index === 9 ? 'inline-block' : 'none';
    
    document.getElementById('simce-btn-anterior').onclick = () => mostrarPreguntaSimce(index - 1);
    document.getElementById('simce-btn-siguiente').onclick = () => mostrarPreguntaSimce(index + 1);
    document.getElementById('simce-btn-finalizar').onclick = finalizarSimce;
}

function finalizarSimce() {
    let sinResponder = respuestas.filter(r => r === null).length;
    if(sinResponder > 0) {
        if(!confirm(`Te faltan ${sinResponder} preguntas por responder. ¿Seguro que quieres finalizar?`)) {
            return;
        }
    } else {
        if(!confirm('¿Seguro que quieres entregar tu prueba SIMCE?')) {
            return;
        }
    }
    
    let correctas = 0;
    let revisionHTML = '<h3>Revisión de respuestas:</h3><div style="text-align:left; max-width:600px; margin:0 auto;">';
    
    SIMCE_PREGUNTAS.forEach((q, i) => {
        let resUser = respuestas[i];
        let isCorrect = resUser === q.correcta;
        if(isCorrect) correctas++;
        
        let color = isCorrect ? '#69f0ae' : '#ff5252';
        let mark = isCorrect ? '✅' : '❌';
        let resText = resUser !== null ? q.alternativas[resUser] : 'Sin responder';
        
        revisionHTML += `
            <div class="review-item" style="border: 1px solid rgba(255,255,255,0.18); padding: 18px 20px; margin-bottom: 16px; border-left: 6px solid ${color}; background: linear-gradient(135deg, rgba(20, 24, 60, 0.95), rgba(30, 35, 80, 0.9)); border-radius: 14px; box-shadow: 0 4px 15px rgba(0,0,0,0.3);">
                <p style="color: #ffffff; font-family: 'Nunito', sans-serif; font-weight: 800; font-size: 1.15em; line-height: 1.5; margin-bottom: 10px;">${i+1}. ${q.texto}</p>
                <p style="color: ${isCorrect ? '#69f0ae' : '#ff5252'}; font-weight: 800; font-size: 1.05em; margin-bottom: 6px;">${mark} Tu respuesta: <span style="text-decoration: ${isCorrect ? 'none' : 'line-through'};">${resText}</span></p>
                ${!isCorrect ? `<p style="color: #00e676; font-weight: 800; font-size: 1.05em; margin-bottom: 6px;">✅ Respuesta correcta: ${q.alternativas[q.correcta]}</p>` : ''}
                <div style="font-size: 1.05em; color: #ffd54f; font-weight: 800; background: rgba(255, 215, 0, 0.12); border: 1px solid rgba(255, 215, 0, 0.35); padding: 10px 14px; border-radius: 10px; margin-top: 10px; line-height: 1.5;">
                    💡 <strong>Explicación:</strong> ${q.explicacion}
                </div>
            </div>
        `;
    });
    revisionHTML += '</div>';
    
    // Enhanced styling for review heading
    revisionHTML = revisionHTML.replace('<h3>Revisión de respuestas:</h3>', '<h3 style="font-family: \'Fredoka One\', cursive; color: #ffd700; font-size: 1.5rem; margin-bottom: 20px; text-shadow: 0 0 10px rgba(255,215,0,0.3);">📋 Revisión de respuestas:</h3>');
    
    window.datosEstudiante.simceResultado = {
        puntaje: correctas,
        total: 10,
        respuestas: [...respuestas],
        fecha: new Date().toISOString()
    };
    
    actualizarPuntaje(100);
    guardarDatos(window.datosEstudiante);
    verificarLogros();
    
    navegarA('pantalla-resultado-simce');
    if (correctas >= 6) {
        reproducirSonido('exito');
    } else {
        reproducirSonido('alerta');
    }
    
    let porcentaje = (correctas / 10) * 100;
    let estrellas = calcularEstrellas(porcentaje);
    
    document.getElementById('simce-resultado-puntaje').innerHTML = `<span style="font-family: 'Fredoka One', cursive; font-size: 2.2rem; color: #ffd700; text-shadow: 0 0 15px rgba(255,215,0,0.4);">${correctas} de 10 correctas</span>`;
    
    let msj = '';
    if(correctas === 10) msj = '¡PERFECTO! 🌟 Eres un verdadero genio matemático del universo!';
    else if(correctas >= 8) msj = '¡EXCELENTE! 🚀 Estás muy cerca de la perfección!';
    else if(correctas >= 6) msj = '¡MUY BIEN! 🌍 Sigue practicando y llegarás más lejos!';
    else if(correctas >= 4) msj = '¡BUEN INTENTO! 🌙 Repasa algunas tablas y vuelve a intentarlo.';
    else msj = '¡NO TE RINDAS! 💪 Practica más las tablas y vuelve a intentarlo.';
    
    document.getElementById('simce-resultado-mensaje').innerHTML = `
        <div style="font-size:2.5rem; margin:15px 0;">${'⭐'.repeat(estrellas)}${'🌑'.repeat(3 - estrellas)}</div>
        <p style="font-family: 'Fredoka One', cursive; font-size: 1.3rem; color: #e0e6ed; text-shadow: 0 0 5px rgba(255,255,255,0.2);">${msj}</p>
    `;
    
    document.getElementById('simce-resultado-detalle').innerHTML = revisionHTML;
}
