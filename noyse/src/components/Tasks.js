    // This is what is displayed in the playlist
import Task from './Task'

const Tasks = ({ tasks }) => {
    
    return (
        <>
            {tasks.map(( task ) => (
                // <h5 key={ task.id }>{ task.title }</h5>
                // <img key={ task.id } src={ task.albumImage }></img>
                <Task key={ task.id } task={ task } />
            ))}
        </>
    )
}

export default Tasks
