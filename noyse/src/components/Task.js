    // This is what to display for each track
import React from 'react'

const Task = ({ task }) => {
    return (
        <div className='row'>
            <img src={ task.albumImage } className='playlistImage'></img>

            <div className='playlistTrack'>
                <p className='playlistTitles'>
                    { task.title }
                </p>
                
                <p className='playlistArtists'>
                    { task.artist }
                </p>
            </div>
        </div>
    )
}

export default Task
