import { v4 as uuidv4 } from "uuid";

const itemsQueue = [
  // тестовые данные
  {
    id: uuidv4(),
    completed: false,
    number: 1,
    title: "Задача 1",
    text: "Текст к задаче 1",
    dateStart: "2023-09-12",
    dateEnd: "2023-09-15",
    priority: "middle",
    status: "queue",
    files: [
      {
        id: uuidv4(),
        name: "файл 1",
        url: "",
      },
      {
        id: uuidv4(),
        name: "файл 2",
        url: "",
      },
      {
        id: uuidv4(),
        name: "файл 3",
        url: "",
      },
    ],
    miniTasks: [
      {
        id: uuidv4(),
        name: "подзадача 1",
        completed: false,
      },
      {
        id: uuidv4(),
        name: "подзадача 2",
        completed: false,
      },
      {
        id: uuidv4(),
        name: "подзадача 3",
        completed: false,
      },
    ],
    comments: [
      {
        id: uuidv4(),
        time: "12:13:06 PM",
        name: "комментарий 1",
      },
      {
        id: uuidv4(),
        time: "12:13:06 PM",
        name: "комментарий 2",
      },
      {
        id: uuidv4(),
        time: "12:13:06 PM",
        name: "комментарий 3",
      },
    ],
  },
  {
    id: uuidv4(),
    completed: false,
    number: 1,
    title: "Задача 2",
    text: "Текст к задаче 2",
    dateStart: "2023-09-12",
    dateEnd: "2023-09-15",
    priority: "low",
    status: "queue",
    files: [
      {
        id: uuidv4(),
        name: "файл 1",
      },
      {
        id: uuidv4(),
        name: "файл 2",
      },
      {
        id: uuidv4(),
        name: "файл 3",
      },
    ],
    miniTasks: [
      {
        id: uuidv4(),
        name: "подзадача 1",
        completed: false,
      },
      {
        id: uuidv4(),
        name: "подзадача 2",
        completed: false,
      },
      {
        id: uuidv4(),
        name: "подзадача 3",
        completed: false,
      },
    ],
    comments: [
      {
        id: uuidv4(),
        time: "12:13:06 PM",
        name: "комментарий 1",
      },
      {
        id: uuidv4(),
        time: "12:13:06 PM",
        name: "комментарий 2",
      },
      {
        id: uuidv4(),
        time: "12:13:06 PM",
        name: "комментарий 3",
      },
    ],
  },
  {
    id: uuidv4(),
    completed: false,
    number: 1,
    title: "Задача 3",
    text: "Текст к задаче 3",
    dateStart: "2023-09-12",
    dateEnd: "2023-09-15",
    priority: "hight",
    status: "queue",
    files: [
      {
        id: uuidv4(),
        name: "файл 1",
      },
      {
        id: uuidv4(),
        name: "файл 2",
      },
      {
        id: uuidv4(),
        name: "файл 3",
      },
    ],
    miniTasks: [
      {
        id: uuidv4(),
        name: "подзадача 1",
        completed: false,
      },
      {
        id: uuidv4(),
        name: "подзадача 2",
        completed: false,
      },
      {
        id: uuidv4(),
        name: "подзадача 3",
        completed: false,
      },
    ],
    comments: [
      {
        id: uuidv4(),
        time: "12:13:06 PM",
        name: "комментарий 1",
      },
      {
        id: uuidv4(),
        time: "12:13:06 PM",
        name: "комментарий 2",
      },
      {
        id: uuidv4(),
        time: "12:13:06 PM",
        name: "комментарий 3",
      },
    ],
  },
];

export { itemsQueue };
