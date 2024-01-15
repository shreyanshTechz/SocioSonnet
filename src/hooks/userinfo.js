"use client"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";

export default function UserInfo() {   
  const { data, status } = useSession();
  const [user,setuser] = useState({});
  
  
  async function getUserinfo() {
    if (data === null | data === undefined) return;
    await fetch('/api/user/' + data.user.id).then((res)=>{
      res.json().then(json=>{
        setuser(json);
      })
    });
  }
    useEffect(() => {
      getUserinfo();
    }, [data])
    if(status === 'loading')
        return 'loading'
    return {data,status};
  }
