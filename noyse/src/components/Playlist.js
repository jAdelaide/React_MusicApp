    // This is the playlist section of the app
import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Tasks from './Tasks'

const Playlist = () => {
    const [ tasks, setTasks ] = useState([
        {
          "id": 1,
          "title": "One Beer",
          "artist": "MF DOOM",
          "albumImage": "https://i.scdn.co/image/ab67616d00004851557341c7755b44dc1a838f1c"
        },
        {
          "id": 2,
          "title": "Doomsday",
          "artist": "MF DOOM",
          "albumImage": "https://i.scdn.co/image/ab67616d00004851f56213eede5f2e6a6065fb6d"
        }
      ])

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }

        getTasks()
    }, [])
    
        // Fetch Tasks
    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks')
        const data = await res.json()

        return data
    }

    return (
        <Container
            className= 'd-flex flex-column py-2 playlistContainer'
        >
            <div className= 'headerRow'>
                <div className= 'titleDiv'>
                    <h1>
                        Playlist
                    </h1>
                </div>
            </div>
            <div>
                <Tasks tasks={ tasks } />
            </div>
        </Container>
    )
}

export default Playlist
