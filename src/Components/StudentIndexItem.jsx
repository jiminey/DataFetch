import React, { Component } from "react";

import "./StudentIndexItem.css";

export default class StudentIndexItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPullDown: true,
      tagInput: ""
    };

    this.getAverage = this.getAverage.bind(this);
    this.showPullDown = this.showPullDown.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addTag = this.addTag.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  getAverage(grades) {
    let total = 0;
    let average;

    for (let i = 0; i < grades.length; i++) {
      grades[i] = parseInt(grades[i]);
      total += grades[i];
      average = total / grades.length;
    }
    return average;
  }

  showPullDown() {
    if (this.state.showPullDown) {
      return (
        <div>
          <button onClick={this.toggle}>+</button>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={this.toggle}>-</button>
        </div>
      );
    }
  }

  toggle() {
    this.setState({
      showPullDown: !this.state.showPullDown
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.addTag(this.state.tagInput);
  }

  //allows to submit with return key instead of button
  checkSubmit(e) {
    if (e && e.keyCode === 13) {
      document.forms[0].submit();
    }
  }

  handleInput(e) {
    e.preventDefault();
    this.setState({
      tagInput: e.currentTarget.value
    });
  }

  addTag(tag) {
    let tags = this.props.tags || [];
    if (!(tags.indexOf(tag) > -1)) {
      this.props.addTag(this.props.id, tag);
    }
  }

  tagInput() {
    const tags =
      this.props.tags &&
      this.props.tags.map((tag, idx) => {
        return (
          <li className="tag-li" key={idx}>
            {tag}
          </li>
        );
      });

    if (!this.state.showPullDown) {
      return (
        <div>
          <div className="tag-container">
            <ul className="tags">{tags}</ul>
          </div>
          <form onSubmit={this.handleSubmit}>
            <input
              className="tag-input"
              type="text"
              placeholder="Add a tag"
              onChange={this.handleInput}
            />
          </form>
        </div>
      );
    }
  }

  render() {
    const firstName = this.props.firstName.toUpperCase();
    const lastName = this.props.lastName.toUpperCase();
    const email = this.props.email;
    const company = this.props.company;
    const skill = this.props.skill;
    const grades = this.getAverage(this.props.grades);

    const test =
      !this.state.showPullDown &&
      this.props.grades.map((test, idx) => {
        return (
          <li key={idx + 1}>
            Test {idx + 1}: {test}%
          </li>
        );
      });

    return (
      <div className="student-main">
        <div className="student-main-left">
          <img className="student-pic" src={this.props.pic} alt="lost pic" />
          <div>
            <ul>
              <li className="name">
                {firstName} {lastName}
              </li>
              <li className="email">Email: {email}</li>
              <li>Company: {company}</li>
              <li>Skill: {skill}</li>
              <li>Average: {grades}%</li>
            </ul>

            <ul>{test}</ul>
            {this.tagInput()}
          </div>
        </div>
        <div className="pull-down">{this.showPullDown()}</div>
      </div>
    );
  }
}
