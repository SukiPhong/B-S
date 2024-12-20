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
import { toast } from "sonner";

const AddPricingSheet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newPricing, setNewPricing] = useState({
    name: "",
    price: "",
    priority: 1,
    requireScore: 0,
    requireScoreNextLevel: 0,
    levelShowDescription: 0.1,
    expiredDay: 1,
    isDisplayImmedialy: false,
  });

  const handleInputChange = (e) => {
    setNewPricing({ ...newPricing, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (field) => (value) => {
    setNewPricing({
      ...newPricing,
      [field]: field === "isDisplayImmedialy" ? value === "true" : value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await apiNewPricing(newPricing);
  //     if (response.data.success) {
  //       toast.success(response.data.message);
  //       window.location.reload();
  //     }
  //   } catch (error) {
  //     toast.error(
  //       error.response?.data?.message || error.message || "An error occurred"
  //     );
  //   }
  //   setIsOpen(false);
  // };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button>Add New Pricing</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add New Pricing</SheetTitle>
        </SheetHeader>
        <form onSubmit={console.log(1)} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={newPricing.name}
              onChange={handleInputChange}
              className="mt-1"
              required
            />
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={newPricing.price}
              onChange={handleInputChange}
              className="mt-1"
              required
            />
          </div>
          <div>
            <Label htmlFor="priority">Priority</Label>
            <Input
              id="priority"
              name="priority"
              type="number"
              value={newPricing.priority}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="requireScore">Require Score</Label>
            <Input
              id="requireScore"
              name="requireScore"
              type="number"
              value={newPricing.requireScore}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="requireScoreNextLevel">Require Score Next Level</Label>
            <Input
              id="requireScoreNextLevel"
              name="requireScoreNextLevel"
              type="number"
              value={newPricing.requireScoreNextLevel}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="levelShowDescription">Level Show Description</Label>
            <Input
              id="levelShowDescription"
              name="levelShowDescription"
              type="number"
              step="0.1"
              value={newPricing.levelShowDescription}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="expiredDay">Expired Day</Label>
            <Input
              id="expiredDay"
              name="expiredDay"
              type="number"
              value={newPricing.expiredDay}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="isDisplayImmedialy">Display Immediately</Label>
            <Select
              name="isDisplayImmedialy"
              onValueChange={handleSelectChange("isDisplayImmedialy")}
              value={newPricing.isDisplayImmedialy.toString()}
              required
            >
              <SelectTrigger>
                <SelectValue>{newPricing.isDisplayImmedialy ? "Yes" : "No"}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="false">No</SelectItem>
                <SelectItem value="true">Yes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            Add Pricing
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default AddPricingSheet;
