import React, { Component } from 'react'
import logo from '../Components/public/image/WUEUN.jpg';



class Banner extends Component {
    render() {
        return (
            <section className="container-banner">

                    <a href="#home"><img id="profilepic" src={logo}  width="170" height="170" alt="profilepic"/></a>
                    <h1> CGU CSIE </h1>
                    <p id="paragarph1">WUEUN</p>
                    <a href="https://github.com/wueun117/webp">GITHUB</a>
                    
            </section>
        )
    }
}

export default Banner


