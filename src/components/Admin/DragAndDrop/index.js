import { useDispatch, useSelector } from "react-redux";
import { UrlItem } from "../Links/urlItem";
import { updateLinks } from "../../../features/Auth/authSlice";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useRef, useCallback } from "react";
import { useDrag, useDrop } from "react-dnd";
import update from "immutability-helper";
import axios from "axios";

const ItemTypes = { CARD: "card" };

function Card({ card, id, index, moveCard }) {
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
    const [drag] = useDrag({
        type: ItemTypes.CARD,
        item: () => {
            return { id, index };
        },
    });
    drag(drop(ref));
    return (
        <div ref={ref} data-handler-id={handlerId}>
            <UrlItem index={index} link={card} />
        </div>
    );
}

function Container() {
    const { links, _id: userId } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const moveCard = useCallback(
        async (dragIndex, hoverIndex) => {
            const dragCard = links[dragIndex];

            const reorderedLinks = update(links, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard],
                ],
            });

            reorderedLinks.map(async (uLink, index) => {
                const linkId = uLink._id;

                await axios
                    .put(`api/link/${userId}/${linkId}`, { order: index })
                    .then((res) => {})
                    .catch((err) =>
                        console.log("DragAndDrop: error", err.message)
                    );

                return 0;
            });

            await new Promise((resolve) =>
                setTimeout(dispatch(updateLinks(reorderedLinks)))
            );
        },
        [links, dispatch, userId]
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
            <div>{links.map((card, i) => renderCard(card, i))}</div>
        </>
    );
}

export function DragAndDrop() {
    return (
        <DndProvider backend={HTML5Backend}>
            <Container />
        </DndProvider>
    );
}
