"use client";

import { useState, useEffect } from "react";
import { db, postsCollectionRef } from "@/firebase.config";
import {
  CommentDataPropsWithId,
  PostDataProps,
  PostPropsWithId,
} from "@/lib/typings";
import { getDocs, orderBy, query } from "firebase/firestore";
import Post from "@/components/Post";
import Comment from "./Comment";

function PostsSection({ SSRPosts }: { SSRPosts: PostPropsWithId[] }) {
  const [allPosts, setAllPosts] = useState<PostPropsWithId[]>([]);
  const q = query(postsCollectionRef, orderBy("timestamp", "desc"));

  useEffect(() => {
    const getPosts = async () => {
      try {
        const querySnapshot = await getDocs(q);
        const queryData = querySnapshot?.docs?.map(
          (doc) =>
            ({
              id: doc?.id,
              ...doc?.data(),
              timestamp: doc.data().timestamp.toDate().toISOString(),
            } as PostPropsWithId)
        );
        setAllPosts(queryData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    getPosts();
  }, [allPosts]);
  return (
    <div className="flex flex-col w-full mt-5 space-y-4 pb-32 md::pb-28">
      {!allPosts || allPosts.length == 0
        ? SSRPosts?.map((post) => <Post key={post?.id} post={post} total={SSRPosts?.length} />)
        : allPosts?.map((post) => <Post key={post?.id} post={post} total={allPosts?.length} />)}
    </div>
  );
}

export default PostsSection;
