export default function TrackSearchResult({ track, chooseTrack }) {
    function handlePlay() {
        chooseTrack( track )
        console.log( track.title )
        console.log( track.albumUrl )
        console.log( track.artist )
    }

    
    return (
        <div
        className= 'd-flex m-2 align-items-center'
        style= {{ cursor: 'pointer' }}
        onClick= { handlePlay }
        >
            <img 
                src= { track.albumUrl }
                style= {{ height: '64px', width: '64px '}}
                title= { track.title }
                alt= { track.title }
                />
            <div className= 'ml-3'>
                <div>{ track.title }</div>
                <div className= 'text-muted'>{ track.artist }</div>
            </div>
        </div>
    )
}
