import React from "react"

export default class Thankyou extends React.Component {
  componentDidMount() {
    const timer = setTimeout(() => {
      document.getElementById("button").click()
    }, 3000);
    return () => clearTimeout(timer);
  }


  checkClick() {
    console.log("clicked!")
    window.location.href = "./home"
  }

  render() {
    return (
      <div id="button" onClick={this.checkClick}>
        <div style={{ marginTop: "30px", marginBottom: "50px", marginLeft: "25%", textAlign: "center", backgroundColor: "white", width: "50%", height: "350px", borderRadius: "10px" }} >
          <div style={{ paddingTop: "20%", paddingBottom: "30px", borderRadius: "10px" }} className='px-4'>
            <h2>Thank You for subscribe!</h2>
          </div>
        </div>
      </div>
    )
  }
}