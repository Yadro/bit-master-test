import React, { ChangeEvent } from 'react';
import ReactDOM from 'react-dom';
import { Button, Container, Input } from 'semantic-ui-react';
import Map from './map';
import 'semantic-ui-css/semantic.min.css'

interface Props {}

interface State {
    search: string;
}

class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            search: '',
        };
    }

    onChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ search: e.target.value });
    };

    onChoosePoint = (buildingName: string) => {
        this.setState({ search: buildingName });
    }

    render() {
        const { search } = this.state;
        return (
            <Container>
                <h1>Детали заказа</h1>
                <div>
                    <Input onChange={this.onChange} value={search}/>
                    <Button>Search</Button>
                </div>
                <Map onClick={this.onChoosePoint}/>
            </Container>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.querySelector('#root'),
);
