import { Component } from "react";
import socketio from "socket.io-client";

const socket = socketio.connect("http://localhost:8081");

class App extends Component {
  constructor() {
    super();
    this.state = {
      logs: [],
      msg: "",
    };
  }

  async componentDidMount() {
    await socket.on("msg", async (obj) => {
      const logs2 = this.state.logs;
      obj.key = "key_" + (this.state.logs.length + 1);
      console.log(obj.key);
      logs2.unshift(obj);
      this.setState({ logs: logs2 });
    });
    await socket.on("replymsg", async (obj) => {
      const logs2 = this.state.logs;
      obj.key = "key_" + (this.state.logs.length + 1);
      console.log(obj.key);
      logs2.unshift(obj);
      this.setState({ logs: logs2 });
    });
  }

  send = async (e) => {
    e.preventDefault();
    await socket.emit("msg", {
      user: "나",
      msg: this.state.msg,
    });
    this.setState({ msg: "" });
  };

  msgChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  render() {
    const messages = this.state.logs.map((k) => (
      <div>
        <p>
          &nbsp;{k.user} : {k.msg}
        </p>
      </div>
    ));
    return (
      <>
        <div style={{ textAlign: "center" }}>
          <h1>AI chatbot</h1>
          <div style={{ textAlign: "center", marginTop: "10%" }}>
            {messages.reverse()}
            <input
              type="text"
              name="msg"
              value={this.state.msg}
              onChange={this.msgChange}
              placeholder="채팅을 입력하세요."
            />
            <button onClick={this.send}>보내기</button>
          </div>
        </div>
      </>
    );
  }
}

export default App;
