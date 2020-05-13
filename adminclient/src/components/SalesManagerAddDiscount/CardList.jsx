import React from 'react'
import Card from './Card'
export default function CardList() {
    return (
        <div className="row">
        <Card
          color={"bg-info"}
          icon={"ion-bag"}
          value={150}
          name={"ALL ITEMS IN SHOP"}
        />
        <Card
          color={"bg-success"}
          icon={"ion-stats-bars"}
          value={150}
          name={"ITEMS TO BE APPROVED"}
        />
        <Card
          color={"bg-warning"}
          icon={"ion-person-add"}
          value={150}
          name={"NEWLY ADDED"}
        />
        <Card
          color={"bg-danger"}
          icon={"ion-pie-graph"}
          value={150}
          name={"DECLINED ITEMS"}
        />
      </div>
    )
}
