import { supabase } from '../client'
import { useState } from 'react'
import './UploadPage.css'

function UploadPage() {
  const [post, setPost] = useState({
    fullName: "",
    liftName: "",
    weight: ""
  });

  const uploadPost = async (event) => {
    event.preventDefault();

    const { data, error } = await supabase
      .from('uploads')
      .insert({
        full_name: post.fullName,
        lift_name: post.liftName,
        weight: post.weight,
      });

    console.log("DATA:", data);
    console.log("ERROR:", error);

    window.location = "/";
  }

  return (
    <div className="upload-page">
      <div className="upload-card">
        <h2 className="upload-title">Upload Your Favorite Lift! 🏋️</h2>

        <form onSubmit={uploadPost} className="upload-form">

          <label className="form-group">
            <span className="form-label">Full Name:</span>
            <input
              type="text"
              name="fullName"
              value={post.fullName}
              onChange={(e) => setPost({ ...post, fullName: e.target.value })}
              required
              className="form-input"
            />
          </label>

          <label className="form-group">
            <span className="form-label">Lift Name:</span>
            <input
              type="text"
              name="liftName"
              value={post.liftName}
              onChange={(e) => setPost({ ...post, liftName: e.target.value })}
              required
              placeholder="e.g., Deadlift, Bench Press, Squat"
              className="form-input"
            />
          </label>

          <label className="form-group">
            <span className="form-label">Weight (lbs):</span>
            <input
              type="number"
              name="weight"
              value={post.weight}
              onChange={(e) => setPost({ ...post, weight: e.target.value })}
              required
              placeholder="e.g., 315"
              className="form-input"
            />
          </label>

          <button type="submit" className="submit-button">
            Submit Lift
          </button>

        </form>
      </div>
    </div>
  );
}

export default UploadPage;
