import React from 'react'
import { FileDrop } from 'react-file-drop'
import { useState } from 'react';
export default function Cover() {
  const [isFileNearby, setisFileNearby] = useState(false);
  const [isFileOver, setisFileOver] = useState(false);
  let extraclass = '';
  const [isFileLoading, setisFileLoading] = useState(false);
  if (isFileNearby && !isFileOver) extraclass += ' bg-white';
  if (isFileOver) extraclass += ' bg-red';
  function updateImage(files,e) {
    e.preventDefault();
    setisFileLoading(true);
    const data = new FormData();
    data.append('cover',files[0])
    fetch('/api/upload/',{
      method:'POST',
      body:data
    }).then(()=>{
      setisFileLoading(false);
    })
  }
  return (
    <div className='h-36 bg-gBorder w-full'>
      <div className={"h-36 bg-gBorder text-blue" + extraclass}>
        <FileDrop className='h-full'
          onDrop={updateImage}
          onDragOver={() => setisFileOver(true)}
          onDragLeave={() => setisFileOver(false)}
          onFrameDragEnter={() => setisFileNearby(true)}
          onFrameDragLeave={() => setisFileNearby(false)}

        />
      </div>
    </div>
  )
}
