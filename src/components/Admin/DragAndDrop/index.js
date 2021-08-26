import axios from "axios";
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { UrlItem } from "../Links/urlItem";

/**
 *
 * @param {links} links - array of links
 * @param {userId} userId
 * @returns
 */
export function DragAndDrop({ links, userId = "" }) {
    const [data, setData] = useState({});
    useEffect(() => {
        const newLinks = {};
        const linkOrder = [];

        for (let i = 0; i < links.length; i++) {
            newLinks[`link${i}`] = {
                id: `link${i}`,
                content: { ...links[i] },
            };
            linkOrder.push(`link${i}`);
        }

        setData({
            links: newLinks,
            columns: { column0: { id: "column0", linkOrder: linkOrder } },
            columnOrder: ["column0"],
        });
    }, [links]);

    useEffect(() => {
        async function updateOrder(link, index) {
            const { _id: linkId } = link;

            console.log("re", index, link.order, link.name);

            const newLink = { order: index };

            await axios
                .put(`/api/link/${userId}/${linkId}`, newLink)
                .then((res) => console.log("re successfully updated", res.data))
                .catch((err) => console.log("re", err.message));
        }

        if (!!data.links) {
            console.log("re", data);

            const { linkOrder } = data.columns.column0;
            console.log("re", linkOrder);
            linkOrder.map((linkId, index) => {
                const link = data.links[linkId].content;
                updateOrder(link, index);
            });

            console.log("re----------------------------------");
        }

        console.log("re", data);
    }, [data, userId]);

    function onDragEnd(result) {
        console.log("result", result);
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
                                                {(provided) => {
                                                    return (
                                                        <UrlItem
                                                            innerRef={
                                                                provided.innerRef
                                                            }
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            link={link.content}
                                                        />
                                                    );
                                                }}
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
