import React, { useEffect, useState } from "react";

import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "First meetup",
    image:
      "https://img.freepik.com/free-photo/toronto-skyline-from-park_649448-3496.jpg?semt=ais_hybrid",
    address: "100 main st, toronto",
    description: "This is cn tower of canada",
  },
  {
    id: "m2",
    title: "Second meetup",
    image:
      "https://img.freepik.com/free-photo/toronto-skyline-from-park_649448-3496.jpg?semt=ais_hybrid",
    address: "200 queen st, toronto",
    description: "This is water front tower of canada",
  },
];

const Homepage = (props) => {
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   setData(DUMMY_MEETUPS);
  // }, []);
  return <MeetupList meetups={props.meetups} />;
};

// export const getStaticProps = async () => {
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//     revalidate: 1,
//   };
// };

export const getServerSideProps = async (context) => {
  const req = context.req;
  const res = context.res;
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
};

export default Homepage;
