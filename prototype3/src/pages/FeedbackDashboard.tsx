import { DashboardNav } from "../components/DashboardNav";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Header } from "../components/Header";

import { AssignmentItem } from "../components/AssignmentItem";
import { IAssignment } from "../types";
import { useState } from "react";
import { DotsSixVertical, Plus } from "phosphor-react";
import uuid from "react-uuid";
import cx from "classnames";
import { DraggableFeedbackSnippet } from "../components/DragabbleFeedbackSnippet";

const itemsFromBackend = [
  {
    id: uuid(),
    extractedText: "First task",
    meta: ["Geography", "Essay"],
    labels: ["structuring", "deserts"],
  },
  {
    id: uuid(),
    extractedText: "Second task",
    meta: ["Greek Methodology", "Essay"],
    labels: ["structuring", "deserts"],
  },
  {
    id: uuid(),
    extractedText: "Third task",
    meta: ["Critical Thinking", "Essay"],
    labels: ["structuring", "deserts"],
  },
];

const columnsFromBackend = {
  pool: {
    name: "Pool",
    items: itemsFromBackend,
  },
  sidebar: {
    name: "Sidebar",
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

  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-grow">
          <main className="flex-grow bg-gray-200 p-8">
            <DashboardNav />
            <section className="flex flex-col mt-6">
              <Droppable droppableId={"pool"} key={columns["pool"].name} direction="horizontal">
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
                                    meta={item.meta}
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

            <div className="h-full">
              <Droppable droppableId={"sidebar"} key={columns["sidebar"].name}>
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={cx(
                        "flex flex-col gap-2 min-w-[300px] h-full p-2 rounded-xl",
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
                                    meta={item.meta}
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
