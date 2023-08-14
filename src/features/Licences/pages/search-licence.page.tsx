import React from "react";
import { useNavigate } from "react-router-dom";

const SearchLicencePage = () => {
    const navigate = useNavigate()
  return (
    <>
      <div>create-licence.page</div>
      <button onClick={()=>{navigate('../crear')}}>Crear Licencia</button>
    </>
  );
};

export default React.memo(SearchLicencePage);
