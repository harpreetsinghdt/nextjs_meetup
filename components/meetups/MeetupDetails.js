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

export const getStaticPaths = async () => {
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
    ],
  };
};

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;
  return {
    props: {
      meetups: {
        id: meetupId,
        title: "First meetup",
        image:
          "https://img.freepik.com/free-photo/toronto-skyline-from-park_649448-3496.jpg?semt=ais_hybrid",
        address: "100 main st, toronto",
        description: "This is cn tower of canada",
      },
    },
  };
};

export default MeetupDetails;
