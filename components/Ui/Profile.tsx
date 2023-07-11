import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-solid-svg-icons';

export const ProfileBox = () => {

    const [profileOpen, setProfileOpen] = useState(false)

    return (
        <>
            <FontAwesomeIcon icon={faSquare} className="icon cursor" onClick={() => setProfileOpen(!profileOpen)}/>
            {
                profileOpen &&
                <div>
                    Abierto
                </div>
            }
        </>
    )
}
