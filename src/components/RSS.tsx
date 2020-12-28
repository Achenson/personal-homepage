import React from 'react'

interface Props {
   rssLink: string | null
}

function RSS({rssLink}: Props): JSX.Element{

    fetchRSS(rssLink as string);

    function fetchRSS(rssLink : string) {
        // fetch(rssLink, {
        //     method: "GET",
        //     // mode: 'no-cors',
        //     // headers: {
        //     //   'Access-Control-Allow-Origin':'*'
        //     // }
        // }).then( res => res.text()).then( data => console.log(data)
        // )

        fetch(rssLink, {
            // method: "GET",
            // mode: "no-cors"
        })
  .then(response => response.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => console.log(data))


    }


    return (
        <div>
            RSS
        </div>
    )
}

export default RSS;