import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';
import Head from 'next/head';
import { Fragment } from 'react';

const HomePage = props => {
    return <Fragment>
        <Head>
            <title>React Meetups</title>
            <meta 
                name='description'
                content='Find meetups in your city and discover the touristic attractions on a hightly active React web'
            />
        </Head>
        <MeetupList meetups={props.meetups} />
    </Fragment>;
};

export async function getStaticProps() {
    //fetch data from API
    const client = await MongoClient.connect('mongodb+srv://admin:bw4IesFBhAHSYlfZ@cluster0.aqoe7hx.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 10
    };
};

export default HomePage;