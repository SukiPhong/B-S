import { apiGetPricing } from "@/apis/pricing";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import useMeStore from "@/zustand/useMeStore";
import { apiUpdatePatchUser } from "@/apis/user";
import PurchaseConfirmationModal from "./PurchaseConfirmationModal";

const General = () => {
  const [pricingData, setPricingData] = useState([]);
  const [selectedTier, setSelectedTier] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { me, getCurrent, setBalance } = useMeStore();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiGetPricing();
        if (response.data.success) {
          setPricingData(
            response.data.response
          );
          
        }
      } catch (error) {
        console.error("Failed to fetch pricing data:", error);
      }
    };
    fetchData();
  }, []);
  console.log(pricingData);

  const handleUpgradeClick = (tier) => {
    if (!me) return;
    const currentTier = pricingData.find((t) => t.id === me.idPricing);
    console.log(1)
    if (!currentTier) return;

    if (tier.priority < currentTier.priority) {
      toast.warning(
        `Bạn đang sử dụng gói ${currentTier.name}. Không thể hạ cấp xuống gói ${tier.name}.`
      );
      return;
    }

    if (tier.id === currentTier.id) {
      toast.info(`Bạn đang chọn gia hạn gói ${currentTier.name} thêm 1 tháng.`);
    }

    setSelectedTier(tier);
    setIsModalOpen(true);
  };

  const handlePurchaseConfirm = async () => {
    if (!selectedTier || !me) return;
    if (+me.balance < +selectedTier.price) {
      toast.error("Số dư không đủ để thực hiện giao dịch này.");
      setIsModalOpen(false);
      setSelectedTier(null);
      return;
    }

    try {
      const newBalance = +me.balance - +selectedTier.price;
      const response =
        selectedTier.id === me.idPricing
          ? await apiUpdatePatchUser({
              idPricing: me.idPricing,
              balance: newBalance,
            })
          : await apiUpdatePatchUser({
              idPricing: selectedTier.id,
              balance: newBalance,
            });

      if (response.data.success) {
        await getCurrent(),
          toast.success(
            selectedTier.id === me.idPricing
              ? `Gia hạn thành công! Gói ${selectedTier.name} đã được gia hạn thêm 1 tháng.`
              : `Nâng cấp thành công! Bạn đã nâng cấp lên gói ${selectedTier.name}.`
          );
      }
    } catch (error) {
      console.error("Failed to process purchase:", error);
      toast.error("Không thể xử lý giao dịch. Vui lòng thử lại sau.");
    } finally {
      setIsModalOpen(false);
      setSelectedTier(null);
    }
  };

  const currentTier = pricingData.find((tier) => tier.id === me?.idPricing);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Các gói nâng cấp tài khoản
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">
          Về các gói nâng cấp tài khoản gồm 4 cái động bao gồm các tính năng.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {pricingData.filter((tier) => tier.priority !== 1).map((tier) => (
            <Card
              key={tier.id}
              className={cn(
                "relative flex flex-col",
                tier.recommended && "border-2 border-yellow-400 shadow-lg"
              )}
            >
              {tier.recommended && (
                <div className="absolute top-0 right-4 left-4 flex items-center justify-center space-x-2 mb-4">
                  <span className="bg-yellow-400 text-black px-4 rounded-sm text-sm font-medium">
                    Phổ biến nhất
                  </span>
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <div className="mb-4">
                  <img
                    src={tier.imgUrl}
                    alt={tier.name}
                    className="mx-auto h-16 w-16"
                  />
                </div>
                <CardTitle className="text-xl mb-2">{tier.name}</CardTitle>
                <p className="text-2xl font-bold">
                  {(+tier.price).toLocaleString()}/Tháng
                </p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {tier.features?.split(",").map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-gray-500"></div>
                      <span className="text-sm">{feature.trim()}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className="p-6 mt-auto">
                <Button
                  className={cn(
                    "w-full",
                    tier.recommended
                      ? "bg-yellow-400 hover:bg-yellow-500 text-black"
                      : ""
                  )}
                  onClick={() => handleUpgradeClick(tier)}
                  variant={tier.recommended ? "default" : "outline"}
                >
                  {tier.id === me?.idPricing ? "Gia hạn" : "Nâng cấp ngay"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
      {selectedTier && currentTier && (
        <PurchaseConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handlePurchaseConfirm}
          currentTier={currentTier}
          newTier={selectedTier}
        />
      )}
    </Card>
  );
};

export default General;
