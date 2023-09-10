interface Props {
    queryParams: Record<string, any>,
    url?: string
}

const QueryParams = () => {

    const handleQueryParams = ({
        queryParams,
        url = "/products"
    }: Props) => {

        const addQueryParam = (paramName: string, value: any) => {
            if (value !== null && value !== "" && value !== undefined && value !== false) {
                url += `${url.includes('?') ? '&' : '?'}${paramName}=${value}`;
            }
        };

        for (const [paramName, value] of Object.entries(queryParams)) {
            addQueryParam(paramName, value);
        }

        return url;
    };

    return handleQueryParams;
};

export default QueryParams;
