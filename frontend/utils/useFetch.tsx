import { useState, useEffect } from "react";

export default function useFetch(url: string){
    const [data, setData] = useState<any>();
    const [isPending, setIsPending] = useState<boolean>(true);
    const [error, setError] = useState<any>();

    useEffect(() => {
        console.log("usefecth called");
        setTimeout(() => {
            fetch(url, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(res => {
                if (!res.ok) {
                    throw Error('could not fetch the data from '+url);
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                setIsPending(false);
                setError(err.message);
            })
        }, 1000);
    }, [])

    return {data, isPending, error};
}