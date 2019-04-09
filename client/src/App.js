import React, {Component} from 'react';
import './App.css';
import Select from 'react-select';
import Form from './components/form';

const options = [
    {value: 'operator', label: 'Operator'},
    {value: 'coordinator', label: 'Coordinator'},
];

class App extends Component {
    state = {
        selectedOption: null,
    };
    handleChange = (selectedOption) => {
        this.setState({selectedOption});
    };

    render() {
        const {selectedOption} = this.state;
        return (
            <div className={'mainPageContainer'}>
                <header>
                    <a className={'logoContainer'} href={'#'}>
                        <img className={'logoImage'} src={require('./resources/UN.png')}>
                        </img>
                    </a>
                </header>
                <h1>New user registration</h1>
                <div className={'selectRoleContainer'}>
                    <Select
                        className='selectRole'
                        value={selectedOption}
                        onChange={this.handleChange}
                        options={options}
                    />
                    <Form
                        selectedOption={selectedOption}
                    />
                </div>
            </div>
        );
    }
}

export default App;
