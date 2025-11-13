'use server'

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { posts } from "@/lib/db/schema"
import { slugify } from "@/lib/utils"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"

export async function createPostAction(formData:FormData) {
    try {
        //get the current user
        const session = await auth.api.getSession({
            headers : await headers()
        })

        if(!session || !session?.user){
            return{
                success : false,
                message : "You must be logged in to create a post"
            }
        }

        //get form data
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const content = formData.get('content') as string;


        //howorker --> implementation a extra validation check


        //create the slug form post title 
        const slug = slugify(title)

        //check if the slug is already exists
        const existingPost = await db.query.posts.findFirst({
            where : eq(posts.slug, slug)
        })
        if(existingPost) return{ seccess : false, message : "A post with the same title already exists! Please try with a diff one"}


        const [newPost] = await db.insert(posts).values({
            title, description, content, slug, authorId:session.user.id
        }).returning()

        // revalidate the home to get the latest post
        revalidatePath('/')
        revalidatePath(`/post/${slug}`)
        revalidatePath('/profile')

        return {
            success : true,
            message : 'Post created successfully!',
            slug
        }
    } catch (e) {
         return {
            success : false,
            message : 'Faild to create post',
        }
    }
}