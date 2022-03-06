import connectDB from "../../../helpers/connectDB";
import Events from "../../../models/eventModel";
import { getSession } from "next-auth/client";

connectDB();

export default async function eventHandler(req, res) {
  console.log("method", req);
  switch (req.method) {
    case "POST":
      await createEvent(req, res);
      break;
    case "GET":
      await getEvents(req, res);
      break;
    case "DELETE":
      await deleteEvent(req, res);
      break;
    case "PATCH":
      await updateEvent(req, res);
      break;
  }
}

const createEvent = async (req, res) => {
  try {
    //  const session = await getSession({req})
    //   if(!session){
    //       return res.status(400).json({msg:"Invalid Authentication!"})
    //   }
    //  else
    //  {
    //   console.log('session',{session})
    console.log("req.body", req.body.newEvent);
    //   }
    const { title, location, rt_event } = req.body.newEvent;

    if (!title) return res.status(400).json({ msg: "Please add title." });
    if (!location) return res.status(400).json({ msg: "Please add location." });

    const newEvent = new Events({
      title: title,
      location: location,
      rt_event: rt_event,
    });

    await newEvent.save();
    res.json({ msg: "Success! Created a new Event." });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const getEvents = async (req, res) => {
  try {
    //    const session = await getSession({req})
    //   if(!session){
    //        return res.status(400).json({msg: "Invalid Authentication!"})
    //   }

    // const {userId} = session

    const events = await Events.find();

    res.json(events);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
const deleteEvent = async (req, res) => {
  try {
    const id = req.body.id;
    console.log("req.body", req.body);
    console.log("id", id);
    await Events.findOneAndDelete(id);
    res.json({ msg: "Success! Event has been deleted." });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    console.log("req in updateEvent", req.body.updateEvent);
    const { id, title, location, rt_event } = req.body.updateEvent;

    if (!title) return res.status(400).json({ msg: "Please add title." });
    if (!location) return res.status(400).json({ msg: "Please add location." });

    await Events.findByIdAndUpdate(id, {
      title: title,
      location: location,
      rt_event: rt_event,
    });

    res.json({ msg: "Success! Event has been updated." });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
