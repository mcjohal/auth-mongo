import React, { useEffect, useState } from 'react'
import EventUpdateInput from '../../../components/EventUpdateInput'

import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../helpers/db';






const EventUpdate = (props) => {


  return (
    <div>
      <EventUpdateInput
        id={props.eventData.id}
        title={props.eventData.title}
        location={props.eventData.location}
        rt_event={props.eventData.rt_event}
      />
       
    
    </div>
  )
}

export async function getStaticPaths(){
 
  const client = await connectToDatabase();
  const eventsCollection = client.db().collection('events');
  const events = await eventsCollection.find({}, {_id: 1}).toArray();

  client.close();

  return {
      fallback:'blocking',
      paths: events.map((event) => ({
          params: { eventUpdateId: event._id.toString()},
      }))
  }
}
export async function getStaticProps(context){
  //fetch data for a single event
  const eventUpdateId = context.params.eventUpdateId;

  const client = await connectToDatabase();
  const eventsCollection = client.db().collection('events');



  const event = await eventsCollection.findOne({
      _id: ObjectId(eventUpdateId),
  });

  client.close();

    return{
      props:{
        eventData:{
          id:event._id.toString(),
          title: event.title,
          location: event.location,
          rt_event:event.rt_event
        }
      }
    }

}

export default EventUpdate