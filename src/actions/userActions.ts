const LOCAL_STORAGE_KEY = "users";
const loadUsers = (): IUser[] => {
  const storedUsers = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedUsers ? JSON.parse(storedUsers) : [];
};

let users: IUser[] = loadUsers();

export interface IUser {
  userName: string;
  password: string;
  arabicName: string;
  englishName: string;
}

export const addUser = (user: IUser) => {
  if (users.find((u) => u.userName === user.userName)) {
    throw new Error("User already exists");
  } else {
    users.push(user);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
    return users;
  }
};
export const userList = () => {
  return [...users];
};

export const deleteUser = (userName: string) => {
  const updatedUsers = users.filter((user) => user.userName !== userName);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedUsers));
  users = updatedUsers;
  return updatedUsers;
};

export const updateUser = (user: IUser) => {
  const isUserAvailable = users.find((u) => u.userName === user.userName);
  if (!isUserAvailable) {
    throw new Error("User not found");
  }

  const updatedUsers = users.map((u) => {
    if (u.userName === user.userName) {
      return user;
    }
    return u;
  });

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedUsers));
  users = updatedUsers;
  return updatedUsers;
};
