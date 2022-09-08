import { DashboardNav } from "../components/DashboardNav";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Header } from "../components/Header";

import { useState } from "react";
import { CaretDown, MagnifyingGlass, Plus } from "phosphor-react";
import uuid from "react-uuid";
import cx from "classnames";
import { DraggableFeedbackSnippet } from "../components/DragabbleFeedbackSnippet";

const itemsFromBackend = [
  {
    id: uuid(),
    extractedText:
      "Reconsider your wording to make your point (seems to stand out - woolly wording)",
    metaDataList: ["Composition - Text Analysis", "Essay"],
    labels: ["Wording"],
  },
  {
    id: uuid(),
    extractedText:
      "topic sentence? should contain your claim (not describe the campaign)",
    metaDataList: ["Composition - Text Analysis", "Essay"],
    labels: ["Structure"],
  },
  {
    id: uuid(),
    extractedText: "Remember to indent!",
    metaDataList: ["Composition - Text Analysis", "Essay"],
    labels: ["Formal Error"],
  },
  {
    id: uuid(),
    extractedText: "There are more elegant linking words out there!",
    metaDataList: ["Composition - Text Analysis", "Essay"],
    labels: ["Wording"],
  },
  {
    id: uuid(),
    extractedText: "replace with consumerism",
    metaDataList: ["Composition - Text Analysis", "Essay"],
    labels: ["Wording"],
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
      onDragEnd={(result: any) => {
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
                {(provided: any, snapshot: any) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={cx("snippet-grid p-4 rounded-md", {
                        "bg-lightGrey/50": dragIsActive,
                      })}>
                      {columns["pool"].items.map((item, index) => {
                        return (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}>
                            {(provided: any, snapshot: any) => {
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

            <div className="w-[362px]">
              {columns["sidebar"].items.length < 1 && !dragIsActive ? (
                <div className="flex flex-col items-center gap-4 my-8 mx-4 text-center">
                  <img
                    alt="icon of a snippet"
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
                {(provided: any, snapshot: any) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={cx(
                        "flex flex-col gap-2 p-2 rounded-xl h-fit",
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
                            {(provided: any, snapshot: any) => {
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