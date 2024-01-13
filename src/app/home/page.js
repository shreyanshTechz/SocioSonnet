'use client'
import UserInfo from '@/hooks/userinfo'
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import PostConent from '@/components/PostConent';
export default function Home() {
    const [posts, setposts] = useState([])
    async function getPosts(){
        fetch('api/posts/').then((res) => {
            res.json().then(json => {
                setposts(json);
                console.log(json);
            })
        });
    }
    useEffect(() => {
        getPosts();
    }, [])
    const user = UserInfo();
    if (user === 'Loading') return;
    const [Text, setText] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/api/posts/'+user._id, JSON.stringify(Text));
        setText('');
        getPosts();
    }
    return (
        <div className='max-w-lg mx-auto border-l bordr-r border-gBorder min-h-screen' >
            <h1 className="text-lg font-bold p-4">Home</h1>
            <form className='mx-5'>
                <div className="flex">
                    <div>
                        <div className="rounded-full overflow-hidden w-12">
                            <img src={user.image} alt="" />
                        </div>
                    </div>

                    <div className='grow pl-2'>
                        <input value={Text} onChange={(e) => setText(e.target.value)} className='w-full p-2 bg-transparent text-gWhite  ' placeholder="What's In your Mind" />
                        <div className="text-right border-t border-gBorder pt-2">
                            <button onClick={handleSubmit} className="bg-gBlue m-2 text-white px-5 py-1 rounded-full">Tweet</button>
                        </div>
                    </div>

                </div>
            </form>

            {posts.map((post,index) => {
                return <div key={index} className="text-white border-t border-gBorder p-5">
                    <PostConent post={post} />
                </div>
            })}

        </div>
    )
}
