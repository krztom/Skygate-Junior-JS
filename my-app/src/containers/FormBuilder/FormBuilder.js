import React, { Component } from "react";
import Dexie from "dexie";
import "./FormBuilder.css";
import SubinputBlock from "../../components/Inputs/Inputs";

class FormBuilder extends Component {
  constructor() {
    super();
    this.state = {
      input: []
    };
  }

  componentDidMount() {}

  componentDidUpdate() {
    console.log(this.state);
    const currentStateJSON = JSON.stringify(this.state);
    // console.log(currentStateJSON);

    const db = new Dexie("FormsBuilderDB");
    db.version(1).stores({ inputs: "++id" });

    db.table("inputs").toArray();
    db.inputs
      .put(this.state)
      .then(function() {})
      .catch(function(error) {
        alert("Ooops: " + error);
      });
  }

  QuestionChangeHandler = idx => evt => {
    const newInput = this.state.input.map((input, sidx) => {
      if (idx !== sidx) return input;
      return { ...input, question: evt.target.value };
    });

    this.setState({ input: newInput });
  };

  SelectChangeHandler = idx => evt => {
    const newInput = this.state.input.map((input, sidx) => {
      if (idx !== sidx) return input;
      return { ...input, type: evt.target.value };
    });

    this.setState({ input: newInput });
  };

  AddInputBoxHandler = () => {
    this.setState(prevState => ({
      input: [...prevState.input, { question: "", type: "", children: [] }]
    }));
  };

  RemoveInputBoxHandler = index => () => {
    this.setState({
      input: this.state.input.filter((s, sidx) => index !== sidx)
    });
  };

  AddSubInputBoxHandler = idx => () => {
    const inputChildreen = this.state.input.map((input, sidx) => {
      if (idx !== sidx) return input;
      return { ...input, children: [{ question: "", type: "", children: []}] };
    });


    this.setState({ input: inputChildreen });
    console.log(inputChildreen);
  }

  render() {
    return (
      <div className="formbuilder_container">
        {this.state.input.map((input, index) => (
          <div className="inputs_container" key={index}>
            <div className="input_box">
              <div className="label_container">
                <label>Question:</label>
                <input
                  type="text"
                  value={input.name}
                  onChange={this.QuestionChangeHandler(index)}
                />
              </div>
              <div className="label_container">
                <label>Type:</label>
                <select
                  placeholder="Select a type"
                  value={this.state.value}
                  onChange={this.SelectChangeHandler(index)}
                >
                  <option value="">Select Type</option>
                  <option value="yest/no">YES/NO</option>
                  <option value="text">TEXT</option>
                </select>
              </div>
              <div className="button_container">
                <button
                  className="btn btn__small"
                  onClick={this.AddSubInputBoxHandler(index)}
                >
                  Add Sub-input
                </button>
                <button
                  onClick={this.RemoveInputBoxHandler(index)}
                  className="btn btn__small"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={this.AddInputBoxHandler}
          className="btn btn__big"
        >
          Add input
        </button>
        <SubinputBlock />
      </div>
    );
  }
}

export default FormBuilder;
