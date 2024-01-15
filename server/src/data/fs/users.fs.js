import fs from "fs";
import crypto from "crypto";

class UserManager {
  static #users = [];

  constructor() {
    this.path = "./src/data/fs/files/users.json";
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

  createUser({ name, email, photo }) {
    try {
      if (!name || !email || !photo) {
        throw new Error("Please provide all required fields");
      }

      const newUser = {
        id: crypto.randomBytes(12).toString("hex"),
        name,
        email,
        photo,
      };

      UserManager.#users.push(newUser);

      fs.writeFileSync(this.path, JSON.stringify(UserManager.#users, null, 2));

      return "User created";
    } catch (error) {
      throw error;
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
      throw error;
    }
  }

  readOne(id) {
    try {
      const userId = id;
      const user = UserManager.#users.find((each) => each.id === userId);

      if (!user) {
        throw new Error("User not found!");
      } else {
        return user;
      }
    } catch (error) {
      throw error;
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

      const jsonData = JSON.stringify(UserManager.#users, null, 2);
      await fs.promises.writeFile(this.path, jsonData);

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

      fs.writeFileSync(this.path, JSON.stringify(UserManager.#users, null, 2));

      return "User deleted";
    } catch (error) {
      throw error;
    }
  }
}

const ManagerUser = new UserManager();
export default ManagerUser;
