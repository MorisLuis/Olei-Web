import { useEffect } from 'react';

function useLockBodyScroll(isActive: boolean) {
    useEffect(() => {
        if (isActive) {
            // Calcula el ancho del scrollbar
            const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
            // Aplica estilos para evitar el reajuste de ancho
            document.body.style.position = 'fixed';
            document.body.style.paddingRight = `${scrollBarWidth}px`;
        } else {
            // Limpia los estilos cuando se desactiva el hook
            document.body.style.position = '';
            document.body.style.paddingRight = '';
        }

        // Limpia los estilos cuando el componente se desmonta
        return () => {
            document.body.style.position = '';
            document.body.style.paddingRight = '';
        };
    }, [isActive]);
}

export default useLockBodyScroll;
