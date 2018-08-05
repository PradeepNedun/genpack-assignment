import * as React from 'react';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import './App.css';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedItems: null,
      selectedOperator: this.props.operator[0].text,
      error: false,
      finalSelection: ''
    };
  }

  copyArray = (array) => {
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
      newArray[i] = array[i];
    }
    return newArray;
  }

  _onChange = (ev, option) => {
    this.setState({
      selectedOperator: option.text
    });
  }

  clearClicked = (e) => {
    // reload not good practice
    // need to check the method for re-rendering on fabric ui
    window.location.reload();
  }

  onChangeMultiSelect = (item) => {
    const updatedSelectedItem = this.state.selectedItems ? this.copyArray(this.state.selectedItems) : [];
    if (item.selected) {
      // add the option if it's checked

      updatedSelectedItem.push(this.state.selectedOperator);
      updatedSelectedItem.push(item.key);
    } else {
      // remove the option if it's unchecked
      const currIndex = updatedSelectedItem.indexOf(item.key);
      if (currIndex > -1) {
        updatedSelectedItem.splice(currIndex, 1);
      }
    }
    this.setState({
      selectedItems: updatedSelectedItem
    });
  }

  submitHandler = () => {
    let itemsArray = this.state.selectedItems;
    if(this.state.selectedItems == null) {
      this.setState({
        error: true
      });
      return;
    }
    if(this.state.selectedItems[0] === this.props.operator[0].text || 
      (this.state.selectedItems[0] === this.props.operator[1].text)) {
          this.state.selectedItems.shift();
    }
    // to remove duplicate operators
    for (let i = 0; i < itemsArray.length - 1; i++) {
      if (itemsArray[i] === itemsArray[i + 1]) {
        itemsArray.indexOf(i);
        this.state.selectedItems.splice(i, 1);
      }
    }
    this.setState({
      error: false,
      finalSelection: " You have chosen " + this.state.selectedItems.join(" ")
    });
  }

  render() {
    return (
      <div id="container" className="container">
          <ChoiceGroup
            onChange={this._onChange}
            options={this.props.operator}
            defaultSelectedKey="true"
          /> 
          <Dropdown
            placeHolder="Select your Favorite Toppings"
            id="select-toppings"
            multiSelect
            onChanged={this.onChangeMultiSelect}
            options={this.props.toppings}
          />
          <div className="button">
            <DefaultButton
              primary={true}
              text="Submit"
              onClick={this.submitHandler}
            />
          </div>
          <div className="button">
            <DefaultButton
              primary={true}
              text="Clear All"
              onClick={this.clearClicked}
            />
          </div>
          <div>
            {this.state.error && 
              <p className="red"> You have not picked anything. Please choose !!</p>}
            {!this.state.error && 
              <p className="green">{this.state.finalSelection}</p>}
          </div>
      </div>
    );
  }
}