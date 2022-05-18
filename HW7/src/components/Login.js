import React from 'react'
const css = {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center", 
    borderStyle:"solid", 
    borderColor:"blue"
};

export default function Login() {
    return (

        <div style={css}>
            <form style={{padding:"10px", borderStyle:"solid", borderColor:"blue"}}>
                <h3 style={{ textAlign: "center" }}>CGU Login</h3>
                <div style={{ width:"300px",textAlign: "center", display:"flex", justifyContent:"space-between", padding:"10px", borderStyle:"solid", borderColor:"blue"}}>
                    <label>UserName</label>
                    <input type={"email"} label="Email" name="email"/>
                </div>
                <div style={{margin:"10px 0 ", width:"300px",textAlign: "center", display:"flex", justifyContent:"space-between", padding:"10px", borderStyle:"solid", borderColor:"blue"}}>
                    <label>Password</label>
                    <input type={"password"} label="Name" name="name"/>
                </div>
                <div style={{ textAlign: "center"}}>
                    <input style={{borderColor:"blue", fontSize:"2em"}} type="submit" value="送出" />
                </div>
            </form>
        </div>
    )
}