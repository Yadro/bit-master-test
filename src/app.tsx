import React, { ChangeEvent } from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import { Button, Container, Form, Grid, Input } from 'semantic-ui-react';
import Map from './components/map';
import CrewList from './components/crewList';
import CrewCard from './components/crewCard';
import MapHttpService from './services/mapHttpService';
import MockHttpService from './services/mockHttpService';
import { Address, Coords, CrewInfo } from './services/requestTypes';

interface Props {}

interface State {
    address: string;
    coords: Coords;
    availableCrews: CrewInfo[];
    selectedCrew: CrewInfo;
}

class App extends React.Component<Props, State> {
    timer: number = null;

    constructor(props: Props) {
        super(props);
        this.state = {
            address: '',
            coords: null,
            availableCrews: [],
            selectedCrew: null,
        };
    }

    componentWillUnmount() {
        if (this.timer) {
            window.clearTimeout(this.timer);
        }
    }

    onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const address = e.target.value;
        this.setState({ address });
        if (this.timer) {
            window.clearTimeout(this.timer);
        }
        if (address.length) {
            this.timer = window.setTimeout(() => {
                this.onTypeAddress();
            }, 2000);
        }
    };

    onTypeAddress = async () => {
        const { address } = this.state;
        const coords = await MapHttpService.geocoding(address);
        this.setState({
            coords,
        });
        if (coords) {
            await this.getCrew({ address, coords });
        }
    };

    onChoosePoint = async (requestAddress: Address) => {
        this.setState(requestAddress);
        await this.getCrew(requestAddress);
    }

    getCrew = async (address: Address) => {
        const availableCrews = await MockHttpService.getAvailableCrews(address);
        let selectedCrew;
        if (availableCrews[0]) {
            selectedCrew = availableCrews[0];
        }
        this.setState({
            availableCrews,
            selectedCrew,
        });
    }

    onChooseCrew = (crewId: number) => {
        const { availableCrews } = this.state;
        const selectedCrew = availableCrews.find(c => c.crew_id === crewId);
        this.setState({
            selectedCrew,
        });
    }

    makeOrder = async () => {
        const { address, coords, selectedCrew } = this.state;
        await MockHttpService.makeOrder({
            address,
            coords,
            crew_id: selectedCrew.crew_id,
        });
    }

    render() {
        const { address, availableCrews, selectedCrew, coords } = this.state;
        return (
            <Container>
                <h1>Детали заказа</h1>
                <Form style={{ margin: '14px 0' }}>
                    <Form.Field required>
                        <label>Откуда</label>
                        <Input onChange={this.onChange} value={address} placeholder='Город, улица, дом'/>
                    </Form.Field>
                </Form>
                {selectedCrew &&
                    <CrewCard crew={selectedCrew}/>
                }
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            <Map crews={availableCrews} coords={coords} onClick={this.onChoosePoint}/>
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
                                onClick={this.makeOrder}
                                disabled={address.length < 1 && !selectedCrew}
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
