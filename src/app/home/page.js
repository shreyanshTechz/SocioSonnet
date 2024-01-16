'use client'
import UserInfo from '@/hooks/userinfo'
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import PostConent from '@/components/PostConent';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
export default function Homes() {
    const { data,status } = UserInfo();
    const [user, setuser] = useState({});
    const router = useRouter();
    const [posts, setposts] = useState([])
    const [likedpost, setlikedpost] = useState([]);

    async function getPosts() {
        await fetch('api/posts/').then((res) => {
            res.json().then((json) => {
                setposts(json);
            })
        });
    }
    async function getLikedPost() {
        await fetch('api/liked/' + user.id).then((res) => {
            res.json().then(json => {
                setlikedpost(json);
            })
        });
    }

    if(status === 'unauthenticated'){
        router.push('/login');
    }

    useEffect(() => {
        if (data)
        setuser(data.user);
    }, [data])

    useEffect(() => {
        getPosts();
    }, [])


    useEffect(() => {
        if(user.id)
        getLikedPost();
    }, [user])


    const [Text, setText] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault();
        alert(Text);
        if(Text.length <= 5){
            alert('Tweet must be of greater length');
            return;
        }
        await axios.post('/api/posts/' + user.id, JSON.stringify({Text}));
        setText('');
        getPosts();
    }

    return (
        <div className='max-w-lg mx-auto border-l bordr-r border-gBorder min-h-screen' >
            <h1 className="text-lg font-bold p-4">Home</h1>
            <form className='mb-5'>
                <div className="flex p-2">
                    <div>
                        <div className="rounded-full overflow-hidden w-12">
                            <img src={user.image} alt="" />
                        </div>
                    </div>

                    <div className='grow pl-2 '>
                        <textarea value={Text} onChange={(e) => setText(e.target.value)} className='w-full p-2 bg-transparent text-gWhite h-1/3 whitespace-pre-wrap' placeholder="What's In your Mind" />
                        <div className="text-right border-t border-gBorder pt-2">
                            <button onClick={handleSubmit} className="bg-gBlue m-2 text-white px-5 py-1 rounded-full">Tweet</button>
                        </div>
                    </div>
                    

                </div>
            </form>
            <div className="">
                {posts && posts.map((post, index) => {
                    return <div key={index} className="text-white border-t border-gBorder p-5">
                        <PostConent user={user} post={post} big={false} likedbyme={likedpost.includes(post._id)}/>
                    </div>
                })}
            </div>
            <div className="p-5 text-center border-t border-t-gWhite">
                <button onClick={()=>signOut()} className='bg-gWhite text-black px-5 py-2 rounded-full' >LogOut</button>
            </div>


        </div>
    )
}
