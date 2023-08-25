import React from 'react'

const TableSkeleton = () => {
    return (
        <>
            <div >
                <div className={`display-flex space-between`}>
                    <p>CARGANDO</p>
                    <p>CARGANDO</p>
                    <p>CARGANDO</p>
                    <p>CARGANDO</p>
                    <p>CARGANDO</p>
                    <p>CARGANDO</p>
                    <p></p>
                </div>

                <div>
                    {
                        Array.from({ length: 20 }, (_, i) => <div key={i}>CARGANDO...</div>)
                    }
                </div>
            </div>
        </>
    )
}

export default TableSkeleton
