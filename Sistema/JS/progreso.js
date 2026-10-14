function actualizarPuntaje(puntos) {
    if(!window.datosEstudiante) return;
    window.datosEstudiante.puntajeTotal += puntos;
    guardarDatos(window.datosEstudiante);
    
    const headerPuntaje = document.getElementById('menu-puntaje');
    if(headerPuntaje) {
        headerPuntaje.textContent = window.datosEstudiante.puntajeTotal + ' pts';
        
        // Float animation
        const floatAnim = document.createElement('span');
        floatAnim.textContent = `+${puntos}`;
        floatAnim.style.position = 'absolute';
        floatAnim.style.color = '#ffd54f';
        floatAnim.style.fontWeight = 'bold';
        floatAnim.classList.add('anim-float');
        headerPuntaje.appendChild(floatAnim);
        
        setTimeout(() => floatAnim.remove(), 2000);
    }
    
    verificarLogros();
}

function desbloquearLogro(logroId) {
    if(!window.datosEstudiante.logros.includes(logroId)) {
        window.datosEstudiante.logros.push(logroId);
        guardarDatos(window.datosEstudiante);
        
        const logroInfo = LOGROS.find(l => l.id === logroId);
        if(logroInfo) {
            mostrarNotificacion(`🎉 ¡Logro desbloqueado! ${logroInfo.nombre}`, 'exito');
            actualizarPuntaje(25);
        }
    }
}

function calcularEstrellas(porcentaje) {
    if (porcentaje <= 40) return 0;
    if (porcentaje <= 60) return 1;
    if (porcentaje <= 80) return 2;
    return 3;
}

function verificarSimceDesbloqueado() {
    if(window.datosEstudiante.simceDesbloqueado) return true;
    
    let tablasAprendidas = 0;
    for(let i=2; i<=10; i++) {
        if(window.datosEstudiante.tablas[i].aprendida) tablasAprendidas++;
    }
    
    if(tablasAprendidas >= 5) {
        window.datosEstudiante.simceDesbloqueado = true;
        guardarDatos(window.datosEstudiante);
        mostrarNotificacion('🔓 ¡Prueba SIMCE desbloqueada!', 'exito');
        return true;
    }
    return false;
}

function verificarLogros() {
    const d = window.datosEstudiante;
    let tablasAprendidas = 0;
    for(let i=2; i<=10; i++) {
        if(d.tablas[i].aprendida) tablasAprendidas++;
    }
    
    if (tablasAprendidas >= 1) desbloquearLogro('primera_tabla');
    if (tablasAprendidas >= 3) desbloquearLogro('tres_tablas');
    if (tablasAprendidas >= 5) desbloquearLogro('cinco_tablas');
    if (tablasAprendidas >= 9) desbloquearLogro('todas_tablas');
    
    if (d.puntajeTotal >= 500) desbloquearLogro('puntaje_500');
    if (d.puntajeTotal >= 1000) desbloquearLogro('puntaje_1000');
    
    if (d.simceResultado) {
        desbloquearLogro('simce_completo');
        if (d.simceResultado.puntaje === d.simceResultado.total) {
            desbloquearLogro('simce_perfecto');
        }
    }
}

function renderizarProgreso() {
    const d = window.datosEstudiante;
    
    let tablasAprendidas = 0;
    let juegosJugados = 0;
    
    for(let i=2; i<=10; i++) {
        if(d.tablas[i].aprendida) tablasAprendidas++;
        juegosJugados += d.tablas[i].juegosCompletados.length;
    }
    
    const resumen = document.getElementById('progreso-resumen');
    if(resumen) {
        resumen.innerHTML = `
            <div class="stat-card"><div class="stat-valor">${d.puntajeTotal}</div><div class="stat-label">Puntos Totales</div></div>
            <div class="stat-card"><div class="stat-valor">${tablasAprendidas}/9</div><div class="stat-label">Tablas Aprendidas</div></div>
            <div class="stat-card"><div class="stat-valor">${d.logros.length}/${LOGROS.length}</div><div class="stat-label">Logros Obtenidos</div></div>
            <div class="stat-card"><div class="stat-valor">${juegosJugados}</div><div class="stat-label">Juegos Completados</div></div>
        `;
    }
    
    const barra = document.getElementById('progreso-barra-general');
    const porcentajeTexto = document.getElementById('progreso-porcentaje');
    const porcentaje = Math.round((tablasAprendidas / 9) * 100);
    
    if(barra) barra.style.width = porcentaje + '%';
    if(porcentajeTexto) porcentajeTexto.textContent = porcentaje + '% Completado';
    
    const detalle = document.getElementById('progreso-detalle');
    if(detalle) {
        detalle.innerHTML = '';
        for(let i=2; i<=10; i++) {
            const td = d.tablas[i];
            const p = PLANETAS[i];
            const div = document.createElement('div');
            div.className = 'progreso-tabla-card tarjeta';
            
            let estrellasHTML = '';
            for(let s = 1; s <= 3; s++) {
                estrellasHTML += `<span class="estrella ${s <= td.estrellas ? 'activa' : 'inactiva'}">⭐</span>`;
            }
            
            let estado = td.aprendida ? 'Completada ✅' : (td.puntaje > 0 ? 'En progreso 🚧' : 'Bloqueada 🔒');
            if (i === 2 || (d.tablas[i-1] && d.tablas[i-1].aprendida)) {
                if(!td.aprendida && td.puntaje === 0) estado = 'Desbloqueada 🚀';
            }
            
            div.innerHTML = `
                <div style="display:flex; align-items:center; gap:12px; margin-bottom:10px;">
                    <div class="planeta-esfera-wrapper" style="width:40px; height:40px; margin:0;">
                        ${i === 7 ? '<div class="anillo-saturno" style="width:52px; height:16px; border-width:4px;"></div>' : ''}
                        <div class="planeta-esfera planeta-${i}" style="width:36px; height:36px;"></div>
                    </div>
                    <div style="text-align:left;">
                        <h3 style="margin:0; font-size:1.1rem;">${p.nombre}</h3>
                        <span style="color:var(--color-primary); font-size:0.85rem; font-weight:bold;">Tabla del ${i}</span>
                    </div>
                </div>
                <p>Estado: <strong>${estado}</strong></p>
                <div>${estrellasHTML}</div>
                <p style="color:var(--color-text-muted); font-size:0.85rem; margin-top:5px;">Misiones completadas: ${td.juegosCompletados.length}/5</p>
            `;
            detalle.appendChild(div);
        }
    }
}

function renderizarLogros() {
    const grid = document.getElementById('logros-grid');
    if(!grid) return;
    
    grid.innerHTML = '';
    const d = window.datosEstudiante;
    
    LOGROS.forEach(logro => {
        const desbloqueado = d.logros.includes(logro.id);
        const card = document.createElement('div');
        card.className = `logro-card tarjeta ${desbloqueado ? 'logro-desbloqueado anim-glow' : 'logro-bloqueado'}`;
        card.innerHTML = `
            <h3>${desbloqueado ? logro.nombre : '🔒 ' + logro.nombre}</h3>
            <p>${logro.desc}</p>
        `;
        grid.appendChild(card);
    });
}
