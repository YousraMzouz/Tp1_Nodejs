import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function Home() {
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const handleImageUpload = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
 
  const { userData } = useContext(UserContext);


  return (
    <div className="page">
      {userData.user ? (
        
 <div>
  
        <h1>Welcome {userData.user.displayName}</h1>

        <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <input
        type="file" accept="image/*" onChange={handleImageUpload} ref={imageUploader}
        style={{
          display: "none"
        }}
      />
      <div
        style={{
          height: "300px",
          width: "300px",
          border: "1px dashed black"
        }}
        onClick={() => imageUploader.current.click()}
      >
        <img ref={uploadedImage}
           style={{
            width: "19.5%",
            height: "41%",
            position: "absolute"
          }}
        />
      </div>
      Click to Create your profil pictrure
    </div>     
    <div className="bt">
    <button type="button" class="btn btn-primary"> Save</button>
<p></p> 
   <button type="button" class="btn btn-secondary"> Show </button> <p></p>
   <button type="button" class="btn btn-secondary"> Find   </button> <p></p>
    </div>
</div>
      ) : (
        <>
          <h2>You are not logged in</h2>
       <div className="im">
          <Link to="/login">Log in</Link>
          </div>
        </>
      )}
    </div>
  );
}