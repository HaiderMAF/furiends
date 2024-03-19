import React, { useState } from 'react';
import Profiles from './profiles';
import { Leaderboard } from './database';

export default function Board() {
    const [period, setPeriod] = useState('7');

    const handleClick = (e) => {
        setPeriod(e.target.dataset.id);
    }

    const renderPeriodContent = () => {
        switch (period) {
            case '30':
                return (
                    <div className="period-content">
                        <h2 className="period-title">Top Players - Last 30 Days</h2>
                        <Profiles Leaderboard={getTopPlayers(Leaderboard, 30)} />
                    </div>
                );
            case 'all-time':
                return (
                    <div className="period-content">
                        <h2 className="period-title">All-Time Leaderboard</h2>
                        <Profiles Leaderboard={Leaderboard} />
                    </div>
                );
            default:
                return (
                    <div className="period-content">
                        <h2 className="period-title">Top Players - Last 7 Days</h2>
                        <Profiles Leaderboard={getTopPlayers(Leaderboard, 7)} />
                    </div>
                );
        }
    };

    return (
        <div className="board">
            <h1 className='leaderboard'>Leaderboard</h1>

            <div className="duration">
                <button className={period === '7' ? 'active' : ''} onClick={handleClick} data-id='7'>7 Days</button>
                <button className={period === '30' ? 'active' : ''} onClick={handleClick} data-id='30'>30 Days</button>
                <button className={period === 'all-time' ? 'active' : ''} onClick={handleClick} data-id='all-time'>All-Time</button>
            </div>

            {renderPeriodContent()}
        </div>
    );
}

function getTopPlayers(data, days) {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - days);

    return data.filter(player => new Date(player.dt) >= startDate);
}
