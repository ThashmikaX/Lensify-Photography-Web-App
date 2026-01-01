import React, { useState } from 'react'
import { ProfileComponent, Card, Button } from '../../components'
import './Setting.css'

const Setting = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    bookings: true,
    marketing: false,
    updates: true
  });

  return (
    <div className='settings-page'>
      <div className='settings-header'>
        <h1 className='headline'>Settings</h1>
        <ProfileComponent />
      </div>

      <div className='settings-content'>
        <Card className='settings-card'>
          <h3>Account Settings</h3>
          <div className='settings-group'>
            <div className='setting-item'>
              <div className='setting-info'>
                <h4>Email Address</h4>
                <p>Update your email address</p>
              </div>
              <Button className='settings-btn'>Change</Button>
            </div>
            <div className='setting-item'>
              <div className='setting-info'>
                <h4>Password</h4>
                <p>Change your password</p>
              </div>
              <Button className='settings-btn'>Update</Button>
            </div>
            <div className='setting-item'>
              <div className='setting-info'>
                <h4>Two-Factor Authentication</h4>
                <p>Add an extra layer of security</p>
              </div>
              <Button className='settings-btn'>Enable</Button>
            </div>
          </div>
        </Card>

        <Card className='settings-card'>
          <h3>Notifications</h3>
          <div className='settings-group'>
            <div className='setting-item'>
              <div className='setting-info'>
                <h4>Email Notifications</h4>
                <p>Receive email about your account activity</p>
              </div>
              <label className='toggle'>
                <input 
                  type='checkbox' 
                  checked={notifications.email}
                  onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                />
                <span className='toggle-slider'></span>
              </label>
            </div>
            <div className='setting-item'>
              <div className='setting-info'>
                <h4>Booking Alerts</h4>
                <p>Get notified when you receive a new booking</p>
              </div>
              <label className='toggle'>
                <input 
                  type='checkbox' 
                  checked={notifications.bookings}
                  onChange={(e) => setNotifications({...notifications, bookings: e.target.checked})}
                />
                <span className='toggle-slider'></span>
              </label>
            </div>
            <div className='setting-item'>
              <div className='setting-info'>
                <h4>Marketing Emails</h4>
                <p>Receive tips, trends, and promotions</p>
              </div>
              <label className='toggle'>
                <input 
                  type='checkbox' 
                  checked={notifications.marketing}
                  onChange={(e) => setNotifications({...notifications, marketing: e.target.checked})}
                />
                <span className='toggle-slider'></span>
              </label>
            </div>
          </div>
        </Card>

        <Card className='settings-card'>
          <h3>Privacy</h3>
          <div className='settings-group'>
            <div className='setting-item'>
              <div className='setting-info'>
                <h4>Profile Visibility</h4>
                <p>Control who can see your profile</p>
              </div>
              <select className='settings-select'>
                <option value='public'>Public</option>
                <option value='private'>Private</option>
                <option value='connections'>Connections Only</option>
              </select>
            </div>
            <div className='setting-item'>
              <div className='setting-info'>
                <h4>Show Location</h4>
                <p>Display your location on your profile</p>
              </div>
              <label className='toggle'>
                <input type='checkbox' defaultChecked />
                <span className='toggle-slider'></span>
              </label>
            </div>
          </div>
        </Card>

        <Card className='settings-card danger-zone'>
          <h3>Danger Zone</h3>
          <div className='settings-group'>
            <div className='setting-item'>
              <div className='setting-info'>
                <h4>Delete Account</h4>
                <p>Permanently delete your account and all data</p>
              </div>
              <Button className='danger-btn'>Delete Account</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Setting
