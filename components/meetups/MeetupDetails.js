import React, { Fragment } from "react";
import cls from "./MeetupDetails.module.css";

const MeetupDetails = (props) => {
  return (
    <section className={cls.detail}>
      <img src={props.image} alt={props.title} />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </section>
  );
};

export default MeetupDetails;
