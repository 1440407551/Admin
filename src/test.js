import React from 'react'
import ReactDOM from 'react-dom'

class Test extends React.Component {
    // constructor() {}
    test = () => {
        console.log('test');
    }

    div = () => {
        console.log('div')
    }
    render() {
        return (
            <div onClick={() => this.div}>
                div
                <span onClick={() => this.test}>span</span>
            </div>
        )
    }
}

ReactDOM.render(
    <Test></Test>, document.getElementById('root')
)

export default Test

