// const { Router } = require("express");
// const router = Router();

const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");
const User = require("../models/user");
const Blog = require("../models/blog");
const Topics = require("../models/topic");
const Questions = require("../models/question");
const { Mongoose } = require("mongoose");

AdminBro.registerAdapter(AdminBroMongoose);

const AdminBroOptions = {
  resources: [User, Blog, Topics, Questions],
  rootpath: "/admin",
};

const adminBro = new AdminBro(AdminBroOptions);

const router = AdminBroExpress.buildRouter(adminBro);

module.exports = router;
