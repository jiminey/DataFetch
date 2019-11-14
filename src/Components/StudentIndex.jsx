import React, { Component } from 'react'
import axios from 'axios'
import StudentIndexItem from './StudentIndexItem'
import './StudentIndex.css'

export default class Student extends Component {
    constructor(props){
        super(props)
        this.state = {
            students: [],
            name_keyword: '', 
            tag_keyword: '',
            matches: [],
            searchNames: true,
            searchTags: false,

        }
        this.handleName = this.handleName.bind(this)
        this.handleTag = this.handleTag.bind(this)
    }

    componentDidMount() {
        axios.get('https://www.hatchways.io/api/assessment/students').then(res => {
            this.setState({ students: res.data.students })
        })
    }

    handleName(e) {
        e.preventDefault();
        this.setState({
            name_keyword: e.currentTarget.value,
            searchNames: true,
            searchTags: false,
        })
    }
    
    handleTag(e) {
        e.preventDefault();
        this.setState({
            tag_ketword: e.currentTarget.value,
            searchTags: true,
            searchNames: false,
        })
    }

    render() {
        const students = this.state.students.map(student => {
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
                  tags={student.tags}
                  // handleTags={this.handleTags}
                ></StudentIndexItem>
            );
        })

        return (
          <div>
              <div>
                <form>
                    <input type="text" 
                    onChange={this.handleName} 
                    placeholder='Search by name...' 
                    value={this.state.name_keyword}/>
                </form>
              </div>
              <div>
                <form>
                    <input type="text" 
                    onChange={this.handleTag} 
                    placeholder='Search by tags...' 
                    value={this.state.tag_keyword}/>
                </form>
              </div>

          </div>
        );
    }
}
