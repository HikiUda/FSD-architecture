class CommentDto {
   id;
   content;
   deviceId;
   userId;
   userName;

   constructor(data) {
      this.id = data.id;
      this.content = data.content;
      this.deviceId = data.deviceId;
      this.userId = data.userId;
      this.userName = data?.user?.email || null;
   }
}

module.exports = { CommentDto };
