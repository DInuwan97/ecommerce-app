import React, { Component } from "react";
import ItemTable from "./ItemsTable/ItemTable";
import CardList from "./ItemApproveCardList/CardList";
import ViewSingleItem from "./ViewSingleItem/ViewSingleItem";
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
      const items = res.data;
      console.log("hello world");

      this.setState({ items });
    });
  }

  declineItem = (id) => {
    console.log(id);
    this.setState({
      items: [...this.state.items.filter((item) => item._id !== id)],
    });

    axios.delete(`/api/items/${id}`).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  };

  approveItem = (id, addedBy, itemName) => {
    console.log(id);
    this.setState({
      items: [...this.state.items.filter((item) => item._id !== id)],
    });

    axios
      .patch(`/api/items/${id}`, {
        isApproved: true,
        addedBy: addedBy,
        itemName: itemName,
      })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
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
          </Switch>
        </Router>
      </div>
    );
  }
}
