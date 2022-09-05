import { DashboardNav } from "../components/DashboardNav";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Header } from "../components/Header";

import { AssignmentItem } from "../components/AssignmentItem";
import { IAssignment } from "../types";
import { useState } from "react";
import { CaretDown, DotsSixVertical, MagnifyingGlass, Plus } from "phosphor-react";
import uuid from "react-uuid";
import cx from "classnames";
import { DraggableFeedbackSnippet } from "../components/DragabbleFeedbackSnippet";

const itemsFromBackend = [
  {
    id: uuid(),
    extractedText:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    metaDataList: ["Geography", "Essay"],
    labels: ["history", "deserts"],
  },
  {
    id: uuid(),
    extractedText:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
    metaDataList: ["Greek Mythology", "Essay"],
    labels: ["structuring"],
  },
  {
    id: uuid(),
    extractedText:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    metaDataList: ["Critical Thinking", "Essay"],
    labels: ["victory", "deserts"],
  },
];

const columnsFromBackend = {
  pool: {
    name: "pool",
    items: itemsFromBackend,
  },
  sidebar: {
    name: "sidebar",
    items: [],
  },
};

const onDragEnd = (result: any, columns: any, setColumns: any) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

export const FeedbackDashboard = () => {
  const [columns, setColumns] = useState(columnsFromBackend);
  const [dragIsActive, setDragIsActive] = useState(false);

  return (
    <DragDropContext
      onDragEnd={(result) => {
        setDragIsActive(false);
        onDragEnd(result, columns, setColumns);
      }}
      onDragStart={() => {
        setDragIsActive(true);
      }}>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-grow">
          <main className="flex-grow bg-gray-100 p-8">
            <section className="flex flex-col items-start max-w-7xl m-auto space-y-4">
              <div className="flex flex-row items-center justify-between w-full">
                <DashboardNav />
                <div className="flex flex-row items-center gap-4 p-1 px-3 rounded-full border border-gray-400">
                  <MagnifyingGlass size={18} />
                  <span>Search for Feedback Snippet...</span>
                </div>
              </div>
              <div className="flex flex-row items-center justify-between w-full">
                <div className="flex flex-row gap-4 items-center">
                  <div className="flex flex-row items-center gap-2 text-white bg-darkGrey p-2 px-3 rounded-full">
                    <span>Type</span>
                    <CaretDown weight="fill" size={16} />
                  </div>
                  <div className="flex flex-row items-center gap-2 text-white bg-darkGrey p-2 px-3 rounded-full">
                    <span>Course</span>
                    <CaretDown weight="fill" size={16} />
                  </div>
                  <div className="flex flex-row items-center gap-2 text-white bg-darkGrey p-2 px-3 rounded-full">
                    <span>Label</span>
                    <CaretDown weight="fill" size={16} />
                  </div>
                  <span className="text-mediumGrey">(no labels selected)</span>
                </div>
                <div className="flex flex-row gap-4">
                  <span>Multi-selection</span>
                  <div className="w-5 h-5 bg-lightGrey border border-gray-400 rounded-md cursor-pointer"></div>
                </div>
              </div>
              <Droppable
                droppableId={"pool"}
                key={columns["pool"].name}
                direction="horizontal">
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="flex gap-2">
                      {columns["pool"].items.map((item, index) => {
                        return (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}>
                            {(provided, snapshot) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}>
                                  <DraggableFeedbackSnippet
                                    extractedText={item.extractedText}
                                    metaDataList={item.metaDataList}
                                    labels={item.labels}
                                  />
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </section>
          </main>
          <div className="flex flex-col p-4">
            <div className="flex justify-between flex-row items-center py-4">
              <span className="text-base">Feedback Snippets</span>
              <div className="p-1 bg-darkGrey rounded-md cursor-pointer">
                <Plus className="text-white" size={20} />
              </div>
            </div>

            <div className="w-[410px]">
              {columns["sidebar"].items.length < 1 && !dragIsActive ? (
                <div className="flex flex-col items-center gap-4 my-8 mx-4 text-center">
                  <img
                    src={process.env.PUBLIC_URL + "/icons/snippet-icon.svg"}
                  />
                  <span className="text-xl font-extrabold">
                    No Snippets saved yet
                  </span>
                  <p>
                    Just drag & drop comments to this sidebar or highlight text
                    in the summary to add it to the list of snippets.
                    Alternatively, you can create individual snippets yourself.
                  </p>
                </div>
              ) : null}
              <Droppable droppableId={"sidebar"} key={columns["sidebar"].name}>
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={cx(
                        "flex flex-col gap-2 h-full p-2 rounded-xl",
                        {
                          "bg-offWhite rounded-md": snapshot.isDraggingOver,
                        }
                      )}>
                      {columns["sidebar"].items.map((item: any, index) => {
                        return (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}>
                            {(provided, snapshot) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}>
                                  <DraggableFeedbackSnippet
                                    extractedText={item.extractedText}
                                    metaDataList={item.metaDataList}
                                    labels={item.labels}
                                  />
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};
