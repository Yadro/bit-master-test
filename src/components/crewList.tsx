import React from 'react';
import { Card, List } from 'semantic-ui-react';
import { CrewInfo } from '../services/requestTypes';

interface Props {
    crews: CrewInfo[];
    onClick: (crewId: number) => void;
}

export default class CrewList extends React.Component<Props> {
    renderItems() {
        const { crews, onClick } = this.props;
        let sortedCrews = crews.sort((a, b) => a.distance - b.distance);
        return (
            <List devided={1}>
                {sortedCrews.map((crew) => (
                    <List.Item key={crew.crew_id}>
                        <List.Icon name='car' size='large' verticalAlign='middle'/>
                        <List.Content>
                            <List.Header as='a'
                                onClick={() => onClick(crew.crew_id)}
                            >
                                {`${crew.car_mark} ${crew.car_model}`}
                            </List.Header>
                            <List.Description>
                                {`${crew.car_color} ${crew.distance}м`}
                            </List.Description>
                        </List.Content>
                    </List.Item>
                ))}
            </List>
        );
    }

    render() {
        return (
            <Card style={{ height: '100%' }}>
                <Card.Content>
                    {this.renderItems()}
                </Card.Content>
            </Card>
        );
    }
}
