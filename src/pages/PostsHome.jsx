import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost, setCurrentPost } from "../features/postSlice";
import PostItem from "../components/PostItem";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PostsHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: posts, status, hasMore } = useSelector((state) => state.posts);
  const [page, setPage] = useState(1);
  const observer = useRef();

  useEffect(() => {
    dispatch(fetchPosts({ page })); 
  }, [dispatch, page]);

  const lastPostRef = useCallback(
    (node) => {
      if (status === "loading") return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [status, hasMore]
  );


  const handleEdit = (id) => {
    dispatch(setCurrentPost(id));
    navigate(`/create-post/${id}`);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirm) return;

    const res = await dispatch(deletePost(id));

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Post deleted successfully.");
    } else {
      toast.error("Failed to delete the post.");
    }

  };


  return (
    <div className="max-w-2xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6 text-info">Latest Posts</h1>
      {status === "loading" && (
        <div className="flex justify-center items-center py-2">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-2 text-blue-500">loading...</span>
        </div>
      )}

      {status === "failed" && <p>Error loading posts.</p>}

      {posts &&
        posts.map((post, index) => {
          if (index === posts.length - 1) {
            return (
              <div ref={lastPostRef} key={post._id}>
                <PostItem
                  key={post._id}
                  post={post}
                  onEdit={handleEdit}
                  s
                  onDelete={handleDelete}
                />
              </div>
            );
          } else {
            return (
              <PostItem
                key={post._id}
                post={post}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            );
          }
        })}
      {!hasMore && <p className="text-center text-gray-500">No more posts</p>}
    </div>
  );
};

export default PostsHome;
