import React, { ChangeEvent } from 'react';
import ReactDOM from 'react-dom';
import { Button, Container, Grid, Input, Label } from 'semantic-ui-react';
import Map from './components/map';
import CrewList from './components/crewList';
import MockHttpService from './services/mockHttpService';
import { Address, CrewsInfo } from './services/requestTypes';
import 'semantic-ui-css/semantic.min.css'

interface Props {}

interface State {
    address: string;
    lon: number;
    lat: number;
    availableCrews: CrewsInfo[];
}

class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            address: '',
            lon: 0,
            lat: 0,
            availableCrews: [],
        };
    }

    onChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ address: e.target.value });
    };

    onChoosePoint = async (requestAddress: Address) => {
        const { address, coords } = requestAddress;
        const params = {
            address,
            lat: coords[0],
            lon: coords[1],
        };
        this.setState(params);

        const availableCrews = await MockHttpService.getAvailableCrews(params);
        this.setState({
            availableCrews: availableCrews.data.crews_info,
        });
    }

    onMakeOrder = async () => {
        // TODO
    };

    onChooseCrew = () => {
        // TODO
    }

    render() {
        const { address, availableCrews } = this.state;
        return (
            <Container>
                <h1>Детали заказа</h1>
                <div style={{ margin: '10px 0' }}>
                    <Label>Откуда</Label>
                    <Input onChange={this.onChange} value={address}/>
                </div>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            <Map onClick={this.onChoosePoint} crews={availableCrews}/>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <CrewList crews={availableCrews} onClick={this.onChooseCrew}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            <Button
                                style={{ width: '100%' }}
                                primary
                                onClick={this.onMakeOrder}
                            >
                                Заказать
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </Container>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.querySelector('#root'),
);
