//Ano
document.getElementById("year").textContent = new Date().getFullYear();

//Chuva
(function buildRain() {
    const container = document.getElementById("rain");
    if(!container){ return; }
    const cols = window.innerWidth < 700 ? 10 : 22;
    for (let i=0; i< cols; i++){
        const col = document.createElement("div");
        col.className = "col";
        col.style.left = `${(i / cols) * 100 + Math.random() * 3}%`;
        col.style.animationDuration = `${18 + Math.random() * 16}s`;
        col.style.animationDelay = `-${Math.random() * 18}s`;
        
        const scale = 0.6 + Math.random() * 0.8;
        col.style.fontSize = `${15 * scale}px`;
        col.style.opacity = `${scale}`;
        
        let s = ""
        for (let j=0; j<60; j++){ s += (Math.random() > 0.5 ? "1" : "0") + " ";}
        col.textContent = s;
        container.appendChild(col);
    }
})();

// Nav scroll state
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 8);
}, { passive: true });
// Mobile menu
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);
// Active link on scroll
const sections = ["sobre", "tecnologias", "projetos", "formacao", "cursos", "contato"]
  .map(id => document.getElementById(id));
const linkMap = {};
navLinks.querySelectorAll("a").forEach(a => {
  const id = a.getAttribute("href").slice(1);
  linkMap[id] = a;
});
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      Object.values(linkMap).forEach(a => a.classList.remove("active"));
      const link = linkMap[e.target.id];
      if (link) link.classList.add("active");
    }
  });
}, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
sections.forEach(s => s && navObserver.observe(s));
// Reveal on scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("in");
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// ===== Data =====
const technologies = [
  { name: "C",          icon: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8.5a4.5 4.5 0 1 0 0 7"/><circle cx="12" cy="12" r="10"/></svg>' },
  { name: "HTML5",      icon: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 3l1.5 17L12 22l6.5-2L20 3z"/><path d="M8 8h8l-.5 4H9l.3 3L12 16"/></svg>' },
  { name: "CSS3",       icon: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 3l1.5 17L12 22l6.5-2L20 3z"/><path d="M8 8h8M8 12h7l-.5 4-2.5 1-2.5-1"/></svg>' },
  { name: "JavaScript", icon: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M10 10v6a1.5 1.5 0 0 1-3 0"/><path d="M17 10.5a1.5 1.5 0 0 0-3 0c0 2 3 1.5 3 3.5a1.5 1.5 0 0 1-3 0"/></svg>' },
  { name: "Git",        icon: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="18" r="2"/><circle cx="6" cy="6" r="2"/><circle cx="18" cy="12" r="2"/><path d="M6 8v8M8 6h6a2 2 0 0 1 2 2v2"/></svg>' },
  { name: "GitHub",     icon: '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.8 1.19 1.83 1.19 3.09 0 4.43-2.69 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.55C20.22 21.38 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/></svg>' },
];
const projects = [
  {
    glyph: "{ R }",
    tag: "C · sistemas",
    title: "Sistema de Radar Espacial em C",
    desc: "Simulação de detecção e rastreamento de objetos espaciais com foco em estruturas de dados, leitura de arquivos e algoritmos de cálculo de proximidade.",
    tech: ["C", "Estruturas de Dados", "Algoritmos"],
    imagem: "./imgs/project1.png",
    github: "https://github.com/nycpacheco/RadarC",
    demo: "https://www.programiz.com/online-compiler/6F3WHkXJI9006",
  },
  {
    glyph: "</>",
    tag: "web · storage",
    title: "Website com LocalStorage",
    desc: "Aplicação web client-side que persiste preferências e dados do usuário usando LocalStorage, com interface responsiva e fluxo de cadastro.",
    tech: ["JavaScript", "HTML5", "CSS3"],
    imagem: "./imgs/project2.png",
    github: "https://github.com/nycpacheco/site-responsivo-localstorage",
    demo: "https://nycpacheco.github.io/site-responsivo-localstorage/",
  },
  {
    glyph: "[ ]",
    tag: "web · responsivo",
    title: "Página Web Responsiva",
    desc: "Landing page totalmente responsiva, construída com HTML5 e CSS3 modernos, com grid, flexbox e animações sutis para destacar conteúdo.",
    tech: ["HTML5", "CSS3", "Responsive"],
    imagem: "./imgs/project3.png",
    github: "https://github.com/nycpacheco/siteResponsivoJogodoGato",
    demo: "https://nycpacheco.github.io/siteResponsivoJogodoGato/",
  },
];
const courses = [
  { 
    mark: "Cisco", 
    name: "HTML Essentials", 
    meta: "Cisco Networking Academy",
    link: "https://www.credly.com/badges/54b6ae33-ee0d-462c-a365-fdc040b99967/public_url"
  },
  { 
    mark: "Cisco", 
    name: "CSS Essentials", 
    meta: "Cisco Networking Academy",
    link: "https://www.credly.com/badges/7b5ccd7a-4ff4-4d4d-bd22-001ce7285975/public_url"
  },
  { 
    mark: "Cisco", 
    name: "Introdução à Cybersegurança", 
    meta: "Cisco Networking Academy",
    link: "https://www.credly.com/badges/46640a42-dd58-429b-9a59-72c95f60b0a5/public_url"
  },
  { 
    mark: "Cisco", 
    name: "JavaScript Essentials", 
    meta: "Cisco Networking Academy (CURSANDO)",
    link: null // Sem link ainda por estar cursando
  }
];

// Render technologies
const techGrid = document.getElementById("techGrid");
technologies.forEach((t, i) => {
  const el = document.createElement("div");
  el.className = "card techCard reveal";
  el.style.transitionDelay = `${i * 40}ms`;
  el.innerHTML = `<span class="icon">${t.icon}</span><span class="name">${t.name}</span>`;
  techGrid.appendChild(el);
  revealObserver.observe(el);
});

// Render projects
const projectsGrid = document.getElementById("projectsGrid");

projects.forEach((proj) => {
  const card = document.createElement("article");
  card.className = "card projectCard reveal";
  
  card.innerHTML = `
    <div class="projectCover">
      <img src="${proj.imagem}" alt="Screenshot do ${proj.title}" class="coverImage" />
      <span class="tag">${proj.tag}</span>
      <span class="glyph">${proj.glyph}</span>
    </div>
    <div class="projectBody">
      <h3>${proj.title}</h3>
      <p>${proj.desc}</p>
      <div class="projectTech">
        ${proj.tech.map(t => `<span>${t}</span>`).join('')}
      </div>
      <div class="projectActions">
        <a href="${proj.github}" target="_blank" rel="noopener" class="btn btnGhost">Code</a>
        <a href="${proj.demo}" target="_blank" rel="noopener" class="btn btnPrimary">Demo</a>
      </div>
    </div>
  `;
  
  projectsGrid.appendChild(card);
  // Garante que a animação de scroll (reveal) funcione neles também!
  revealObserver.observe(card);
});

// Render courses
const courseGrid = document.getElementById("courseGrid");

if (courseGrid) {
  courses.forEach((c, i) => {
    const el = document.createElement("article");
    el.className = "card courseCard reveal";
    el.style.transitionDelay = `${i * 60}ms`;

    // Se tiver link, cria o botão do Credly. Se não (como JS), mostra um aviso sutil
    const actionButton = c.link 
      ? `<a href="${c.link}" target="_blank" rel="noopener" class="btn btnCourse">Ver Credencial</a>`
      : `<span class="courseStatus mono">Em andamento</span>`;

    el.innerHTML = `
    <span class="icon">${c.mark}</span>  <div class="courseContent">
      <div class="name">${c.name}</div>
      <div class="meta">${c.meta}</div>
    </div>
    <div class="courseActions">
      ${actionButton}
    </div>
  `;

    courseGrid.appendChild(el);
    
    // Garante que o seu efeito de scroll (reveal) continue funcionando neles
    if (typeof revealObserver !== 'undefined') {
      revealObserver.observe(el);
    }
  });
}

// Contact form integrado com Formspree via AJAX/Fetch
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    
    const name = document.getElementById("cName").value.trim();
    const email = document.getElementById("cEmail").value.trim();
    const msg = document.getElementById("cMsg").value.trim();
    
    // 1. Suas validações originais excelentes
    if (!name || !email || !msg) {
      status.textContent = "> erro: preencha todos os campos.";
      status.className = "formStatus mono err";
      return;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      status.textContent = "> erro: email inválido.";
      status.className = "formStatus mono err";
      return;
    }
    
    // Mostra um estado de "enviando" enquanto o Formspree processa
    status.textContent = "> enviando mensagem...";
    status.className = "formStatus mono";

    // 2. Preparando os dados para enviar para o Formspree
    const formData = new FormData(form);

    try {
      // Faz o envio em segundo plano para a URL que está no 'action' do seu HTML
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Se o Formspree aceitou o envio com sucesso:
        status.textContent = "> mensagem enviada com sucesso. retornarei em breve.";
        status.className = "formStatus mono ok";
        form.reset(); // Limpa os campos do formulário
      } else {
        // Se o Formspree retornou algum erro interno
        status.textContent = "> erro: não foi possível enviar. tente mais tarde.";
        status.className = "formStatus mono err";
      }
    } catch (error) {
      // Se a internet falhar ou cair no meio do envio
      status.textContent = "> erro de rede: verifique sua conexão.";
      status.className = "formStatus mono err";
    }
  });
}

window.addEventListener("scroll", () => {
  const nav = document.getElementById("nav");
  if (window.scrollY > 20) {
    nav.classList.add("scrooled"); // Usa o mesmo nome que está no seu CSS
  } else {
    nav.classList.remove("scrooled");
  }
});