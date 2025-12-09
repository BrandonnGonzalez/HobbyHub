import { useState, useEffect } from 'react';
import { supabase } from '../client';
import { useParams, useNavigate } from 'react-router-dom';
import './EditPosts.css';

function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({ id: null, full_name: "", lift_name: "", weight: "" });

    // Fetch the existing member data when component loads
    useEffect(() => {
        const fetchPost = async () => {
            const { data } = await supabase
                .from('uploads')
                .select()
                .eq('id', id)
                .single();

            if (data) {
                setPost(data);
            }
        };
        fetchPost();
    }, [id]);

    const updatePost = async (event) => {
        event.preventDefault();
        await supabase
            .from('uploads')
            .update({ full_name: post.full_name, lift_name: post.lift_name, weight: post.weight })
            .eq('id', id);
        navigate('/');
    };

    const deletePost = async (event) => {
        event.preventDefault();
        await supabase
            .from('uploads')
            .delete()
            .eq('id', id)
        navigate('/');
    }



    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    return (
        <div className="edit-page">
            <div className="edit-card">
                <button
                    onClick={() => navigate('/')}
                    className="back-button"
                >
                    ← Back to Home
                </button>

                <h2 className="edit-title">Edit Your Lift</h2>

                <form className="edit-form">
                    <div className="form-group">
                        <label htmlFor="full_name" className="form-label">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="full_name"
                            name="full_name"
                            value={post.full_name}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lift_name" className="form-label">
                            Lift Name
                        </label>
                        <input
                            type="text"
                            id="lift_name"
                            name="lift_name"
                            value={post.lift_name}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="weight" className="form-label">
                            Weight (lbs)
                        </label>
                        <input
                            type="number"
                            id="weight"
                            name="weight"
                            value={post.weight}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="button-group">
                        <button
                            type="submit"
                            onClick={updatePost}
                            className="update-button"
                        >
                            Update Lift
                        </button>

                        <button
                            type="button"
                            onClick={deletePost}
                            className="delete-button-form"
                        >
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditPost;