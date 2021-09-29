const mongoose = require("./DB/mongodb");
const userSchema = require("./DB/userSchema");

let arrUsers = [];

const getUserInfo = async () => {
  let module = {
    id: "",
    description: "",
  };
  const arrRawUsers = await mongoose.readAllUsers().then();
  for (let rawUser of arrRawUsers) {
    //Como o role_id em Users comeca a contar do 1 e nao do 0, como acontece em Role eh necessario fazer um decremento em rawUser.role_id
    rawUser.role_id--;
    let role = await mongoose.getRole(rawUser.role_id).then();
    let arrModuleClient = await mongoose
      .getModuleIdByClientId(rawUser.client_id)
      .then();
    let arrModuleRole = await mongoose
      .getModuleIdByRoleId(rawUser.role_id)
      .then();
    let arrModulesId = compareModules(arrModuleClient, arrModuleRole);
    let user = {
      name: rawUser.user_name,
      role: role,
      modules: [],
      // role_id: rawUser.role_id,
      // client_id: rawUser.client_id,
      // moduleClient: arrModuleClient,
      // moduleRole: arrModuleRole,
      // modules_id: arrModulesId,
    };
    for (let moduleID of arrModulesId) {
      let rawModule = await mongoose.getModuleById(moduleID).then();
      module.id = rawModule.id;
      module.description = rawModule.name;
      user.modules.push(module);
      module = {
        id: "",
        description: "",
      };
    }
    arrUsers.push(user);
  }
  // console.table(arrUsers);
  return arrUsers;
};

const compareModules = (arrModClient, arrModRole) => {
  let arrModule = [];
  arrModClient.forEach((modClient) => {
    arrModRole.forEach((modRole) => {
      if (modClient.module_id === modRole.module_id) {
        arrModule.push(modClient.module_id);
      }
    });
  });
  return arrModule;
};

module.exports = {
  getUserInfo: getUserInfo,
};
