<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invitación Animada</title>
    <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet">
    <style>
        /* --- ESTILOS GENERALES --- */
        body {
            margin: 0;
            padding: 0;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #2c3e50; /* Fondo oscuro para resaltar el sobre */
            overflow: hidden;
            font-family: 'Arial', sans-serif;
        }

        /* --- CONTENEDOR PRINCIPAL --- */
        .scene {
            position: relative;
            width: 100%;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            perspective: 1000px; /* Para el efecto 3D de la solapa */
        }

        /* --- EL SOBRE (ENVELOPE) --- */
        .envelope-wrapper {
            position: absolute;
            width: 350px;
            height: 250px;
            z-index: 10;
            transition: transform 1.5s ease-in-out, opacity 1.5s ease-in-out;
            cursor: pointer;
        }

        /* Cuerpo del sobre (parte trasera) */
        .envelope-body {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 100%;
            background-color: #e6decf; /* Beige */
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        /* Solapa superior (la que se abre) */
        .flap {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #dccdb7; /* Beige un poco más oscuro para contraste */
            border-radius: 10px;
            clip-path: polygon(0 0, 100% 0, 50% 55%);
            transform-origin: top;
            transition: transform 0.6s ease-in-out, z-index 0.2s;
            z-index: 5;
        }

        /* Bolsillo (parte frontal inferior) */
        .pocket {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #f0eadd; /* Beige más claro */
            border-radius: 10px;
            clip-path: polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%);
            z-index: 4;
        }

        /* --- EL BOTÓN (SELLO) --- */
        .seal-btn {
            position: absolute;
            top: 55%; /* Justo en la punta de la solapa */
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100px;
            height: 100px;
            background-color: #bf0603; /* Rojo intenso */
            border: 4px double #ff6b6b; /* Contorno estilo sello */
            border-radius: 50%;
            color: white;
            font-family: 'Great Vibes', cursive; /* Letra en carta */
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 6;
            outline: none;
            box-shadow: 0 4px 10px rgba(0,0,0,0.4);
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            line-height: 1.1;
            transition: transform 0.2s, background-color 0.3s;
        }

        .seal-btn:hover {
            transform: translate(-50%, -50%) scale(1.05);
            background-color: #a30502;
        }

        /* --- EL CONTENIDO DE LA INVITACIÓN (OCULTO AL INICIO) --- */
        .invitation-card {
            position: absolute;
            width: 90%;
            max-width: 600px;
            background-color: #fffaf0;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            text-align: center;
            opacity: 0;
            transform: scale(0.8);
            transition: opacity 1s ease-in-out 1s, transform 1s ease-in-out 1s; /* Delay para esperar al sobre */
            z-index: 1;
        }

        .invitation-card h1 {
            font-family: 'Great Vibes', cursive;
            font-size: 3.5rem;
            color: #333;
            margin-bottom: 20px;
        }

        .invitation-card p {
            font-size: 1.2rem;
            line-height: 1.6;
            color: #555;
        }

        /* --- CLASES DE ANIMACIÓN (JavaScript las activa) --- */
        
        /* 1. Abrir la solapa */
        .envelope-wrapper.open .flap {
            transform: rotateX(180deg);
            z-index: 1; /* Pasa detrás del contenido */
        }

        /* 1.5 Desaparecer el botón */
        .envelope-wrapper.open .seal-btn {
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s;
        }

        /* 2. Zoom y Difuminado del sobre */
        .envelope-wrapper.zoom-out {
            transform: scale(5); /* Hace zoom in masivo (como si entraras) */
            opacity: 0; /* Se desvanece */
            pointer-events: none;
        }

        /* 3. Mostrar contenido */
        .invitation-card.visible {
            opacity: 1;
            transform: scale(1);
            z-index: 20;
        }

    </style>
</head>
<body>

    <div class="scene">
        
        <div class="envelope-wrapper" id="envelope">
            <div class="envelope-body"></div>
            <div class="flap"></div>
            <div class="pocket"></div>
            <button class="seal-btn" id="openBtn">Abrir<br>invitación</button>
        </div>

        <div class="invitation-card" id="invitation">
            <h1>¡Estás Invitado!</h1>
            <p>
                Nos complace invitarte a nuestra celebración especial.<br>
                Esperamos contar con tu presencia para compartir momentos inolvidables.
            </p>
            <br>
            <p><strong>Fecha:</strong> 25 de Diciembre, 2025</p>
            <p><strong>Lugar:</strong> Salón de Eventos Royal</p>
        </div>

    </div>

    <script>
        const btn = document.getElementById('openBtn');
        const envelope = document.getElementById('envelope');
        const invitation = document.getElementById('invitation');

        btn.addEventListener('click', () => {
            // 1. Abrir el sobre (gira la solapa y oculta el botón)
            envelope.classList.add('open');

            // 2. Esperar un momento a que se abra, y luego hacer zoom/difuminar
            setTimeout(() => {
                envelope.classList.add('zoom-out');
                
                // 3. Mostrar la carta final
                invitation.classList.add('visible');
            }, 800); // 800ms de espera tras el clic
        });
    </script>

</body>
</html>