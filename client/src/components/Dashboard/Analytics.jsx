import React from 'react'
import { ProfileComponent, Card } from '../../components'
import './Analytics.css'

const Analytics = () => {
  const stats = [
    { label: 'Total Views', value: '12,456', change: '+12%', positive: true },
    { label: 'Profile Visits', value: '3,892', change: '+8%', positive: true },
    { label: 'Inquiries', value: '156', change: '+23%', positive: true },
    { label: 'Bookings', value: '42', change: '-5%', positive: false },
  ];

  const recentActivity = [
    { type: 'view', message: 'Someone viewed your Wedding Portfolio', time: '2 hours ago' },
    { type: 'inquiry', message: 'New inquiry from Sarah M.', time: '5 hours ago' },
    { type: 'booking', message: 'Booking confirmed for Dec 15', time: '1 day ago' },
    { type: 'review', message: 'New 5-star review received', time: '2 days ago' },
  ];

  return (
    <div className='analytics'>
      <div className='analytics-header'>
        <h1 className='headline'>Analytics</h1>
        <ProfileComponent />
      </div>
      
      <div className='analytics-content'>
        <div className='stats-grid'>
          {stats.map((stat, index) => (
            <Card key={index} className='stat-card'>
              <p className='stat-label'>{stat.label}</p>
              <h2 className='stat-value'>{stat.value}</h2>
              <span className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
                {stat.change} from last month
              </span>
            </Card>
          ))}
        </div>

        <div className='analytics-sections'>
          <Card className='chart-card'>
            <h3>Performance Overview</h3>
            <div className='chart-placeholder'>
              <p>📊 Chart visualization would go here</p>
              <p className='chart-note'>Connect to analytics service for real data</p>
            </div>
          </Card>

          <Card className='activity-card'>
            <h3>Recent Activity</h3>
            <div className='activity-list'>
              {recentActivity.map((activity, index) => (
                <div key={index} className='activity-item'>
                  <div className='activity-icon'>
                    {activity.type === 'view' && '👁️'}
                    {activity.type === 'inquiry' && '💬'}
                    {activity.type === 'booking' && '📅'}
                    {activity.type === 'review' && '⭐'}
                  </div>
                  <div className='activity-details'>
                    <p className='activity-message'>{activity.message}</p>
                    <span className='activity-time'>{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Analytics
