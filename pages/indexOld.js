import StartingPageContent from '../components/starting-page/starting-page';
import {connectToDatabase} from '../helpers/db';
import ListCustomers from '../components/list/list-customers';
import {Fragment} from 'react';
import MessageModal from '../components/ui/modal-message';

function HomePage(props) {
  return(
    <Fragment>
       <StartingPageContent />
       <ListCustomers customers={props.customers}/>
    
       <MessageModal title="Test Message"  message="This is a test message"/>
   </Fragment>
  )
  
}

export async function getStaticProps(){

  const client = await connectToDatabase();
  const customersCollection = client.db().collection('customers');
  const customers = await customersCollection.find().toArray();
  client.close();
  const notUndefined = (anyValue) => typeof anyValue !== "undefined";
  return{
    props:{
      customers: customers.map((customer)=> ({
        id: customer._id.toString(),
        firstName: customer.data.firstName,
        lastName: customer.data.lastName,
        email: customer.data.email || "",
        cellPhone: customer.data.cellPhone || "",
      })
      ),
    },
    revalidate: 20,
  };
}

export default HomePage;
