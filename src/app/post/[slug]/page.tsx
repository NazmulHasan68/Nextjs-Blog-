import NotFound from "@/app/not-found";
import PostContent from "@/components/post/post-content";
import { auth } from "@/lib/auth";
import { getPostBySlug } from "@/lib/db/queries";
import { slugify } from "@/lib/utils";
import { headers } from "next/headers";

export default async function postDetailsPage({params} : {params : Promise<{slug : string}>}) {
    const {slug} = await params
    const post = await getPostBySlug(slug)
    console.log(post);

    const session = await auth.api.getSession({
        headers : await headers()
    })
    
    
    if(!post) {
        NotFound()
    }
    //get author information
    const isAuthor = session?.user?.id === post?.authorId

    return <main className="py-10">
        <div className=" max-w-4xl mx-auto">
            <PostContent post={post!} isAuthor={isAuthor}/>
        </div>
    </main>
}