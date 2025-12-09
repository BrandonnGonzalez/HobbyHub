import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import { IconBarbell } from '@tabler/icons-react'

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

    const deletePost = async (memberId) => {
        await supabase
            .from('uploads')
            .delete()
            .eq('id', memberId)
        window.location = '/';
    }

    return (
        <div style={{ marginLeft: '300px', padding: '2rem' }}>
            <h1>Lifting Forum</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {members && members.map((member) => (
                    <div key={member.id} style={{
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        padding: '1.5rem',
                        backgroundColor: 'black',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        position: 'relative'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem'
                        }}>
                            <button
                                onClick={() => handleEdit(member.id)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '1.5rem',
                                    color: 'white',
                                    padding: '0.5rem',
                                    lineHeight: '1'
                                }}
                            >
                                ⋮
                            </button>
                            <button
                                onClick={() => deleteMember(member.id)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '1.5rem',
                                    color: 'white',
                                    padding: '0.5rem',
                                    lineHeight: '1'
                                }}
                            >
                                ✕
                            </button>
                        </div>

                        <h3>{member.full_name}</h3>
                        <p><strong>Lift:</strong> {member.lift_name}</p>
                        <p><strong>Weight:</strong> {member.weight}</p>
                        <IconBarbell size={30} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ReadPosts;