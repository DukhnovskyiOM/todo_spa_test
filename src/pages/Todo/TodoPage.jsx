import React from "react";
import styles from "./TodoPages.module.scss";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useDispatch, useSelector } from "react-redux";
import { localRef, refreshState } from "../../redux/actions";

import Todo from "../../components/todo/Todo";
import Header from "../../components/header/Header";
import Modal from "../../components/modal/Modal";
import Comments from "../../components/comments/Comments";
import FileUploader from "../../components/fileUploader/FileUploader";
import Task from "../../components/task/Task";
import AddTodo from "../../components/addTodo/AddTodo";
import RefreshTodo from "../../components/refreshTodo/RefreshTodo";

function TodoPage() {
  const columnsFrom = useSelector((state) => state.columns);
  const dispatch = useDispatch();

  const [modalActive, setModalActive] = React.useState(false);
  const [taskModal, setTaskModal] = React.useState(false);
  const [activeModal, setActiveModal] = React.useState("");
  const [newData, setNewData] = React.useState(null);
  const [viewTaskData, setViewTaskData] = React.useState(null);

  React.useEffect(() => {
    const localData = localStorage.getItem("stateLocal");
    if (localData != null) {
      const columnsFromLocal = JSON.parse(localData);
      dispatch(refreshState({ ...columnsFromLocal.columns }));
    }
  }, [dispatch]);

  const onDragEnd = (result, columns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      const newStatus = {
        ...removed,
        status: destColumn.name.toLowerCase(),
      };
      destItems.splice(destination.index, 0, newStatus);
      const e1 = {
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      };
      dispatch(refreshState(e1));
      dispatch(localRef());
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      const e2 = {
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      };
      dispatch(refreshState(e2));
      dispatch(localRef());
    }
  };

  const mapped = {
    file: <FileUploader setActive={setModalActive} data={newData} />,
    task: <Task setActive={setModalActive} data={newData} />,
    comment: <Comments setActive={setModalActive} data={newData} />,
    changeTask: <RefreshTodo setActive={setModalActive} data={newData} />,
    addTask: <AddTodo setActive={setModalActive} />,
    viewTask: (
      <Todo
        item={viewTaskData}
        setActive={setModalActive}
        taskModal={taskModal}
      />
    ),
  };

  return (
    <>
      <Header
        setActive={setModalActive}
        activeModalSet={setActiveModal}
        viewTaskModal={setViewTaskData}
        setTaskModal={setTaskModal}
      />
      <Modal active={modalActive} setActive={setModalActive}>
        {mapped[activeModal]}
      </Modal>
      <div className={styles.main_wrapper}>
        <DragDropContext onDragEnd={(result) => onDragEnd(result, columnsFrom)}>
          {Object.entries(columnsFrom).map(([id, column]) => {
            return (
              <div className={styles.droppable_wrapper} key={id}>
                <h2>{column.name}</h2>
                <Droppable droppableId={id}>
                  {(provider, snapshot) => {
                    return (
                      <div
                        {...provider.droppableProps}
                        ref={provider.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgray",
                        }}
                        className={styles.columns}
                      >
                        {column.items.length ? (
                          column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item?.id}
                                draggableId={item?.id}
                                index={index}
                              >
                                {(provider, snapshot) => {
                                  return (
                                    <div
                                      ref={provider.innerRef}
                                      {...provider.draggableProps}
                                      {...provider.dragHandleProps}
                                      style={{
                                        backgroundColor: snapshot.isDragging
                                          ? "#263B4A"
                                          : "#1e1b26",
                                        ...provider.draggableProps.style,
                                      }}
                                      className={styles.item}
                                    >
                                      <Todo
                                        item={item}
                                        setActive={setModalActive}
                                        activeModalSet={setActiveModal}
                                        setData={setNewData}
                                      />
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })
                        ) : (
                          <div className={styles.empty}>
                            <h3>You Don't have any tasks!</h3>
                            <p>Add your first task now</p>
                          </div>
                        )}
                        {provider.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </>
  );
}

export default TodoPage;
