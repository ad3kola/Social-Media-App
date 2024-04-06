import { ForwardRefExoticComponent, SVGProps } from "react";

export type NavLinksProps = {
  title: string;
  Icon: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref">>;
  path?: string;
};

export interface PostPropsWithId extends PostDataProps  {
  id: string;
};

export interface PostDataProps {
  postInput: string;
  timestamp: any;
  postImage?: string;
  userName: string;
  userEmail: string;
  userImage: string;
}

export interface CommentDataProps {
  comment: string;
  userName: string;
  userEmail: string;
  userImage: string;
  timestamp: any,
}

export interface LikesDataProps {
  userName: string;
  userEmail: string;
  userImage: string;
}

export interface CommentDataPropsWithId extends CommentDataProps {
  id: string;
}