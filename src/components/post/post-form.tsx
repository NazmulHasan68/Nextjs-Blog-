'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {z} from 'zod'
import { useTransition } from 'react'
import { createPostAction, updatePostAction } from '@/actions/post-actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'


const postSchema = z.object({
  title: z.string()
          .min(3, 'Title must be at least 3 characters long')
          .max(255, 'Title must be less than 255 characters'),
  description: z.string()
          .min(10, 'Description must be at least 10 characters long'),
  content: z.string()
          .min(10, 'Content must be at least 10 characters long'),
})

interface PostFormProps {
  isEditing?:boolean,
  post? : {
    id : number,
    title : string,
    description : string,
    content : string,
    slug : string
  }
}

type PostFormValues = z.infer<typeof postSchema>

export default function PostForm({isEditing, post} : PostFormProps) {
  const router = useRouter()
  const [ isPending , startTransition ] = useTransition()

  const { register, handleSubmit, formState: { errors } } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues :  isEditing && post ? {
      title : post.title,
      description : post.description,
      content : post.content,

    } :{
          title : '',
          description : '',
          content : '',
    }
  })

  const onSubmit = (values: PostFormValues) => {
      startTransition(async()=>{
      try {
        const formData = new FormData();

        formData.append('title', values.title)
        formData.append('description', values.description)
        formData.append('content', values.content)

        let res;
        if(isEditing && post){
          res = await  updatePostAction(post.id, formData)
        }else{
          res = await createPostAction(formData)

        }
        if(res.success){
          toast.success(isEditing ? ' post Updated successfully! ':'Post created successfullt!');
          router.refresh()
          router.push('/')  
        }
      } catch (error) {
        console.log(error);
          toast.success('Failed to crate posts!');
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div>
        <label>Title</label>
        <input {...register('title')} disabled={isPending} className='border p-2 w-full' />
        {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
      </div>

      <div>
        <label>Description</label>
        <textarea {...register('description')} disabled={isPending} className='border p-2 w-full' />
        {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
      </div>

      <div>
        <label>Content</label>
        <textarea {...register('content')} disabled={isPending} className='border p-2 w-full' />
        {errors.content && <p className='text-red-500'>{errors.content.message}</p>}
      </div>

      <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>
         {isPending ? "Saving Post ..." : isEditing ? "Update post " : "Create Post"}
      </button>
    </form>
  )
}
