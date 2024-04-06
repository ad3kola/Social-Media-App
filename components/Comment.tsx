"use client";

import { CommentDataPropsWithId } from "@/lib/typings";
import moment from "moment";
import { useSession } from "next-auth/react";
import Image from "next/image";

function Comment({ comment }: { comment: CommentDataPropsWithId }) {
  const { data: session } = useSession();
  return (
    <div className="flex w-full items-center justify-between space-x-2">
      <div className="w-full flex items-center space-x-2">
        <div className="flex items-center space-x-2">
          <div className="relative w-8 h-8">
            <Image
              src={comment?.userImage}
              alt="user"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col text-gray-300 justify-between h-full font-semibold tracking-wide whitespace-nowrap">
            <h3 className="text-[12px]">{comment?.userName}</h3>
            <h4 className="text-[11px]">
              {comment?.userName!.toLowerCase().replace(/\s/g, "_")}
            </h4>
          </div>
        </div>
        <p className="text-[13px] text-gray-200 w-full font-medium tracking-wide">
          {comment?.comment}
        </p>
      </div>
      <p className="text-gray-400 text-[12px] tracking-wide whitespace-nowrap">
        {moment(comment?.timestamp).fromNow()}
      </p>
    </div>
  );
}

export default Comment;
