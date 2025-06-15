import React from "react";
import { useSelector } from "react-redux";
import { isValidImageUrl } from "../utils/validateUrl";
import { Edit, Trash2 } from "react-feather";
import { getTimeAgo } from "../utils/getTimeAgo";


const PostItem = ({ post, onEdit, onDelete }) => {
  const currentUser = useSelector((state) => state.auth.user);
  const isMyPost = currentUser?._id === post.createdBy;

  return (
    <div className="border rounded-xl p-5 shadow-sm border-gray-200 bg-white mb-6 w-full hover:shadow-md transition duration-300">
      <div className="flex justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray mb-2">{post.title}</h2>

          {isValidImageUrl(post.image) && (
            <img
              src={post.image}
              alt="Post"
              className="rounded-md object-cover w-full max-w-sm  mb-3"
            />
          )}

          <p className="text-gray-700">{post.content}</p>

          <p className="text-xs text-gray-500 mt-3">
            Posted by <span className="font-medium text-gray-700">{post.author}</span>
          </p>
          <p className="text-xs text-gray-500">
            <span className="font-medium">{getTimeAgo(post.createdAt)}</span>
          </p>
        </div>

        {isMyPost && (
          <div className="flex flex-col justify-end items-end space-y-2 min-w-[80px] text-sm text-right">
            <button
              onClick={() => onEdit(post._id)}
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1 transition"
            >
              <Edit size={16} />
              Edit
            </button>
            <button
              onClick={() => onDelete(post._id)}
              className="text-red-500 hover:text-red-700 flex items-center gap-1 transition"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostItem;
