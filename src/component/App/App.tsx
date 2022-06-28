import { useState } from "react";
import "./App.scss";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";

function App() {
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(event);
    setPage(value);
  };
  return (
    <div className="App">
      <div>
        <Typography>Page: {page}</Typography>
      </div>
      <div>
        <Pagination
          count={10}
          page={page}
          variant="outlined"
          color="primary"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default App;
