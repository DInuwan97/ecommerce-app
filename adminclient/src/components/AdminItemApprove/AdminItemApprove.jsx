import React, { Component } from "react";
import ItemTable from "./ItemsTable/ItemTable";
import CardList from "./ItemApproveCardList/CardList";
import ViewSingleItem from "./ViewSingleItem/ViewSingleItem";
import AllItems from './allItems/allItemsTable'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
export default class AdminItemApprove extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    axios.get(`/api/items`).then((res) => {
      const allitems = res.data;
      let items = []
      for (let index = 0; index < allitems.length; index++) {
        if(allitems[index].company == this.props.companyName){
            items.push(allitems[index])
        }
        
      }


      this.setState({ items });
    });
  }

  declineItem = (id) => {
    console.log(id);
    this.setState({
      items: [...this.state.items.filter((item) => item._id !== id)],
    });

    axios.delete(`/api/items/${id}`).then((res) => {
    });
  };

  approveItem = (id, addedBy, itemName) => {
    this.setState({
      items: [...this.state.items.filter((item) => item._id !== id)],
    });

    axios
      .patch(`/api/items/${id}`, {
        isApproved: true,
        addedBy: addedBy,
        itemName: itemName,
      })
  };

  render() {
    return (
      <div className = 'container'>
        <Router>
          <CardList />
          <Switch>
            <Route
              path="/itemApprove"
              component={() => (
                <ItemTable
                  items={this.state.items}
                  declineItem={this.declineItem}
                  approveItem={this.approveItem}
                />
              )}
            />
            <Route path="/viewSingle" render={(props) => <ViewSingleItem {...props}/>} />
            <Route path="/allItems" render={(props) => <AllItems {...props}  items={this.state.items}  declineItem = {this.declineItem}/>} />

          </Switch>
        </Router>
      </div>
    );
  }
}
