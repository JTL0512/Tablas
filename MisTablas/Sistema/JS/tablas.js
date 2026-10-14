function iniciarAprendizaje(numTabla) {
    navegarA('pantalla-aprender');
    const p = PLANETAS[numTabla] || { nombre: 'Planeta', emoji: '⭐' };
    document.getElementById('aprender-titulo').textContent = `Misión en ${p.nombre} - Tabla del ${numTabla}`;
    
    const contenido = document.getElementById('contenido-aprender');
    const controles = document.getElementById('aprender-controles');
    const pasos = document.getElementById('aprender-pasos');
    
    const objetos = {
        2: { icono: '🌟', singular: 'estrella fugaz', plural: 'estrellas fugaces' },
        3: { icono: '💎', singular: 'cristal de energía', plural: 'cristales de energía' },
        4: { icono: '🚀', singular: 'cohete explorador', plural: 'cohetes exploradores' },
        5: { icono: '🛸', singular: 'nave espacial', plural: 'naves espaciales' },
        6: { icono: '☄️', singular: 'cometa brillante', plural: 'cometas brillantes' },
        7: { icono: '🪐', singular: 'anillo cósmico', plural: 'anillos cósmicos' },
        8: { icono: '🛰️', singular: 'satélite de datos', plural: 'satélites de datos' },
        9: { icono: '⚡', singular: 'rayo de plasma', plural: 'rayos de plasma' },
        10: { icono: '🏆', singular: 'medalla galáctica', plural: 'medallas galácticas' }
    };
    const recurso = objetos[numTabla] || { icono: '⭐', singular: 'estrella', plural: 'estrellas' };
    
    let etapaActual = 'secuencia'; // 'secuencia' o 'prueba'
    let pasoMultiplicador = 1; // del 1 al 10
    
    function renderIndicadorPasos() {
        pasos.innerHTML = '';
        const indicadorFase1 = document.createElement('div');
        indicadorFase1.className = `paso-indicador ${etapaActual === 'secuencia' ? 'activo' : 'completado'}`;
        indicadorFase1.innerHTML = `<span>🛰️</span> Fase 1: Reconocimiento Órbital (${pasoMultiplicador}/10)`;
        
        const indicadorFase2 = document.createElement('div');
        indicadorFase2.className = `paso-indicador ${etapaActual === 'prueba' ? 'activo' : ''}`;
        indicadorFase2.innerHTML = `<span>🎯</span> Fase 2: Prueba de Calibración`;
        
        pasos.appendChild(indicadorFase1);
        pasos.appendChild(indicadorFase2);
    }
    
    // Muestra 1 sola operación a la vez (ej: 2x1, al dar siguiente 2x2, etc.)
    function mostrarOperacionSecuencial() {
        etapaActual = 'secuencia';
        renderIndicadorPasos();
        
        const resultado = numTabla * pasoMultiplicador;
        const nombreObjetos = resultado === 1 ? recurso.singular : recurso.plural;
        
        // Barra de bolitas 1 al 10
        let bolitasHTML = '';
        for(let i = 1; i <= 10; i++) {
            let clase = '';
            if (i < pasoMultiplicador) clase = 'completada';
            else if (i === pasoMultiplicador) clase = 'activa';
            bolitasHTML += `<div class="secuencial-bolita ${clase}">${i}</div>`;
        }
        
        // Generar cápsulas de grupos
        let gruposHTML = '';
        for(let g = 1; g <= pasoMultiplicador; g++) {
            let items = '';
            for(let k = 0; k < numTabla; k++) {
                items += `<span class="item-visual-icono">${recurso.icono}</span>`;
            }
            gruposHTML += `
                <div class="capsula-grupo anim-bounce">
                    <span class="capsula-etiqueta">Grupo ${g}</span>
                    <div class="capsula-elementos">${items}</div>
                </div>
            `;
        }
        
        let textoSuma = '';
        if (pasoMultiplicador === 1) {
            textoSuma = `Es 1 grupo con ${numTabla} ${nombreObjetos}.`;
        } else {
            let sumandos = Array(pasoMultiplicador).fill(numTabla).join(' + ');
            textoSuma = `${sumandos} = ${resultado}`;
        }
        
        contenido.innerHTML = `
            <div class="tarjeta-paso-secuencial anim-fade-in">
                <!-- Progreso de pasos -->
                <div class="secuencial-progreso-barra">
                    ${bolitasHTML}
                </div>
                
                <span class="contador-paso-badge">OPERACIÓN ${pasoMultiplicador} DE 10</span>
                
                <div class="gran-ecuacion-animada">
                    ${numTabla} × ${pasoMultiplicador} = <span class="resultado-destacado-glow">${resultado}</span>
                </div>
                
                <p style="color: var(--color-primary); font-size: 1.25rem; font-weight: 800; margin-bottom: 20px;">
                    ${pasoMultiplicador} ${pasoMultiplicador === 1 ? 'grupo' : 'grupos'} con ${numTabla} ${nombreObjetos} = <strong>${resultado} ${recurso.plural}</strong>
                </p>
                
                <!-- Visualización estética de las estrellas / objetos agrupados -->
                <div class="contenedor-grupos-elegante">
                    ${gruposHTML}
                </div>
                
                <div class="explicacion-concepto">
                    💡 <strong>Suma Repetida:</strong> ${textoSuma}
                </div>
                
                <!-- Controles de Navegación -->
                <div class="controles-navegacion-paso">
                    <button class="btn-secundario" id="btn-paso-anterior" ${pasoMultiplicador === 1 ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''}>
                        ⬅ Anterior (${numTabla} × ${pasoMultiplicador - 1})
                    </button>
                    
                    ${pasoMultiplicador < 10 ? `
                        <button class="btn-primario" id="btn-paso-siguiente" style="font-size: 1.15rem; padding: 14px 35px;">
                            Siguiente (${numTabla} × ${pasoMultiplicador + 1}) ➡
                        </button>
                    ` : `
                        <button class="btn-primario btn-mision-activa" id="btn-iniciar-prueba" style="font-size: 1.25rem; padding: 15px 40px;">
                            🎯 ¡Pasar a la Prueba de lo Aprendido! 🚀
                        </button>
                    `}
                </div>
            </div>
        `;
        
        controles.innerHTML = `
            <button class="btn-secundario" onclick="volverMenu()">🏠 Volver al Mapa Galáctico</button>
        `;
        
        // Eventos de botones
        const btnAnt = document.getElementById('btn-paso-anterior');
        if (btnAnt && pasoMultiplicador > 1) {
            btnAnt.onclick = () => {
                pasoMultiplicador--;
                mostrarOperacionSecuencial();
            };
        }
        
        const btnSig = document.getElementById('btn-paso-siguiente');
        if (btnSig) {
            btnSig.onclick = () => {
                pasoMultiplicador++;
                mostrarOperacionSecuencial();
            };
        }
        
        const btnPrueba = document.getElementById('btn-iniciar-prueba');
        if (btnPrueba) {
            btnPrueba.onclick = () => {
                mostrarPruebaDeLoAprendido();
            };
        }
    }
    
    // PRUEBA DE LO APRENDIDO (Evaluación interactiva para desbloquear los juegos)
    function mostrarPruebaDeLoAprendido() {
        etapaActual = 'prueba';
        renderIndicadorPasos();
        
        let qActual = 1;
        let puntajeTest = 0;
        let preguntas = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        
        function renderPreguntaPrueba() {
            if (qActual > 10) {
                finalizarAprendizaje(puntajeTest);
                return;
            }
            
            const multiplicador = preguntas[qActual - 1];
            const correcta = numTabla * multiplicador;
            const ops = generarOpciones(correcta, numTabla);
            
            contenido.innerHTML = `
                <div class="tarjeta-paso-secuencial anim-fade-in">
                    <span class="contador-paso-badge">🎯 PRUEBA DE LO APRENDIDO: PREGUNTA ${qActual} DE 10</span>
                    <h2 style="color: var(--color-primary); margin-bottom: 10px;">Demuestra tu dominio de la Tabla del ${numTabla}</h2>
                    <p style="color: var(--color-text-muted); margin-bottom: 25px;">Selecciona el resultado correcto para calibrar los reactores de la nave:</p>
                    
                    <div class="gran-ecuacion-animada" style="font-size: 3.2rem;">
                        ${numTabla} × ${multiplicador} = ?
                    </div>
                    
                    <div class="quiz-opciones" style="max-width: 500px; margin: 25px auto;">
                        ${ops.map(op => `<button class="quiz-opcion" data-val="${op}">${op}</button>`).join('')}
                    </div>
                </div>
            `;
            
            document.querySelectorAll('.quiz-opcion').forEach(btn => {
                btn.onclick = (e) => {
                    const val = parseInt(e.target.dataset.val);
                    if (val === correcta) {
                        e.target.classList.add('correcta');
                        mostrarNotificacion('¡Excelente respuesta! +5 pts 🌟', 'exito');
                        puntajeTest++;
                    } else {
                        e.target.classList.add('incorrecta');
                        mostrarNotificacion(`Casi... Recuerda: ${numTabla} × ${multiplicador} = ${correcta}`, 'error');
                    }
                    setTimeout(() => {
                        qActual++;
                        renderPreguntaPrueba();
                    }, 800);
                };
            });
        }
        
        renderPreguntaPrueba();
        controles.innerHTML = `
            <button class="btn-secundario" onclick="mostrarOperacionSecuencial()">🔄 Repasar Secuencia</button>
            <button class="btn-secundario" onclick="volverMenu()">🏠 Volver al Mapa</button>
        `;
    }
    
    function finalizarAprendizaje(puntaje) {
        let porcentaje = (puntaje / 10) * 100;
        let estrellas = calcularEstrellas(porcentaje);
        const p = PLANETAS[numTabla];
        
        let td = window.datosEstudiante.tablas[numTabla];
        let eraPreviamenteAprendida = td.aprendida;
        
        if (porcentaje >= 60) {
            td.aprendida = true;
            actualizarPuntaje(25);
            mostrarNotificacion(`🎉 ¡Misión cumplida en ${p.nombre}! Los juegos han sido desbloqueados.`, 'exito');
        }
        
        if (puntaje > td.puntaje) td.puntaje = puntaje;
        if (estrellas > td.estrellas) td.estrellas = estrellas;
        
        guardarDatos(window.datosEstudiante);
        verificarLogros();
        verificarSimceDesbloqueado();
        
        let mensajeMision = '';
        if (porcentaje >= 60) {
            mensajeMision = `
                <div class="modal-historia-caja" style="margin: 20px auto; max-width: 550px;">
                    <div class="modal-historia-titulo" style="color: var(--color-success);">
                        <span>🏆</span> ¡MISIÓN CUMPLIDA: SISTEMAS ACTIVADOS EN ${p.nombre.toUpperCase()}!
                    </div>
                    <div class="modal-historia-texto">
                        "¡Excelente trabajo, astronauta! Has calibrado con éxito la energía de la Tabla del ${numTabla}. La niebla se disipa y los sensores responden. ¡Los 5 simuladores y misiones de combate están ahora completamente desbloqueados para comprobar tu habilidad!"
                    </div>
                </div>
            `;
        } else {
            mensajeMision = `
                <div class="modal-historia-caja" style="margin: 20px auto; max-width: 550px; border-left-color: var(--color-accent);">
                    <div class="modal-historia-titulo" style="color: var(--color-accent);">
                        <span>⚠️</span> ENERGÍA INSUFICIENTE (Se requiere al menos 60%)
                    </div>
                    <div class="modal-historia-texto">
                        "Los sistemas de ${p.nombre} necesitan mayor precisión matemática para activar los propulsores. Repasa la lección y vuelve a intentarlo para desbloquear los juegos."
                    </div>
                </div>
            `;
        }
        
        contenido.innerHTML = `
            <div class="aprender-visor-container anim-bounce">
                <h2 style="color: var(--color-gold); font-size: 2.2rem; margin-bottom: 10px;">¡Evaluación de Misión!</h2>
                <h3 style="color: var(--color-primary);">${p.nombre} - Tabla del ${numTabla}</h3>
                
                <div style="font-size: 3.5rem; margin: 15px 0;">
                    ${'⭐'.repeat(estrellas)}${'🌑'.repeat(3 - estrellas)}
                </div>
                
                <div class="visor-ecuacion-destacada" style="font-size: 2rem;">
                    ${puntaje} de 10 Aciertos (${porcentaje}%)
                </div>
                
                ${mensajeMision}
            </div>
        `;
        
        controles.innerHTML = `
            <button class="btn-secundario" onclick="iniciarAprendizaje(${numTabla})">🔄 Repasar Lección</button>
            ${td.aprendida ? `
                <button class="btn-primario btn-mision-activa" onclick="mostrarMenuJuegos(${numTabla})">🎮 ¡Entrar a Jugar y Probar Habilidades! 🚀</button>
            ` : `
                <button class="btn-primario" onclick="iniciarAprendizaje(${numTabla})">⚡ Intentar de Nuevo</button>
            `}
            <button class="btn-secundario" onclick="volverMenu()">🏠 Mapa Galáctico</button>
        `;
    }
    
    // Iniciar con la primera operación de la secuencia (ej: 2x1)
    mostrarOperacionSecuencial();
}
