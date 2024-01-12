import React from 'react'
import fetch from 'cross-fetch'
import {List, ListItem, Link} from '@chakra-ui/react'

const ContentSearch = (props) => {
    if (!props) {
        return <div>Loading...</div>
    }

    const hits = props.hits
    return (
        <div>
            {hits.length ? (
                <List>
                    {hits.map(({id, name}) => (
                        <Link key={id} to={`/content/${id}`}>
                            <ListItem>{name}</ListItem>
                        </Link>
                    ))}
                </List>
            ) : (
                <div>No Content Items Found!</div>
            )}
        </div>
    )
}

ContentSearch.getProps = async () => {
    let contentResult
    let siteId = 'RefArch'
    let clientId = '66e30f6b-deeb-43b2-b99a-5192fe16d6d9'
    let ocapiVersion = 'v23_2'
    //Make a call to the URL substituting Key Values from table
    const res = await fetch(
        `http://localhost:3000/mobify/proxy/ocapi/s/${siteId}/dw/shop/${ocapiVersion}/content_search?q=about&client_id=${clientId}`
    )
    if (res.ok) {
        contentResult = await res.json()
    }
    if (process.env.NODE_ENV !== 'production') {
        console.log(contentResult)
    }

    return {hits: contentResult ? contentResult.hits : []}
}

ContentSearch.getTemplateName = () => 'content-search'

export default ContentSearch
