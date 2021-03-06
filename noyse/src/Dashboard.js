import { useState, useEffect } from 'react'
import useAuth from './useAuth'
import Player from './Player'
import TrackSearchResult from './TrackSearchResult'
import Playlist from './components/Playlist'
import { Container, Form } from 'react-bootstrap'
import SpotifyWebApi from 'spotify-web-api-node'
import axios from 'axios'

const spotifyApi = new SpotifyWebApi({
    clientId: '50ac6b1ef9ed4171939657783cf817d7'
})
const AUTH_URL =
    "https://accounts.spotify.com/authorize?client_id=50ac6b1ef9ed4171939657783cf817d7&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Dashboard({ code }) {
    const accessToken = useAuth( code )
    const [ search, setSearch ] = useState('')
    const [ searchResults, setSearchResults ] = useState([])
    const [ playingTrack, setPlayingTrack ] = useState()
    const [ lyrics, setLyrics ] = useState()

    function chooseTrack( track ) {
        setPlayingTrack( track )
        setSearch('')
        setLyrics('')
    }

    useEffect(() => {
        if (!playingTrack) return

        axios
            .get( 'http://localhost:3001/lyrics', {
                params: {
                    track: playingTrack.title,
                    artists: playingTrack.artist
                }
            })
            .then( res => {
                setLyrics( res.data.lyrics )
            })
    }, [ playingTrack ])

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [ accessToken ])

    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!accessToken) return

        let cancel = false

        spotifyApi
            .searchTracks(search)
            .then(res => {
                if (cancel) return
                setSearchResults(res.body.tracks.items.map(track => {
                    const smallestAlbumImage = track.album.images.reduce(( smallest, image ) => {
                        if ( image.height < smallest.height ) return image
                        return smallest
                    }, track.album.images[0])

                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: smallestAlbumImage.url
                    }
                }))
            })

        return () => cancel = true
    }, [ search, accessToken ])

    return (
        <div className= 'row dashboardDiv'>
            <Container
                className= 'd-flex flex-column py-2 songsContainer'
            >
                <div className= 'headerRow'>
                    <div className= 'titleDiv'>
                        <h1>
                            Noys:E
                        </h1>
                    </div>

                    <a href= { AUTH_URL }>
                        <button
                            className= 'btn btnHome'
                        >
                            Home
                        </button>
                    </a>
                </div>

                <Form.Control
                    type= 'search'
                    placeholder= 'Search Songs/Artists'
                    value= { search }
                    onChange= { e => setSearch(e.target.value) }
                />

                <div
                    className= 'flex-grow-1 my-2'
                    style= {{ overflowY: 'auto'}}
                >
                    { searchResults.map( track => (
                        <TrackSearchResult
                            track= { track }
                            key= { track.uri }
                            chooseTrack= { chooseTrack }
                        />
                        ))}

                    { searchResults.length === 0  && (
                        <div 
                        className= 'text-center'
                            style= {{ whiteSpace: 'pre' }}
                        >
                            { lyrics }
                        </div>
                    )}
                </div>

                <div>
                    <Player
                        accessToken= { accessToken } 
                        trackUri= { playingTrack?.uri }
                        />
                </div>
            </Container>

            <Playlist />
        </div>
    )
}
