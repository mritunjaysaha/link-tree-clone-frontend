import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export function DragAndDrop() {
    const links = [
        {
            order: 1,
            _id: "6124ee6c32504657541a91be",
            name: "temp",
            url: "",
        },
        {
            order: 2,
            _id: "6125e740bf43c53480874fca",
            name: "aaa",
            url: "aaaa",
        },
        {
            order: 3,
            _id: "6125e74cbf43c53480874fd2",
            name: "bbb",
            url: "bbb",
        },
    ];

    const initialData = {
        links: {
            link1: { id: "link1", content: links[0] },
            link2: { id: "link2", content: links[1] },
            link3: { id: "link3", content: links[2] },
        },
        columns: {
            column1: { id: "column1", linkOrder: ["link1", "link2", "link3"] },
        },
        columnOrder: ["column1"],
    };

    const [data, setData] = useState(initialData);

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

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
        const newTaskIds = Array.from(column.linkOrder);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
            ...column,
            taskIds: newTaskIds,
        };

        const newState = {
            ...data,
            columns: {
                ...data.columns,
                [newColumn.id]: newColumn,
            },
        };

        setData(newState);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {data.columnOrder.map((id) => {
                const column = data.columns[id];
                const links = column.linkOrder.map(
                    (linkId) => data.links[linkId]
                );

                console.log("here", links);

                return (
                    <Droppable droppableId={column.id}>
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {links.map((link, index) => (
                                    <Draggable
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
