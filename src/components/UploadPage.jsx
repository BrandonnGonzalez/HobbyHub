import { supabase } from '../client'
import { useState } from 'react'

function UploadPage() {
  const [post, setPost] = useState({
    fullName: "",
    liftName: "",
    weight: ""
  });

  const uploadPost = async (event) => {
    event.preventDefault();

    await supabase
  .from('uploads')
  .insert({
    full_name: post.fullName,
    lift_name: post.liftName,
    weight: post.weight,
  });
    window.location = "/";
  }

  return (
    <div>
      <h2>Upload your favorite lift's information here!</h2>
      <form onSubmit={uploadPost}>
        
        <label>
          Full name:
          <input
            type="text"
            name="fullName"
            onChange={(e) => setPost({ ...post, fullName: e.target.value })}
          />
        </label>

        <label>
          Lift name:
          <input
            type="text"
            name="liftName"
            onChange={(e) => setPost({ ...post, liftName: e.target.value })}
          />
        </label>

        <label>
          Weight:
          <input
            type="text"
            name="weight"
            onChange={(e) => setPost({ ...post, weight: e.target.value })}
          />
        </label>

        <input type="submit" value="Submit" />

      </form>
    </div>
  );
}

export default UploadPage;
