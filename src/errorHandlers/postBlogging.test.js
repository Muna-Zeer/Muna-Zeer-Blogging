const {
  uploadFile,
  CreatePost,
  getAllPost,
  getCommentsPost,
} = require("../controllers/postController");
const { Post } = require("../models");
const { Comment } = require("../models");


jest.mock("../models/post.js", () => ({
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  }));
  
  jest.mock("../models/comment.js", () => ({
    findAll: jest.fn(),
  }));

describe("Post Controller Functions", () => {
  describe("upload Files", () => {
    it("should upload files successfully", async () => {
      const req = { file: { filename: "test.jpg" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await uploadFile(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "upload file successfully",
        imageUrl: "test.jpg",
      });
    });

    it("should return error if no file uploaded ", async () => {
      const req = { file: null };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await uploadFile(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "not found upload file" });
    });
  });

  describe("Create Post", () => {
    it("should create a new post", async () => {
      const mockPostData = {
        title: "Palestine",
        content: "fdssffffffffffffff",
        imageUrl: "image-1711105162372.jpeg",
      };
      const req = { body: mockPostData };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const newPost = { ...mockPostData, id: 9 };
      Post.create.mockResolvedValue(newPost);
      await CreatePost(req, res);

      expect(Post.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newPost);
    });

    it("should handle errors", async () => {
      const req = { body: {} };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const error = new Error("Test error");
      Post.create.mockRejectedValue(error);

      await CreatePost(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error });
    });
  });

  describe("Get all posts data", () => {
    it("should return all posts data", async () => {
      const req = { body: {} };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const mockPostContent = [
        { id: 1, title: "hello", content: "welcome to palestine " },
        // { id: 1, title: "esfdgvb", content: "ewdsfsf" }
      ];
      Post.findAll.mockResolvedValue(mockPostContent);
      await getAllPost();

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockPostContent);
    });
  });

  describe("Get comments for a post based on the id", () => {
    it("should return comments for a post based on the id", async () => {
      const req = { params: { id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const mockComments = [
        { id: 1, content: "hbn" },
        { id: 2, content: "edsxdsdd" },
      ];

      Comment.findAll.mockResolvedValue(mockComments);
      await getCommentsPost(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ comments: mockComments });
    });

    it("should handle errors when getting comment", async () => {
      const req = { params: { id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const error = new Error("Test failed");
      Comment.findAll.mockRejectedValue(error);
      await getCommentsPost(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Unable to get comments",
      });
    });
  });
});