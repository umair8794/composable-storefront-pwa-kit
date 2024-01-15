import React from 'react'
import fetch from 'cross-fetch'
import {useQuery} from '@tanstack/react-query'
import {useParams} from 'react-router-dom'
import {HTTPError} from 'pwa-kit-react-sdk/ssr/universal/errors'

const ContentDetails = () => {
    const params = useParams()

    let siteId = 'RefArch'
    let clientId = '66e30f6b-deeb-43b2-b99a-5192fe16d6d9'
    let ocapiVersion = 'v23_2'

    const {data, error, isLoading} = useQuery({
        queryKey: [params.id],
        queryFn: () => {
            return fetch(
                `http://localhost:3000/mobify/proxy/ocapi/s/${siteId}/dw/shop/${ocapiVersion}/content/${params.id}?client_id=${clientId}`
            )
                .then((res) => res.json())
                .then((json) => {
                    console.log(json)
                    return json
                })
        },
        cacheTime: 0
    })

    if (isLoading) {
        return <div>Loading...</div>
    } else if (error) {
        return <div>Error query hit: {error}</div>
    } else if (data.fault) {
        throw new HTTPError(404, data.fault.message)
    } else {
        return <div dangerouslySetInnerHTML={{__html: data.c_body}} />
    }
}

ContentDetails.getTemplateName = () => 'content-details'

export default ContentDetails
