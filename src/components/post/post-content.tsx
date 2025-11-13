import { PostcontentProps } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { formateDate } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";
import DeletePostButonCompoent from "./delete-post-button";


export default function PostContent({post, isAuthor} : PostcontentProps) {
    return <Card>
        <CardHeader>
            <CardTitle>
                {post.title}
            </CardTitle>
            <CardDescription>
                by {post.author.name} - {formateDate(post.createdAt)}
            </CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground text-lg mb-6">{post.description}</p>
            <p className="text-black font-semibold text-md mb-6">{post.content}</p>
        </CardContent>
        {
            isAuthor && (
                <CardFooter className="flex gap-2">
                    <Button asChild variant='outline' size='sm'>
                        <Link href={`/post/edit/${post.slug}`}>
                            <Pencil className="h-4 w-4mr-2"/> Edit
                        </Link>
                    </Button>
                    <DeletePostButonCompoent postId={post.id}/>
                </CardFooter>
            )
        }
    </Card>
}