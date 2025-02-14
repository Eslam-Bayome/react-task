import { IUser } from "@/actions/userActions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteModal } from "./DeleteModal";
import { useState } from "react";

export function UserTable({
  userData,
  setUpdateUser,
  onDelete,
}: {
  userData: Array<IUser>;
  setUpdateUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  onDelete: (userName: string) => void;
}) {
  const [modal, setModal] = useState({
    isOpen: false,
    userName: "",
  });

  return userData?.length ? (
    <Table>
      <DeleteModal
        onConfirm={() => {
          onDelete(modal.userName);
        }}
        isOpen={modal.isOpen}
        setIsOpen={() => {
          setModal((prev) => ({ ...prev, isOpen: !prev.isOpen }));
        }}
        title="Are You Sure You Want to Delete This User ?"
      />
      <TableHeader className="bg-gray-300">
        <TableRow>
          <TableHead className="w-[100px]">UserName</TableHead>
          <TableHead>ArabicName</TableHead>
          <TableHead>EnglishName</TableHead>
          <TableHead className="w-[150px]">Actions</TableHead>{" "}
        </TableRow>
      </TableHeader>
      <TableBody>
        {userData.map((user) => (
          <TableRow key={user.userName}>
            <TableCell className="font-medium">{user.userName}</TableCell>
            <TableCell>{user.arabicName}</TableCell>
            <TableCell>{user.englishName}</TableCell>
            <TableCell>
              <button
                className="bg-green-500 cursor-pointer text-white px-2 py-1 rounded mr-2"
                onClick={() => setUpdateUser(user)}
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
                onClick={() =>
                  setModal({
                    isOpen: true,
                    userName: user.userName,
                  })
                }
              >
                Delete
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : null;
}
