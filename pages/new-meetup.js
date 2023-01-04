import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import NewMeetupForm from '../components/meetups/NewMeetupForm';

const NewMeetupPage = () => {
    const router = useRouter();
    const addMeetupHandler = async (meetupData) => {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(meetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        console.log(data);

        router.replace('/');
    };

    return <Fragment>
        <Head>
            <title>Add New Meetup</title>
            <meta 
                name='description'
                content='Plan your own event and create amazing networking opportunities'
            />
        </Head>
        <NewMeetupForm onAddMeetup={addMeetupHandler} /></Fragment>
};

export default NewMeetupPage;