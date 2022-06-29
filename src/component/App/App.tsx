import { useEffect, useState } from "react";
import "./App.scss";
import {
  Pagination,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
} from "@mui/material";
import ChildCareTwoToneIcon from "@mui/icons-material/ChildCareTwoTone";
import { DefaultService } from "../../generated/services/DefaultService";

const pageNum: number = 10;

type item = {
  img: string;
  title: string;
  author: string;
  rows?: number;
  cols?: number;
  featured?: boolean;
};

function App() {
  const [page, setPage] = useState(1);
  const [itemData, setItemData] = useState<item[]>([]);

  useEffect(() => {
    console.log("かわったかね", page);
    setItemData([]);

    for (let index: number = 0; index < pageNum; index++) {
      DefaultService.getRandom().then((dog) => {
        setItemData((pre) => [
          ...pre,
          {
            img: dog.message!,
            title: `タイトルその${index + 1}`,
            author: `@xxxx${index + 1}wwww`,
          },
        ]);
      });
    }
  }, [page]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    // console.log(event);
    setPage(value);
  };

  return (
    <div className="App">
      <div>
        <Typography>Page: {page}</Typography>
        <ImageList
          sx={{ width: "40vw", height: "75vh" }}
          variant="woven"
          cols={2}
          gap={9}
        >
          {itemData.map((item) => (
            <ImageListItem key={item.img} onClick={() => console.log(item.img)}>
              <img
                src={item.img}
                srcSet={`${item.img} 2x`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.title}
                subtitle={item.author}
                actionIcon={
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    aria-label={`info about ${item.title}`}
                  >
                    <ChildCareTwoToneIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
      <div>
        <Pagination
          count={pageNum}
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
