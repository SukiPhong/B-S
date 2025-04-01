import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  AddUserSheet,
  EditUserSheet,
  SearchBarUsersOfAdmin,
} from "@/components/admin";
import { useEffect, useState } from "react";
import { apiDeleteUser, apiGetUsers } from "@/apis/user";
import { Link, useSearchParams } from "react-router-dom";
import { PaginationComponent } from "@/components/pagination";
import { Badge } from "@/components/ui/badge";
import { pathnames } from "@/lib/pathname";

const ManagerUsersPage = () => {
  const [dataUsers, setDataUsers] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    const fetchData = async () => {
      const response = await apiGetUsers({ ...params });
      if (response.data.success === true) {
        setDataUsers(response.data.data);
      }
    };
    params.limit = import.meta.env.VITE_LIMIT_MANAGER_USER_PAGE;
    fetchData();
  }, [searchParams]);
  const handleDeleteUser = async (id) => {
    const response = await apiDeleteUser(id);
    if (response.data.success) {
      const dataUpdate = await apiGetUsers({
        limit: import.meta.env.VITE_LIMIT_MANAGER_USER_PAGE,
      });
      setDataUsers(dataUpdate.data.data);
    }
  };
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between  mb-3 flex-none">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Users</h1>
          <Badge className="font-roboto text-xs flex gap-1 bg-[#5E658C] rounded-full">
            <span className="text-green-500">{dataUsers.count}</span>
            <span> users found</span>
          </Badge>
        </div>
        <div>
          <AddUserSheet />
        </div>
      </div>
      <div className="flex space-x-4 mb-6 w-[400px]">
        <SearchBarUsersOfAdmin />
      </div>
      {/* Table Content Section */}
      <div className="flex-1 overflow-y-auto ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>STT</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataUsers?.rows?.map((user, idx) => (
              <TableRow key={user.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>
                  <Link
                    className="hover:cursor-pointer hover:underline hover:text-main "
                    to={`/${pathnames.public.ListProperty_Of_User}/${user.id}`}
                  >
                    {user.fullname}
                  </Link>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.Role ? "admin" : "user"}</TableCell>
                <TableCell>{user.idPricing}</TableCell>
                <TableCell>
                  <EditUserSheet user={user} />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="ml-2"
                    onClick={() => {
                      handleDeleteUser(user.id);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer Section (Pagination) */}
      <div className="mt-4 flex-none">
        {dataUsers?.rows?.length > 0 && (
          <PaginationComponent
            total={dataUsers?.count}
            currentPage={dataUsers?.page}
            limit={dataUsers?.limit}
          />
        )}
      </div>
    </div>
  );
};

export default ManagerUsersPage;
