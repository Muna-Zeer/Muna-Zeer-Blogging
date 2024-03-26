const {
    createNewUser,
    getAllUsers,
    getUserByID,
    getUserEditPage,
    updateUserInfo,
    deleteUserId,
  } = require("../controllers/userController");
  const { User } = require("../models/user");
  const {comment}=require("../models/comment")
  
  jest.mock("../models/user.js", () => ({
    User: {
      create: jest.fn(),
      findAll: jest.fn(),
      findByPk: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn(),
    },
  }));
  
  describe("Controller Functions", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    const mockUserData = {
      username: "munaelzeer",
      email: "munaelzeer@gmail.com",
      password: "1233434",
    };
    describe("createNewUser", () => {
      it("should create a new user", async () => {
        const req = { body: mockUserData };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const newUser = { ...mockUserData, id: 5 };
        User.create.mockResolvedValue(newUser);
  
        await createNewUser(req, res);
  
        expect(User.create).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(newUser);
      });
  
      it("should handle errors", async () => {
        const req = { body: {} };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const error = new Error("Test error");
        User.create.mockRejectedValue(error);
  
        await createNewUser(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error });
      });
    });
  
    describe("delete user", () => {
      it("should delete an existing userId", async () => {
        const req = { params: { userId: 1 } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
        User.destroy.mockResolvedValue(1);
        await deleteUserId(req, res);
        expect(User.destroy).toHaveBeenCalledWith({
          where: { id: req.params.userId },
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          message: "User deleted successfully ",
        });
      });
      it("Should handle if the user is not existing", async () => {
        const req = { params: { userId: 1 } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        User.destroy.mockResolvedValue(0);
        await deleteUserId(req, res);
        expect(User.destroy).toHaveBeenCalledWith({
          where: { id: req.params.userId },
        });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: "User not found!!" });
      });
    });
  
  
    //describe if the userId exist
    describe("when the userId is not found",()=>{
      it("should return user by ID", async () => {
      const req={params:{userId:1}};
      const res={status:jest.fn().mockReturnThis(),json:jest.fn()}
      const mockUser={id:1,username:"testUser",email:"test@gmail.com"}
      User.findByPk.mockResolvedValue(mockUser);
      await getUserByID(req,res);
      expect(User.findByPk).toHaveBeenCalledWith(req.params.userId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });
    it("should handle if the user is not found",async()=>{
      const req={params:{userId:1}};
      const res={status:jest.fn().mockReturnThis(),json:jest.fn()}
      // const mockUser={id:1,username:"testUser",email:"test@gmail.com"}
      User.findByPk.mockResolvedValue(null);
      await getUserByID(req,res);
      expect(User.findByPk).toHaveBeenCalledWith(req.params.userId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({error:"userNotFound"});
    })
  });
  
  
  //Test the update user 
  describe("updateUser Info",()=>{
    it("should update the user info",async()=>{
      const req={params:{userId:1},body:{username:"testUser"}}
      const res={status:jest.fn().mockReturnThis(),json:jest.fn()}
      const mockUpdatedUser = { id: 1, username: "updatedUsername", email: "test@example.com" };
  
      User.update.mockResolvedValue([1]);
      await updateUserInfo(req,res);
  
      expect(User.update).toHaveBeenCalledWith(req.body, {
        where: { id: req.params.userId },
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUpdatedUser);
    })
    it("should handle if the user is not found",async()=>{
      const req={params:{userId:1},body:{username:"testUser"}}
      const res={status:jest.fn().mockReturnThis(),json:jest.fn()}
      User.update.mockResolvedValue([0]);
      await updateUserInfo(req,res);
      expect(User.update).toHaveBeenCalledWith(req.body,{
        where:{id:req.params.userId}
      });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({error:"User Not found"});
  
    })
  })
  
  
  
  });
  