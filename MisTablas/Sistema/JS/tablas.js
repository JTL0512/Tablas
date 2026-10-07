function iniciarAprendizaje(numTabla) {
    navegarA('pantalla-aprender');
    document.getElementById('aprender-titulo').textContent = `Planeta ${PLANETAS[numTabla].nombre} - Tabla del ${numTabla}`;
    
    const contenido = document.getElementById('contenido-aprender');
    const controles = document.getElementById('aprender-controles');
    const pasos = document.getElementById('aprender-pasos');
    
    let pasoActual = 1;
    
    function actualizarPasos() {
        pasos.innerHTML = '';
        for(let i=1; i<=4; i++) {
            const p = document.createElement('div');
            p.className = `paso-indicador ${i === pasoActual ? 'activo' : ''} ${i < pasoActual ? 'completado' : ''}`;
            p.textContent = `Paso ${i}`;
            pasos.appendChild(p);
        }
    }
    
    function mostrarPaso1() {
        actualizarPasos();
        const infoPlaneta = PLANETAS[numTabla] || { nombre: 'Planeta', emoji: '⭐' };
        const objetos = {
            2: { icono: '🌟', nombre: 'estrellas fugaces' },
            3: { icono: '💎', nombre: 'cristales de energía' },
            4: { icono: '🚀', nombre: 'cohetes exploradores' },
            5: { icono: '🛸', nombre: 'naves espaciales' },
            6: { icono: '☄️', nombre: 'cometas brillantes' },
            7: { icono: '🪐', nombre: 'anillos cósmicos' },
            8: { icono: '🛰️', nombre: 'satélites de datos' },
            9: { icono: '⚡', nombre: 'rayos de plasma' },
            10: { icono: '🏆', nombre: 'medallas interestelares' }
        };
        const recurso = objetos[numTabla] || { icono: '⭐', nombre: 'estrellas' };
        
        let multiplicadorActivo = 1;
        
        function renderVisor() {
            let resultado = numTabla * multiplicadorActivo;
            
            // Botones interactivos del 1 al 10
            let botonesNav = '';
            for(let m = 1; m <= 10; m++) {
                botonesNav += `<button class="btn-num-multiplicador ${m === multiplicadorActivo ? 'activo' : ''}" data-m="${m}">${m}</button>`;
            }
            
            // Grupos encapsulados limpios y estéticos
            let gruposHTML = '';
            for(let g = 1; g <= multiplicadorActivo; g++) {
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
            
            contenido.innerHTML = `
                <div class="aprender-visor-container">
                    <h3 style="color: var(--color-primary); margin-bottom: 8px;">1. Explorador Visual de Multiplicación</h3>
                    <p style="color: var(--color-text-muted); margin-bottom: 20px;">Toca cualquier número para ver cómo se forman los grupos en <strong>${infoPlaneta.nombre}</strong>:</p>
                    
                    <div class="carrusel-nav-multiplicaciones">${botonesNav}</div>
                    
                    <div class="visor-ecuacion-destacada">
                        ${numTabla} × ${multiplicadorActivo} = ${resultado}
                    </div>
                    <div class="visor-subtitulo">
                        ${multiplicadorActivo} ${multiplicadorActivo === 1 ? 'grupo' : 'grupos'} con ${numTabla} ${recurso.nombre} cada uno
                    </div>
                    
                    <div class="contenedor-grupos-elegante">
                        ${gruposHTML}
                    </div>
                    
                    <div class="explicacion-concepto">
                        💡 <strong>Regla Galáctica:</strong> Multiplicar por <strong>${numTabla}</strong> significa sumar <strong>${numTabla}</strong> cada vez: 
                        ${multiplicadorActivo > 1 ? `(${numTabla * (multiplicadorActivo - 1)} + ${numTabla} = ${resultado})` : `${numTabla}`}
                    </div>
                </div>
            `;
            
            // Asignar eventos a los botones del visor
            document.querySelectorAll('.btn-num-multiplicador').forEach(btn => {
                btn.onclick = () => {
                    multiplicadorActivo = parseInt(btn.dataset.m);
                    renderVisor();
                };
            });
        }
        
        renderVisor();
        controles.innerHTML = `
            <button class="btn-primario" onclick="siguientePaso()">¡Comprendido! Siguiente Desafío 👉</button>
        `;
    }
    
    function mostrarPaso2() {
        actualizarPasos();
        let qActual = 1;
        let aciertos = 0;
        
        function renderPregunta() {
            if(qActual > 5) {
                contenido.innerHTML = `<h3>¡Muy bien! Has completado la práctica.</h3>`;
                controles.innerHTML = `<button class="btn-primario" onclick="siguientePaso()">Ir al siguiente reto 👉</button>`;
                return;
            }
            let multiplicador = Math.floor(Math.random() * 10) + 1;
            let correcta = numTabla * multiplicador;
            let ops = generarOpciones(correcta, numTabla);
            
            let html = `<h3>2. Practica con ayuda (${qActual} de 5)</h3>
            <div class="pregunta-container"><h2>${numTabla} × ${multiplicador} = ?</h2>
            <div class="quiz-opciones">`;
            
            ops.forEach(op => {
                html += `<button class="quiz-opcion" data-val="${op}">${op}</button>`;
            });
            html += `</div></div>`;
            contenido.innerHTML = html;
            
            document.querySelectorAll('.quiz-opcion').forEach(btn => {
                btn.onclick = (e) => {
                    const val = parseInt(e.target.dataset.val);
                    if(val === correcta) {
                        e.target.classList.add('correcta');
                        mostrarNotificacion('¡Correcto! 🎉', 'exito');
                        actualizarPuntaje(5);
                        setTimeout(() => { qActual++; renderPregunta(); }, 1000);
                    } else {
                        e.target.classList.add('incorrecta');
                        mostrarNotificacion(`Casi... Recuerda que ${numTabla} × ${multiplicador} = ${correcta}`, 'error');
                        setTimeout(() => { e.target.classList.remove('incorrecta'); }, 1500);
                    }
                };
            });
        }
        renderPregunta();
        controles.innerHTML = '';
    }
    
    function mostrarPaso3() {
        actualizarPasos();
        let arr = [];
        let blanks = [];
        for(let i=1; i<=10; i++) {
            let v = numTabla * i;
            if(Math.random() > 0.5 && blanks.length < 4) {
                arr.push(`<input type="number" class="patron-input" data-ans="${v}" style="width:60px;">`);
                blanks.push(v);
            } else {
                arr.push(v);
            }
        }
        
        contenido.innerHTML = `<h3>3. Descubre el patrón</h3>
        <p>Completa los números que faltan en la secuencia de la tabla del ${numTabla}:</p>
        <div style="font-size: 24px; margin: 20px 0;">${arr.join(' , ')}</div>`;
        
        controles.innerHTML = `<button class="btn-primario" id="btn-revisar-patron">Revisar Patrón 🔍</button>`;
        
        document.getElementById('btn-revisar-patron').onclick = () => {
            let todosCorrectos = true;
            document.querySelectorAll('.patron-input').forEach(inp => {
                let val = parseInt(inp.value);
                let ans = parseInt(inp.dataset.ans);
                if(val === ans) {
                    inp.style.backgroundColor = '#c8e6c9'; // verde
                    actualizarPuntaje(5);
                } else {
                    inp.style.backgroundColor = '#ffcdd2'; // rojo
                    todosCorrectos = false;
                }
            });
            
            if(todosCorrectos) {
                mostrarNotificacion('¡Excelente! Completaste el patrón', 'exito');
                setTimeout(() => siguientePaso(), 1500);
            } else {
                mostrarNotificacion('Revisa los campos en rojo e intenta de nuevo', 'error');
            }
        };
    }
    
    function mostrarPaso4() {
        actualizarPasos();
        let qActual = 1;
        let puntajeTest = 0;
        let preguntas = shuffle([1,2,3,4,5,6,7,8,9,10]);
        
        function renderTest() {
            if(qActual > 10) {
                finalizarAprendizaje(puntajeTest);
                return;
            }
            let multiplicador = preguntas[qActual-1];
            let correcta = numTabla * multiplicador;
            let ops = generarOpciones(correcta, numTabla);
            
            let html = `<h3>4. Demuestra lo que sabes (${qActual} de 10)</h3>
            <div class="pregunta-container"><h2>${numTabla} × ${multiplicador} = ?</h2>
            <div class="quiz-opciones">`;
            
            ops.forEach(op => {
                html += `<button class="quiz-opcion" data-val="${op}">${op}</button>`;
            });
            html += `</div></div>`;
            contenido.innerHTML = html;
            
            document.querySelectorAll('.quiz-opcion').forEach(btn => {
                btn.onclick = (e) => {
                    const val = parseInt(e.target.dataset.val);
                    if(val === correcta) puntajeTest++;
                    qActual++; 
                    renderTest();
                };
            });
        }
        renderTest();
        controles.innerHTML = '';
    }
    
    function finalizarAprendizaje(puntaje) {
        let porcentaje = (puntaje / 10) * 100;
        let estrellas = calcularEstrellas(porcentaje);
        
        let td = window.datosEstudiante.tablas[numTabla];
        
        if (porcentaje >= 60) {
            td.aprendida = true;
            actualizarPuntaje(20);
        }
        
        if (puntaje > td.puntaje) td.puntaje = puntaje;
        if (estrellas > td.estrellas) td.estrellas = estrellas;
        
        guardarDatos(window.datosEstudiante);
        verificarLogros();
        verificarSimceDesbloqueado();
        
        contenido.innerHTML = `<h3>¡Resultados Finales!</h3>
        <h2>Obtuviste ${puntaje} de 10 correctas</h2>
        <p>Porcentaje: ${porcentaje}%</p>
        <div style="font-size:3rem; margin:20px 0;">
            ${'⭐'.repeat(estrellas)}${'🌑'.repeat(3 - estrellas)}
        </div>
        <p>${porcentaje >= 60 ? '¡Felicidades! Has dominado esta tabla. 🚀' : '¡Buen intento! Sigue practicando para dominarla. 💪'}</p>`;
        
        controles.innerHTML = `
            <button class="btn-secundario" onclick="iniciarAprendizaje(${numTabla})">Repetir Aprendizaje 🔄</button>
            <button class="btn-primario" onclick="mostrarMenuJuegos(${numTabla})">Ir a los Juegos 🎮</button>
            <button class="btn-secundario" onclick="volverMenu()">Volver al Menú 🏠</button>
        `;
    }
    
    window.siguientePaso = function() {
        pasoActual++;
        if(pasoActual === 2) mostrarPaso2();
        else if(pasoActual === 3) mostrarPaso3();
        else if(pasoActual === 4) mostrarPaso4();
    };
    
    mostrarPaso1();
}
