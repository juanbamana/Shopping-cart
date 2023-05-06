import { useState, useEffect } from "react";



export const useFetch = (url, options) => {


    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [result, setResult] = useState(null)


    useEffect(() => {
        (async () => {

            try {
                const response = await fetch(url, options)
                const json = await response.json()
                setResult(json)
                setLoading(false)
            } catch  (err) {       
                setLoading(false)
                setError(err)

            }
        })()


    
}, [url, options]);


return { loading, error, result};


}
