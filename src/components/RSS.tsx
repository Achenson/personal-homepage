import React from 'react'

import { bookmarksDataState } from "../state/bookmarksAndLinks";

let Parser = require('rss-parser');
let parser = new Parser();

interface Props {
  //  rssLink: string | null
   bookmarkID: string | number
}



function RSS({bookmarkID}: Props): JSX.Element{

  const [bookmarksData, setBookmarksData] = bookmarksDataState.use();

  let currentBookmark = bookmarksData.filter( obj => obj.id === bookmarkID);


    // fetchRSS(rssLink as string);

//     function fetchRSS(rssLink : string) {
//         // fetch(rssLink, {
//         //     method: "GET",
//         //     // mode: 'no-cors',
//         //     // headers: {
//         //     //   'Access-Control-Allow-Origin':'*'
//         //     // }
//         // }).then( res => res.text()).then( data => console.log(data)
//         // )

//         fetch(rssLink, {
//             // method: "GET",
//             // mode: "no-cors"
//         })
//   .then(response => response.text())
//   .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
//   .then(data => console.log(data))


//     }

(async () => {

    // let feed = await parser.parseURL('https://www.reddit.com/.rss');
    let feed = await parser.parseURL(currentBookmark[0].rssLink);
    console.log(feed.title);
  
  // @ts-ignore: Unreachable code error
    feed.items.forEach(item => {
      console.log(item.title + ':' + item.link)
    });
  
  })();


    return (
        <div>
            RSS
        </div>
    )
}

export default RSS;