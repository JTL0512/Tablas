const SIMCE_PREGUNTAS = [
  {
    id: 1,
    texto: 'En la librería, cada cuaderno cuesta $3.000. Si Sofía compra 7 cuadernos, ¿cuánto dinero necesita en total?',
    alternativas: ['$18.000', '$21.000', '$24.000', '$28.000'],
    correcta: 1,
    explicacion: '7 cuadernos × $3.000 = $21.000'
  },
  {
    id: 2,
    texto: 'En el colegio, la profesora organizó 5 filas de sillas con 8 sillas en cada fila. ¿Cuántas sillas hay en total?',
    alternativas: ['35 sillas', '40 sillas', '45 sillas', '48 sillas'],
    correcta: 1,
    explicacion: '5 filas × 8 sillas = 40 sillas'
  },
  {
    id: 3,
    texto: 'Pedro tiene 4 cajas de lápices de colores. En cada caja hay 6 lápices. ¿Cuántos lápices tiene Pedro en total?',
    alternativas: ['20 lápices', '22 lápices', '24 lápices', '28 lápices'],
    correcta: 2,
    explicacion: '4 cajas × 6 lápices = 24 lápices'
  },
  {
    id: 4,
    texto: 'En la biblioteca hay 3 estantes. En cada estante hay 9 libros. ¿Cuántos libros hay en total en la biblioteca?',
    alternativas: ['24 libros', '27 libros', '30 libros', '36 libros'],
    correcta: 1,
    explicacion: '3 estantes × 9 libros = 27 libros'
  },
  {
    id: 5,
    texto: 'En el recreo, se formaron 6 equipos de fútbol con 7 jugadores cada uno. ¿Cuántos estudiantes están jugando fútbol?',
    alternativas: ['36 estudiantes', '42 estudiantes', '48 estudiantes', '49 estudiantes'],
    correcta: 1,
    explicacion: '6 equipos × 7 jugadores = 42 estudiantes'
  },
  {
    id: 6,
    texto: 'María compró 8 paquetes de galletas para compartir. Cada paquete tiene 4 galletas. ¿Cuántas galletas tiene en total?',
    alternativas: ['28 galletas', '30 galletas', '32 galletas', '36 galletas'],
    correcta: 2,
    explicacion: '8 paquetes × 4 galletas = 32 galletas'
  },
  {
    id: 7,
    texto: 'En una granja hay 9 corrales. En cada corral hay 5 ovejas. ¿Cuántas ovejas hay en total en la granja?',
    alternativas: ['40 ovejas', '45 ovejas', '50 ovejas', '54 ovejas'],
    correcta: 1,
    explicacion: '9 corrales × 5 ovejas = 45 ovejas'
  },
  {
    id: 8,
    texto: 'Un bus escolar tiene 10 filas de asientos. En cada fila caben 3 niños. ¿Cuántos niños caben en total en el bus?',
    alternativas: ['25 niños', '28 niños', '30 niños', '33 niños'],
    correcta: 2,
    explicacion: '10 filas × 3 niños = 30 niños'
  },
  {
    id: 9,
    texto: 'Carlos colecciona estampillas. Tiene 2 álbumes con 8 estampillas en cada uno, y además tiene 3 álbumes con 6 estampillas en cada uno. ¿Cuántas estampillas tiene en total?',
    alternativas: ['30 estampillas', '34 estampillas', '36 estampillas', '40 estampillas'],
    correcta: 1,
    explicacion: '(2 × 8) + (3 × 6) = 16 + 18 = 34 estampillas'
  },
  {
    id: 10,
    texto: 'En la feria, cada kilo de manzanas cuesta $2.000. La mamá de Javiera compró 4 kilos de manzanas y 3 kilos de peras a $3.000 el kilo. ¿Cuánto gastó en total?',
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
        
        let color = isCorrect ? 'green' : 'red';
        let mark = isCorrect ? '✅' : '❌';
        let resText = resUser !== null ? q.alternativas[resUser] : 'Sin responder';
        
        revisionHTML += `
            <div class="review-item" style="border:1px solid #ccc; padding:10px; margin-bottom:10px; border-left:5px solid ${color};">
                <p><strong>${i+1}. ${q.texto}</strong></p>
                <p>${mark} Tu respuesta: ${resText}</p>
                ${!isCorrect ? `<p style="color:green;">Correcta: ${q.alternativas[q.correcta]}</p>` : ''}
                <p style="font-size:0.9em; color:#555;"><em>Explicación: ${q.explicacion}</em></p>
            </div>
        `;
    });
    revisionHTML += '</div>';
    
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
    
    let porcentaje = (correctas / 10) * 100;
    let estrellas = calcularEstrellas(porcentaje);
    
    document.getElementById('simce-resultado-puntaje').textContent = `${correctas} de 10 correctas`;
    
    let msj = '';
    if(correctas === 10) msj = '¡PERFECTO! 🌟 Eres un verdadero genio matemático del universo!';
    else if(correctas >= 8) msj = '¡EXCELENTE! 🚀 Estás muy cerca de la perfección!';
    else if(correctas >= 6) msj = '¡MUY BIEN! 🌍 Sigue practicando y llegarás más lejos!';
    else if(correctas >= 4) msj = '¡BUEN INTENTO! 🌙 Repasa algunas tablas y vuelve a intentarlo.';
    else msj = '¡NO TE RINDAS! 💪 Practica más las tablas y vuelve a intentarlo.';
    
    document.getElementById('simce-resultado-mensaje').innerHTML = `
        <div style="font-size:2rem; margin:10px 0;">${'⭐'.repeat(estrellas)}${'🌑'.repeat(3 - estrellas)}</div>
        <p>${msj}</p>
    `;
    
    document.getElementById('simce-resultado-detalle').innerHTML = revisionHTML;
}
