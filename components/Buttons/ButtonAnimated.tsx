import React, { useState } from 'react'
import { useSpring, animated } from '@react-spring/web';
import useMeasure from 'react-use-measure'

interface ButtonAnimatedInterface {
    onSubmit: () => void;
    textDefault: string;
}

export default function ButtonAnimated({
    onSubmit,
    textDefault
}: ButtonAnimatedInterface) {

    const [ref, { width }] = useMeasure();
    const [open, toggle] = useState(false);
    const [text, setText] = useState(textDefault);

    const handleClick = () => {
        toggle(!open);
        setText(open ? textDefault : 'Enviando...');
    };

    const props = useSpring({
        width: open ? width : 0,
        onRest: () => onSubmit(),
    });

    return (
        <div ref={ref} className={"mainbutton"} onClick={handleClick}>
            <animated.div className={"fillbutton"} style={props} />
            <animated.div className={"contentbutton"}>{text}</animated.div>
        </div>
    )
}
