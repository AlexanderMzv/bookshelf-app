import { Component } from "react";

//Отправляет запрос в backend для текущего URL
class RefreshPage extends Component {
  componentDidMount() {
    window.location.reload();
  }
  render() {
    return (
      null
    );
  }
}

export default RefreshPage;