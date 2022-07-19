import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import logo from '../logo.png';

export default class Navbar extends Component {
  render() {
    return (
      <div style={{ height: '10vh', display: 'flex', alignItems: 'center', background: '#e5e4e2', padding: 0.5}}>
        <img src={logo} style={{ marginLeft:'10px', height: '80%' }} alt=""></img>
        <Link to="/" style={{textDecoration: 'none', color: 'black'}}><div style={{ marginLeft: '20px', fontWeight: 'bold', fontSize: '175%', color: '#1e90ff'}}>Movies App</div></Link>
        <Link to="/Fav" style={{textDecoration: 'none', color: 'black'}}><div style={{ marginLeft: '20px', fontWeight: 'bold', fontSize: '200%', color: '#1e90ff'}}>Favorites</div></Link>
      </div>
    )
  }
}
