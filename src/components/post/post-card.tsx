import { PostCardProps } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { formateDate } from "@/lib/utils";


export default function PostCard({post} : PostCardProps) {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <Link href={`/post/${post.slug}`}>
                    <CardTitle className="text-2xl">{post.title}</CardTitle>
                </Link>
            </CardHeader>
            <CardDescription className="px-6">
                by {post?.author?.name} - {formateDate(post.createdAt)}
            </CardDescription>

            <CardContent>
                <p className="text-muted-foreground">{post.description}</p>
            </CardContent>
        </Card>
    );
}