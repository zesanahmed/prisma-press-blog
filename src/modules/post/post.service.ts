import { prisma } from "../../lib/prisma";
import { ICreatePostPayload } from "./post.interface";

const createPost = async (payLoad: ICreatePostPayload, userId: string) => {
  const result = await prisma.post.create({
    data: {
      ...payLoad,
      authorId: userId,
    },
  });
  return result;
};

const getAllPost = async () => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        omit: {
          password: true,
        },
      },
      comments: true,
    },
  });
};

const getPostById = async (postId: string) => {
  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
  });

  const updatedPost = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      views: {
        increment: 1,
      },
    },
    include: {
      author: {
        omit: {
          password: true,
        },
      },
    },
  });
  return updatedPost;
};

const updatePost = () => {};

const deletePost = () => {};

const getPostsStats = () => {};

const getMyPost = () => {};

export const postService = {
  createPost,
  getAllPost,
  updatePost,
  deletePost,
  getPostsStats,
  getMyPost,
  getPostById,
};
