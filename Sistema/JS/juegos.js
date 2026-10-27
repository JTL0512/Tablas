function mostrarMenuJuegos(numTabla) {
    const td = window.datosEstudiante.tablas[numTabla];
    
    // Verificación estricta: si no ha aprendido la tabla, no puede entrar
    if (!td || !td.aprendida) {
        mostrarNotificacion(`🔒 ¡Misión bloqueada! Primero debes completar la lección de la Tabla del ${numTabla}.`, 'error');
        mostrarOpcionesPlaneta(numTabla);
        return;
    }

    navegarA('pantalla-juegos-menu');
    const p = PLANETAS[numTabla];
    document.getElementById('juegos-menu-titulo').textContent = `Misiones en ${p.nombre} (Tabla del ${numTabla})`;
    window.tablaActual = numTabla;
    
    const lista = document.getElementById('lista-juegos');
    lista.innerHTML = `
        <div class="modal-historia-caja" style="width: 100%; max-width: 850px; margin-bottom: 25px;">
            <div class="modal-historia-titulo" style="font-size: 1.1rem;">
                <span>🚀</span> Centro de Simulaciones de ${p.nombre}: ${p.tituloMision}
            </div>
            <div class="modal-historia-texto" style="font-size: 0.95rem;">
                "¡Has demostrado dominar la Tabla del ${numTabla}! Ahora es momento de poner a prueba tus reflejos, memoria y lógica espacial en las 5 pruebas de fuego. ¡Completa cada desafío para ganar estrellas y medallas de honor!"
            </div>
        </div>
    `;
    
    const juegosInfo = [
        {id: 'memoria', nombre: '🧠 Memoria Cósmica', desc: 'Sincroniza pares cuánticos de multiplicación y resultado'},
        {id: 'atrapa', nombre: '🎯 Atrapa Asteroides', desc: 'Dispara a los asteroides con el producto exacto'},
        {id: 'arrastra', nombre: '🧩 Arrastra y Completa', desc: 'Ensambla los núcleos de potencia a cada ecuación'},
        {id: 'detective', nombre: '🔍 Detective Espacial', desc: 'Descifra las incógnitas ocultas por los piratas cósmicos'},
        {id: 'tiempo', nombre: '⏱️ Desafío Contrarreloj', desc: 'Sobrevive a la tormenta respondiendo antes de que acabe el tiempo'}
    ];
    
    const gridCards = document.createElement('div');
    gridCards.className = 'juegos-grid-cards';
    
    juegosInfo.forEach(j => {
        const completado = td.juegosCompletados.includes(j.id);
        const card = document.createElement('div');
        card.className = `tarjeta-juego tarjeta ${completado ? 'completado' : ''}`;
        card.innerHTML = `
            <div style="font-size: 2.2rem; margin-bottom: 8px;">${j.nombre.split(' ')[0]}</div>
            <h3 style="font-size: 1.1rem; color: var(--color-gold);">${j.nombre.split(' ').slice(1).join(' ')} ${completado ? '✅' : ''}</h3>
            <p style="color: var(--color-text-muted); font-size: 0.85rem; margin: 8px 0 15px 0;">${j.desc}</p>
            <button class="btn-acento" style="width: 100%;">${completado ? 'Mejorar Récord ⭐' : 'Iniciar Misión 🚀'}</button>
        `;
        card.onclick = () => iniciarJuego(j.id, numTabla);
        gridCards.appendChild(card);
    });
    lista.appendChild(gridCards);
}

function iniciarJuego(tipo, numTabla) {
    window.juegoActual = tipo;
    navegarA('pantalla-juego');
    const nombres = {
        'memoria': 'Memoria Cósmica',
        'atrapa': 'Atrapa Asteroides',
        'arrastra': 'Arrastra y Completa',
        'detective': 'Detective Espacial',
        'tiempo': 'Desafío Contrarreloj'
    };
    document.getElementById('juego-nombre').textContent = nombres[tipo];
    document.getElementById('juego-puntaje-display').textContent = 'Puntos: 0';
    
    const area = document.getElementById('juego-area');
    area.innerHTML = '';
    
    if(tipo === 'memoria') iniciarMemoria(numTabla, area);
    if(tipo === 'atrapa') iniciarAtrapa(numTabla, area);
    if(tipo === 'arrastra') iniciarArrastra(numTabla, area);
    if(tipo === 'detective') iniciarDetective(numTabla, area);
    if(tipo === 'tiempo') iniciarTiempo(numTabla, area);
}

function finalizarJuego(puntaje, maxPuntaje) {
    const td = window.datosEstudiante.tablas[window.tablaActual];
    let porcentaje = (puntaje / maxPuntaje) * 100;
    let estrellas = calcularEstrellas(porcentaje);
    
    if(!td.juegosCompletados.includes(window.juegoActual)) {
        td.juegosCompletados.push(window.juegoActual);
    }
    
    actualizarPuntaje(puntaje);
    
    navegarA('pantalla-juego-resultado');
    document.getElementById('resultado-estrellas').innerHTML = `${'⭐'.repeat(estrellas)}${'🌑'.repeat(3 - estrellas)}`;
    document.getElementById('resultado-puntaje').textContent = `Puntaje: ${puntaje} / ${maxPuntaje}`;
    document.getElementById('resultado-mensaje').textContent = porcentaje >= 60 ? '¡Misión Cumplida! 🚀' : '¡Sigue practicando! 💪';
    
    document.getElementById('btn-reintentar').onclick = () => iniciarJuego(window.juegoActual, window.tablaActual);
    document.getElementById('btn-volver-juegos').onclick = () => mostrarMenuJuegos(window.tablaActual);
    document.getElementById('btn-volver-menu-resultado').onclick = volverMenu;
}

// === MEMORIA ===
function iniciarMemoria(numTabla, area) {
    document.getElementById('juego-instrucciones').textContent = 'Encuentra las parejas (operación y resultado).';
    
    let cartas = [];
    let multipliers = shuffle([1,2,3,4,5,6,7,8,9,10]).slice(0, 8);
    
    multipliers.forEach(m => {
        let res = numTabla * m;
        cartas.push({tipo: 'op', val: `${numTabla} × ${m}`, match: res});
        cartas.push({tipo: 'res', val: res.toString(), match: res});
    });
    
    cartas = shuffle(cartas);
    
    let grid = document.createElement('div');
    grid.className = 'memoria-grid';
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(4, 1fr)';
    grid.style.gap = '10px';
    
    let volteadas = [];
    let encontradas = 0;
    let intentos = 0;
    
    cartas.forEach((c, idx) => {
        let div = document.createElement('div');
        div.className = 'memoria-carta';
        div.style.background = 'linear-gradient(145deg, #1a1a4e, #2d2d6b)';
        div.style.color = '#ffffff';
        div.style.padding = '20px';
        div.style.textAlign = 'center';
        div.style.cursor = 'pointer';
        div.style.fontSize = '1.4rem';
        div.style.fontFamily = "'Fredoka One', cursive";
        div.style.borderRadius = '16px';
        div.style.border = '2px solid rgba(0, 212, 255, 0.3)';
        div.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
        div.style.transition = 'all 0.3s ease';
        div.style.display = 'flex';
        div.style.alignItems = 'center';
        div.style.justifyContent = 'center';
        div.style.minHeight = '80px';
        div.textContent = '❓';
        
        div.onclick = () => {
            if(volteadas.length < 2 && !div.classList.contains('volteada') && !div.classList.contains('encontrada')) {
                reproducirSonido('click');
                div.textContent = c.val;
                div.classList.add('volteada');
                volteadas.push({div, c});
                
                if(volteadas.length === 2) {
                    intentos++;
                    if(volteadas[0].c.match === volteadas[1].c.match) {
                        reproducirSonido('correcto');
                        volteadas[0].div.classList.add('encontrada');
                        volteadas[1].div.classList.add('encontrada');
                        volteadas[0].div.style.background = 'linear-gradient(145deg, #1b5e20, #2e7d32)';
                        volteadas[0].div.style.border = '2px solid #69f0ae';
                        volteadas[0].div.style.boxShadow = '0 0 15px rgba(0, 230, 118, 0.4)';
                        volteadas[1].div.style.background = 'linear-gradient(145deg, #1b5e20, #2e7d32)';
                        volteadas[1].div.style.border = '2px solid #69f0ae';
                        volteadas[1].div.style.boxShadow = '0 0 15px rgba(0, 230, 118, 0.4)';
                        encontradas++;
                        document.getElementById('juego-puntaje-display').textContent = `Parejas: ${encontradas}/8`;
                        volteadas = [];
                        
                        if(encontradas === 8) {
                            let score = Math.max(10, 50 - (intentos - 8) * 3);
                            if(intentos <= 10) desbloquearLogro('memoria_perfecta');
                            setTimeout(() => finalizarJuego(score, 50), 1000);
                        }
                    } else {
                        reproducirSonido('error');
                        setTimeout(() => {
                            volteadas[0].div.textContent = '❓';
                            volteadas[1].div.textContent = '❓';
                            volteadas[0].div.classList.remove('volteada');
                            volteadas[1].div.classList.remove('volteada');
                            volteadas = [];
                        }, 1000);
                    }
                }
            }
        };
        grid.appendChild(div);
    });
    area.appendChild(grid);
}

// === ATRAPA ===
function iniciarAtrapa(numTabla, area) {
    document.getElementById('juego-instrucciones').textContent = 'Selecciona el resultado correcto.';
    let ronda = 0;
    let correctas = 0;
    
    let preguntaDiv = document.createElement('div');
    preguntaDiv.className = 'atrapa-pregunta';
    preguntaDiv.style.fontSize = '2rem';
    preguntaDiv.style.marginBottom = '20px';
    preguntaDiv.style.textAlign = 'center';
    
    let campo = document.createElement('div');
    campo.className = 'atrapa-campo';
    campo.style.position = 'relative';
    campo.style.height = '300px';
    campo.style.width = '100%';
    campo.style.background = '#0a0a2a';
    campo.style.borderRadius = '10px';
    campo.style.overflow = 'hidden';
    
    area.appendChild(preguntaDiv);
    area.appendChild(campo);
    
    function jugarRonda() {
        if(ronda >= 10) {
            finalizarJuego(correctas * 5, 50);
            return;
        }
        ronda++;
        campo.innerHTML = '';
        
        let m = Math.floor(Math.random()*10)+1;
        let ans = numTabla * m;
        preguntaDiv.textContent = `${numTabla} × ${m} = ?`;
        
        let ops = [ans];
        while(ops.length < 6) {
            let fake = numTabla * (Math.floor(Math.random()*12)+1);
            if(!ops.includes(fake)) ops.push(fake);
        }
        ops = shuffle(ops);
        
        // Calculate grid positions to prevent overlap
        const cols = 3;
        const rows = 2;
        const cellW = 100 / cols;
        const cellH = 100 / rows;
        const posiciones = [];
        for(let r = 0; r < rows; r++) {
            for(let c = 0; c < cols; c++) {
                posiciones.push({
                    left: (c * cellW) + (cellW * 0.15) + (Math.random() * cellW * 0.3),
                    top: (r * cellH) + (cellH * 0.1) + (Math.random() * cellH * 0.3)
                });
            }
        }
        const posicionesBarajadas = posiciones.sort(() => Math.random() - 0.5);
        
        ops.forEach((op, idx) => {
            let burbuja = document.createElement('div');
            burbuja.className = 'atrapa-burbuja';
            burbuja.style.position = 'absolute';
            burbuja.style.left = posicionesBarajadas[idx].left + '%';
            burbuja.style.top = posicionesBarajadas[idx].top + '%';
            burbuja.style.padding = '15px 20px';
            burbuja.style.background = 'linear-gradient(145deg, #4a148c, #7c4dff)';
            burbuja.style.color = 'white';
            burbuja.style.borderRadius = '50%';
            burbuja.style.cursor = 'pointer';
            burbuja.style.transition = 'all 0.3s';
            burbuja.style.minWidth = '55px';
            burbuja.style.textAlign = 'center';
            burbuja.style.fontFamily = "'Fredoka One', cursive";
            burbuja.style.fontSize = '1.2rem';
            burbuja.textContent = op;
            
            burbuja.onclick = () => {
                if(op === ans) {
                    reproducirSonido('correcto');
                    burbuja.style.background = '#4caf50';
                    burbuja.style.boxShadow = '0 0 20px #00e676';
                    correctas++;
                    document.getElementById('juego-puntaje-display').textContent = `Correctas: ${correctas}/10`;
                    setTimeout(jugarRonda, 700);
                } else {
                    reproducirSonido('error');
                    burbuja.style.background = '#f44336';
                    burbuja.style.boxShadow = '0 0 15px #ff5252';
                    burbuja.style.transform = 'scale(0.8)';
                    setTimeout(() => burbuja.remove(), 500);
                }
            };
            campo.appendChild(burbuja);
        });
    }
    jugarRonda();
}

// === ARRASTRA ===
function iniciarArrastra(numTabla, area) {
    document.getElementById('juego-instrucciones').textContent = 'Arrastra cada resultado a su operación.';
    let arrastraHtml = `
        <div class="arrastra-container" style="display:flex; justify-content:space-around; align-items:start; margin-top:20px;">
            <div class="arrastra-ecuaciones" id="drop-zone" style="width:40%;"></div>
            <div class="arrastra-respuestas" id="drag-zone" style="width:40%; display:flex; flex-wrap:wrap; gap:10px;"></div>
        </div>
    `;
    area.innerHTML = arrastraHtml;
    
    let multiplicadores = shuffle([1,2,3,4,5,6,7,8,9,10]).slice(0, 6);
    let dropZone = document.getElementById('drop-zone');
    let dragZone = document.getElementById('drag-zone');
    
    let piezas = [];
    let correctos = 0;
    let intentosError = 0;
    
    multiplicadores.forEach(m => {
        let ans = numTabla * m;
        piezas.push(ans);
        
        let ec = document.createElement('div');
        ec.className = 'arrastra-ecuacion';
        ec.style.marginBottom = '15px';
        ec.style.fontSize = '1.2rem';
        ec.innerHTML = `<span>${numTabla} × ${m} = </span> <span class="arrastra-slot" data-ans="${ans}" style="display:inline-block; width:50px; height:30px; border:2px dashed #ccc; vertical-align:middle;"></span>`;
        dropZone.appendChild(ec);
    });
    
    piezas = shuffle(piezas);
    piezas.forEach(p => {
        let pieza = document.createElement('div');
        pieza.className = 'arrastra-pieza';
        pieza.draggable = true;
        pieza.textContent = p;
        pieza.style.padding = '10px';
        pieza.style.background = '#ff9800';
        pieza.style.color = 'white';
        pieza.style.cursor = 'grab';
        pieza.style.borderRadius = '5px';
        
        pieza.ondragstart = e => {
            e.dataTransfer.setData('text/plain', p);
        };
        
        dragZone.appendChild(pieza);
    });
    
    document.querySelectorAll('.arrastra-slot').forEach(slot => {
        slot.ondragover = e => e.preventDefault();
        slot.ondrop = e => {
            e.preventDefault();
            let draggedVal = e.dataTransfer.getData('text/plain');
            if(draggedVal == slot.dataset.ans) {
                slot.textContent = draggedVal;
                slot.style.border = '2px solid #4caf50';
                slot.style.background = '#c8e6c9';
                reproducirSonido('correcto');
                
                let p = Array.from(document.querySelectorAll('.arrastra-pieza')).find(el => el.textContent == draggedVal && el.style.display !== 'none');
                if(p) p.style.display = 'none';
                
                correctos++;
                if(correctos === 6) {
                    let score = Math.max(0, 50 - intentosError * 3);
                    setTimeout(() => finalizarJuego(score, 50), 1000);
                }
            } else {
                slot.style.border = '2px solid #f44336';
                intentosError++;
                reproducirSonido('error');
                setTimeout(() => slot.style.border = '2px dashed #ccc', 800);
            }
        };
    });
}

// === DETECTIVE ===
function iniciarDetective(numTabla, area) {
    document.getElementById('juego-instrucciones').textContent = 'Descubre el número misterioso.';
    let ronda = 1;
    let correctasPrimera = 0;
    
    let container = document.createElement('div');
    container.className = 'detective-escena';
    container.style.textAlign = 'center';
    container.style.marginTop = '20px';
    area.appendChild(container);
    
    function jugarRonda() {
        if(ronda > 5) {
            if(correctasPrimera === 5) desbloquearLogro('detective');
            finalizarJuego(correctasPrimera * 10, 50);
            return;
        }
        
        let m = Math.floor(Math.random()*10)+1;
        let ans = numTabla * m;
        
        let pistas = [
            { texto: `Si me multiplicas por ${numTabla}, obtienes ${ans}. ¿Quién soy?`, resp: m },
            { texto: `Tienes ${numTabla} grupos iguales. En total hay ${ans} objetos. ¿Cuántos hay en cada grupo?`, resp: m },
            { texto: `¿Cuánto es ${numTabla} × ${m}?`, resp: ans },
            { texto: `Completa: ${numTabla} × ___ = ${ans}`, resp: m }
        ];
        
        let pistaObj = pistas[Math.floor(Math.random()*pistas.length)];
        let intentos = 0;
        
        container.innerHTML = `
            <h3 style="font-family: 'Fredoka One', cursive; font-size: 1.8rem; color: #ffd700; text-shadow: 0 0 12px rgba(255,215,0,0.5); margin-bottom: 15px;">🔍 Caso ${ronda} de 5</h3>
            <div class="detective-pista" style="font-size: 1.35rem; margin: 20px auto; max-width: 550px; padding: 22px 25px; background: linear-gradient(145deg, rgba(30, 33, 72, 0.95), rgba(15, 18, 45, 0.95)); border-radius: 16px; color: #ffffff; border: 2px solid rgba(0, 212, 255, 0.4); border-left: 6px solid #00d4ff; font-family: 'Nunito', sans-serif; font-weight: 800; line-height: 1.6; box-shadow: 0 8px 25px rgba(0,0,0,0.4), 0 0 15px rgba(0,212,255,0.15); text-shadow: 0 1px 3px rgba(0,0,0,0.8);">
                "${pistaObj.texto}"
            </div>
            <div style="margin: 20px 0;">
                <input type="number" id="det-input" class="detective-input" placeholder="?" style="font-size: 2rem; padding: 12px 20px; width: 140px; text-align: center; font-family: 'Fredoka One', cursive; background: rgba(10, 14, 39, 0.85); border: 2px solid #00d4ff; border-radius: 16px; color: #ffd700; box-shadow: 0 0 15px rgba(0,212,255,0.3); outline: none;">
            </div>
            <button id="det-btn" class="btn-primario" style="font-size: 1.2rem; padding: 14px 35px; box-shadow: 0 5px 20px rgba(0,212,255,0.4);">Resolver Caso 🔍</button>
            <p id="det-feedback" style="margin-top: 18px; font-weight: 800; font-family: 'Fredoka One', cursive; font-size: 1.25rem; min-height: 32px;"></p>
        `;
        
        const inputDet = document.getElementById('det-input');
        inputDet.focus();
        inputDet.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') document.getElementById('det-btn').click();
        });

        document.getElementById('det-btn').onclick = () => {
            let val = parseInt(document.getElementById('det-input').value);
            if(isNaN(val)) return;
            if(val === pistaObj.resp) {
                reproducirSonido('correcto');
                document.getElementById('det-feedback').textContent = '¡Correcto! Caso resuelto con éxito 🎉';
                document.getElementById('det-feedback').style.color = '#69f0ae';
                document.getElementById('det-feedback').style.textShadow = '0 0 10px rgba(105, 240, 174, 0.5)';
                if(intentos === 0) correctasPrimera++;
                ronda++;
                setTimeout(jugarRonda, 1500);
            } else {
                intentos++;
                reproducirSonido('error');
                document.getElementById('det-feedback').textContent = `Incorrecto. Pista: la respuesta se relaciona con la tabla del ${numTabla}. ¡Inténtalo de nuevo! 🔍`;
                document.getElementById('det-feedback').style.color = '#ff5252';
                document.getElementById('det-feedback').style.textShadow = '0 0 10px rgba(255, 82, 82, 0.5)';
            }
        };
    }
    jugarRonda();
}

// === TIEMPO ===
function iniciarTiempo(numTabla, area) {
    document.getElementById('juego-instrucciones').textContent = 'Responde tantas como puedas en 45 segundos.';
    let timeLeft = 45;
    let correctas = 0;
    let racha = 0;
    
    let timerDiv = document.createElement('div');
    timerDiv.className = 'tiempo-display';
    timerDiv.style.fontSize = '2.5rem';
    timerDiv.style.fontWeight = 'bold';
    timerDiv.style.textAlign = 'center';
    timerDiv.style.color = '#1e88e5';
    
    let preguntaDiv = document.createElement('div');
    preguntaDiv.className = 'tiempo-pregunta';
    preguntaDiv.style.fontSize = '2rem';
    preguntaDiv.style.textAlign = 'center';
    preguntaDiv.style.margin = '20px 0';
    
    let opsDiv = document.createElement('div');
    opsDiv.className = 'tiempo-opciones';
    opsDiv.style.display = 'flex';
    opsDiv.style.justifyContent = 'center';
    opsDiv.style.gap = '15px';
    
    area.appendChild(timerDiv);
    area.appendChild(preguntaDiv);
    area.appendChild(opsDiv);
    
    let timerInt = setInterval(() => {
        timeLeft--;
        timerDiv.textContent = `⏱️ ${timeLeft}s`;
        if(timeLeft < 10) timerDiv.style.color = 'red';
        if(timeLeft <= 0) {
            clearInterval(timerInt);
            desbloquearLogro('velocista');
            let score = Math.min(50, correctas * 5); // max 50 points
            finalizarJuego(score, 50);
        }
    }, 1000);
    
    function nuevaPregunta() {
        let m = Math.floor(Math.random()*10)+1;
        let ans = numTabla * m;
        preguntaDiv.textContent = `${numTabla} × ${m} = ?`;
        
        opsDiv.innerHTML = '';
        let ops = generarOpciones(ans, numTabla);
        
        ops.forEach(op => {
            let btn = document.createElement('button');
            btn.className = 'btn-acento tiempo-opcion';
            btn.style.fontSize = '1.5rem';
            btn.textContent = op;
            btn.onclick = () => {
                if(op === ans) {
                    btn.style.background = '#4caf50';
                    correctas++;
                    racha++;
                    reproducirSonido('correcto');
                    if(racha === 5) desbloquearLogro('racha_5');
                    document.getElementById('juego-puntaje-display').textContent = `Correctas: ${correctas}`;
                    setTimeout(nuevaPregunta, 300);
                } else {
                    btn.style.background = '#f44336';
                    racha = 0;
                    reproducirSonido('error');
                    setTimeout(nuevaPregunta, 500);
                }
            };
            opsDiv.appendChild(btn);
        });
    }
    
    nuevaPregunta();
}
