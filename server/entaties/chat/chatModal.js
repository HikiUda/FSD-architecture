class ChatDto {
   id;
   withAdmin;
   name;
   createdAt;

   constructor(data) {
      this.id = data.id;
      this.withAdmin = data.withAdmin;
      this.name = data.name;
      this.createdAt = data.createdAt;
   }
}

class ChatContentDto {
   id;
   text;
   isRead;
   createdAt;
   userId;

   constructor(data) {
      this.id = data.id;
      this.userId = data.userId;
      this.text = data.text;
      this.isRead = data.isRead;
      this.createdAt = data.createdAt;
   }
}

module.exports = { ChatDto, ChatContentDto };
