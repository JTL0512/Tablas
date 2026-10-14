// Sistema de Sonidos Espaciales - Galaxia Multiplicadora
// Usa Web Audio API para generar sonidos sin necesidad de archivos MP3

const SonidosGalaxia = (() => {
    let audioCtx = null;
    
    function getContext() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }
    
    function playTone(frequency, duration, type = 'sine', volume = 0.3) {
        try {
            const ctx = getContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = type;
            osc.frequency.setValueAtTime(frequency, ctx.currentTime);
            gain.gain.setValueAtTime(volume, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + duration);
        } catch (e) {
            console.warn('Audio no disponible:', e);
        }
    }
    
    return {
        // Sonido de CORRECTO: Tres tonos ascendentes alegres
        correcto() {
            try {
                const ctx = getContext();
                const now = ctx.currentTime;
                [523.25, 659.25, 783.99].forEach((freq, i) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq, now + i * 0.1);
                    gain.gain.setValueAtTime(0.25, now + i * 0.1);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.25);
                    osc.start(now + i * 0.1);
                    osc.stop(now + i * 0.1 + 0.25);
                });
            } catch(e) { console.warn('Audio error:', e); }
        },
        
        // Sonido de ERROR: Tono descendente áspero
        error() {
            try {
                const ctx = getContext();
                const now = ctx.currentTime;
                [330, 220].forEach((freq, i) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.type = 'square';
                    osc.frequency.setValueAtTime(freq, now + i * 0.15);
                    gain.gain.setValueAtTime(0.15, now + i * 0.15);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.15 + 0.2);
                    osc.start(now + i * 0.15);
                    osc.stop(now + i * 0.15 + 0.2);
                });
            } catch(e) { console.warn('Audio error:', e); }
        },
        
        // Sonido de ÉXITO / CELEBRACIÓN: Fanfarria espacial
        exito() {
            try {
                const ctx = getContext();
                const now = ctx.currentTime;
                const notas = [523.25, 659.25, 783.99, 1046.50];
                notas.forEach((freq, i) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq, now + i * 0.12);
                    gain.gain.setValueAtTime(0.3, now + i * 0.12);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.4);
                    osc.start(now + i * 0.12);
                    osc.stop(now + i * 0.12 + 0.4);
                });
            } catch(e) { console.warn('Audio error:', e); }
        },
        
        // Sonido de CLICK / Selección
        click() {
            playTone(800, 0.08, 'sine', 0.15);
        },
        
        // Sonido de LOGRO DESBLOQUEADO
        logro() {
            try {
                const ctx = getContext();
                const now = ctx.currentTime;
                const notas = [440, 554.37, 659.25, 880, 1108.73];
                notas.forEach((freq, i) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq, now + i * 0.1);
                    gain.gain.setValueAtTime(0.2, now + i * 0.1);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.5);
                    osc.start(now + i * 0.1);
                    osc.stop(now + i * 0.1 + 0.5);
                });
            } catch(e) { console.warn('Audio error:', e); }
        },

        // Sonido de NAVEGACIÓN / Paso siguiente
        siguiente() {
            try {
                const ctx = getContext();
                const now = ctx.currentTime;
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(600, now);
                osc.frequency.linearRampToValueAtTime(900, now + 0.1);
                gain.gain.setValueAtTime(0.15, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
                osc.start(now);
                osc.stop(now + 0.15);
            } catch(e) { console.warn('Audio error:', e); }
        },

        // Sonido de CUENTA REGRESIVA / Tick
        tick() {
            playTone(1200, 0.05, 'sine', 0.1);
        },

        // Sonido de ALERTA / Tiempo acabándose
        alerta() {
            try {
                const ctx = getContext();
                const now = ctx.currentTime;
                [880, 440, 880].forEach((freq, i) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.type = 'square';
                    osc.frequency.setValueAtTime(freq, now + i * 0.1);
                    gain.gain.setValueAtTime(0.1, now + i * 0.1);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.1);
                    osc.start(now + i * 0.1);
                    osc.stop(now + i * 0.1 + 0.1);
                });
            } catch(e) { console.warn('Audio error:', e); }
        }
    };
})();
