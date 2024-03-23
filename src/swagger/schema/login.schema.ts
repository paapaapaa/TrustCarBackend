const userSchema = {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The user ID",
      },
      username: {
        type: "string",
        description: "The user's username",
      },
      email: {
        type: "string",
        format: "email",
        description: "The user's email address",
      },
    },
  };
  
  module.exports = userSchema;