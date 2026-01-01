import React from 'react'
import './Landing.css'
import { Button, Card } from '../components'
import { useAuth } from '../auth/Auth';
import { I1, I2, I3, I4, I5 } from '../assets/landscapes';
import { Element } from 'react-scroll';

const Landing = () => {
  const { auth } = useAuth();

  const features = [
    {
      icon: '🔍',
      title: 'Find Photographers',
      description: 'Browse through hundreds of talented photographers in your area, filtered by style, specialty, and budget.'
    },
    {
      icon: '📅',
      title: 'Easy Booking',
      description: 'Book sessions directly through the platform with secure payments and instant confirmation.'
    },
    {
      icon: '💼',
      title: 'Showcase Your Work',
      description: 'Photographers can create stunning portfolios to attract clients and grow their business.'
    },
    {
      icon: '⭐',
      title: 'Reviews & Ratings',
      description: 'Make informed decisions with authentic reviews and ratings from real clients.'
    }
  ];

  const photographers = [
    {
      image: I1,
      name: 'Alex Rivera',
      specialty: 'Wedding Photography',
      rating: '4.9',
      description: 'Capturing love stories with a cinematic touch for over 8 years.'
    },
    {
      image: I2,
      name: 'Maya Chen',
      specialty: 'Portrait & Fashion',
      rating: '4.8',
      description: 'Fashion-forward portraits that bring out your unique personality.'
    },
    {
      image: I3,
      name: 'James Wilson',
      specialty: 'Commercial & Product',
      rating: '5.0',
      description: 'Elevating brands through compelling visual storytelling.'
    }
  ];

  const galleryImages = [I1, I2, I3, I4, I5];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Client',
      text: 'Found the perfect wedding photographer through Lensify. The booking process was seamless!',
      avatar: '👩'
    },
    {
      name: 'Michael Chen',
      role: 'Photographer',
      text: 'Lensify helped me grow my client base by 200%. The platform is a game-changer for photographers!',
      avatar: '👨'
    },
    {
      name: 'Emma Williams',
      role: 'Client',
      text: 'The variety of photographers and transparent pricing made choosing so easy. Highly recommend!',
      avatar: '👩‍🦰'
    }
  ];

  return (
    <div className='landing-container'>
      {/* Hero Section */}
      <Element name='section1' className='hero-section'>
        <div className='title'>
          <h1 className='sub-head head'>Connect with the</h1>
          <h1 className='main-head head'>Perfect Photographer</h1>
          <p className='hero-description'>
            The ultimate platform connecting talented photographers with clients. Find, book, and collaborate seamlessly.
          </p>
          <div className='hero-buttons'>
            {auth ? (
              <Button className='white' url='/dashboard'>Dashboard</Button>
            ) : (
              <>
                <Button className='white' url='/register'>Find a Photographer</Button>
                <Button className='outline' url='/register'>Join as Photographer</Button>
              </>
            )}
          </div>
        </div>
      </Element>

      {/* Info/Features Section */}
      <Element name='section2' className='info-section'>
        <div className='section-header'>
          <h2 className='section-title'>How It Works</h2>
          <p className='section-subtitle'>Connecting photographers and clients has never been easier</p>
        </div>
        <div className='services-grid'>
          {features.map((feature, index) => (
            <Card key={index} className='service-card'>
              <span className='service-icon'>{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </Card>
          ))}
        </div>
      </Element>

      {/* Stats Section */}
      <section className='stats-section'>
        <div className='stats-container'>
          <div className='stat-item'>
            <h3>5,000+</h3>
            <p>Photographers</p>
          </div>
          <div className='stat-item'>
            <h3>50,000+</h3>
            <p>Bookings Made</p>
          </div>
          <div className='stat-item'>
            <h3>100,000+</h3>
            <p>Happy Clients</p>
          </div>
          <div className='stat-item'>
            <h3>120+</h3>
            <p>Cities Covered</p>
          </div>
        </div>
      </section>

      {/* Featured Photographers Section */}
      <Element name='section3' className='tours-section'>
        <div className='section-header'>
          <h2 className='section-title'>Featured Photographers</h2>
          <p className='section-subtitle'>Discover top-rated photographers ready to capture your moments</p>
        </div>
        <div className='tours-grid'>
          {photographers.map((photographer, index) => (
            <Card key={index} className='tour-card'>
              <div className='tour-image'>
                <img src={photographer.image} alt={photographer.name} />
                <span className='tour-duration'>⭐ {photographer.rating}</span>
              </div>
              <div className='tour-content'>
                <h3>{photographer.name}</h3>
                <p className='photographer-specialty'>{photographer.specialty}</p>
                <p>{photographer.description}</p>
                <div className='tour-footer'>
                  <Button className='small'>View Profile</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Element>

      {/* Gallery Section */}
      <Element name='section4' className='gallery-section'>
        <div className='section-header'>
          <h2 className='section-title'>Stunning Work</h2>
          <p className='section-subtitle'>Browse amazing photos from photographers on our platform</p>
        </div>
        <div className='gallery-grid'>
          {galleryImages.map((image, index) => (
            <div key={index} className={`gallery-item gallery-item-${index + 1}`}>
              <img src={image} alt={`Gallery ${index + 1}`} />
              <div className='gallery-overlay'>
                <span>View</span>
              </div>
            </div>
          ))}
        </div>
      </Element>

      {/* Testimonials Section */}
      <section className='testimonials-section'>
        <div className='section-header'>
          <h2 className='section-title'>What Our Community Says</h2>
          <p className='section-subtitle'>Hear from photographers and clients who love Lensify</p>
        </div>
        <div className='testimonials-grid'>
          {testimonials.map((testimonial, index) => (
            <Card key={index} className='testimonial-card'>
              <div className='testimonial-content'>
                <p>"{testimonial.text}"</p>
              </div>
              <div className='testimonial-author'>
                <span className='author-avatar'>{testimonial.avatar}</span>
                <div className='author-info'>
                  <h4>{testimonial.name}</h4>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* About Section */}
      <Element name='section5' className='about-section'>
        <div className='about-content'>
          <div className='about-text'>
            <h2>About Lensify</h2>
            <p>
              Lensify is the leading platform connecting talented photographers with clients 
              who need their services. Whether you're looking for a wedding photographer, 
              need professional headshots, or want to capture special moments, we've got you covered.
            </p>
            <p>
              For photographers, Lensify provides the tools to showcase your portfolio, 
              manage bookings, and grow your business. Join thousands of photographers 
              who have transformed their careers through our platform.
            </p>
            <div className='about-features'>
              <div className='feature'>
                <span>✓</span>
                <p>Verified photographers</p>
              </div>
              <div className='feature'>
                <span>✓</span>
                <p>Secure payments</p>
              </div>
              <div className='feature'>
                <span>✓</span>
                <p>Easy scheduling</p>
              </div>
              <div className='feature'>
                <span>✓</span>
                <p>24/7 support</p>
              </div>
            </div>
            <Button className='white' url='/register'>Join Lensify</Button>
          </div>
          <div className='about-image'>
            <img src={I4} alt='About Lensify' />
          </div>
        </div>
      </Element>

      {/* CTA Section */}
      <section className='cta-section'>
        <div className='cta-content'>
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of photographers and clients on Lensify today</p>
          <div className='cta-buttons'>
            <Button className='white' url='/register'>Find a Photographer</Button>
            <Button className='outline-light' url='/register'>Join as Photographer</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='footer'>
        <div className='footer-content'>
          <div className='footer-brand'>
            <h3>Lensify</h3>
            <p>Connecting photographers with clients worldwide</p>
            <div className='social-links'>
              <a href='#'>📷</a>
              <a href='#'>📘</a>
              <a href='#'>🐦</a>
              <a href='#'>📌</a>
            </div>
          </div>
          <div className='footer-links'>
            <div className='footer-column'>
              <h4>For Clients</h4>
              <a href='#'>Find Photographers</a>
              <a href='#'>How It Works</a>
              <a href='#'>Pricing</a>
              <a href='#'>FAQs</a>
            </div>
            <div className='footer-column'>
              <h4>For Photographers</h4>
              <a href='#'>Join as Photographer</a>
              <a href='#'>Resources</a>
              <a href='#'>Success Stories</a>
              <a href='#'>Community</a>
            </div>
            <div className='footer-column'>
              <h4>Company</h4>
              <a href='#'>About Us</a>
              <a href='#'>Careers</a>
              <a href='#'>Blog</a>
              <a href='#'>Contact</a>
            </div>
          </div>
        </div>
        <div className='footer-bottom'>
          <p>© 2026 Lensify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Landing
