class UserDto {
   id;
   email;
   roles;

   constructor(data) {
      this.id = data.id;
      this.email = data.email;
      this.roles = this.handleRole(data.roles);
   }

   handleRole(roles) {
      if (!Array.isArray(roles)) {
         return roles;
      }
      const cleanRoles = roles.map((role) =>
         role?.dataValues?.name ? role.dataValues.name : role,
      );
      return cleanRoles;
   }
}

module.exports = { UserDto };
