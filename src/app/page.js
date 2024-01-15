"use client"
import { useEffect ,useState} from "react";
import UserInfo from "@/hooks/userinfo";
import { useRouter } from "next/navigation";
export default function Home() {
  const [username, setusename] = useState("");
  const router = useRouter();
  const {data,status} = UserInfo();
  if(status === 'unauthenticated'){
    router.push('/login');
  }
  useEffect(() => {
    setusename(data?.user?.name?.split(' ')[0]);
  }, [data])
  

  const UsernameForm = (e) => {
    e.preventDefault();
    if (data === 'loading') return;
    fetch('api/user/' + data.user.id, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(username)
    }).then(() => {
      router.push('/home');
    })

  }
  return (
    <div className="flex h-screen items-center justify-center">
      <form className="text-center" onSubmit={UsernameForm}>
        <div className="text-center">
          <h1 className="text-xl m-2">Pick a Username</h1>
          <input type="text" className="block mb-2 bg-gBorder px-3 py-1 rounded-full" placeholder={username} onChange={e => setusename(e.target.value)} />
          <button className="block bg-gBlue w-full rounded-full py-1">Continue</button>
        </div>
      </form>
    </div>
  )
}
