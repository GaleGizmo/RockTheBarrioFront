
import React from "react";
import { useDropzone } from "react-dropzone";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DropzoneComponent = ({ setImageFile, setSelectedFile }) => {
  const notify = () =>
    toast.error("Arquivo non válido", {
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
        message: `Solo archivos de tipo: JPEG, PNG y GIF.`,
      };
    }
    if (file.size > 2 * 1024 * 1024) {
      return {
        code: "size-too-large",
        message: `El tamaño máximo de archivo es de 2MB.`,
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
          <p>Solta a imaxe eiquí...</p>
        ) : (
          <p>Fai clic ou arrastra unha imaxe eiquí</p>
        )}
      </div>
      
      <p className="warning">Só arquivos PNG, JPG ou GIF de menos de 2MB</p>
    
    </div>
  );
};

export default DropzoneComponent;
