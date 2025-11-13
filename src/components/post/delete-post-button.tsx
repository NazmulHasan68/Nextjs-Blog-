'use client'

import { DeletePostButtonProps } from "@/lib/types";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { deletePost } from "@/actions/post-actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export default function DeletePostButonCompoent({postId} : DeletePostButtonProps) {
    const[isDeleting, setIsDeleting ] = useState(false)
    const router = useRouter()


    const handleDelete = async () =>{
        setIsDeleting(true)
        try {
            const res = await deletePost(postId)
            if(res?.success){
                toast.success(res?.message)
                router.push('/')
                router.refresh()
            }else{
                 toast.error(res?.message)
            }
        } catch (error) {
           toast.error("An error ocurred while deleting the post! Please try again")
        } finally {
            setIsDeleting(false)
        }
    }
    return (
       <>
        <Button disabled={isDeleting} variant='destructive' size='sm' onClick={handleDelete} className=" cursor-pointer">
            <Trash2 className="h-4 w-4 mr-2"/>
             {isDeleting ? "Deleting..." : "Delete"}
        </Button>
       </>
    );
}