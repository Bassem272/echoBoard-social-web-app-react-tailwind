import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostById } from "../features/selectors/postSelector";
import {
  addPost,
  deletePost,
  editPost,
  resetPostStatus,
} from "../features/postSlice";
import { useDispatch } from "react-redux";
import { isValidImageUrl } from "../utils/validateUrl";
import { toast } from "react-toastify";

const CreatePostPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const post = useSelector((state) => selectPostById(state, id));

  const status = useSelector((state) => state.posts.status);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: id ? post.title : "Title",
      content: id ? post.content : "content for the post",
    },
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      let res;
      if (id) {
        res = await Promise.all([
          dispatch(editPost({ id, formData })),
          delay(700),
        ]).then(([result]) => result);
      } else {
        res = await Promise.all([dispatch(addPost(formData)), delay(700)]).then(
          ([result]) => result
        );
      }
      if (res.meta.requestStatus === "fulfilled") {
        toast.success(
          id ? "Post updated successfully!" : "Post created successfully!"
        );
        reset();
        navigate("/posts");
        dispatch(resetPostStatus());
      } else {
        toast.error("An error occurred while submitting the post. Try again");
      }

    } catch (error) {
      console.error("post creation had an error:", error);
    }
  };

  return (
    <>
      {status === "loading" && (
        <div className="flex justify-center items-center py-2">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-2 text-blue-500">Submitting...</span>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 max-w-md mx-auto border border-gray-200 p-4"
      >
        {/* Title */}
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">Post Title</legend>
          <input
            type="text"
            className="input input-bordered w-full input-info"
            placeholder="Title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </fieldset>

        {/* Content */}
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">Post Content</legend>
          <textarea
            className="textarea textarea-bordered w-full textarea-info"
            placeholder="Content"
            {...register("content", { required: "Content is required" })}
          />
          {errors.content && (
            <p className="text-red-500">{errors.content.message}</p>
          )}
        </fieldset>

        {/* current Image */}
        {id && isValidImageUrl(post?.image) && (
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Current Image</legend>
            <img
              src={post.image}
              width={100}
              height={100}
              className="rounded object-cover pt-2 mx-auto"
            />
          </fieldset>
        )}

        {/* Image */}
        <fieldset className="fieldset w-full">
          {id ? (
            <legend className="fieldset-legend text-red-400">
              leave empty if you don't want to change the image
            </legend>
          ) : (
            <legend className="fieldset-legend">Upload Image</legend>
          )}
          {/* <legend className="fieldset-legend">Upload Image</legend> */}
          <input
            type="file"
            className="file-input w-full file-input-info"
            accept="image/*"
            {...register("image")}
          />
          <label className="label text-xs">Max size 5MB</label>
          <span className="text-xs">Only the following image formats are allowed: JPEG,JPG,PNG,GIF.</span>

          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
        </fieldset>

        {/* <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {id ? "Update" : "Post"}
      </button> */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {id ? "Update" : "Post"}
        </button>
      </form>
    </>
  );
};

export default CreatePostPage;
