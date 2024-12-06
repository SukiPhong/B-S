import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1, {
    message: "Trường này là bắt buộc",
  }),
  address: z.string().optional(),
  province: z.string().optional(),
  district: z.string().optional(),
  ward: z.string().optional(),
  price: z.number().min(0, "Giá không thể âm"),
  priceUnits: z.string().min(1, {
    message: "Trường này là bắt buộc",
  }),
  size: z.number().min(0, "Diện tích không thể âm"),
  // description: z.string().min(1, {
  //   message: "Trường này là bắt buộc",
  // }),
  floor: z.number().optional(),
  bathroom: z.number().optional(),
  bedroom: z.number().optional(),
  propertyPurpose: z.string().min(1, {
    message: "Trường này là bắt buộc",
  }),
  properType: z.string().min(1, {
    message: "Trường này là bắt buộc",
  }),
  direction: z.string().optional(),
  balonDirection: z.string().optional(),
  interior: z.string().optional(),
  expiredDate: z.date(),
  images: z
    .array(z.instanceof(File))
    .min(1, { message: "Ít nhất một ảnh là bắt buộc" }),
});
