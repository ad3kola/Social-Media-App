"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import {
  ChangeEvent,
  FormEvent,
  MouseEventHandler,
  useRef,
  useState,
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { postsCollectionRef, storage } from "@/firebase.config";
import { v4 as uniqueID } from "uuid";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useSession } from "next-auth/react";
import { PostDataProps } from "@/lib/typings";
import { useToast } from "@/components/ui/use-toast";

type PostProps = z.infer<typeof formPostSchema>;
const formDataSchema = {
  postInput: z
    .string()
    .min(2, {
      message: "Post input must be atleast 2 characters.",
    })
    .max(100, {
      message: "Post input must be less than 100 characters.",
    }),
  postImage: z.string().optional(),
};

const formPostSchema = z.object(formDataSchema);

function CreatePost() {
  const form = useForm();
  const { data: session } = useSession();
  const imageRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { toast } = useToast();
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [imageDownloadURL, setImageDownloadURL] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PostProps>();

  const postForm = useForm<z.infer<typeof formPostSchema>>({
    resolver: zodResolver(formPostSchema),
    defaultValues: {
      postInput: "",
      postImage: imageDownloadURL,
    },
  });

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const selectedFile = files[0];
    console.log(selectedFile);
    const imageStorageRef = ref(
      storage,
      `allPostImages/${selectedFile?.name}-${uniqueID()}`
    );
    setLoadingImage(true);
    try {
      toast({
        description: "Image uploading, please wait...",
      });
      await uploadBytes(imageStorageRef, selectedFile);
      const downloadURL = await getDownloadURL(imageStorageRef);
      setImageDownloadURL(downloadURL);
      toast({
        description: "Image uploaded",
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Network error",
        description: "Image upload not successful, please try again",
      });
    } finally {
      setLoadingImage(false);
    }
  };
  const removeUploadedImage = () => {
    toast({
      description: 'image removed'
    })
    setImageDownloadURL("");
  };
  const uploadPost: SubmitHandler<PostProps> = async (values) => {
    if (!values?.postInput) return;
    console.log(values);
    const postData: PostDataProps = {
      userName: session?.user?.name!,
      userEmail: session?.user?.email!,
      userImage: session?.user?.image!,
      postInput: values.postInput,
      postImage: imageDownloadURL,
      timestamp: serverTimestamp(),
    };
    try {
      setLoading(true);
      const docRef = await addDoc(postsCollectionRef, postData);
      console.log(values);
      router.push("/");
      toast({
        description: "Post uploaded successfully, please wait...",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Network error",
        description: "Post upload not successful, please try again",
      });
    } finally {
      setLoading(false);
    }
  };
  // console.log(values);

  return (
    <main className="bg-darker relative w-full px-3 py-2 h-full sm:p-4 text-gray-100">
      <h2 className="text-2xl font-bold text-gray-100">Create a Post</h2>
      <Form {...form}>
        <form onSubmit={handleSubmit(uploadPost)} className="space-y-3 mt-2">
          <FormField
            control={form.control}
            name="postInput"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Input</FormLabel>
                <FormControl>
                  <div className="w-full flex flex-col items-start justify-start space-y-1">
                    <textarea
                      placeholder="What's on your mind?"
                      className="h-40 bg-dark focus:bg-darker w-full rounded-md px-3 py-2 placeholder:text-sm text-sm placeholder:text-gray-400 text-gray-200 max-h-60 min-h-32"
                      {...register("postInput", {
                        required: true,
                      })}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <p className="text-[11px] text-gray-100 tracking-widest ml-auto">{`${input.length}/100`}</p>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {imageDownloadURL ? (
            <div
              onClick={removeUploadedImage}
              className="relative w-[80%] mx-auto h-40 md:h-56 overflow-hidden"
            >
              <Image
                src={imageDownloadURL}
                alt="image"
                fill
                className="rounded-sm hover:scale-105 duration-200 cursor-pointer transition ease-in object-cover object-center"
              />{" "}
            </div>
          ) : (
            <FormField
              control={form.control}
              name="postImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Image (Optional)</FormLabel>
                  <FormControl>
                    <div
                      onClick={() => imageRef?.current?.click()}
                      className="text-gray-400 hover:bg-darker h-28 flex flex-col items-center justify-center shadow-md border-2 border-dark w-full rounded-md bg-dark duarion-200 transition transform cursor-pointer ease-in-out"
                    >
                      <PhotoIcon className="w-11 h-11 mr-2" />
                      <input
                        type="file"
                        {...register("postImage")}
                        hidden
                        ref={imageRef}
                        onChange={handleImageUpload}
                        className="w-full"
                      />
                      <p className="mt-2 text-sm uppercase">Click to Upload</p>
                    </div>
                  </FormControl>
                  {loadingImage && (
                    <FormDescription>
                      image loading..., please wait
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <Button
            type="submit"
            disabled={loading || !input || isSubmitting}
            variant="submit"
          >
            {loading ? "Uploading..." : "Upload Post"}
          </Button>
        </form>
      </Form>
      <h4 className="absolute bottom-[74px] md:bottom-2 left-0 right-0 w-full px-8 text-[11px] font-medium mt-2 text-gray-400 text-center">
        <u>Warning</u>: Please do not post illicit / inappropriate, there will
        be severe punishments, Please read the{" "}
        <span className="text-indigo-500">Terms & Conditions</span> for further
        information.
      </h4>
    </main>
  );
}

export default CreatePost;
