export interface LoginResponse {
    code: number,
    data: {
        access_token: string,
        token_type: string,
        user:{
            id: number,
            name: string,
        }
        error: string,
    },
    status: string,
    message: string,
}
