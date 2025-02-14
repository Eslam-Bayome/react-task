/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Formik } from "formik";
import { FormInput } from "./FormInput";
import { Button } from "./ui/button";
import * as Yup from "yup";
import { addUser, IUser, updateUser } from "@/actions/userActions";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export const MainForm = ({
  setUsers,
  setUpdateUser,
  user,
}: {
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
  setUpdateUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  user?: IUser;
}) => {
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const validationSchema = {
    userName: Yup.string().required("مطلوب"),
    password: Yup.string().required("مطلوب"),
    arabicName: Yup.string().required("مطلوب"),
    englishName: Yup.string().optional(),
  };
  const onSubmit = (
    values: IUser,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      if (user) {
        const data = updateUser(values);
        if (data) {
          toast({
            title: "Success",
            description: "User Updated Successfully",
            variant: "success",
          });
          setUsers(data);
          setError(null);
          setUpdateUser(undefined);
          resetForm();
        } else {
          setError("Something went wrong please try again");
        }
      } else {
        const data = addUser(values);
        if (data) {
          toast({
            title: "Success",
            description: "User Added Successfully",
            variant: "success",
          });
          setUsers(data);
          setError(null);
          resetForm();
        } else {
          setError("Something went wrong please try again");
        }
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <>
      {error && (
        <p className="w-full text-red-500 bg-red-200 rounded-sm p-3 mb-3">
          {error}
        </p>
      )}
      <Formik
        initialValues={{
          userName: user?.userName || "",
          password: user?.password || "",
          arabicName: user?.arabicName || "",
          englishName: user?.englishName || "",
        }}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={onSubmit}
      >
        {({ resetForm }) => (
          <Form className="grid grid-cols-3 gap-3">
            <FormInput
              className="flex items-start gap-2"
              label="User Name"
              type="text"
              readOnly={user?.userName ? true : false}
              name="userName"
              validationSchema={Yup.object(validationSchema)}
            />
            <FormInput
              className="flex items-start gap-2"
              label="Password"
              type="password"
              name="password"
              validationSchema={Yup.object(validationSchema)}
            />
            <FormInput
              className="flex items-start gap-2"
              label="Arabic Name"
              name="arabicName"
              type="text"
              validationSchema={Yup.object(validationSchema)}
            />
            <FormInput
              className="flex items-start gap-2"
              label="English Name"
              name="englishName"
              type="text"
              validationSchema={Yup.object(validationSchema)}
            />
            <div className="flex gap-3 col-span-3 mt-5">
              <Button
                type="button"
                className="bg-red-500 cursor-pointer text-white border-0 rounded-none px-6"
                title="cancel"
                onClick={() => {
                  resetForm();
                }}
              >
                الغاء
              </Button>
              <Button
                className="bg-green-500 cursor-pointer text-white border-0 rounded-none px-6"
                type="submit"
                title="Submit"
              >
                حفظ
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
