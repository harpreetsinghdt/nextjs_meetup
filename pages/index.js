import React, { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "First meetup",
//     image:
//       "https://img.freepik.com/free-photo/toronto-skyline-from-park_649448-3496.jpg?semt=ais_hybrid",
//     address: "100 main st, toronto",
//     description: "This is cn tower of canada",
//   },
//   {
//     id: "m2",
//     title: "Second meetup",
//     image:
//       "https://img.freepik.com/free-photo/toronto-skyline-from-park_649448-3496.jpg?semt=ais_hybrid",
//     address: "200 queen st, toronto",
//     description: "This is water front tower of canada",
//   },
// ];

const Homepage = (props) => {
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   setData(DUMMY_MEETUPS);
  // }, []);
  return (
    <Fragment>
      <Head>
        <title>Nextjs Meetups</title>
        <meta name="description" content="Browse list of toronto meetups" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const mongodb_connection_string =
    "mongodb+srv://meetups_user:meetups_password@meetups.vpwrw.mongodb.net/?retryWrites=true&w=majority&appName=meetups";
  const client = await MongoClient.connect(mongodb_connection_string);
  const db = client.db("meetups");
  const clction = db.collection("meetups");
  const result = await clction.find().toArray();
  client.close();

  return {
    props: {
      meetups: result.map((res) => ({
        title: res.title,
        address: res.address,
        image: res.image,
        id: res._id.toString(),
      })),
    },
    revalidate: 1,
  };
};

// export const getServerSideProps = async (context) => {
//   const req = context.req;
//   const res = context.res;
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// };

export default Homepage;
