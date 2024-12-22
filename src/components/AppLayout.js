import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialFields = [
  { id: "field-1", content: "Field 1" },
  { id: "field-2", content: "Field 2" },
  { id: "field-3", content: "Field 3" },
];

const AppLayout = () => {
  const [leftFields, setLeftFields] = useState(initialFields);
  const [mainFields, setMainFields] = useState([]);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    // From left sidebar to main container
    if (source.droppableId === "left-sidebar" && destination.droppableId === "main-container") {
      const [movedField] = leftFields.splice(source.index, 1);
      setLeftFields([...leftFields]);
      setMainFields([...mainFields, movedField]);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex h-screen">
        {/* Left Sidebar */}
        <Droppable droppableId="left-sidebar">
          {(provided) => (
            <div
              className="w-1/4 bg-blue-50 p-4 border-r border-gray-300"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <h3 className="text-lg font-bold mb-4">Left Sidebar</h3>
              {leftFields.map((field, index) => (
                <Draggable key={field.id} draggableId={field.id} index={index}>
                  {(provided) => (
                    <div
                      className="bg-blue-500 text-white px-4 py-2 mb-2 rounded shadow cursor-pointer"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {field.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* Main Container */}
        <Droppable droppableId="main-container">
          {(provided) => (
            <div
              className="w-1/2 bg-white p-4 border-r border-gray-300"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <h3 className="text-lg font-bold mb-4">Main Container</h3>
              {mainFields.map((field, index) => (
                <div
                  key={field.id}
                  className="bg-green-500 text-white px-4 py-2 mb-2 rounded shadow"
                >
                  {field.content}
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* Right Sidebar */}
        <div className="w-1/4 bg-gray-50 p-4">
          <h3 className="text-lg font-bold mb-4">Right Sidebar</h3>
          <p>Optional Content</p>
        </div>
      </div>
    </DragDropContext>
  );
};

export default AppLayout;
