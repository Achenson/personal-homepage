import React from 'react'

import { bookmarksDataState } from "../state/bookmarksAndLinks";


interface Props {
    bookmarkID: string | number;
    
}

function SingeRssNews({bookmarkID}: Props): JSX.Element{


    const [bookmarksData, setBookmarksData] = bookmarksDataState.use();

    let currentBookmark = bookmarksData.filter((obj) => obj.id === bookmarkID);

    return (
        <div>
            nullllll
            {
               // @ts-ignore: Unreachable code error
            currentBookmark[0].items[0].title
            }
        </div>
    )
}

export default SingeRssNews;