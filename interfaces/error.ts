export interface ApiError {
    response: {
        data: {
            errors: { message: string }[]
        }
    };
}

