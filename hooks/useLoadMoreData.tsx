import FiltersInterface from "@/interfaces/filters";
import useErrorHandler from "./useErrorHandler";
import { useCallback, useState } from "react";

interface useLoadMoreDataInterface {
    fetchInitialData: (filters?: FiltersInterface) => Promise<[]>;
    fetchPaginatedData: (filters?: FiltersInterface, page?: number) => Promise<[]>;
    filters?: FiltersInterface;
    fetchTotalCount?: (filters?: FiltersInterface) => Promise<number>;
}

export const useLoadMoreData = ({
    fetchInitialData,
    fetchPaginatedData,
    fetchTotalCount,
    filters
}: useLoadMoreDataInterface) => {

    const { handleError } = useErrorHandler();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonLoading, setButtonIsLoading] = useState(false);
    const [total, setTotal] = useState<number | null>(null);

    const handleResetData = useCallback(async () => {
        setIsLoading(true);
        try {
            const initialData = await fetchInitialData(filters);
            setData(initialData);
            setPage(1);

            if (fetchTotalCount) {
                const total = await fetchTotalCount(filters);
                setTotal(total);
            }
        } catch (error) {
            handleError(error)
        } finally {
            setIsLoading(false);
        }
    }, [fetchInitialData, filters]);

    const handleLoadMore = useCallback(async () => {
        setButtonIsLoading(true);
        try {
            const nextPage = page + 1;
            const moreData = await fetchPaginatedData(filters, nextPage);
            setData(prevData => [...prevData, ...moreData]);
            setPage(nextPage);
        } catch (error) {
            handleError(error)
        } finally {
            setButtonIsLoading(false);
        }
    }, [fetchPaginatedData, filters, page]);

    return {
        data,
        isLoading,
        isButtonLoading,
        total,
        handleResetData,
        handleLoadMore,
    };
}