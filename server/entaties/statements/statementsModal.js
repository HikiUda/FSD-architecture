class OneStatementDto {
   id;
   info;
   title;
   description;
   user;
   userId;
   state;
   adminComment;
   appNumber;
   createdAt;
   constructor(data) {
      this.id = data.id;
      this.info = data.info;
      this.title = data.title;
      this.description = data.description;
      this.user = data.user.email;
      this.userId = data.userId;
      this.state = data.state;
      this.adminComment = data.adminComment;
      this.appNumber = data.appNumber;
      this.createdAt = data.createdAt;
   }
}
class OneShortStatementDto {
   id;
   title;
   state;
   appNumber;

   constructor(data) {
      this.id = data.id;
      this.title = data.title;
      this.state = data.state;
      this.appNumber = data.appNumber;
   }
}

module.exports = { OneStatementDto, OneShortStatementDto };
