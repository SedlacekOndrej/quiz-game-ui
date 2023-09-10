export const fetchGet = async (url: string, signal: AbortSignal | undefined): Promise<any> => {
    const initReq: RequestInit = await getRequestInit("GET", null, signal);
    const response: Response = await fetch(url, initReq);

    if (!response.ok)

        throw await getQueryErrorMessage(response);

    return response.json();

};

export const fetchFileGet = async (url: string, signal: AbortSignal | undefined): Promise<Blob> => {
    const initReq: RequestInit = await getRequestInit("GET", null, signal);
    const response: Response = await fetch(url, initReq);

    if (!response.ok)

        throw await getQueryErrorMessage(response);

    return response.blob();

};

export const fetchPost = async (url: string, data: unknown): Promise<any> => {
    const initReq: RequestInit = await getRequestInit("POST", data);
    const response: Response = await fetch(url, initReq);

    if (!response.ok)

        throw await getQueryErrorMessage(response);

    return response.json();

};

export const fetchPut = async (url: string, data: unknown): Promise<any> => {
    const initReq: RequestInit = await getRequestInit("PUT", data);
    const response: Response = await fetch(url, initReq);

    if (!response.ok)

        throw await getQueryErrorMessage(response);

    return response;
};

export const fetchDelete = async (url: string, data: unknown): Promise<Response> => {
    const initReq: RequestInit = await getRequestInit("DELETE", data);
    const response: Response = await fetch(url, initReq);
    if (!response.ok)
        throw await getQueryErrorMessage(response);
    return response;
};

const getRequestInit = async (method: string, data?: unknown, signal?: AbortSignal): Promise<RequestInit> => {
    const request: RequestInit = {
        method: method,
        signal: signal,
        credentials: 'include'
    };

    if (data) {
        if (data instanceof FormData)
            request.body = data;
        else
            request.body = JSON.stringify(data);
    }
        request.headers = {
            'Content-Type': 'application/json',
        };
    return request;
};

const getQueryErrorMessage = async (response: Response): Promise<string> => {
    let message: string = `Error connecting to server`;
    const detailMessage: string | undefined = await response.json()
        .then(data => data.message ?? data.title)
        .catch(() => (message));
    if (detailMessage)
        message = detailMessage;
    return message;
};