class Search extends React.Component
{
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.state = {
      isLoaded: false,
      userList: null,
      selectedUser: null,
      search: null
    };
  }

  handleInputChange(event) {
    let value = event.target.value;

    if (value) {
      this.setState({ search : value });
      this.queryUserList();
    } else {
      this.setState({ isLoaded: false });
    }
  }

  handleItemClick(event) {
    this.setState({
      selectedUser : {
        key : event.target.dataset.key,
        value : event.target.dataset.value,
        top : event.target.getBoundingClientRect().top,
      }
    });
  }

  handleButtonClick(event) {
    this.setState({ selectedUser: null });

    if (event.target.dataset.action == 'proceed') {
      alert("Done!")
    }
  }

  queryUserList() {
    const search = this.state.search;

    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(
        (result) => {
          let filteredData = result.filter(
            user => user.name.toLowerCase().includes(search.toLowerCase())
          );

          this.setState({
            isLoaded: true,
            userList: filteredData
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error: true
          });
        }
      );
  }

  render() {
    let dropdown;
    let popout;

    if (this.state.isLoaded) {
      dropdown = (
        <ul className="search-list">
          {this.state.userList.map((option) =>
            <li key={option.id} data-key={option.id} data-value={option.name} onClick={this.handleItemClick}>
              {option.name}
            </li>
          )}
        </ul>
      );
    }

    if (this.state.selectedUser) {
      popout = <div className="popout" style={{top: this.state.selectedUser.top}}>
        <div className="popout-name">{ this.state.selectedUser.value }</div>
        <div className="popout-greetings">Hello!</div>
        <div className="popout-buttons">
          <div className="btn-cancel" onClick={this.handleButtonClick} data-action="cancel">Cancel</div>
          <div className="btn-proceed"onClick={this.handleButtonClick}  data-action="proceed">Proceed</div>
        </div>
      </div>;
    }

    return (
      <div>
        <div className="search">
          <input placeholder="Type to Start Searching" className="search-input" onChange={this.handleInputChange}/>
          {dropdown}
        </div>
        <button className="btn btn-search">
          <i className="fa fa-search"></i>
          Search
        </button>
        {popout}
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Search />,
  document.getElementById('search')
);

