import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";
import { cn } from "@/lib/utils";

const pointsPackages = [
  {
    points: 100,
    price: "99.000",
    bonus: "Không có bonus",
    color: "bg-gray-100"
  },
  {
    points: 500,
    price: "459.000",
    bonus: "50",
    color: "bg-blue-100"
  },
  {
    points: 1000,
    price: "899.000",
    bonus: "150",
    color: "bg-yellow-100",
    recommended: true
  },
  {
    points: 4999,
    price: "4.299.000",
    bonus: "999",
    color: "bg-purple-100"
  }
];

const PayPoint=() =>{
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Mua Điểm
        </CardTitle>
        <p className="text-center text-muted-foreground">
          Nạp điểm để nâng cấp gói hội viên
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {pointsPackages.map((pkg, index) => (
            <Card
              key={index}
              className={cn(
                "relative flex flex-col",
                pkg.recommended && "border-2 border-yellow-400 shadow-lg"
              )}
            >
              {pkg.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-medium">
                    Giá trị nhất
                  </span>
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-4">
                  <Coins className={cn("h-12 w-12", 
                    pkg.points >= 4999 ? "text-purple-500" :
                    pkg.points >= 1000 ? "text-yellow-500" :
                    pkg.points >= 500 ? "text-blue-500" : "text-gray-500"
                  )} />
                </div>
                <CardTitle className="text-xl mb-2">{pkg.points} Điểm</CardTitle>
                <p className="text-2xl font-bold">{pkg.price}</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className={cn("p-4 rounded-lg text-center", pkg.color)}>
                  <p className="font-medium">{pkg.bonus}</p>
                </div>
              </CardContent>
              <div className="p-6 mt-auto">
                <Button
                  className={cn(
                    "w-full",
                    pkg.recommended ? "bg-yellow-400 hover:bg-yellow-500 text-black" : ""
                  )}
                  variant={pkg.recommended ? "default" : "outline"}
                >
                  Mua ngay
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
export default PayPoint