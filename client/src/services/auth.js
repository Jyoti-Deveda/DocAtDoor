import { BACKEND_URL } from "@/config/config";

export const register = async (data) => {
    const url = BACKEND_URL + "users/register";

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }

    try {
        const res = await fetch(url, options);
        return res.json();
    }
    catch (err) {
        // console.log(err);
    }
}

export const login = async (data) => {
    const url = BACKEND_URL + "users/login";

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }

    try {
        const res = await fetch(url, options);

        return res.json();
    }
    catch (err) {
        console.log(err);
    }

}
