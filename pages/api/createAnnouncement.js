import { connectToDatabase } from "../../helpers/db";

async function handler(req, res) {
  console.log(req.method);
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const {date,announcement} = data;
  console.log('date', date, 'announcement',announcement);
  let newId;

  const client = await connectToDatabase();
  const customersCollection = client.db().collection("announcements");

  //const existingCustomer = await customersCollection.findOne(
   // {email:email}
 // );
 // if (existingCustomer) {
 //   res.status(422).json({ message: "Customer already exists. Try again.", status:"success" });
 //   client.close();
 //   return;
 // }

  try{
  const result = await announcementsCollection.insertOne({ data });
  console.log(result);
  newId = result.insertedId;
  }catch(e){
    client.close();
    res.status(500).json({message:"Error", status:"error"})
    return;
  }

  client.close();
res.status(201).json({ message: "Customer has been created!", status:"success" });
}

export default handler;
