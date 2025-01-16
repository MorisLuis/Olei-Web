import React, { useState } from 'react'
import FiltersComponent from './FiltersComponent'
import { useFiltersConfig } from '@/hooks/useFiltersSellsConfig';
import { CustumRender } from './RenderMarcaFilter';

/* 
    HOW FILTER ARE ORGANIZED:
    1. In CustumRender are the renders ( input or select ) of each filter.
    2. In FiltersComponent handle the menu and each submenu.
    3. In useFiltersConfig specify the filters.
    4. In HomeHeader ( another component ) we see the filters tags.
*/

export default function FilterHome() {

    const [openModal, setOpenModal] = useState(false);
    const [openModalBackground, setopenModalBackground] = useState(false);
    const { filters } = useFiltersConfig()
    const { CustumRenders } = CustumRender()

    const handleOpenModalFilters = () => {
        setopenModalBackground(!openModalBackground);
        setOpenModal(!openModal)
    };

    return (
        <>
            <FiltersComponent
                open={openModal}
                onOpenFilters={handleOpenModalFilters}
                filterSections={filters!}
                customRenders={CustumRenders}
            />

            {
                openModalBackground &&
                <div onClick={handleOpenModalFilters} className='backgroundModal'></div>
            }
        </>
    )
}
