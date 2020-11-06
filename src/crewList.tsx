import React from 'react';
import { CrewsInfo } from './services/requestTypes';
import { Card, List } from 'semantic-ui-react';

interface Props {
    crews: CrewsInfo[];
    onClick: (crewId: number) => void;
}

export default class CrewList extends React.Component<Props> {
    renderItems() {
        const { crews, onClick } = this.props;
        return (
            <List devided={1}>
                {crews.map((crew) => (
                    <List.Item>
                        <List.Icon name='car' size='large' verticalAlign='middle'/>
                        <List.Content>
                            <List.Header as='a'
                                onClick={onClick(crew.crew_id)}
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