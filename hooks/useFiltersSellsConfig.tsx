import { faClock, faFile, faCalendar, IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface filtersConfigInterface {
    value: "Marca" | "Familia" | "Codigo",
    label: "Marca" | "Familia" | "Codigo",
    icon: IconDefinition
}

export const useFiltersConfig = () => {

    const filters: filtersConfigInterface[] = [
        { value: 'Marca', label: 'Marca', icon: faCalendar },
        { value: 'Familia', label: 'Familia', icon: faClock },
        { value: 'Codigo', label: 'Codigo', icon: faFile }
    ];

    return { filters };
};
