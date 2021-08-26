import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { UrlItem } from "../Links/urlItem";

export function DragAndDrop({ links }) {
    console.log({ links });

    const [data, setData] = useState({});

    useEffect(() => {
        const newLinks = {};
        const linkOrder = [];

        for (let i = 0; i < links.length; i++) {
            newLinks[`link${i}`] = {
                id: `link${i}`,
                content: { name: links[i].name, url: links[i].url },
            };
            linkOrder.push(`link${i}`);
        }

        setData({
            links: newLinks,
            columns: { column0: { id: "column0", linkOrder: linkOrder } },
            columnOrder: ["column0"],
        });

        console.log("drag and drop", data);
    }, [links]);

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
        <>
            {data.links ? (
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
                                        {console.log({ links })}

                                        {links.map((link, index) => (
                                            <Draggable
                                                key={link.id}
                                                draggableId={link.id}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <UrlItem
                                                        innerRef={
                                                            provided.innerRef
                                                        }
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        link={link.content}
                                                    />
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
            ) : (
                ""
            )}
        </>
    );
}
