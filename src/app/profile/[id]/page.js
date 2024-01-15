'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';
import TopLink from '@/components/TopLink';
import Cover from '@/components/Cover';
import PostConent from '@/components/PostConent';
export default function Userpage({ params }) {
    const [user, setuser] = useState([]);
    const [posts,setposts] = useState([]);
    const router = useRouter();
    const [likedpost,setlikedpost] = useState([]);
    const { id } = params;
    useEffect(() => {
        fetch('/api/user/' + id).then((res) => {
            res.json().then(json => setuser(json));
        })
        if(!id)
        console.log(id);
        fetch('/api/profile/' + id).then((res) => {
            res.json().then(json => {setposts(json); console.log(json);});
        })
        
    }, [])
    async function getLikedPost() {
        await fetch('/api/liked/' + user._id).then((res) => {
          res.json().then(json => {
            setlikedpost(json);
            console.log(likedpost);
          })
        });
      }

      useEffect(() => {
        if (user._id)
          getLikedPost();
      }, [user])

    return (

        <div className='max-w-lg mx-auto border-l bordr-r border-gBorder min-h-screen'>
            <div className='px-5 pt-2'>
                <TopLink title={user.username} href='/home' />
            </div>
            <Cover />
            <div className="flex justify-between">
                <div className="ml-5 relative">
                    <div className="absolute -top-14 border-4 rounded-full border-black">
                        <div className="rounded-full overflow-hidden w-24">
                            <img src={user.image} />
                        </div>
                    </div>

                </div>

                <div className='p-2'>
                    <button className='bg-gBlue text-white px-5 py-2 rounded-full'>Follow</button>
                </div>
            </div>
            <div className="px-5 mt-2">
                <h1 className="font-bold text-xl leading-5">{user.name}</h1>
                <h1 className="text-gLightGray text-sm">@{user.username}</h1>
                <div className="tex-sm mt-2 mb-2">An active Member Of SocioSonnet</div>
            </div>
            {posts.map((element,index) => {
          return <div className='p-3 border-t border-gBorder '>
            <PostConent key={index} post={element} user={user} big={true}  likedbyme={likedpost.includes(element._id)}/>
            </div>
        })}
        </div>

    )
}
