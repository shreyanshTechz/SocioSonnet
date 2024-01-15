'use client'
import PostConent from '@/components/PostConent'
import TopLink from '@/components/TopLink'
import UserInfo from '@/hooks/userinfo'
import axios from 'axios'
import Link from 'next/link'
import React from 'react'
import { useEffect, useState } from 'react'
export default function Tweet({ params }) {
  const [user, setuser] = useState({})
  const [post, setpost] = useState({});
  const [likedpost, setlikedpost] = useState([]);
  const [Text, setText] = useState("")
  const [reply, setreply] = useState([]);
  const { data, status } = UserInfo();

  useEffect(() => {
    axios.get('/api/posts/' + params.username).then((res) => {
      setpost(res.data)
    })
    axios.get('/api/posts/reply/' + params.username).then((res) => {
      setreply(res.data);
    })
  }, [params])


  async function getLikedPost() {
    await fetch('/api/liked/' + user.id).then((res) => {
      res.json().then(json => {
        setlikedpost(json);
      })
    });
  }
  useEffect(() => {
    if (data)
      setuser(data.user);
  }, [data])

  useEffect(() => {
    if (user.id)
      getLikedPost();
  }, [user])

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userid = user?.id;
    const postid = post?._id;
    // console.log(JSON.stringify({ userid, Text, postid }));
    await axios.post('/api/posts/' + userid, JSON.stringify({ postid, Text })).then((res) => {
      setreply([...reply, res.data]);
    });

    setText('');
  }
  return (
    <div className='max-w-lg mx-auto border-l bordr-r border-gBorder min-h-screen' >
      <div className="p-5 py-2">
        <TopLink href={'/home'} title={'Tweet'}/>
      </div>
      {data && <PostConent user={user} post={post} big={true} likedbyme={likedpost.includes(post._id)} />}
      {data &&
        <div className="border-t border-gBorder mt-2 py-5">
          <form className='mx-5'>
            <div className="flex">
              <div>
                <div className="rounded-full overflow-hidden w-12">
                  <img src={data?.user?.image} alt="" />
                </div>
              </div>

              <div className='grow pl-2'>
                <input value={Text} onChange={(e) => setText(e.target.value)} className='w-full p-2  py-5 bg-transparent text-gWhite h-full ' placeholder="Reply To Tweet.." />

              </div>
              <div className="text-right  ">
                <button onClick={handleSubmit} className="bg-gBlue m-2 text-white px-5 py-1 rounded-full">Tweet</button>
              </div>

            </div>
          </form>
        </div>
      }
      <div className="border-t border-gBorder ">
        {data && reply.map((element,index) => {
          return <div className='p-3 border-t border-gBorder '>
            <PostConent key={index} post={element} user={user} big={true} likedbyme={likedpost.includes(element._id)} />
            </div>
        })}
      </div>
    </div>
  )
}
