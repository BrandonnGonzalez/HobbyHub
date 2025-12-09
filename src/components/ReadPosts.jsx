import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import { IconBarbell } from '@tabler/icons-react'
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
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ReadPosts;