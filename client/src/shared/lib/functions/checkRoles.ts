export function checkRoles(checkRoles: string[], roles: string[]) {
   for (let i = 0; i < checkRoles.length; i++) {
      if (roles.includes(checkRoles[i])) {
         return true;
      }
   }
   return false;
}
