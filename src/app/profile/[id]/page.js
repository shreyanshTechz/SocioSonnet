'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';
import TopLink from '@/components/TopLink';
import Cover from '@/components/Cover';
import PostConent from '@/components/PostConent';
import UserInfo from '@/hooks/userinfo';
import axios from 'axios';
export default function Userpage({ params }) {
    const { data } = UserInfo();
    const [user, setuser] = useState([]);
    const [posts, setposts] = useState([]);
    const router = useRouter();
    const [likedpost, setlikedpost] = useState([]);
    const [editMode, seteditMode] = useState(false);
    const { id } = params;
    const [isMyProfile, setisMyProfile] = useState(false);
    const [isFollowing, setisFollowing] = useState(null);
    const [editmode, seteditmode] = useState(false);
    const [duplicatedata, setduplicatedata] = useState([]);
    useEffect(() => {
        fetch('/api/user/' + id).then((res) => {
            res.json().then(json => { setuser(json); setduplicatedata(json); });
        })
        fetch('/api/profile/' + id).then((res) => {
            res.json().then(json => { setposts(json); });
        })
    }, [])
    async function getLikedPost() {
        await fetch('/api/liked/' + data.user.id).then((res) => {
            res.json().then(json => {
                setlikedpost(json);
            })
        });
    }

    useEffect(() => {
      if(data){
        fetch('/api/follow/'+id+'/'+data.user.id).then((res)=>{
           res.json().then((json)=>{
            setisFollowing(json);
           })
        })
      }
    }, [data])

    useEffect(() => {

        if (data) {
            setisMyProfile(data.user.id === id);
            if (data.user) {
                getLikedPost();
    
            }

        }
    }, [data]);

    async function updateProfile() {
        const { bio, name, username } = user;
        await axios.put('/api/profile/' + id, {
            bio, name, username
        });
        seteditMode(false);
    }
    function toggleFollow() {
        (isFollowing === null)?setisFollowing('Yes'):setisFollowing(null);
        axios.post('/api/followers', {
            destination: user?._id,
            source: data.user.id
        }).then((res) => console.log('res'))
    }

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

                    {isMyProfile ? (!editMode ?
                        <button onClick={() => seteditMode(true)} className="bg-gBlue text-white py-2 px-5 rounded-full">Edit Profile</button>
                        : (<div><button onClick={() => { seteditMode(false); setuser(duplicatedata) }} className="bg-gWhite  text-black py-2 px-5 rounded-full">Cancel</button>
                            <button onClick={() => updateProfile()} className="bg-gBlue text-white py-2 px-5 rounded-full">Save Profile</button></div>
                        )) :
                        <button onClick={() => toggleFollow()} className={isFollowing===null ? 'bg-gBlue text-white px-5 py-2 rounded-full' : 'bg-gBorder   text-white px-5 py-2 rounded-full'}>{isFollowing ===null ?'Follow' : 'Following'}</button>}
                </div>
            </div>
            <div className="px-5 mt-2">
                {editMode ?
                    <div><input type='text' onChange={(e) => setuser(prev => ({ ...prev, name: e.target.value }))} value={user.name} className='bg-gBorder p-2 rounded-full mt-2' /></div> :
                    <h1 className="font-bold text-xl leading-5">{user.name}</h1>
                }
                {editMode ?
                    <div><input type='text' onChange={(e) => setuser(prev => ({ ...prev, username: e.target.value }))} value={user.username} className='bg-gBorder p-2 rounded-full mt-2' /></div> :
                    <h2 className="text-gLightGray text-sm">@{user.username}</h2>
                }
                {editMode ?
                    <div><textarea placeholder='Enter Bio' onChange={(e) => setuser(prev => ({ ...prev, bio: e.target.value }))} type='text' value={user.bio} className='bg-gBorder p-2 rounded-lg mt-2 mb-2 w-full' /></div> :
                    <h2 className="tex-sm mt-2 mb-2">{user.bio}</h2>
                }

            </div>
            {posts.map((element, index) => {
                return data && <div className='p-3 border-t border-gBorder '>
                    <PostConent key={index} post={element} user={data.user} big={true} likedbyme={likedpost.includes(element._id)} />
                </div>
            })}
        </div>

    )
}
