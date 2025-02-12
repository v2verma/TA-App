const Header = () => {
  return (
    <header className="text-white p-4" style={{background: "rgb(117 153 161)"}}>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>TA Workflow</h1>
          </div>
          <div className="col text-right">
            <nav>
              <ul className="list-unstyled d-flex justify-content-end">
                <li><a className="btn btn-default text-white mx-2">Home</a></li>
                <li><a className="btn btn-default text-white mx-2">About</a></li>
                <li><a className="btn btn-default text-white mx-2">Contact</a></li>
                <li><a className="btn btn-default text-white mx-2">SignUp</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
