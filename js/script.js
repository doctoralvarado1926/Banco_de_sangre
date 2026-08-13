// Array completo con las 24 imágenes
const listaImagenes = [
    { src: 'img/foto1.jpg', titulo: 'Fachada Principal' },
    { src: 'img/foto2.jpg', titulo: 'Donar Sangre es Salvar Vidas' },
    { src: 'img/foto3.jpg', titulo: 'Servicios Médicos Especializados' },
    { src: 'img/foto4.jpg', titulo: 'Atención al Paciente' },
    { src: 'img/foto5.jpg', titulo: 'Donación de Sangre' },
    { src: 'img/foto6.jpg', titulo: 'Horarios de Atención' },
    { src: 'img/foto7.jpg', titulo: 'Servicios de Laboratorio' },
    { src: 'img/instalaciones_1.jpg', titulo: 'Instalaciones Interiores 1' },
    { src: 'img/instalaciones_2.jpg', titulo: 'Instalaciones Interiores 2' },
    { src: 'img/instalaciones_3.jpg', titulo: 'Instalaciones Interiores 3' },
    { src: 'img/instalaciones_4.jpg', titulo: 'Pasillos y Áreas Clínicas' },
    { src: 'img/instalaciones_5.jpg', titulo: 'Oficina de Atención' },
    { src: 'img/instalaciones_6.jpg', titulo: 'Sala de Consulta' },
    { src: 'img/instalaciones_7.jpg', titulo: 'Equipo de Laboratorio Biobase' },
    { src: 'img/instalaciones_8.jpg', titulo: 'Sala de Espera y Confort' },
    { src: 'img/instalaciones_9.jpg', titulo: 'Área de Laboratorio' },
    { src: 'img/instalaciones_10.jpg', titulo: 'Procesamiento Biomédico' },
    { src: 'img/instalaciones_11.jpg', titulo: 'Analizadores Digitales' },
    { src: 'img/instalaciones_12.jpg', titulo: 'Refrigeración Cadena de Frío' },
    { src: 'img/instalaciones_13.jpg', titulo: 'Centrífuga Hematológica' },
    { src: 'img/instalaciones_14.jpg', titulo: 'Analizador Architect Plus' },
    { src: 'img/logo_banco_sangre.jpg', titulo: 'Logo Oficial Banco de Sangre' },
    { src: 'img/por_fuera.jpg', titulo: 'Vista Exterior Zona 1' },
    { src: 'img/por_fuera2.jpg', titulo: 'Entrada Edificio Principal' }
];

const imagenesPorPagina = 6;
let paginaActual = 1;

document.addEventListener('DOMContentLoaded', () => {
    renderizarGaleria(paginaActual);
    renderizarPaginacion();
    initChatbot();
});

// Renderizado de Galería
function renderizarGaleria(pagina) {
    paginaActual = pagina;
    const contenedor = document.getElementById('contenedorGaleria');
    contenedor.innerHTML = '';

    const inicio = (pagina - 1) * imagenesPorPagina;
    const fin = inicio + imagenesPorPagina;
    const imagenesPagina = listaImagenes.slice(inicio, fin);

    imagenesPagina.forEach((img) => {
        const col = document.createElement('div');
        col.className = 'col-md-4 col-sm-6 animate-fade-in';
        col.innerHTML = `
            <div class="card h-100 border-0 shadow-sm card-galeria overflow-hidden bg-white">
                <img src="${img.src}" class="card-img-top cursor-pointer hover-zoom" style="height: 220px; object-fit: cover;" alt="${img.titulo}" onclick="abrirModalImagen('${img.src}', '${img.titulo}')">
                <div class="card-body p-3 text-center">
                    <h6 class="fw-bold text-navy mb-0">${img.titulo}</h6>
                </div>
            </div>
        `;
        contenedor.appendChild(col);
    });

    renderizarPaginacion();
}

function renderizarPaginacion() {
    const paginacionUl = document.getElementById('paginacionGaleria');
    paginacionUl.innerHTML = '';

    const totalPaginas = Math.ceil(listaImagenes.length / imagenesPorPagina);

    for (let i = 1; i <= totalPaginas; i++) {
        const li = document.createElement('li');
        li.className = `page-item ${i === paginaActual ? 'active' : ''}`;
        li.innerHTML = `<button class="page-link fw-bold" onclick="renderizarGaleria(${i})">${i}</button>`;
        paginacionUl.appendChild(li);
    }
}

function abrirModalImagen(src, titulo) {
    document.getElementById('visorImagenSrc').src = src;
    document.getElementById('visorImagenTitulo').innerText = titulo;
    const modalVisor = new bootstrap.Modal(document.getElementById('modalVisorImagen'));
    modalVisor.show();
}

function consultarDisponibilidad() {
    const tipo = document.getElementById('selectTipoSangre').value;
    const ubicacion = document.getElementById('selectUbicacion').value;

    let mensaje = `Hola, solicito información sobre disponibilidad urgente de unidades de sangre tipo *${tipo}* para atender en *${ubicacion}*.`;
    let url = `https://wa.me/50258041458?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

// Chatbot Inteligente Avanzado
function initChatbot() {
    const toggleBtn = document.getElementById('chatbotToggle');
    const closeBtn = document.getElementById('chatbotClose');
    const box = document.getElementById('chatbotBox');
    const input = document.getElementById('chatInput');

    toggleBtn.addEventListener('click', () => {
        box.classList.toggle('d-none');
    });

    closeBtn.addEventListener('click', () => {
        box.classList.add('d-none');
    });

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendCustomMsg();
        }
    });
}

function sendQuickMsg(text) {
    appendUserMsg(text);
    processBotResponse(text);
}

function sendCustomMsg() {
    const input = document.getElementById('chatInput');
    const val = input.value.trim();
    if (val !== '') {
        appendUserMsg(val);
        input.value = '';
        processBotResponse(val);
    }
}

function appendUserMsg(msg) {
    const container = document.getElementById('chatbotMessages');
    const div = document.createElement('div');
    div.className = 'chat-msg user-msg mb-2';
    div.innerText = msg;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function appendBotMsg(msg) {
    const container = document.getElementById('chatbotMessages');
    const div = document.createElement('div');
    div.className = 'chat-msg bot-msg mb-2';
    div.innerHTML = msg;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

// Motor Inteligente de Procesamiento de Respuestas
function processBotResponse(query) {
    const q = query.toLowerCase();
    
    setTimeout(() => {
        if (q.includes('correo') || q.includes('email') || q.includes('gmail') || q.includes('escribir')) {
            appendBotMsg('Puedes enviarnos un correo haciendo clic directo <a href="https://mail.google.com/mail/?view=cm&fs=1&to=bancodesangredr.alvarado@gmail.com&su=Consulta%20desde%20Chatbot" target="_blank" class="fw-bold text-danger">AQUÍ para abrir Gmail</a> o escribir a <strong>bancodesangredr.alvarado@gmail.com</strong>.');
        } 
        else if (q.includes('sangre') || q.includes('unidad') || q.includes('urgente') || q.includes('stock')) {
            appendBotMsg('Contamos con stock de unidades <strong>O Negativo (Universal), O Positivo y AB Positivo</strong>. Puedes llamar directo al PBX <strong>2232 9243</strong>.');
        } 
        else if (q.includes('ubicacion') || q.includes('direccion') || q.includes('donde') || q.includes('llegar') || q.includes('mapa')) {
            appendBotMsg('Estamos ubicados en la <strong>6ta avenida 1-03 zona 1, Ciudad de Guatemala</strong>. Abrimos las 24 horas del día.');
        } 
        else if (q.includes('requisito') || q.includes('donar') || q.includes('puedo donar')) {
            appendBotMsg('Los requisitos para donar son: Tener entre 18 y 65 años, peso mínimo de 110 lbs, DPI vigente y ayuno mínimo de 4 horas.');
        } 
        else if (q.includes('celula') || q.includes('madre') || q.includes('terapia')) {
            appendBotMsg('Somos laboratorio certificado en terapias celulares y aislamiento de células madre. Para detalles sobre costos y citas comunícate al <strong>2232 9243</strong>.');
        } 
        else if (q.includes('domicilio') || q.includes('entrega') || q.includes('chimaltenango') || q.includes('amatitlan')) {
            appendBotMsg('Cubrimos entregas con cadena de frío en la <strong>Capital, Chimaltenango y Amatitlán</strong> las 24 horas del día.');
        } 
        else if (q.includes('messenger') || q.includes('facebook') || q.includes('fb')) {
            appendBotMsg('Escríbenos por Facebook Messenger en nuestro <a href="https://m.me/100069655849729" target="_blank" class="fw-bold text-primary">Chat Oficial</a>.');
        } 
        else if (q.includes('whatsapp') || q.includes('numero') || q.includes('telefono') || q.includes('celular')) {
            appendBotMsg('Llamadas normales: <strong>2232 9243</strong>.<br>WhatsApp guardia: <strong>5804 1458</strong> o <strong>5959 0055</strong>.');
        } 
        else if (q.includes('hola') || q.includes('buenas') || q.includes('saludos')) {
            appendBotMsg('¡Hola! Es un gusto atenderte. ¿En qué información sobre unidades de sangre o células madres te puedo servir?');
        } 
        else {
            appendBotMsg('Gracias por contactarnos. Para una consulta personalizada puedes llamarnos al <strong>2232 9243</strong> o enviarnos un correo a <a href="https://mail.google.com/mail/?view=cm&fs=1&to=bancodesangredr.alvarado@gmail.com" target="_blank" class="fw-bold text-danger">bancodesangredr.alvarado@gmail.com</a>.');
        }
    }, 450);
}