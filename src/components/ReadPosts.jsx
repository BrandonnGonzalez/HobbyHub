import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import { IconBarbell, IconHeart } from '@tabler/icons-react'
import './ReadPosts.css'

function ReadPosts() {
    const [members, setMembers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            const { data } = await supabase
                .from('uploads')
                .select()
                .order('created_at', { ascending: true });

            // 🔍 LOG THE DATA TO CONSOLE
            console.log('=== FULL API RESPONSE ===');
            console.log('Data Array:', data);
            console.log('Number of posts:', data?.length);

            // Show the structure of the first item
            if (data && data.length > 0) {
                console.log('=== FIRST POST STRUCTURE ===');
                console.log(data[0]);
                console.log('Available fields:', Object.keys(data[0]));
            }

            setMembers(data);
        };

        fetchPosts();
    }, []);

    const handleEdit = (memberId) => {
        navigate(`/edit/${memberId}`);
    };

    const deletePost = async (id) => {
        await supabase
            .from('uploads')
            .delete()
            .eq('id', id);

        // Refresh the posts after deletion
        const { data } = await supabase
            .from('uploads')
            .select()
            .order('created_at', { ascending: true });
        setMembers(data);
    }

    const handleLike = async (postId, currentLikes) => {
        // Increment the like counter in the database
        const { error } = await supabase
            .from('uploads')
            .update({ like_counter: (currentLikes || 0) + 1 })
            .eq('id', postId);

        if (!error) {
            // Update the local state to reflect the change immediately
            setMembers(members.map(member =>
                member.id === postId
                    ? { ...member, like_counter: (currentLikes || 0) + 1 }
                    : member
            ));
        }
    }

    return (
        <div className="read-posts-container">
            <h1 className="read-posts-title">Lifting Forum</h1>
            <div className="posts-grid">
                {members && members.map((member) => (
                    <div key={member.id} className="post-card">
                        <div className="post-actions">
                            <button
                                onClick={() => handleEdit(member.id)}
                                className="action-button edit-button"
                            >
                                ✏️
                            </button>
                            <button
                                onClick={() => deletePost(member.id)}
                                className="action-button delete-button"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="post-icon">
                            <IconBarbell size={40} color="#667eea" />
                        </div>
                        <h3 className="post-name">{member.full_name}</h3>
                        <p className="post-detail">
                            <strong style={{ color: '#667eea' }}>Lift:</strong> {member.lift_name}
                        </p>
                        <p className="post-detail">
                            <strong style={{ color: '#667eea' }}>Weight:</strong> {member.weight} lbs
                        </p>
                        <p className="post-detail">
                            <strong style={{ color: '#667eea' }}>Posted:</strong>{' '}
                            {new Date(member.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </p>

                        <div className="like-counter">
                            <span
                                className="heart-icon"
                                onClick={() => handleLike(member.id, member.like_counter)}
                                title="Like this post"
                            >
                                <IconHeart size={20} color="#667eea" />
                            </span>
                            <span className="like-count">{member.like_counter || 0}</span>
                            <span className="like-text">Likes</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ReadPosts;