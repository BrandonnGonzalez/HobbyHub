
function UploadPage() {
    return (
        <div> 
            <h2>Upload your favorite lift's information here!</h2>
            <form>
                <label>Full name: 
                    <input type="fullName" name="fullName" />
                </label>
                <label>Lift name:
                    <input type="lift" name="lift" />
                </label>
                <label>Weight:
                    <input type="weight" name="weight" />
                </label>
                <label>Picture</label>
                <img src="https://row.gymshark.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F8urtyqugdt2l%2F13rxvRwt8eBlkuYauKCGFO%2Fa614247bf65618c10150f6d40a709a9c%2Fdesktop-jamal-browner-deadlift.jpg&w=3840&q=85" width="500px" height="300px"></img>

                <input type="submit" value="Submit"/>



            </form>

        </div>
    )
}

export default UploadPage;