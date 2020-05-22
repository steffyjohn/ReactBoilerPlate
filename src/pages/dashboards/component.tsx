import React from 'react';
import CardHeader from '../../components/cardHeaders/index';

class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <CardHeader title="Dashboard" />
                <div style={{ padding: '24px' }}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                    scrambled it to make a type specimen book.
                </div>
            </div>
        );
    }
}

export default Dashboard;
