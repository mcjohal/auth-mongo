const ListCustomers = (props) => {
  const { customers } = props;
  return (
    <section className="container-fluid ">
      <div className="row py-5">
        <div className="col display-4 d-flex justify-content-center">Customer List</div>
      </div>
      <div className="row">
        <div className="col d-flex justify-content-center">
          <ul>
            {customers.map((customer) => (
              <li className="list-unstyled" key={customer.id}>
                <span>{customer.firstName}</span>{" "}
                <span>{customer.lastName}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ListCustomers;
