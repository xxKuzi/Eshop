import React, { useState, useRef, useEffect } from "react";
import { useData } from "../parts/Memory";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function DevImages(props) {
  const { catalog, updateCatalog, addImageToCatalog, deleteImageFromCatalog } = useData();
  let selectedId = props.selected ? Number(props.selected.substring(0, 1)) : 0;
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const fileRef = useRef();
  let updatedId = false;

  useEffect(() => {
    catalog.map((item, index) => {
      item.id === selectedId ? setSelectedItemIndex(index) : null;
    });
    updatedId = true;
  }, [props.selected]);

  useEffect(() => {
    !updatedId ? (selectedId = catalog[selectedItemIndex].id) : null;
  }, [catalog]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const newImages = Array.from(catalog[selectedItemIndex].images);
    const [reorderedItem] = newImages.splice(result.source.index, 1);
    newImages.splice(result.destination.index, 0, reorderedItem);

    catalog[selectedItemIndex].images = newImages;

    updateCatalog(selectedId, catalog[selectedItemIndex]);
  }

  return (
    <div className="mt-8 flex justify-center">
      {catalog[0].description !== "testingXYZ" && (
        <div className="flex flex-col items-center justify-center rounded-xl border-4 border-gray-200">
          <p className="headline mt-4 font-bold">Images Editor</p>
          <div className="mt-2 flex items-center justify-center p-5">
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="images" direction="vertical">
                {(provided) => (
                  <ul className="justify-content flex max-w-[500px] flex-col " {...provided.droppableProps} ref={provided.innerRef}>
                    {catalog[selectedItemIndex].images &&
                      catalog[selectedItemIndex].images.map(({ id, url }, index) => {
                        return (
                          <Draggable key={id} draggableId={String(id)} index={index}>
                            {(provided) => (
                              <li className="mx-3" key={id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                <div className="flex w-[300px] items-center justify-center rounded-xl border-2 border-blue-400 bg-white  p-2 text-center align-middle">
                                  <img className="mr-2 h-16" src={url} />
                                  <p className="mr-2 text-center">{id}</p>
                                  <button
                                    className="border-2 border-blue-400"
                                    onClick={() => {
                                      deleteImageFromCatalog(selectedId, id);
                                    }}
                                  >
                                    delete
                                  </button>
                                </div>
                              </li>
                            )}
                          </Draggable>
                        );
                      })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
            <div className="flex flex-col items-center justify-center rounded-xl  border-2 border-gray-200  p-2 text-center align-middle">
              <input
                className="w-64 items-center justify-center "
                type="file"
                onChange={(e) => {
                  fileRef.current = e.target.files[0];
                }}
              ></input>
              <button
                className="border-2"
                onClick={() => {
                  if (fileRef.current === undefined) return;
                  addImageToCatalog(selectedId, fileRef.current);
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
