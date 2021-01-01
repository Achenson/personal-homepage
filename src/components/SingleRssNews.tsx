import React from 'react'

import { bookmarksDataState } from "../state/bookmarksAndLinks";


interface Props {
    title: string,
    link: string
    
}

function SingeRssNews({title, link}: Props): JSX.Element{


    // const [bookmarksData, setBookmarksData] = bookmarksDataState.use();

    // let currentBookmark = bookmarksData.filter((obj) => obj.id === bookmarkID);

    return (
        <div>
         <p>{title}</p>
         <p>{link}</p>
        </div>
    )
}

export default SingeRssNews;