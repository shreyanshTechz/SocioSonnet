import React from 'react'
import Link from 'next/link';
import ReactTimeAgo from 'react-time-ago';
import PostButtons from './PostButtons';

export default function PostConent({user, post, big,likedbyme }) {
    return (
        <div className='ml-4'>
            <div className='flex w-full'>
                <Link href={'/profile/'+post?.author?._id}>
                    <div className="rounded-full overflow-hidden w-12 cursor-pointer">
                        <img src={post?.author?.image} alt="" />
                    </div>
                </Link>
                <div className='pl-2 grow'>
                    <div>

                        <span className='font-bold pr-1'>{post?.author?.name}</span>
                        {big && (<br/>)}
                        <span className='pl-1 text-gLightGray'>@{post?.author?.username}</span>

                        {post.createdAt && !big &&
                            <span className='pl-1 text-gLightGray'><ReactTimeAgo date={post.createdAt} timeStyle={'twitter'} /></span>
                        }
                    </div>
                    <div>
                        {!big && (<div>
                            <Link className='whitespace-break-spaces' href={`/tweet/${post._id}`}>
                                {post.text}
                            </Link>
                            <PostButtons postid={post?._id} userid={(user?.id)?user?.id:user._id} LikeCount={post?.likeCount} replyCount={post?.replyCount} likedByMe={likedbyme}/>
                        </div>)}
                    </div>

                </div>

            </div>
            {big && (
                <div className='mt-2'>
                    <Link href={`/tweet/${post._id}`}>
                        {post.text}
                    </Link>
                    <div className='text-gLightGray text-sm'>
                        {post.createdAt && (new Date(post.createdAt)).toISOString().replace('T',' ').slice(0,16).split(' ').reverse().join(' ')}
                    </div>
                    <PostButtons postid={post?._id} userid={(user?.id)?user?.id:user._id} LikeCount={post?.likeCount} replyCount={post?.replyCount} likedByMe={likedbyme}/>
                </div>
            )}
        </div>

    )
}
