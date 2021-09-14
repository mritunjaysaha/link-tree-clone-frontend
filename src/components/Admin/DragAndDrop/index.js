import axios from "axios";
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { UrlItem } from "../Links/urlItem";
import { updateLinks } from "../../../features/Auth/authSlice";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useRef, useCallback } from "react";
import { useDrag, useDrop } from "react-dnd";
import update from "immutability-helper";

const ItemTypes = { CARD: "card" };

const style = {
    border: "1px dashed gray",
    padding: "0.5rem 1rem",
    marginBottom: ".5rem",
    backgroundColor: "white",
    cursor: "move",
};

export const Card = ({ card, id, index, moveCard }) => {
    const ref = useRef(null);
    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.CARD,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));
    return (
        <div ref={ref} data-handler-id={handlerId}>
            <UrlItem index={index} link={card} />
        </div>
    );
};

export const Container = () => {
    const { links } = useSelector((state) => state.user);
    const [cards, setCards] = useState(links);

    const dispatch = useDispatch();
    useEffect(() => {
        console.log("DragAndDrop: updateLinks");
        dispatch(updateLinks(cards));
    }, [cards, dispatch]);

    const moveCard = useCallback(
        (dragIndex, hoverIndex) => {
            const dragCard = cards[dragIndex];

            setCards(
                update(cards, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragCard],
                    ],
                })
            );
        },
        [cards]
    );
    const renderCard = (card, index) => {
        return (
            <Card
                card={card}
                key={card._id}
                index={index}
                id={card._id}
                moveCard={moveCard}
            />
        );
    };
    return (
        <>
            <div>{cards.map((card, i) => renderCard(card, i))}</div>
        </>
    );
};

/**
 *
 * @param {links} links - array of links
 * @param {userId} userId
 * @returns
 */
export function DragAndDrop({ userId = "" }) {
    const [data, setData] = useState({});
    const { username, links } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    return (
        <DndProvider backend={HTML5Backend}>
            <Container />
        </DndProvider>
    );

    // const [linksCopy, setLinksCopy] = useState(links);

    // useEffect(() => {
    //     async function getURLS() {
    //         await axios
    //             .get(`/api/link/${username}`)
    //             .then((res) => {
    //                 res.data.links.sort((a, b) => a.order - b.order);
    //                 dispatch(updateLinks(res.data.links));
    //             })
    //             .catch((err) => console.log(err.message, err.error));
    //     }
    //     getURLS();
    // }, [username, dispatch]);

    // useEffect(() => {
    //     const newLinks = {};
    //     const linkOrder = [];

    //     for (let i = 0; i < links.length; i++) {
    //         newLinks[`link${i}`] = {
    //             id: `link${i}`,
    //             content: { ...links[i] },
    //         };
    //         linkOrder.push(`link${i}`);
    //     }

    //     setData({
    //         links: newLinks,
    //         columns: { column0: { id: "column0", linkOrder: linkOrder } },
    //         columnOrder: ["column0"],
    //     });
    // }, [links]);

    // useEffect(() => {
    //     console.log("useEffect");
    //     async function updateOrder(link) {
    //         const { _id: linkId } = link;

    //         await axios
    //             .put(`/api/link/${userId}/${linkId}`, link)
    //             .then(async (res) => {
    //                 console.log("successfully updated");
    //             })
    //             .catch((err) => console.log("dnd", err.message));
    //     }

    //     if (!!data.links) {
    //         const { linkOrder } = data.columns.column0;

    //         linkOrder.map((linkId, index) => {
    //             const link = data.links[linkId].content;

    //             link.order = index;
    //             updateOrder(link);
    //         });
    //     }
    // }, [data, userId]);

    // function onDragEnd(result) {
    //     const { destination, source, draggableId } = result;

    //     if (!destination) {
    //         return;
    //     }

    //     if (
    //         destination.droppableId === source.droppableId &&
    //         destination.index === source.index
    //     ) {
    //         return;
    //     }

    //     const column = data.columns[source.droppableId];
    //     const newLinkOrder = Array.from(column.linkOrder);
    //     newLinkOrder.splice(source.index, 1);
    //     newLinkOrder.splice(destination.index, 0, draggableId);

    //     const newColumn = {
    //         ...column,
    //         linkOrder: newLinkOrder,
    //     };

    //     const newState = {
    //         ...data,
    //         columns: {
    //             ...data.columns,
    //             [newColumn.id]: newColumn,
    //         },
    //     };

    //     setData(newState);
    // }

    // return (
    //     <>
    //         {data.links ? (
    //             <DragDropContext onDragEnd={onDragEnd}>
    //                 {data.columnOrder.map((id) => {
    //                     const column = data.columns[id];
    //                     const links = column.linkOrder.map(
    //                         (linkId) => data.links[linkId]
    //                     );

    //                     return (
    //                         <Droppable key={column.id} droppableId={column.id}>
    //                             {(provided) => (
    //                                 <div
    //                                     {...provided.droppableProps}
    //                                     ref={provided.innerRef}
    //                                 >
    //                                     {links.map((link, index) => (
    //                                         <Draggable
    //                                             key={link.id}
    //                                             draggableId={link.id}
    //                                             index={index}
    //                                         >
    //                                             {(provided) => {
    //                                                 return (
    //                                                     <UrlItem
    //                                                         innerRef={
    //                                                             provided.innerRef
    //                                                         }
    //                                                         {...provided.draggableProps}
    //                                                         {...provided.dragHandleProps}
    //                                                         link={link.content}
    //                                                     />
    //                                                 );
    //                                             }}
    //                                         </Draggable>
    //                                     ))}
    //                                     {provided.placeholder}
    //                                 </div>
    //                             )}
    //                         </Droppable>
    //                     );
    //                 })}
    //             </DragDropContext>
    //         ) : (
    //             ""
    //         )}
    //     </>
    // );
}
