import { useEffect, useState } from "react";
import { MainForm } from "./MainForm";
import { deleteUser, IUser, userList } from "@/actions/userActions";
import { UserTable } from "./UserTable";
import { useToast } from "@/hooks/use-toast";

export const UserList = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<IUser[]>([]);
  const [updateUser, setUpdateUser] = useState<IUser | undefined>();
  useEffect(() => {
    const usersList = userList();
    setUsers(usersList);
  }, []);
  const onDelete = (userName: string) => {
    const updatedUsers = deleteUser(userName);
    if (updatedUsers) {
      toast({
        title: "Success",
        description: "User Deleted Successfully",
        variant: "success",
      });
      setUsers(updatedUsers);
    } else {
      toast({
        title: "Error",
        description: "Something went wrong please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="bg-blue-900 w-full px-3 py-2 text-white rounded-sm">
        User Information
      </h3>
      <MainForm
        key={JSON.stringify(updateUser)}
        user={updateUser}
        setUpdateUser={setUpdateUser}
        setUsers={setUsers}
      />
      <UserTable
        setUpdateUser={setUpdateUser}
        userData={users}
        onDelete={onDelete}
      />
    </div>
  );
};
