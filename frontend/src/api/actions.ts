import { baseUrl, defaultHeaders } from "./configs";

export const getActions = async () => {
    const response = await fetch(`${baseUrl}/actions`);
    return response.json();
}

export const addActionToQueue = async (action: string) => {
    const response = await fetch(
        `${baseUrl}/actions`, 
        {
            method: "POST",
            headers: defaultHeaders,
            body: JSON.stringify({ action }), // example { action: "A" }
        }
    );
    return response.json();
}
