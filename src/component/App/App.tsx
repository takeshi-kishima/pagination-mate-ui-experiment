import { useEffect, useState } from "react";
import "./App.scss";
import {
  Pagination,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Skeleton,
} from "@mui/material";
import ChildCareTwoToneIcon from "@mui/icons-material/ChildCareTwoTone";
import { DefaultService } from "../../generated/services/DefaultService";

const numInOnePage: number = 10;

type item = {
  id: number;
  img?: string;
  title?: string;
  author?: string;
  mireru: boolean;
  rows?: number;
  cols?: number;
};
const items = [...Array(numInOnePage)].map((_, index) => {
  return { id: index, mireru: false };
});

function App() {
  const [page, setPage] = useState(1);
  const [itemData, setItemData] = useState<item[]>(items);

  useEffect(() => {
    console.log("かわったかね", page);
    setItemData(items);

    [...Array(numInOnePage)].forEach((_, index) => {
      DefaultService.getRandom().then((dog) => {
        // setItemData((pre) => [
        //   ...pre,
        //   {
        //     img: dog.message!,
        //     title: `タイトルその${index + 1}`,
        //     author: `@xxxx${index + 1}wwww`,
        //     loading: true,
        //   },
        // ]);
        setItemData((pre) =>
          pre.map((item, inindex) =>
            index === inindex
              ? {
                  id: inindex,
                  img: dog.message!,
                  title: `タイトルその${index + 1}`,
                  author: `@xxxx${index + 1}wwww`,
                  mireru: true,
                }
              : item
          )
        );
      });
    });
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
          gap={8}
        >
          {itemData.map((item) =>
            item.mireru ? (
              <ImageListItem
                key={item.id}
                onClick={() => console.log(item.img)}
              >
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
            ) : (
              <ImageListItem key={item.id}>
                <Skeleton variant="rectangular" animation="wave" height={118} />
              </ImageListItem>
            )
          )}
        </ImageList>
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
