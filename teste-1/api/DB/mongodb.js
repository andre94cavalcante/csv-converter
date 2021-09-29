const mongoose = require("mongoose");
const { userSchema } = require("./userSchema");
const { roleSchema } = require("./roleSchema");
const { clientSchema } = require("./clientSchema");
const { moduleClientSchema } = require("./moduleClientSchema");
const { moduleRoleSchema } = require("./moduleRoleSchema");
const { modulesSchema } = require("./modulesSchema");
const { moduleGroupSchema } = require("./moduleGroupSchema");
const configDotEnv = require("../configDotEnv");

mongoose.set("useFindAndModify", false);

//Local MongoDB Database
// mongoose.connect(configDotEnv.MONGO_URL_LOCAL, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
// });

//Remote MongoDB Database
mongoose.connect(configDotEnv.MONGO_URL_REMOTE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const User = mongoose.model("users", userSchema);
const Client = mongoose.model("clients", clientSchema);
const Role = mongoose.model("roles", roleSchema);
const ModuleClient = mongoose.model("moduleClient", moduleClientSchema);
const ModuleRole = mongoose.model("moduleRole", moduleRoleSchema);
const Module = mongoose.model("modules", modulesSchema);
const ModuleGroup = mongoose.model("moduleGroup", moduleGroupSchema);

const addUsers = async (data) => {
  const user = await new User(data);
  user.id = data.id;
  user.client_id = data.client_id;
  user.user_name = data.user_name;
  user.role_id = data.role_id;
  user.user_email = data.user_email;
  user.user_phone = data.user_phone;
  user.user_type = data.user_type;
  user.creator_user_id = data.creator_user_id;
  user.creation_time = data.creation_time;
  user.is_confirmed = data.is_confirmed;
  user.is_active = data.is_active;
  user
    .save()
    .then((user) => {
      console.log("Created object in the DB:");
      console.log(user);
    })
    .catch((error) => {
      console.log("Error creating User object!", error);
    });
  // return user;
};

const addRoles = async (data) => {
  const role = await new Role(data);
  role.id = data.id;
  role.client_id = data.client_id;
  role.role_name = data.role_name;
  role
    .save()
    .then((role) => {
      console.log("Created object in the DB:");
      console.log(role);
    })
    .catch((error) => {
      console.log("Error creating Role object!", error);
    });
  // return role;
};

const addClients = async (data) => {
  const client = await new Client(data);
  client.client_id = data.client_id;
  client.client_name = data.client_name;
  client.client_tag = data.client_tag;
  client
    .save()
    .then((client) => {
      console.log("Created object in the DB:");
      console.log(client);
    })
    .catch((error) => {
      console.log("Error creating Client object!", error);
    });
  // return client;
};

const addModuleClient = async (data) => {
  const moduleClient = await new ModuleClient(data);
  moduleClient.id = data.id;
  moduleClient.client_id = data.client_id;
  moduleClient.module_id = data.module_id;
  moduleClient
    .save()
    .then((moduleClient) => {
      console.log("Created object in the DB:");
      console.log(moduleClient);
    })
    .catch((error) => {
      console.log("Error creating ModuleClient object!", error);
    });
  // return moduleClient;
};

const addModuleRole = async (data) => {
  const moduleRole = await new ModuleRole(data);
  moduleRole.id = data.id;
  moduleRole.role_id = data.role_id;
  moduleRole.module_id = data.module_id;
  moduleRole
    .save()
    .then((moduleRole) => {
      console.log("Created object in the DB:");
      console.log(moduleRole);
    })
    .catch((error) => {
      console.log("Error creating ModuleRole object!", error);
    });
  // return moduleRole;
};

const addModules = async (data) => {
  const module = await new Module(data);
  module.id = data.id;
  module.name = data.name;
  module.tag = data.tag;
  module.route = data.route;
  module.group_id = data.group_id;
  module
    .save()
    .then((module) => {
      console.log("Created object in the DB:");
      console.log(module);
    })
    .catch((error) => {
      console.log("Error creating Module object!", error);
    });
  // return module;
};

const addModuleGroup = async (data) => {
  const moduleGroup = await new ModuleGroup(data);
  moduleGroup.id = data.id;
  moduleGroup.name = data.name;
  moduleGroup.tag = data.tag;
  moduleGroup.route = data.route;
  moduleGroup.hierarchy_level = data.hierarchy_level;
  moduleGroup
    .save()
    .then((moduleGroup) => {
      console.log("Created object in the DB:");
      console.log(moduleGroup);
    })
    .catch((error) => {
      console.log("Error creating ModuleGroup object!", error);
    });
  // return moduleGroup;
};

const readAllUsers = async () => {
  const arrUsers = await User.find().then();
  return arrUsers;
};

const getRole = async (id) => {
  const role = await Role.findOne({
    id: id,
  }).then();
  return role.role_name;
};

const getModuleIdByClientId = async (id) => {
  const arrModuleClientId = await ModuleClient.find({
    client_id: id,
  }).then();
  if (arrModuleClientId.length >= 1) {
    // console.log(`Modules for the client with id ${id}`);
    // console.log(arrModuleClientId);
  } else if (arrModuleClientId == undefined) {
    arrModuleClientId = [];
  }
  return arrModuleClientId;
};

const getModuleIdByRoleId = async (id) => {
  const arrModuleRoleId = await ModuleRole.find({
    role_id: id,
  }).then();
  if (arrModuleRoleId.length >= 1) {
    // console.log(`Modules for the Role with id ${id}`);
    // console.log(arrModuleRoleId);
  } else if (arrModuleRoleId == undefined) {
    arrModuleRoleId = [];
  }
  return arrModuleRoleId;
};

const getModuleById = async (id) => {
  const module = await Module.findOne({
    id: id,
  }).then();
  return module;
};

const clearDB = async () => {
  let collections = [
    "users",
    "clients",
    "roles",
    "moduleclients",
    "moduleroles",
    "modules",
    "modulegroups",
  ];
  for (let collectionName of collections) {
    try {
      mongoose.connection.db.dropCollection(
        collectionName,
        (collectionName) => {
          console.log(`${collectionName} was dropped`);
        }
      );
    } catch {
      console.log(`${collectionName} doesn't exist`);
    }
  }
};

module.exports = {
  addUsers: addUsers,
  addRoles: addRoles,
  addClients: addClients,
  addModuleClient: addModuleClient,
  addModuleRole: addModuleRole,
  addModules: addModules,
  addModuleGroup: addModuleGroup,
  readAllUsers: readAllUsers,
  getRole: getRole,
  getModuleIdByClientId: getModuleIdByClientId,
  getModuleIdByRoleId: getModuleIdByRoleId,
  getModuleById: getModuleById,
  clearDB: clearDB,
};
