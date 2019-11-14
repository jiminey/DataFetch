import React, { Component } from 'react'

import './StudentIndexItem.css'


export default class StudentIndexItem extends Component {
    constructor(props){
        super(props)
        this.state = {
            showPullDown: true,
        }
    }

    getAverage(grades) {
        let total = 0;
        let average;

        for (let i = 0; i < arr.length; i++) {
            grades[i] = parseInt(grades[i])
            total += grades[i]
            average = total / grades.length
        }

        return average
    }
    render() {
        const firstName = this.props.firstName
        const lastName = this.props.lastName
        const email = this.props.email
        const company = this.props.company
        const skill = this.props.skill
        const grades = this.getAverage(this.props.grades)

        return (
            <div>
                <div>
                    <img src={this.props.pic} alt=""/>
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
            </div>
        )
    }
}
