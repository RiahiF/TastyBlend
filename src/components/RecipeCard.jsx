'use client'
import { useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { gray } from '@mui/material/colors';

const RecipeCard = ({post, handleTagClick, handleEdit, handleDelete}) => {

  const { data: session } = useSession()
  const pathName = usePathname()
  const router = useRouter()
  const [copied, setCopied] = useState('')

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };


  const handleCopy = () =>{
    setCopied(post.recipe)

    navigator.clipboard.writeText(post.recipe)
    setTimeout(() => setCopied(''), 3000)
  }
  return (
    <div className="prompt_card">
      <div className="absolute left-1 top-1">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer" onClick={handleProfileClick}>
          <Image
          src={post.creator?.image}
          alt="user_image"
          height={40}
          width={40}
          className="rounded-full object-contain"
          />
          {/* <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator?.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator?.email}
            </p>
          </div> */}
        </div>
        {/* <div className="copy_btn" onClick={handleCopy}>
          <Image
          src={copied === post.recipe ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
          width={15}
          height={15}
          alt="copy"
          />
        </div> */}
      </div>
      {post.imageUrl && (
        <div className="recipe-image">
          <img
            className="object-cover w-full h-52 rounded-lg  cursor-pointer"
            src={post.imageUrl}
            alt="recipe_image"
          />
        </div>
      )}
      <p className="ml-3 mt-2 font-satoshi text-2xl text-slate-950 font-medium cursor-pointer">{post.name}</p>
      <p className="ml-3 flex items-center justify-items-center gap-2 font-satoshi text-2xl text-gray-400 font-medium"><AccessTimeIcon sx={{ fontSize: 20 }}  />
      <span className="flex items-center gap-2 mt-1 font-satoshi text-[18px] text-gray-950 font-medium  cursor-pointer mb-1 w-full">{post.time} <div className="w-[6px] h-[6px] rounded-full bg-gray-400" /> {post.difficulty}</span>
      </p>
      {/* <p className="my-4 font-satoshi text-sm text-gray-500 font-thin">{post.recipe}</p> */}
      <div className="font-inter text-sm mt-2  flex gap-2">
        {post.dishType.map((type, index) => (
          <span
            key={index}
            className="tag cursor-pointer bg-gray-200 w-fit text-slate-800 pt-1 pb-1 pl-2 pr-2 rounded-lg ml-3 mb-3 "
            onClick={() => handleTagClick && handleTagClick(type)}
          >
            {type}
          </span>
        ))}
      </div>


      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className=" flex-center gap-4 border-t border-gray-100 ">
          <p
          className="font-inter text-sm green_gradient cursor-pointer"
          onClick={handleEdit}
          >
            Edit
          </p>
          <p
          className="font-inter text-sm orange_gradient cursor-pointer"
          onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default RecipeCard