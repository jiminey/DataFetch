import React, { Component } from "react";

import "./StudentIndexItem.css";

export default class StudentIndexItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPullDown: true,
      tags: [],
    };

    this.getAverage = this.getAverage.bind(this);
    this.showPullDown = this.showPullDown.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addTag = this.addTag.bind(this);
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

  handleSubmit(e){
    e.preventDefault();
    this.addTag(e.currentTarget.value)
  }

  addTag(tag) {
    let tagList = [...this.state.tags, tag]

    tagList = tagList.join(" || ")

    this.setState({
        tags: tagList
    })
    this.props.getStudent(this.props.id, tagList)

    if (!(this.state.tags.indexOf(tag) > -1)) {
        let tags = this.state.tags.concat([tag])
        this.setState({
            tags: tags
        })
    }

  }

  tagInput() {
      if (!this.state.showPullDown) {
          return (
            <div>
              <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Add a tag" />
              </form>
            </div>
          );
      }
  }

  render() {
    const firstName = this.props.firstName;
    const lastName = this.props.lastName;
    const email = this.props.email;
    const company = this.props.company;
    const skill = this.props.skill;
    const grades = this.getAverage(this.props.grades);
     
    const tags = this.props.tags.map(tag => {
          return (
            <div>
              <li>{tag}</li>
            </div>
          );
        });

    const test =
      !this.state.showPullDown &&
      this.props.grades.map((test, idx) => {
        return (
          <div key={idx}>
            <li key={idx + 1}>
              Test {idx + 1}: {test}%
            </li>
          </div>
        );
      });

    return (
      <div>
        <div>
          <img src={this.props.pic} alt="" />
        </div>

        <div>
          <ul>
            <li>
              {firstName} {lastName}
            </li>
            <li>Email: {email}</li>
            <li>Company: {company}</li>
            <li>Skill: {skill}</li>
            <li>Average: {grades}</li>
          </ul>
        </div>

        <div>

          <ul>{test}</ul>

        </div>

        <div>
          <ul>{tags}</ul>
        </div>

        {this.tagInput()}

        {this.showPullDown()}
      </div>
    );
  }
}
