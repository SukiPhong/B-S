import { useState, useEffect } from "react";
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
import { apiEditPricing } from "@/apis/pricing";
import PropTypes from 'prop-types'
const EditPricingSheet = ({ pricing, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updatedPricing, setUpdatedPricing] = useState(pricing);

  useEffect(() => {
    setUpdatedPricing(pricing);
  }, [pricing]);

  const handleInputChange = (e) => {
    setUpdatedPricing({ ...updatedPricing, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (field) => (value) => {
    setUpdatedPricing({
      ...updatedPricing,
      [field]: field === "isDisplayImmedialy" || field === "recommended" ? value === "true" : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiEditPricing(updatedPricing);
      if (response.data.success) {
        toast.success(response.data.message);
        window.location.reload();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "An error occurred"
      );
    }
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button>Edit Pricing</Button>
      </SheetTrigger>
      <SheetContent className="overflow-auto">
        <SheetHeader>
          <SheetTitle>Edit Pricing</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Select
              name="name"
              onValueChange={handleSelectChange("name")}
              value={updatedPricing.name}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a level">
                  {updatedPricing.name}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Thường">Thường</SelectItem>
                <SelectItem value="Đồng">Đồng</SelectItem>
                <SelectItem value="Bạc">Bạc</SelectItem>
                <SelectItem value="Vàng">Vàng</SelectItem>
                <SelectItem value="Kim Cương">Kim Cương</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={updatedPricing.price}
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
              value={updatedPricing.priority}
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
              value={updatedPricing.requireScore}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="requireScoreNextLevel">
              Require Score Next Level
            </Label>
            <Input
              id="requireScoreNextLevel"
              name="requireScoreNextLevel"
              type="number"
              value={updatedPricing.requireScoreNextLevel}
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
              value={updatedPricing.levelShowDescription}
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
              value={updatedPricing.expiredDay}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="isDisplayImmedialy">Display Immediately</Label>
            <Select
              name="isDisplayImmedialy"
              onValueChange={handleSelectChange("isDisplayImmedialy")}
              value={updatedPricing.isDisplayImmedialy.toString()}
              required
            >
              <SelectTrigger>
                <SelectValue>
                  {updatedPricing.isDisplayImmedialy ? "Yes" : "No"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="false">No</SelectItem>
                <SelectItem value="true">Yes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* New Field: Features */}
          <div>
            <Label htmlFor="features">Features</Label>
            <Input
              id="features"
              name="features"
              type="text"
              value={updatedPricing.features}
              onChange={handleInputChange}
              className="mt-1"
              placeholder="Viết xong 1  tính năng  vui lòng  thêm ',' phía sau"
            />
          </div>
          {/* New Field: Recommended */}
          <div>
            <Label htmlFor="recommended">Recommended</Label>
            <Select
              name="recommended"
              onValueChange={handleSelectChange("recommended")}
              value={updatedPricing.recommended?.toString()}
              required
            >
              <SelectTrigger>
                <SelectValue>
                  {updatedPricing.recommended ? "Yes" : "No"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="false">No</SelectItem>
                <SelectItem value="true">Yes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default EditPricingSheet;
EditPricingSheet.protoType={
  pricing:PropTypes.number,
  onUpdate:PropTypes.func
}
