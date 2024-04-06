"use client";

import { MouseEvent, useEffect, useState } from "react";
import {
  CommentDataProps,
  CommentDataPropsWithId,
  LikesDataProps,
  PostDataProps,
  PostPropsWithId,
} from "@/lib/typings";
import {
  HeartIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ArrowUturnRightIcon,
  PaperAirplaneIcon,
  BookmarkIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as SolidHeartIcon,
  ChatBubbleOvalLeftEllipsisIcon as SolidChatBubbleOvalLeftEllipsisIcon,
  ArrowUturnRightIcon as SolidArrowUturnRightIcon,
  PaperAirplaneIcon as SolidPaperAirplaneIcon,
  BookmarkIcon as SolidBookmarkIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { BadgeCheckIcon } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db, postsCollectionRef } from "@/firebase.config";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import Comment from "./Comment";

type Props = {
  post: PostPropsWithId;
  total: number;
};

function Post({ post, total }: Props) {
  const [isPostLiked, setIsPostLiked] = useState<boolean>(false);
  const [likedPostId, setLikedPostId] = useState<string>("");
  const [commentInput, setCommentInput] = useState<string>("");
  const [commentLoading, setCommentLoading] = useState<boolean>(false);
  const [isPostSaved, setIsPostSaved] = useState<boolean>(false);
  const [openCommentField, setOpenCommentField] = useState<boolean>(false);
  const { data: session } = useSession();
  const { toast } = useToast();

  const [allComments, setAllComments] = useState<CommentDataPropsWithId[]>([]);
  const [allLikes, setAllLikes] = useState<number>(0);
  const q = query(
    collection(db, "all-posts", post?.id, "comments"),
    orderBy("timestamp", "desc")
  );
  const likesQuery = query(collection(db, "all-posts", post?.id, "likes"));

  useEffect(() => {
    const getLikeStatus = async () => {
      const querySnapshot = await getDocs(likesQuery);
      setAllLikes(querySnapshot?.docs?.length);
      querySnapshot?.docs?.map((doc) => {
        if (doc?.data()?.useremail == session?.user?.email!) {
          setIsPostLiked(true);
        }
      });
    };
    const getComments = async () => {
      try {
        const querySnapshot = await getDocs(q);
        const queryData = querySnapshot?.docs?.map(
          (doc) =>
            ({
              id: doc?.id,
              ...doc?.data(),
              timestamp: doc.data().timestamp.toDate().toISOString(),
            } as CommentDataPropsWithId)
        );
        setAllComments(queryData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    getComments();
    getLikeStatus();
  }, [isPostLiked, openCommentField, allLikes, allComments]);


  const likePost = async () => {
    toast({
      description: "...",
    });
    try {
      const doc = await addDoc(collection(db, "all-posts", post?.id, "likes"), {
        username: session?.user?.name!,
        useremail: session?.user?.email!,
        userimage: session?.user?.image!,
      });
      setLikedPostId(doc.id);
      setIsPostLiked(true);
    } catch (err) {
      toast({
        title: "Network Error",
        description: "Please try again",
      });
    }
  };
  const removeLikeFromPost = async () => {
    try {
      await deleteDoc(doc(db, "all-posts", post?.id, "likes", likedPostId));
      setIsPostLiked(false);
    } catch (err) {
      toast({
        title: "Network Error",
        description: "Please try again",
      });
    }
  };
  const deletePost = async () => {
    try {
      toast({
        description: "Deleting post, please wait...",
      });
      await deleteDoc(doc(db, "all-posts", post?.id));
      toast({
        description: "Post Deleted",
      });
    } catch (err) {
      toast({
        title: "Network Error or sth",
        description: 'post couldn"t be deleted',
      });
    }
  };
  const uploadComment = async (e: MouseEvent<HTMLButtonElement>) => {
    if (!commentInput) return;
    setCommentLoading(true);
    toast({
      description: "uploading comment, please wait...",
    });
    const commentData: CommentDataProps = {
      comment: commentInput,
      userName: session?.user?.name!,
      userEmail: session?.user?.email!,
      userImage: session?.user?.image!,
      timestamp: serverTimestamp(),
    };
    await addDoc(
      collection(db, "all-posts", post?.id, "comments"),
      commentData
    );
    toast({
      title: "Success",
      description: "Your comment has been uploaded",
    });
    setCommentInput("");
    setOpenCommentField(false);
  };

  return (
    <div className="rounded-sm border border-transparent rounded-tl-xl rounded-br-2xl p-3 px-5 pb-4 bg-dark flex items-start justify-start space-x-4 w-full text-gray-300 ">
      <div className="flex flex-col items-start text-gray-100">
        <div className="h-10 w-10 relative ">
          <Image
            src={post?.userImage!}
            alt="user"
            fill
            className="object-cover rounded-full"
          />
        </div>
      </div>
      <div className="flex flex-col w-full justify-start items-start space-y-4">
        <div className="w-full flex items-center pr-3 justify-between">
          <h3 className="text-lg flex items-center font-bold">
            {post?.userName}
            <span className="text-xs text-gray-500 ml-2">
              @{post?.userName!.toLowerCase().replace(/\s/g, "_")}
            </span>
          </h3>
          {session?.user?.email! == post?.userEmail && (
            <>
              <TrashIcon
                onClick={deletePost}
                className="h-4 w-4 cursor-pointer hover:scale-105 duration-200 transition ease-in-out"
              />
            </>
          )}
        </div>
        <p className="tracking-wide text-[13px] text-gray-200 font-semibold w-full pr-5">
          {post?.postInput}
        </p>
        {post?.postImage && (
          <div className="relative w-full h-[340px]">
            <Image
              alt="post"
              src={post?.postImage}
              fill
              className="rounded-sm rounded-tl-xl object-cover rounded-br-2xl"
            />
          </div>
        )}
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-center relative justify-center">
            {!isPostLiked ? (
              <HeartIcon
                onClick={likePost}
                className="h-[18px] w-[18px] hover:scale-105 duration-200 ease-in-out transition cursor-pointer transform active:scale-110"
              />
            ) : (
              <SolidHeartIcon
                onClick={removeLikeFromPost}
                className="h-[18px] w-[18px] hover:scale-105 duration-200 ease-in-out text-indigo-700 transition cursor-pointer transform active:scale-110"
              />
            )}
            {allLikes >= 1 && (
              <p className="absolute left-1/2 top-[18px] -translate-x-1/2 text-[10px]">
                {allLikes}
              </p>
            )}
          </div>

          <div className="flex flex-col items-center relative justify-center">
            <ChatBubbleOvalLeftEllipsisIcon
              onClick={() => setOpenCommentField(true)}
              className="h-[18px] w-[18px] hover:scale-105 duration-200 ease-in-out transition cursor-pointer transform active:scale-110"
            />
            {allComments.length >= 1 && (
              <p className="absolute left-1/2 top-[18px] -translate-x-1/2 text-[10px]">
                {allComments.length}
              </p>
            )}
          </div>

          {!isPostSaved ? (
            <BookmarkIcon
              onClick={() => setIsPostSaved(true)}
              className="h-[18px] w-[18px] hover:scale-105 duration-200 ease-in-out transition cursor-pointer transform active:scale-110"
            />
          ) : (
            <SolidBookmarkIcon
              onClick={() => setIsPostSaved(false)}
              className="h-[18px] w-[18px] hover:scale-105 duration-200 ease-in-out text-blue-600 transition cursor-pointer transform active:scale-110"
            />
          )}
          <PaperAirplaneIcon className="h-[18px] w-[18px] hover:scale-105 duration-200 ease-in-out transition cursor-pointer transform active:scale-110" />
        </div>
        {openCommentField && (
          <div className="w-full border-b border-gray-200 shadow relative h-10 -ml-11 flex items-center space-x-2 justify-between bg-darker/80 pr-3">
            <div
              onClick={() => setOpenCommentField(false)}
              className="absolute -right-3 -top-3 p-1 text-dark bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
            >
              <XMarkIcon className="w-4 h-4" />
            </div>
            <input
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              className="bg-transparent border-none outline-none placeholder:text-gray-300 text-[12px] placeholder:text-[12px] font-medium w-full tracking-wide text-gray-200"
              placeholder="Comment..."
            />
            <button
              onClick={uploadComment}
              className="disabled:opacity-0 tracking-wide text-gray-200 text-[13px] animate-bounce font-bold cursor-pointer"
              disabled={!commentInput || commentLoading}
            >
              Post
            </button>
          </div>
        )}
        <p
          suppressHydrationWarning
          className="-ml-11 text-[12px] tracking-wider font-medium"
        >
          {" "}
          {!post?.timestamp
            ? "Loading"
            : `${moment(post?.timestamp)?.format("hh:mmA")} - ${moment(
                post?.timestamp
              )?.format("DD MMMM YYYY")} || Suggested For You`}
        </p>
        {allComments.length > 0 && (
          <div className="-ml-11 flex flex-col w-full mt-3 space-y-2 max-h-40 overflow-y-scroll scrollbar-hide">
            {allComments?.map((comment) => (
              <Comment key={comment?.id} comment={comment} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Post;
