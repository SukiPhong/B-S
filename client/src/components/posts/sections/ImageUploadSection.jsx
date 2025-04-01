import React, { useEffect, useState } from "react";
import {
  FileUploader,
  FileInput,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import PropTypes, { object } from "prop-types";
import { prototype } from "postcss/lib/previous-map";
import CollapsiblePostSection from "../CollapsiblePostSection";
const ImageUploadSection = ({ form, onToggle, isOpen, title }) => {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const dropzone = {
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    multiple: true,
    maxFiles: 4,
    maxSize: 1 * 1024 * 1024,
  };

  useEffect(() => {
    // Initialize files state with existing images from form
    const existingImages = form.getValues("images") || [];
    setFiles(existingImages.map((url) => ({ url })));
  }, [form]);
  const handleFileChange = (newFiles) => {
    setFiles(newFiles);

    // Lấy giá trị từ mỗi đối tượng trong newFiles (bỏ qua key) và gộp thành mảng
    const imageValues = newFiles.map((file) => Object.values(file)[0]);

    // Lưu mảng giá trị vào form
    form.setValue("images", imageValues);

    // Debug log (giá trị hình ảnh đã được set trong form)
    console.log(form.watch("images"));
  };

  const handleFileRemove = (index, e) => {
    e.preventDefault();
    e.stopPropagation();
    setFiles((prevFiles) => {
      // Lọc và loại bỏ file theo chỉ số
      const updatedFiles = prevFiles.filter((_, i) => i !== index);

      // Lấy giá trị (value) từ mỗi phần tử trong updatedFiles (bỏ qua key)
      const imageValues = updatedFiles.map((file) => Object.values(file)[0]);

      // Cập nhật lại giá trị vào form với mảng giá trị
      form.setValue("images", imageValues);

      console.log(updatedFiles); // In danh sách files đã được cập nhật
      console.log(form.watch("images")); // Kiểm tra giá trị images trong form

      return updatedFiles;
    });
  };
  return (
    <CollapsiblePostSection title={title} isOpen={isOpen} onToggle={onToggle}>
      <FileUploader
        value={files}
        onValueChange={handleFileChange}
        dropzoneOptions={dropzone}
        setIsUploading={setIsUploading}
      >
        <FileInput isUploading={isUploading}></FileInput>
        <FileUploaderContent className="flex items-center flex-row flex-wrap gap-2 mt-4">
          {files.map((file, i) => (
            <FileUploaderItem
              key={i}
              index={i}
              className="w-20 h-20 p-0 rounded-md overflow-hidden relative"
              aria-roledescription={`file ${i + 1} containing ${file.name}`}
            >
              <img
                src={file.url || URL.createObjectURL(file)}
                alt={file.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={(e) => handleFileRemove(i,e)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                aria-label={`Remove ${file.name}`}
              >
                ×
              </button>
            </FileUploaderItem>
          ))}
        </FileUploaderContent>
      </FileUploader>
    </CollapsiblePostSection>
  );
};

export default ImageUploadSection;
ImageUploadSection.propTypes = {
  form: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
