import { FC, ReactNode } from 'react';
import { useTransition, animated } from 'react-spring';


interface PageTransitionProps {
    children: ReactNode;
    isEntering: boolean;
}

const PageTransition: FC<PageTransitionProps> = ({ children, isEntering }) => {


    const transitions = useTransition(isEntering, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 500 },
    });

    return (
        <>
            {transitions((style, item) =>
                item && (
                    <animated.div style={style}>
                        {children}
                    </animated.div>
                )
            )}
        </>
    );
};

export default PageTransition;
