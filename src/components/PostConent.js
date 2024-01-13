import React from 'react'
import Link from 'next/link';
import ReactTimeAgo from 'react-time-ago';
export default function PostConent({ post }) {
    console.log(post);
    return (
        <div className='flex'>
            <div>
                <div className="rounded-full overflow-hidden w-12">
                    <img src={post?.author?.image} alt="" />
                </div>
            </div>
            <div className='pl-2'>
                <div>
                    <span className='font-bold'>{post?.author?.name}</span>
                    <span className='pl-1 text-gLightGray'>@{post?.author?.username}</span>
                    
                    {post.createdAt && 
                    <span className='pl-1 text-gLightGray'><ReactTimeAgo date={post.createdAt} timeStyle={'twitter'}/></span>
                    }
                </div>
                <Link href={`/${post._id}`}>
                    {post.text}
                </Link>
            </div>

        </div>
    )
}
