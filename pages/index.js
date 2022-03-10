import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate'
import StartingPageContent from '../components/starting-page/starting-page';
import {connectToDatabase} from '../helpers/db';
import ListCustomers from '../components/list/list-customers';
import {Fragment, useState} from 'react';
import MessageModal from '../components/ui/modal-message';
import { getSession } from 'next-auth/client'


function HomePage(props) {
 console.log('count',props.customers.length)
 
  const fetchCustomers = async(currentPage) => {
  //  const res = await fetch(props.customers?)
  }
  const handlePageClick = (data) =>{
    console.log(data.selected)
    let currentPage = data.selected + 1
  //  const customerFromDb = 
  }

  return(
    <Fragment>

      <ReactPaginate
      previousLabel={'Previous'}
      nextLabel={'Next'}
      breakLabel={'...'}
      pageCount={10}
      marginPagesDisplayed={0}
      pageRangeDisplayed={2}
      onPageChange={handlePageClick}
      containerClassName={"pagination justify-content-center"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link"}
      previousClassName={"page-item"}
      previousLinkClassName={"page-link"}
      nextClassName={"page-item"}
      nextLinkClassName={"page-link"}
      breakClassName={"page-item"}
      breakLinkClassName={"page-link"}
      activeClassName={"active"}
      />
       <StartingPageContent />
       <ListCustomers customers={props.customers}/>
    
       <MessageModal title="Test Message"  message="This is a test message"/>
   </Fragment>
  )
  
}


export async function getServerSideProps(context) {
  const session = await getSession(context)
  
  if(!session){
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const client = await connectToDatabase();
  const customersCollection = client.db().collection('customers');
  const customers = await customersCollection.find().toArray();
  const customerCount = customers.count
  const customerPage = customers.pageCount
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
      })),
      revalidate: 20,
      session:session,
     
   
      
  
     
    },
    
  };
  
 
}
export default HomePage;
