var express = require("express");
const UsersService = require("../services/users");

var router = express.Router();


router.get("/", async function (req, res) {
  try {
    const usersData = await UsersService.getAll();
    res.json(usersData); 
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu người dùng:", error);
    res.status(500).json({ error: "Lỗi server" });
  }
});

module.exports = router;
