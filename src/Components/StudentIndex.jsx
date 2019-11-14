import React, { Component } from "react";
import axios from "axios";
import StudentIndexItem from "./StudentIndexItem";
import "./StudentIndex.css";

export default class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      name_keyword: "",
      tag_keyword: "",
      matches: [],
      isSearchNames: true,
      isSearchTags: false
    };
    this.handleName = this.handleName.bind(this);
    this.handleTag = this.handleTag.bind(this);
    this.searchByName = this.searchByName.bind(this);
    this.searchByTags = this.searchByTags.bind(this);
  }

  componentDidMount() {
    axios.get("https://www.hatchways.io/api/assessment/students").then(res => {
      this.setState({ students: res.data.students });
    });
  }

  handleName(e) {
    e.preventDefault();
    this.setState({
      name_keyword: e.currentTarget.value,
      isSearchNames: true,
      isSearchTags: false
    });
  }

  handleTag(e) {
    e.preventDefault();
    this.setState({
      tag_ketword: e.currentTarget.value,
      isSearchTags: true,
      isSearchNames: false
    });
  }

  searchByName(keyword) {
    return x => {
      return (
        x.firstName.toLowerCase().includes(keyword.toLowercase()) ||
        x.lastName.toLowerCase().includes(keyword.toLowercase())
      );
    };
  }

  searchByTags(keyword) {
    return x => {
      for (let i = 0; i < x.tags.length; i++) {
        return x.tags[i].toLowerCase().includes(keyword.toLowerCase());
      }
    };
  }

  render() {
    //ternary for searching with name or tag
    const students = this.state.isSearchNames
      ? this.state.students
          .filter(this.searchByName(this.state.name_keyword))
          .map(student => {
            return (
              <StudentIndexItem
                key={student.id}
                id={student.id}
                pic={student.pic}
                firstName={student.firstName}
                lastName={student.lastName}
                email={student.email}
                company={student.company}
                skill={student.skill}
                grades={student.grades}
                //tags={student.tags}
                // handleTags={this.handleTags}
              ></StudentIndexItem>
            );
          })
      : this.state.students
          .filter(this.searchByTags(this.state.tag_keyword))
          .map(student => {
            return (
              <StudentIndexItem
                key={student.id}
                id={student.id}
                pic={student.pic}
                firstName={student.firstName}
                lastName={student.lastName}
                email={student.email}
                company={student.company}
                skill={student.skill}
                grades={student.grades}
                //   tags={student.tags}
                // handleTags={this.handleTags}
              ></StudentIndexItem>
            );
          });

    return (
      <div>
        <div>
          <form>
            <input
              type="text"
              onChange={this.handleName}
              placeholder="Search by name..."
              value={this.state.name_keyword}
            />
          </form>
        </div>
        <div>
          <form>
            <input
              type="text"
              onChange={this.handleTag}
              placeholder="Search by tags..."
              value={this.state.tag_keyword}
            />
          </form>
        </div>

        <div>{students}</div>
      </div>
    );
  }
}
