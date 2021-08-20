import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import styles from "./uploadModal.module.scss";
import { UilTimes, UilArrowLeft, UilCropAlt } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import {
    uploadModalReducer,
    cropModalReducer,
    pickModalReducer,
} from "../../../features/Admin/appearance/appearanceSlice";
import axios from "axios";
import { setPhoto } from "../../../features/Auth/authSlice";

const createImage = (url) =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", (error) => reject(error));
        image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
        image.src = url;
        console.log({ url });
    });

async function getCroppedImg(imageSrc, pixelCrop, rotation = 0) {
    console.log({ imageSrc });
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

    // set each dimensions to double largest dimension to allow for a safe area for the
    // image to rotate in without being clipped by canvas context
    canvas.width = safeArea;
    canvas.height = safeArea;

    // translate canvas context to a central location on image to allow rotating around the center.
    ctx.translate(safeArea / 2, safeArea / 2);
    // ctx.rotate(getRadianAngle(rotation))
    ctx.translate(-safeArea / 2, -safeArea / 2);

    // draw rotated image and store data.
    ctx.drawImage(
        image,
        safeArea / 2 - image.width * 0.5,
        safeArea / 2 - image.height * 0.5
    );
    const data = ctx.getImageData(0, 0, safeArea, safeArea);

    // set canvas width to final desired crop size - this will clear existing context
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // paste generated rotate image with correct offsets for x,y crop values.
    ctx.putImageData(
        data,
        Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
        Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
    );

    // As Base64 string
    return canvas.toDataURL("image/jpeg");

    // As a blob
    // return new Promise((resolve) => {
    //     canvas.toBlob((file) => {
    //         resolve(URL.createObjectURL(file));
    //     }, "image/jpeg");
    // });
}

/**
 *
 * @param {image} image - Image url
 * @returns
 */
export function ImageCropper({ image }) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);

    const { _id } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const saveCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(image, croppedAreaPixels);
            console.log("donee", { croppedImage });
            setCroppedImage(croppedImage);
        } catch (e) {
            console.error(e);
        }
    }, [croppedAreaPixels, image]);

    const uploadCroppedImage = () => {
        let data = new FormData();
        data.append("photo", croppedImage);

        console.log(data);

        axios
            .post(`api/user/photo/${_id}`, data)
            .then((res) => {
                dispatch(pickModalReducer());
                dispatch(uploadModalReducer());
                dispatch(setPhoto(res.data.photo.data));
            })
            .catch((err) => console.log(err));
    };

    function handleResetButton() {
        setCroppedImage(null);
    }

    return (
        <section className={styles.uploadModalContainer}>
            <nav className={styles.cropperNav}>
                <div className={styles.cropperNavItem}>
                    <UilCropAlt
                        className={`${styles.adminIcon} ${styles.cropIcon}`}
                    />
                    <p>crop</p>
                </div>
            </nav>
            <section className={styles.cropperContainerSection}>
                <div className={styles.cropperContainerDiv}>
                    <UilArrowLeft
                        className={`${styles.adminIcon} ${styles.leftArrowIcon}`}
                        onClick={() => {
                            dispatch(cropModalReducer());
                            console.log("clicked");
                        }}
                    />
                    <p>Edit image</p>
                    <UilTimes
                        className={`${styles.adminIcon} ${styles.closeIcon}`}
                        onClick={() => {
                            dispatch(pickModalReducer());
                            dispatch(uploadModalReducer());
                        }}
                    />
                </div>
                <div className={styles.cropperContainerMid}>
                    {!croppedImage ? (
                        <Cropper
                            image={image}
                            crop={crop}
                            zoom={zoom}
                            aspect={1 / 1}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                        />
                    ) : (
                        <img
                            className={styles.uploadImg}
                            src={croppedImage || ""}
                            alt=""
                        />
                    )}
                </div>
                <div className={styles.cropperContainerDiv}>
                    <button onClick={handleResetButton}>reset</button>

                    {!croppedImage ? (
                        <button
                            className={styles.saveButton}
                            onClick={saveCroppedImage}
                        >
                            save
                        </button>
                    ) : (
                        <button
                            className={styles.uploadButton}
                            onClick={uploadCroppedImage}
                        >
                            upload
                        </button>
                    )}
                </div>
            </section>
        </section>
    );
}
