const fs = require("fs");
const csv = require("csv-parser");
const mongoose = require("./DB/mongodb");

const assetsPath =
  process.env.HOME + "/Programming/Delfosim/backend-test-01/assets/";
const userCsvPath = assetsPath + "user.csv";
const roleCsvPath = assetsPath + "role.csv";
const clientCsvPath = assetsPath + "client.csv";
const moduleClientCsvPath = assetsPath + "module-client.csv";
const moduleRoleCsvPath = assetsPath + "module-role.csv";
const moduleCsvPath = assetsPath + "module.csv";
const moduleGroupCsvPath = assetsPath + "module-group.csv";

const data = {
  users: [],
  roles: [],
  clients: [],
  moduleClient: [],
  moduleRole: [],
  modules: [],
  moduleGroup: [],
};

const readAllData = async () => {
  await readUsers().then();
  await readRoles().then();
  await readClients().then();
  await readModuleClient().then();
  await readModuleRole().then();
  await readModules().then();
  await readModuleGroup().then();
  console.log("Dados lidos");
  return true;
};

const readUsers = async () => {
  data.users = [];

  fs.createReadStream(userCsvPath)
    .pipe(csv())
    .on("data", (row) => {
      const user = {
        id: row.id,
        client_id: row.client_id,
        user_name: row.user_name,
        role_id: row.role_id,
        user_email: row.user_email,
        user_phone: row.user_phone,
        user_type: row.user_type,
        creator_user_id: row.creator_user_id,
        creation_time: row.creation_time,
        is_confirmed: row.is_confirmed,
        is_active: row.is_active,
      };

      user.is_confirmed = user.is_confirmed === "True" ? true : false;
      user.is_active = user.is_active === "True" ? true : false;
      data.users.push(user);
      mongoose.addUsers(user);
    })
    .on("end", () => {
      console.log("Users Lidos");
      // readRoles();
    });
  return data.users;
};

const readRoles = async () => {
  data.roles = [];

  fs.createReadStream(roleCsvPath)
    .pipe(csv())
    .on("data", (row) => {
      const role = {
        id: row.id,
        client_id: row.client_id,
        role_name: row.role_name,
      };
      data.roles.push(role);
      mongoose.addRoles(role);
    })
    .on("end", () => {
      console.log("Roles Lidos");
    });
  return data.roles;
};

const readClients = async () => {
  data.clients = [];

  fs.createReadStream(clientCsvPath)
    .pipe(csv())
    .on("data", (row) => {
      const client = {
        client_id: row.client_id,
        client_name: row.client_name,
        client_tag: row.client_tag,
      };
      data.clients.push(client);
      mongoose.addClients(client);
    })
    .on("end", () => {
      console.log("Clients Lidos");
    });
  return data.clients;
};

const readModuleClient = async () => {
  data.modulesClient = [];

  fs.createReadStream(moduleClientCsvPath)
    .pipe(csv())
    .on("data", (row) => {
      const moduleClient = {
        id: row.id,
        client_id: row.client_id,
        module_id: row.module_id,
      };
      data.moduleClient.push(moduleClient);
      mongoose.addModuleClient(moduleClient);
    })
    .on("end", () => {
      console.log("Module-Client Lidos");
    });
  return data.moduleClient;
};

const readModuleRole = async () => {
  data.modulesRole = [];

  fs.createReadStream(moduleRoleCsvPath)
    .pipe(csv())
    .on("data", (row) => {
      const moduleRole = {
        id: row.id,
        role_id: row.role_id,
        module_id: row.module_id,
      };
      data.moduleRole.push(moduleRole);
      mongoose.addModuleRole(moduleRole);
    })
    .on("end", () => {
      console.log("Module-Client Lidos");
    });
  return data.moduleRole;
};

const readModules = async () => {
  data.modules = [];

  fs.createReadStream(moduleCsvPath)
    .pipe(csv())
    .on("data", (row) => {
      const modules = {
        id: row.id,
        name: row.name,
        tag: row.tag,
        route: row.route,
        group_id: row.group_id,
      };
      data.modules.push(modules);
      mongoose.addModules(modules);
    })
    .on("end", () => {
      console.log("Modules Lidos");
    });
  return data.modules;
};

const readModuleGroup = async () => {
  data.moduleGroup = [];

  fs.createReadStream(moduleGroupCsvPath)
    .pipe(csv())
    .on("data", (row) => {
      const moduleGroup = {
        id: row.id,
        name: row.name,
        tag: row.tag,
        route: row.route,
        hierarchy_level: row.hierarchy_level,
      };
      data.moduleGroup.push(moduleGroup);
      mongoose.addModuleGroup(moduleGroup);
    })
    .on("end", () => {
      console.log("Module-Group Lidos");
    });
  return data.moduleGroup;
};

module.exports = {
  readUsers: readUsers,
  readRoles: readRoles,
  readClients: readClients,
  readModuleClient: readModuleClient,
  readModuleRole: readModuleRole,
  readModules: readModules,
  readModuleGroup: readModuleGroup,
  readAllData: readAllData,
};
