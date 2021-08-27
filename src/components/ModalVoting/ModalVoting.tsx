import React, { FC, Fragment } from "react";
import { Modal } from "..";
import { Button } from "../common";
import { GrClose } from "react-icons/gr";
import "./ModalVoting.scss";
import { Rating } from "react-simple-star-rating";

export const ModalVoting: FC<IModalVoting> = ({
  isShow,
  onClick,
  className,
  name,
  rating,
  setRating,
}) => {
  return (
    <Modal
      isShow={isShow}
      setIsShow={onClick}
      className={`modal-voting ${className ? className : ""}`}
      backgroundColorOverlay="rgba(255, 255, 255, 0.7)"
    >
      <div className="modal-voting__cover">
        <div className="modal-voting__close">
          <GrClose onClick={onClick} style={{ cursor: "pointer" }} />
        </div>
        <p className="modal-voting__message">
          How was your experience with {name}
        </p>
        <p className="modal-voting__suggestion">Please give your opinion</p>
        <Fragment>
          <Rating
            onClick={setRating}
            ratingValue={rating}
            size={30}
            transition
            fillColor="orange"
            emptyColor="gray"
          />
          <Button marginTop={10} marginBottom={10} onClick={onClick}>
            Submit
          </Button>
        </Fragment>
      </div>
    </Modal>
  );
};
