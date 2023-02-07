import React from "react";
import ReactDOM from "react-dom";

function Card(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <img
        src={props.img} alt="avatar_img"
      />
      <p>{props.tel}</p>
      <p>{props.email}</p>
    </div>
  )
}

ReactDOM.render(
  <div>
    <h1>My Contacts</h1>
    <Card 
      name='Beyonce' 
      img="https://blackhistorywall.files.wordpress.com/2010/02/picture-device-independent-bitmap-119.jpg" 
      tel="+123 456 789" 
      email="b@beyonce.com"
    />
    <Card 
      name="Syukri Hadi"
      img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuabej-KB_M2RIiJ2gOpR7c_KbHu8NBLqrmg&usqp=CAU"
      tel="0809010"
      email="test@mail.com"
    />
  </div>,
  document.getElementById("root")
);