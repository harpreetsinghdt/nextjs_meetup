import React, { Fragment } from "react";
import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetails";

const Index = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetups.title}</title>
        <meta name="description" content={props.meetups.description} />
      </Head>
      <MeetupDetail
        image={props.meetups.image}
        title={props.meetups.title}
        address={props.meetups.address}
        description={props.meetups.description}
      />
    </Fragment>
  );
};

export const getStaticPaths = async () => {
  const mongodb_connection_string =
    "mongodb+srv://meetups_user:meetups_password@meetups.vpwrw.mongodb.net/?retryWrites=true&w=majority&appName=meetups";
  const client = await MongoClient.connect(mongodb_connection_string);
  const db = client.db("meetups");
  const clction = db.collection("meetups");
  const result = await clction.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: "blocking",
    paths: result.map((res) => ({
      params: {
        meetupId: res._id.toString(),
      },
    })),
  };
};

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;

  const mongodb_connection_string =
    "mongodb+srv://meetups_user:meetups_password@meetups.vpwrw.mongodb.net/?retryWrites=true&w=majority&appName=meetups";
  const client = await MongoClient.connect(mongodb_connection_string);
  const db = client.db("meetups");
  const clction = db.collection("meetups");
  const result = await clction.findOne({ _id: new ObjectId(meetupId) });
  client.close();
  console.log(result);
  return {
    props: {
      meetups: {
        id: result._id.toString(),
        title: result.title,
        image: result.image,
        address: result.address,
        description: result.description,
      },
    },
  };
};

export default Index;
