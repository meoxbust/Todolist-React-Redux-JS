import { useEffect, useState } from "react";

const useFetch = (key, callback) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try{
                setLoading(true);
                const data = await callback();
                setData(data);
            }
            catch(error){
                console.log(error);
                setError(error);
            }
            finally{
                setLoading(false);
            }
        };
        getData();
    }, [key]);
    return {data, error, loading};
};

export default useFetch;