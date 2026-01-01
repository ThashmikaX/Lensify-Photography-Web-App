import React from 'react'
import './Landing.css'
import { Button, Card } from '../components'
import { useAuth } from '../auth/Auth';
import { I1, I2, I3, I4, I5 } from '../assets/landscapes';
import { Element } from 'react-scroll';

const Landing = () => {
  const { auth } = useAuth();

  const services = [
    {
      icon: '📸',
      title: 'Portrait Photography',
      description: 'Capture your personality with stunning portrait sessions in studio or on location.'
    },
    {
      icon: '💍',
      title: 'Wedding Photography',
      description: 'Preserve your special day with timeless wedding photography and videography.'
    },
    {
      icon: '🏢',
      title: 'Commercial Photography',
      description: 'Professional product and brand photography to elevate your business.'
    },
    {
      icon: '🌄',
      title: 'Landscape Photography',
      description: 'Breathtaking landscape shots that bring nature\'s beauty into your space.'
    }
  ];

  const tours = [
    {
      image: I1,
      title: 'Iceland Aurora Tour',
      duration: '7 Days',
      price: '$2,499',
      description: 'Capture the magical Northern Lights and stunning Icelandic landscapes.'
    },
    {
      image: I2,
      title: 'African Safari',
      duration: '10 Days',
      price: '$3,999',
      description: 'Wildlife photography adventure through Kenya and Tanzania.'
    },
    {
      image: I3,
      title: 'Japanese Seasons',
      duration: '12 Days',
      price: '$3,299',
      description: 'From cherry blossoms to autumn leaves, capture Japan\'s beauty.'
    }
  ];

  const galleryImages = [I1, I2, I3, I4, I5];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Bride',
      text: 'Lensify captured our wedding beautifully. Every moment was preserved perfectly!',
      avatar: '👩'
    },
    {
      name: 'Michael Chen',
      role: 'Business Owner',
      text: 'The commercial shots for our product line exceeded all expectations.',
      avatar: '👨'
    },
    {
      name: 'Emma Williams',
      role: 'Travel Blogger',
      text: 'The Iceland tour was life-changing. The guidance and locations were incredible!',
      avatar: '👩‍🦰'
    }
  ];

  return (
    <div className='landing-container'>
      {/* Hero Section */}
      <Element name='section1' className='hero-section'>
        <div className='title'>
          <h1 className='sub-head head'>Perfect Lens for Your</h1>
          <h1 className='main-head head'>Perfect Moment</h1>
          <p className='hero-description'>
            Professional photography services that capture life's precious moments with artistic excellence
          </p>
          <div className='hero-buttons'>
            {auth ? (
              <Button className='white' url='/dashboard'>Dashboard</Button>
            ) : (
              <>
                <Button className='white' url='/login'>Get Started</Button>
                <Button className='outline' url='#section2'>Learn More</Button>
              </>
            )}
          </div>
        </div>
      </Element>

      {/* Info/Services Section */}
      <Element name='section2' className='info-section'>
        <div className='section-header'>
          <h2 className='section-title'>Our Services</h2>
          <p className='section-subtitle'>Professional photography services tailored to your needs</p>
        </div>
        <div className='services-grid'>
          {services.map((service, index) => (
            <Card key={index} className='service-card'>
              <span className='service-icon'>{service.icon}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </Card>
          ))}
        </div>
      </Element>

      {/* Stats Section */}
      <section className='stats-section'>
        <div className='stats-container'>
          <div className='stat-item'>
            <h3>500+</h3>
            <p>Projects Completed</p>
          </div>
          <div className='stat-item'>
            <h3>50+</h3>
            <p>Countries Visited</p>
          </div>
          <div className='stat-item'>
            <h3>1000+</h3>
            <p>Happy Clients</p>
          </div>
          <div className='stat-item'>
            <h3>15+</h3>
            <p>Years Experience</p>
          </div>
        </div>
      </section>

      {/* Tours Section */}
      <Element name='section3' className='tours-section'>
        <div className='section-header'>
          <h2 className='section-title'>Photography Tours</h2>
          <p className='section-subtitle'>Join our exclusive photography expeditions around the world</p>
        </div>
        <div className='tours-grid'>
          {tours.map((tour, index) => (
            <Card key={index} className='tour-card'>
              <div className='tour-image'>
                <img src={tour.image} alt={tour.title} />
                <span className='tour-duration'>{tour.duration}</span>
              </div>
              <div className='tour-content'>
                <h3>{tour.title}</h3>
                <p>{tour.description}</p>
                <div className='tour-footer'>
                  <span className='tour-price'>{tour.price}</span>
                  <Button className='small'>Book Now</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Element>

      {/* Gallery Section */}
      <Element name='section4' className='gallery-section'>
        <div className='section-header'>
          <h2 className='section-title'>Our Gallery</h2>
          <p className='section-subtitle'>A showcase of our finest work</p>
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
          <h2 className='section-title'>What Our Clients Say</h2>
          <p className='section-subtitle'>Hear from those who trusted us with their precious moments</p>
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
              Founded in 2010, Lensify has been at the forefront of professional photography, 
              combining artistic vision with technical excellence. Our team of passionate 
              photographers brings diverse expertise in various photography genres.
            </p>
            <p>
              We believe every moment deserves to be captured beautifully. Whether it's a 
              wedding, corporate event, or an adventure tour, we're committed to delivering 
              images that tell your unique story.
            </p>
            <div className='about-features'>
              <div className='feature'>
                <span>✓</span>
                <p>Award-winning photographers</p>
              </div>
              <div className='feature'>
                <span>✓</span>
                <p>State-of-the-art equipment</p>
              </div>
              <div className='feature'>
                <span>✓</span>
                <p>Quick turnaround time</p>
              </div>
              <div className='feature'>
                <span>✓</span>
                <p>100% satisfaction guaranteed</p>
              </div>
            </div>
            <Button className='white'>Contact Us</Button>
          </div>
          <div className='about-image'>
            <img src={I4} alt='About Lensify' />
          </div>
        </div>
      </Element>

      {/* CTA Section */}
      <section className='cta-section'>
        <div className='cta-content'>
          <h2>Ready to Capture Your Story?</h2>
          <p>Let's create beautiful memories together</p>
          <div className='cta-buttons'>
            <Button className='white' url='/register'>Get Started</Button>
            <Button className='outline-light'>View Portfolio</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='footer'>
        <div className='footer-content'>
          <div className='footer-brand'>
            <h3>Lensify</h3>
            <p>Capturing moments that last forever</p>
            <div className='social-links'>
              <a href='#'>📷</a>
              <a href='#'>📘</a>
              <a href='#'>🐦</a>
              <a href='#'>📌</a>
            </div>
          </div>
          <div className='footer-links'>
            <div className='footer-column'>
              <h4>Services</h4>
              <a href='#'>Portrait</a>
              <a href='#'>Wedding</a>
              <a href='#'>Commercial</a>
              <a href='#'>Events</a>
            </div>
            <div className='footer-column'>
              <h4>Company</h4>
              <a href='#'>About Us</a>
              <a href='#'>Our Team</a>
              <a href='#'>Careers</a>
              <a href='#'>Blog</a>
            </div>
            <div className='footer-column'>
              <h4>Contact</h4>
              <a href='#'>info@lensify.com</a>
              <a href='#'>+1 (555) 123-4567</a>
              <a href='#'>New York, NY</a>
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
