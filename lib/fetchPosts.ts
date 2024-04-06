import { db, postsCollectionRef } from "@/firebase.config";
import { PostDataProps, PostPropsWithId } from "@/lib/typings";
import { getDocs, orderBy, query } from "firebase/firestore";

export default async function fetchPosts() {
  const q = query(postsCollectionRef, orderBy("timestamp", "desc"));

  const querySnapshot = await getDocs(q);
  const queryData = querySnapshot?.docs?.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    timestamp: doc.data().timestamp.toDate().toISOString(),
})) as PostPropsWithId[];
  return queryData;
}
