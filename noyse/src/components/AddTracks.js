const AddTracks = () => {
    return (
        <form className= 'add-form'>
            <div className= 'form-control'>
                <label>Title</label>
                <input type= 'text' placeholder= 'Add Title' />
            </div>
            
            <div className= 'form-control'>
                <label>Artist Name</label>
                <input type= 'text' placeholder= 'Artist Name' />
            </div>
            
            <div className= 'form-control'>
                <label>Album Url</label>
                <input type= 'text' placeholder= 'Album Url' />
            </div>

            <input type= 'submit' value= 'Add Track' />
        </form>
    )
}

export default AddTracks
