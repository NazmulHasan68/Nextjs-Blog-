import { session } from './../../auth-schema';
'use server'

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { posts } from "@/lib/db/schema"
import { slugify } from "@/lib/utils"
import { and, eq, ne } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { success } from 'zod';

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


export async function updatePostAction(postId: number, formData: FormData) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session || !session.user) {
      return {
        success: false,
        message: "You must be logged in to edit the post!"
      };
    }

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const content = formData.get('content') as string;
    const slug = slugify(title);

    const existingPost = await db.query.posts.findFirst({
      where: and(eq(posts.slug, slug), ne(posts.id, postId))
    });

    if (existingPost) {
      return {
        success: false,
        message: "A post with this title already exists"
      };
    }

    const post = await db.query.posts.findFirst({
      where: eq(posts.id, postId)
    });

    if (!post) {
      return {
        success: false,
        message: "Post not found!"
      };
    }

    if (post.authorId !== session.user.id) {
      return {
        success: false,
        message: "You can only edit your own post"
      };
    }

    await db.update(posts)
      .set({
        title,
        description,
        content,
        slug,
        updatedAt: new Date()
      })
      .where(eq(posts.id, postId));

       revalidatePath('/')
      revalidatePath(`/post/${slug}`)
      revalidatePath('/porfile')

    return {
      success: true,
      message: "Post updated successfully!"
    };
   

  } catch (error) {
    console.error("Update post failed:", error);
    return {
      success: false,
      message: "Something went wrong while updating the post."
    };
  }
}


export async function deletePost(postId:number) {
    try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session || !session.user) {
      return {
        success: false,
        message: "You must be logged in to Delete the post!"
      };
    }

    const postToDelete = await db.query.posts.findFirst({
        where : eq(posts.id, postId)
    })

    if(!postToDelete){
        return {
        success: false,
        message: "Post not found!"
      };
    }

    if (postToDelete.authorId !== session.user.id) {
      return {
        success: false,
        message: "You can only delete your own post"
      };
    }

    await db.delete(posts)
            .where(eq(posts.id, postId))

    revalidatePath('/')
    revalidatePath('/profile')

    return {
        success : true ,
        message : "Post deleted successfully!"
    }
    } catch (error) {
        console.log(error, "failed to delete");
    }
}