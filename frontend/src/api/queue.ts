import { baseUrl} from "./configs";

export const getQueue = async () => {
    const response = await fetch(`${baseUrl}/queue`);
    return response.json();
}