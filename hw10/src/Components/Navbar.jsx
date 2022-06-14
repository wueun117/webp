import React, { Component } from 'react'
import './css/Main.css'


class Navbar extends Component {
    render() {
        return (
            <nav className="navbar">
                <a href="#home"><i className="fa fa-fw fa-home"></i>HOME</a>
                <a href="#container-about"><i className="fa fa-fw fa-user"></i>No Habbit</a>
                <a href="#skillheader"><i className="fa fa-fw fa-xing"></i>Birth date:2001/11/07</a>
                <a id="protofolio-link" href="#Portfolio"><i className="fa fa-github-alt"></i>Follwers:0</a> 
                <a href="#contactnav"><i className="fa fa-fw fa-envelope"></i>Email:B0929040@cgu.edu.tw</a>
            </nav>
        )
    }
}

export default Navbar
