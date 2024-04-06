import { db, postsCollectionRef } from "@/firebase.config";
import { PostDataProps, PostPropsWithId } from "@/lib/typings";
import { getDocs, orderBy, query } from "firebase/firestore";
import Post from "@/components/Post";
import fetchPosts from "@/lib/fetchPosts";
import PostsSection from "@/components/PostsSection";

export default async function Home() {
  const allSSRPosts: PostPropsWithId[] = await fetchPosts();
  

  return (
    <main className="bg-darker w-full h-full p-3 sm:p-5">
      <h2 className="text-3xl font-bold text-gray-100">Home</h2>
      <h3 className="text-sm font-medium mt-2 text-gray-400">
        Discover the latest news and topics from users all around the world.
      </h3>
      <div className ='w-full h-full'>

      <PostsSection SSRPosts={allSSRPosts} />
      </div>
    </main>
  );
}