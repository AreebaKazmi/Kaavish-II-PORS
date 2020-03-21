import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import React from "react";
import Dropzone from "react-dropzone/dist/index";
// import ReactSVG from "react-svg";

// import cameraImg from "../../images/camera.svg";

interface ImageUploadProps {
  children?: (props: { isDragActive: boolean }) => React.ReactNode;
  className?: string;
  disableClick?: boolean;
  isActiveClassName?: string;
  iconContainerClassName?: string;
  iconContainerActiveClassName?: string;
  onImageUpload: (file: FileList) => void;
}

const useStyles = makeStyles(
  theme => ({
    backdrop: {
      background: "rgb(255, 255, 255)",
      color: theme.palette.primary.main,
    },
    fileField: {
      display: "none",
    },
    imageContainer: {
      background: "#ffffff",
      border: "1px solid #eaeaea",
      borderRadius: theme.spacing(),
      height: 148,
      justifySelf: "start",
      overflow: "hidden",
      padding: theme.spacing(2),
      position: "relative",
      transition: theme.transitions.duration.standard + "s",
      width: 148,
    },
    photosIcon: {
      height: "64px",
      margin: "0 auto",
      width: "64px",
    },
    photosIconContainer: {
      background: "rgb(255, 255, 255)",
      padding: theme.spacing(5, 0),
      textAlign: "center",
    },
    uploadText: {
      color: theme.typography.body1.color,
      fontSize: 12,
      fontWeight: 600,
      textTransform: "uppercase",
    },
  }),
  { name: "ImageUpload" }
);

export const ImageUpload: React.FC<ImageUploadProps> = props => {
  const {
    children,
    className,
    disableClick,
    iconContainerActiveClassName,
    iconContainerClassName,
    isActiveClassName,
    onImageUpload,
  } = props;

  const classes = useStyles(props);

  return (
    <div className="upload-image-page"> 
      <h5 className="upload-image-page__header"> Upload your image here! </h5>
      
      <Dropzone disableClick={disableClick} onDrop={onImageUpload}>
        {({ isDragActive, getInputProps, getRootProps }) => (
          <>
            <div
              {...getRootProps()}
              className={classNames(className, classes.photosIconContainer, {
                [classes.backdrop]: isDragActive,
                [isActiveClassName]: isDragActive,
              })}
            >
              <div
                className={classNames(iconContainerClassName, {
                  [iconContainerActiveClassName]: isDragActive,
                })}
              >
                <input
                  {...getInputProps()}
                  className={classes.fileField}
                  accept="image/*"
                />
                <Typography className={classes.uploadText}>
                  
                </Typography>
              </div>
            </div>
            {children && children({ isDragActive })}
          </>
        )}
      </Dropzone>
    </div>
  );
};
ImageUpload.displayName = "ImageUpload";
export default ImageUpload;

