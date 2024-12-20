import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { apiNewUser } from "@/apis/user";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";

const AddUserSheet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    fullname: "",
    email: "",
    phone: "",
    Role: false,
    idPricing: "1",
    password: "123456Phong",
  });

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (field) => (value) => {
    setNewUser({
      ...newUser,
      [field]: field === "Role" ? value === "true" : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiNewUser(newUser);
      if (response.data.success) 
        toast.success(response.data.message);
      window.location.reload();
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "An error occurred"
      );
    }
    setIsOpen(false);
    setNewUser({
      fullname: "",
      email: "",
      phone: "",
      Role: false,
      idPricing: 1,
      password: "123456Phong",
    });
  };

  const getHoiVienLabel = (value) => {
    const labels = {
      1: "Cơ bản",
      2: "Đồng",
      3: "Bạc",
      4: "Vàng",
      5: "Kim cương",
    };
    return labels[value] || "Hội viên";
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button>Add New User</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add New User</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="fullname">Name</Label>
            <Input
              id="fullname"
              name="fullname"
              value={newUser.fullname}
              onChange={handleInputChange}
              className="mt-1"
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={newUser.email}
              onChange={handleInputChange}
              className="mt-1"
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={newUser.phone}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Select
              name="Role"
              onValueChange={handleSelectChange("Role")}
              value={newUser.Role.toString()}
              required
            >
              <SelectTrigger>
                <SelectValue>
                  {newUser.Role ? "Admin" : "Người dùng"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="false">Người dùng</SelectItem>
                <SelectItem value="true">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="hoiVien">Hội viên</Label>
            <Select
              name="idPricing"
              onValueChange={handleSelectChange("idPricing")}
              value={newUser.idPricing}
              required
            >
              <SelectTrigger>
                <SelectValue>{getHoiVienLabel(newUser.idPricing)}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={1}>Cơ bản</SelectItem>
                <SelectItem value={2}>Đồng</SelectItem>
                <SelectItem value={3}>Bạc</SelectItem>
                <SelectItem value={4}>Vàng</SelectItem>
                <SelectItem value={5}>Kim cương</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="password">Password (123456Phong)</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={newUser.password}
              onChange={handleInputChange}
              className="mt-1"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Add User
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default AddUserSheet;
