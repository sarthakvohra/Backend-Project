// const { Router } = require("express");
// const router = Router();

const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");
const User = require("../models/user");
const Blog = require("../models/blog");

AdminBro.registerAdapter(AdminBroMongoose);

const AdminBroOptions = {
  resources: [User, Blog],
  rootpath: "/admin",
};

const adminBro = new AdminBro(AdminBroOptions);

const router = AdminBroExpress.buildRouter(adminBro);

// app.use(adminBro.options.rootPath, routers);
//app.listen(3000, () => console.log("AdminBro is under localhost:3000/admin"));

module.exports = router;
