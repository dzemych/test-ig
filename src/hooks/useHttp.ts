import { useCallback, useState } from 'react'
import axios from 'axios'


const useHttp = () => {
   const apiUrl = 'https://recruitmentdb-508d.restdb.io/rest'

   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null)

   const request = useCallback
   (async (
      url: string,
      method = 'get',
      body = null,
      headers = {}
   ) => {
      setLoading(true)

      try {
         // To avoid CORS error I installed Moesif Origin & CORS Changer plugin in my browser
         const response = await axios.request({
            url: apiUrl + url,
            data: body,
            method,
            headers: {
               ...headers,
               'x-apikey': 'edf2a6114dde6136eb7db095302e37415c606',
            },
         })

         if (/ok/i.test(response.statusText))
            return response.data

      } catch (e) {
         console.log(e)
         setError(e)
      } finally {
         setLoading(false)
      }
   }, [])

   return { loading, error, request }
}

export default useHttp