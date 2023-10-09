import { v4 as uuidv4 } from "uuid";
// import { itemsQueue } from "./testDataList"; // тестовые данные можно в items Queue

const columnsFrom = {
  columns: {
    [uuidv4()]: {
      name: "Queue",
      items: [],
    },
    [uuidv4()]: {
      name: "Development",
      items: [],
    },
    [uuidv4()]: {
      name: "Done",
      items: [],
    },
  },
};

export { columnsFrom };
