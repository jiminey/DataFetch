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


        return (
            <div>
                <div>
                    <img src={this.props.pic} alt=""/>
                </div>

                <div>
                    <ul>
                        <li>
                            {this.props.firstName} {this.props.lastName}
                        </li>
                        <li>Email: {this.props.email}</li>
                        <li>Company: {this.props.company}</li>
                        <li>Skill: {this.props.skill}</li>
                        <li>Average: {this.props.email}</li>

                    </ul>
                </div>
            </div>
        )
    }
}
