import { Component, ViewEncapsulation, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-inicio',
  imports: [],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css'],
  encapsulation: ViewEncapsulation.None
})
export class Inicio implements AfterViewInit {

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.inicializarAnimaciones();
    }
  }

  galeria() {
    this.router.navigate(['/catalogo']);
  }

  inicio() {
    this.router.navigate(['/inicio']);
  }

  private inicializarAnimaciones(): void {
    // Crear partículas flotantes
    const container = document.getElementById('particles');
    if (!container) return;

    const numParticulas = 15;
    
    for (let i = 0; i < numParticulas; i++) {
      const particula = document.createElement('div');
      particula.className = 'particle';
      
      const size = Math.random() * 30 + 10;
      particula.style.width = size + 'px';
      particula.style.height = size + 'px';
      particula.style.left = Math.random() * 100 + '%';
      particula.style.top = Math.random() * 100 + '%';
      particula.style.animationDelay = Math.random() * 5 + 's';
      particula.style.animationDuration = (Math.random() * 10 + 10) + 's';
      
      container.appendChild(particula);
    }

    // Mensajes aleatorios del perrito
    const mensajes = [
      '¡Hola! 🐾',
      '¡Bienvenidos! 🐾',
      '¡Mira nuestros productos! 👀',
      '¡Calidad garantizada! ⭐',
      '¡Te esperamos! 💚'
    ];

    setInterval(() => {
      const speech = document.querySelector('.perrito-speech');
      if (speech) {
        const mensaje = mensajes[Math.floor(Math.random() * mensajes.length)];
        (speech as HTMLElement).textContent = mensaje;
      }
    }, 5000);

    // Carrusel
    let slideActual = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;

    function mostrarSlide(n: number): void {
      if (n >= totalSlides) slideActual = 0;
      if (n < 0) slideActual = totalSlides - 1;
      
      const carrusel = document.getElementById('carrusel');
      if (carrusel) {
        (carrusel as HTMLElement).style.transform = `translateX(-${slideActual * 100}%)`;
      }
      
      dots.forEach((dot, index) => {
        (dot as HTMLElement).classList.toggle('active', index === slideActual);
      });
    }

    function cambiarSlide(n: number): void {
      slideActual += n;
      mostrarSlide(slideActual);
    }

    function irASlide(n: number): void {
      slideActual = n;
      mostrarSlide(slideActual);
    }

    // Auto-avance del carrusel
    setInterval(() => {
      cambiarSlide(1);
    }, 5000);

    // Event listeners para dots (asumiendo que los dots tienen data-slide o similar; ajusta si es necesario)
    (dots as NodeListOf<HTMLElement>).forEach((dot, index) => {
      dot.addEventListener('click', () => irASlide(index));
    });

    // Animación de scroll para las tarjetas
    const observador = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = '1';
          (entry.target as HTMLElement).style.transform = 'translateY(0)';
        }
      });
    }, {
      threshold: 0.1
    });

    document.querySelectorAll('.producto-card').forEach(card => {
      observador.observe(card);
    });

    // Animación de números contador
    function animarContador(elemento: HTMLElement, valorFinal: number, duracion: number): void {
      let valorInicial = 0;
      const incremento = valorFinal / (duracion / 16);
      
      const timer = setInterval(() => {
        valorInicial += incremento;
        if (valorInicial >= valorFinal) {
          elemento.textContent = valorFinal + (valorFinal < 100 ? '+' : '%');
          clearInterval(timer);
        } else {
          elemento.textContent = Math.floor(valorInicial) + (valorFinal < 100 ? '+' : '%');
        }
      }, 16);
    }

    // Observador para los contadores
    const observadorStats = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !(entry.target as HTMLElement).classList.contains('counted')) {
          (entry.target as HTMLElement).classList.add('counted');
          const numero = entry.target.querySelector('.stat-number') as HTMLElement;
          if (numero) {
            const valor = parseInt(numero.textContent || '0');
            animarContador(numero, valor, 2000);
          }
        }
      });
    }, {
      threshold: 0.5
    });

    document.querySelectorAll('.stat').forEach(stat => {
      observadorStats.observe(stat);
    });

    // Efecto parallax en el hero
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero') as HTMLElement;
      if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    });

    // Añadir efecto de ondas al hacer clic en los botones
    (document.querySelectorAll('.cta-button') as NodeListOf<HTMLElement>).forEach(button => {
      button.addEventListener('click', (e: MouseEvent) => {
        let ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.width = ripple.style.height = '100px';
        ripple.style.marginLeft = '-50px';
        ripple.style.marginTop = '-50px';
        ripple.style.left = (e.clientX - button.offsetLeft) + 'px';
        ripple.style.top = (e.clientY - button.offsetTop) + 'px';
        ripple.style.animation = 'ripple 0.6s';
        ripple.style.pointerEvents = 'none';
        
        button.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });

    // Animación del perrito al hacer click
    const perrito = document.querySelector('.perrito') as HTMLElement;
    if (perrito) {
      perrito.addEventListener('click', () => {
        perrito.style.animation = 'none';
        setTimeout(() => {
          perrito.style.animation = 'perrito-spin 0.8s ease-in-out';
        }, 10);
      });
    }

    // Efecto de confetti al hacer click en el perrito (cada 3 clicks)
    let clicksPerrito = 0;
    if (perrito) {
      perrito.addEventListener('click', () => {
        clicksPerrito++;
        if (clicksPerrito % 3 === 0) {
          this.crearConfetti();
        }
      });
    }

    // Función confetti movida al componente
    this.crearConfetti = this.crearConfetti.bind(this);
  }

  private crearConfetti(): void {
    const colores = ['#f4b41a', '#2d5016', '#ff4757', '#2ed573', '#4facfe'];
    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${colores[Math.floor(Math.random() * colores.length)]};
        top: 50%;
        left: 50%;
        opacity: 1;
        pointer-events: none;
        z-index: 10000;
        border-radius: 50%;
      `;
      
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 500 + 300;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;
      
      confetti.style.animation = `confettiFall${i} ${Math.random() * 2 + 2}s ease-out forwards`;
      
      const keyframes = `
        @keyframes confettiFall${i} {
          to {
            transform: translate(${tx}px, ${ty + 500}px) rotate(${Math.random() * 720}deg);
            opacity: 0;
          }
        }
      `;
      
      const styleSheet = document.createElement('style');
      styleSheet.textContent = keyframes;
      document.head.appendChild(styleSheet);
      
      document.body.appendChild(confetti);
      
      setTimeout(() => {
        confetti.remove();
        styleSheet.remove();
      }, 4000);
    }
  }

}