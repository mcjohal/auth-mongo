import CreateAnnouncements from '../components/Announcements/create-announcements';
import {connectToDatabase} from '../helpers/db';
import ListAnnouncements from '../components/list/list-announcements';
import {Fragment} from 'react';
import MessageModal from '../components/ui/modal-message';

function HomePage(props) {
  return(
    <Fragment>
       <CreateAnnouncements />
       <ListAnnouncements announcements={props.announcements}/>
    
       <MessageModal title="Test Message"  message="This is a test message"/>
   </Fragment>
  )
  
}

export async function getStaticProps(){

  const client = await connectToDatabase();
  const announcementsCollection = client.db().collection('announcements');
  const announcements = await announcementsCollection.find().toArray();
  client.close();
  const notUndefined = (anyValue) => typeof anyValue !== "undefined";
  return{
    props:{
      announcements: announcements.map((announcement)=> ({
        id: announcement._id.toString(),
        date: announcement.data.date,
        announcement: customer.data.announcement,
 
      })
      ),
    },
    revalidate: 20,
  };
}

export default HomePage;
