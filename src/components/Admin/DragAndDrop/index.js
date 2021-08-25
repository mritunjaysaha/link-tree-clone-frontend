import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export function DragAndDrop({ initialData }) {
    const [data, setData] = useState(initialData);

    console.log("drag and drop", data);

    function onDragEnd(result) {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const column = data.columns[source.droppableId];
        const newLinkOrder = Array.from(column.linkOrder);
        newLinkOrder.splice(source.index, 1);
        newLinkOrder.splice(destination.index, 0, draggableId);

        const newColumn = {
            ...column,
            linkOrder: newLinkOrder,
        };

        const newState = {
            ...data,
            columns: {
                ...data.columns,
                [newColumn.id]: newColumn,
            },
        };

        console.log(newState);

        setData(newState);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {data.columnOrder.map((id) => {
                const column = data.columns[id];
                const links = column.linkOrder.map(
                    (linkId) => data.links[linkId]
                );

                return (
                    <Droppable key={column.id} droppableId={column.id}>
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                HERE
                                {links.map((link, index) => (
                                    <Draggable
                                        key={link.id}
                                        draggableId={link.id}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                {JSON.stringify(link.content)}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                );
            })}
        </DragDropContext>
    );
}
