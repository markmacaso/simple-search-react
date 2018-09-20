class Search extends React.Component
{
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.options = props.options;
    this.state = { hasInput: false, selected: null };
  }

  handleInputChange(event) {
    if (event.target.value) {
      this.setState({ hasInput: true });
    } else {
      this.setState({ hasInput: false });
    }
  }
  
  handleItemClick(event) {
    let selected = {
      key : event.target.dataset.key,
      value : event.target.dataset.value,
      top : event.target.getBoundingClientRect().top,
    };
    this.setState({ selected: selected });
  }
  
  handleButtonClick(event) {
    const action = event.target.dataset.action;
    
    this.setState({ selected: null });
    
    if (action == 'proceed') {
      alert("Done!")
    }
  }

  render() {
    const hasInput = this.state.hasInput;
    const options = this.options;
    const selected = this.state.selected;
    let dropdown;
    let popout;
    
    if (hasInput) {
      dropdown = (
        <ul className="search-list">
          {options.map((option) =>
            <li key={option.key} data-key={option.key} data-value={option.value} onClick={this.handleItemClick}>
              {option.value}
            </li>
          )}
        </ul>
      );
    }
    
    if (selected) {
      popout = <div className="popout" style={{top: selected.top}}>
        <div className="popout-name">{selected.value}</div>
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

const options = [
  {key: 1, value: 'Isaac Newton'},
  {key: 2, value: 'Benjamin Franklin'},
  {key: 3, value: 'Marie Curie'},
  {key: 4, value: 'Albert Einstein'},
];

ReactDOM.render(
  <Search options={options}/>,
  document.getElementById('search-pane')
);
