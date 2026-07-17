
import React from "react";
import { useDropzone } from "react-dropzone";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next"; 

const DropzoneComponent = ({ setImageFile, setSelectedFile }) => {

  const { t } = useTranslation();
  const notify = () =>
    toast.error(t("forms.dropZone.invalidFile"), {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const fileValidator = (file) => {
    const acceptedFileTypes = [ "image/jpeg", "image/png", "image/gif"];
    if (!acceptedFileTypes.includes(file.type)) {
      return {
        code: "filetype-not-allowed",
        message: t("forms.dropZone.invalidFileType"),
      };
    }
    if (file.size > 2 * 1024 * 1024) {
      return {
        code: "size-too-large",
        message: t("forms.dropZone.invalidFileSize"),
      };
    }
    return null;
  };

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    validator: fileValidator,
    maxFiles: 1,
    onDrop: (files) => {
      if (files.length === 0) {
        return;
      }
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        console.error(" El tamaño máximo de archivo es de 2MB.");
      } else if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
        console.error("Solo archivos de tipo: JPEG, PNG y GIF.");
      } else {
        setImageFile(URL.createObjectURL(file));
        setSelectedFile(file);
      }
    },
    onDropRejected: (rejectedFiles) => {
      const rejectedFile = rejectedFiles[0];
      if (rejectedFile.size > 2 * 1024 * 1024) {
        console.error("El tamaño máximo de archivo es de 2MB.");
      } else {
        notify();
      }
    },
  });

  return (
    <div className={`div-inputReg imagenReg dropzone-container ${isDragActive ? "focused" : ""} ${isDragAccept ? "accept" : ""} ${isDragReject ? "reject" : ""}`}>
      <label>Avatar</label>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>{t("forms.dropZone.dropHere")}</p>
        ) : (
          <p>{t("forms.dropZone.clickToSelect")}</p>
        )}
      </div>
      
      <p className="warning">{t("forms.dropZone.imageConstraints")}</p>
    
    </div>
  );
};

export default DropzoneComponent;
