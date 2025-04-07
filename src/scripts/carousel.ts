import EmblaCarousel, { type EmblaCarouselType, type EmblaOptionsType } from 'embla-carousel'

const initializeCarousels = () => {
  const OPTIONS: EmblaOptionsType = {
    dragFree: true,
    skipSnaps: false,
  }

  const carousels = document.querySelectorAll('.carousel') as NodeListOf<Element>

  carousels.forEach((carousel) => {
    // Selección de elementos dentro del carrusel actual
    const viewport = carousel.querySelector('.carousel__viewport') as HTMLElement
    const prevBtn = carousel.querySelector('.carousel__button__prev') as HTMLElement
    const nextBtn = carousel.querySelector('.carousel__button__next') as HTMLElement

    if (!viewport) return

    const embla: EmblaCarouselType = EmblaCarousel(viewport, OPTIONS)

    const updateButtons = () => {
      prevBtn?.toggleAttribute('disabled', !embla.canScrollPrev())
      nextBtn?.toggleAttribute('disabled', !embla.canScrollNext())
    }

    // Handlers de click únicos por instancia
    const onPrevClick: EventListener = () => {
      embla.scrollPrev()
      updateButtons()
    }

    const onNextClick: EventListener = () => {
      embla.scrollNext()
      updateButtons()
    }

    // Asignación de eventos
    prevBtn?.addEventListener('click', onPrevClick, { once: false })
    nextBtn?.addEventListener('click', onNextClick, { once: false })

    // Configuración de listeners de Embla
    embla.on('init', updateButtons)
    embla.on('select', updateButtons)
    embla.on('scroll', updateButtons)
    embla.on('destroy', () => {
      prevBtn?.removeEventListener('click', onPrevClick)
      nextBtn?.removeEventListener('click', onNextClick)
    })

    // Inicialización forzada
    embla.reInit()
  })
}

// Esperar a que el DOM esté completamente cargado
if (document.readyState === 'complete') {
  initializeCarousels()
} else {
  globalThis.addEventListener('DOMContentLoaded', initializeCarousels)
}
