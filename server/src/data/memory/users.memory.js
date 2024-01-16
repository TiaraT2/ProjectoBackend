import fs from "fs";
import crypto from "crypto";

class UserManager {
  static #users = [];

  constructor() {
    this.path = "./FS Manager/files/users.json";
    this.conf = "utf-8";
    this.init();
  }

  init() {
    try {
      const fileExists = fs.existsSync(this.path);

      if (fileExists) {
        const fileContent = fs.readFileSync(this.path, this.conf);
        UserManager.#users = JSON.parse(fileContent);

        UserManager.#users.forEach((user) => {
          if (!user.id) {
            user.id = crypto.randomBytes(12).toString("hex");
          }
        });
      } else {
        fs.writeFileSync(this.path, JSON.stringify([], null, 2));
      }
    } catch (error) {
      console.error("Error initializing UserManager:", error.message);
    }
  }

  create(data) {
    try {
      if (data.name && data.photo && data.email) {
        const newUser = {
          id: crypto.randomBytes(12).toString("hex"),
          name: data.name,
          photo: data.photo,
          email: data.email,
        };

        UserManager.#users.push(newUser);

        fs.writeFileSync(
          this.path,
          JSON.stringify(UserManager.#users, null, 2)
        );

        return newUser;
      } else {
        throw new Error("Please provide all required fields");
      }
    } catch (error) {
      return error.message;
    }
  }

  read() {
    try {
      if (UserManager.#users.length === 0) {
        throw new Error("No users found!");
      } else {
        return UserManager.#users;
      }
    } catch (error) {
      return error.message;
    }
  }

  readOne(id) {
    try {
      const user = UserManager.#users.find((user) => user.id === id);

      if (user) {
        return user;
      } else {
        throw new Error("User not found!");
      }
    } catch (error) {
      return error.message;
    }
  }

  async updateName(id, newName) {
    try {
      const userIndex = UserManager.#users.findIndex((user) => user.id === id);

      if (userIndex === -1) {
        throw new Error("User not found!");
      }

      const updatedUser = { ...UserManager.#users[userIndex], name: newName };

      UserManager.#users[userIndex] = updatedUser;

      return "User name updated";
    } catch (error) {
      throw error;
    }
  }

  destroy(id) {
    try {
      const userIndex = UserManager.#users.findIndex((user) => user.id === id);

      if (userIndex === -1) {
        throw new Error("User not found!");
      }

      UserManager.#users.splice(userIndex, 1);

      return "User deleted";
    } catch (error) {
      return error.message;
    }
  }
}

const Manager = new UserManager();
console.log(
  Manager.create({
    name: "User Example",
    photo: "/images/user.jpg",
    email: "user@example.com",
  })
);
Manager.create({
  name: "User Example",
  photo: "/images/user.jpg",
  email: "user@example.com",
});
console.log(Manager.read());
