import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../redux/usuarios/usuarios.actions";
import Button from "../Button/Button";
import SubirImagen from "../SubirImagen/SubirImagen";
import "./FormularioEdicionUsuario.css";
import { useDropzone } from "react-dropzone";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 


const FormularioEdicionUsuario = ({ userData }) => {
  const [mostrarSubirImagen, setMostrarSubirImagen] = useState(false);
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState(userData.avatar);
  const [selectedFile, setSelectedFile] = useState(null);
  const notify = () => toast.error("Arquivo non valido", {
    position: "bottom-center",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });
  const mostrarSubirImagenHandler = () => {
    setMostrarSubirImagen(true);
  };

  const removeAvatar = () => {
    setImageFile(null);
  };

  const handleImageSelection = (e) => {
    setImageFile(URL.createObjectURL(e.target.files[0]));
    setSelectedFile(e.target.files[0])
  };
  const fileValidator = (file) => {
    const acceptedFileTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!acceptedFileTypes.includes(file.type)) {
      return {
        code: "filetype-not-allowed",
        message: `El tipo de archivo no está permitido. Los tipos de archivo permitidos son: JPEG, PNG y GIF.`,
      };
    }
    if (file.size > 2 * 1024 * 1024) {
      return {
        code: "size-too-large",
        message: `El archivo es demasiado grande. El tamaño máximo permitido es de 2MB.`,
      };
    }
    return null;
  }
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    validator: fileValidator,
    maxFiles: 1,
 
    onDrop: (files) => {
      if (files.length === 0) {
        // Si no se soltó ningún archivo, terminamos aquí
        return;
      }
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        // Archivo demasiado grande, muestra un mensaje de error
        alert("El archivo es demasiado grande. El tamaño máximo permitido es de 2MB.");
      } else if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
        // Tipo de archivo no admitido, muestra un mensaje de error al usuario
        alert("Tipo de archivo no admitido. Los tipos de archivo admitidos son: JPEG, PNG y GIF.");
      } else {
        setImageFile(URL.createObjectURL(file));
        setSelectedFile(file);
      }
    },
    
    
    onDropRejected: (rejectedFiles) => {
      const rejectedFile = rejectedFiles[0];
      if (rejectedFile.size > 2 * 1024 * 1024) {
        
        console.error("El archivo es demasiado grande. El tamaño máximo permitido es de 2MB.");
      } else {
      
       notify()
       
      }
    },
    
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { error } = useSelector((state) => state.usuariosReducer);
  const navigate = useNavigate();

  useEffect(() => {
    setValue("email", userData.email);
    setValue("username", userData.username);
    setValue("newevent", userData.newevent);
    setValue("newsletter", userData.newsletter);
  }, [userData, setValue]);

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };
  const handleFormSubmit = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    if (selectedFile) {
      formData.append("avatar", selectedFile);
    }
    formData.delete('image')
    console.log(Array.from(formData.entries()));
    dispatch(updateUser(formData, userData._id, navigate));
  };

  return (
    <div className="cardReg perfil-container">
    <ToastContainer/>
      <h1>EDITAR DATOS DO USUARIO</h1>
      <p className="error-message">{error}</p>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="div-inputReg">
          <label className="margin-label">E-mail</label>
          <input
            {...register("email", { required: true })}
            type="email"
            name="email"
            id="email"
            className="inputReg"
          />
          {errors.email && (
            <span className="error-message">Email é requerido</span>
          )}
        </div>
        <div className="div-inputReg">
          <label className="margin-label">Usuario</label>
          <input
            {...register("username", {
              required: "Usuario é requerido",
              minLength: {
                value: 2,
                message: "Mínimo dous caracteres",
              },
              maxLength: {
                value: 20,
                message: "Non máis de 20 caracteres",
              },
            })}
            className="inputReg"
          />
          {errors.username && (
            <span className="error-message">{errors.username.message}</span>
          )}
        </div>
        <div className="div-inputReg">
          <label className="margin-label">Notifica novo evento</label>
          <input
            {...register("newevent")}
            type="checkbox"
            name="newevent"
            id="newevent"
            className="inputReg"
          />
        </div>
        <div className="div-inputReg">
          <label className="margin-label">Manda eventos da semana</label>
          <input
            {...register("newsletter")}
            type="checkbox"
            name="newsletter"
            id="newsletter"
            className="inputReg"
          />
        </div>
        {imageFile ? (
          <div className="div-inputReg imagenReg">
            
            <Button text="Eliminar avatar" type="small" onClick={removeAvatar}/>
            {mostrarSubirImagen && (
              <SubirImagen register={register} funcion={handleImageSelection} />
            )}

            <label htmlFor="file-input" className="imagen-avatar-label">
              <img
                className="imagen-avatar"
                src={imageFile}
                alt="Avatar do usuario"
                onClick={() => {
                  mostrarSubirImagenHandler();
                }}
              />
            </label>
          </div>
        ) : (
          <div className={`div-inputReg imagenReg dropzone-container ${isDragActive ? "focused" : ""} ${isDragAccept ? "accept" : ""} ${isDragReject ? "reject" : ""}`}>
            <label>Avatar</label>
            <div {...getRootProps()} >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p >Solta a imaxe aquí...</p>
              ) : (
                <p>
                  Fai clic ou arrastra unha imaxe aquí
                </p>
              )}
            </div>
            {/* {imageFile && (
              <img className="imagen-avatar" src={imageFile} alt="Preview" />
            )} */}
            <p className="warning">Só arquivos PNG, JPG ou GIF de menos de 2Mb</p>
          </div>
        )}

        <div className="botones-edicion-usuario">
          <Button text="Cancelar" type="medium" onClick={handleCancel} />
          <Button
            text="Gardar"
            type="medium"
            onClick={handleSubmit(handleFormSubmit)}
          />
        </div>
      </form>
    </div>
  );
};

export default FormularioEdicionUsuario;
