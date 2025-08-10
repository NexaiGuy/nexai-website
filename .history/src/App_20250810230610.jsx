{/* Add CTA button after services */}
          <div className="text-center mt-12">
            <button 
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:from-green-600 hover:to-blue-700 transition-all shadow-lg"
            >
              Get Your Free Custom Proposal
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-gray-400 mt-4">No commitment required • Response within 24 hours</p>
          </div>        
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Leading the AI Revolution
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                At Nex AI, we're not just building AI solutions – we're crafting the future of business intelligence and automation. Our team of AI experts, designers, and engineers work together to create transformative experiences that drive real results.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                  <div className="text-3xl font-bold text-blue-400 mb-2">5+</div>
                  <div className="text-gray-300">Years Experience</div>
                </div>
                <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                  <div className="text-3xl font-bold text-purple-400 mb-2">50+</div>
                  <div className="text-gray-300">AI Models</div>
                </div>
              </div>

              <button 
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                Schedule a Consultation
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <Star className="w-6 h-6 text-yellow-400" />
                  Our Mission
                </h3>
                <p className="text-gray-300">
                  To democratize AI technology and make it accessible to businesses of all sizes, enabling them to compete in the digital age through intelligent automation and data-driven insights.
                </p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <Users className="w-6 h-6 text-blue-400" />
                  Our Values
                </h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• Innovation-driven development</li>
                  <li>• Transparent communication</li>
                  <li>• Results-focused approach</li>
                  <li>• Continuous learning and adaptation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Our Portfolio
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Explore our latest AI projects and see how we've helped businesses transform their operations.
            </p>

            {/* Filter buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {['all', 'development', 'music', 'video', 'website', 'automation'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={activeFilter === filter
                    ? 'px-6 py-3 rounded-lg font-medium transition-all bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'px-6 py-3 rounded-lg font-medium transition-all bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPortfolio.map((item) => (
              <div 
                key={item.id}
                className="bg-gray-900/50 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group hover:transform hover:scale-105"
              >
                <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                  <div className="text-4xl text-blue-400">
                    {getCategoryIcon(item.category)}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-300 mb-4">{item.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Ready to Get Started?
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Let's discuss how AI can transform your business. Schedule a free consultation with our experts.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-blue-400 mt-1" />
                    <div>
                      <h4 className="text-white font-semibold">Email</h4>
                      <p className="text-gray-300">hello@nexai.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-blue-400 mt-1" />
                    <div>
                      <h4 className="text-white font-semibold">Phone</h4>
                      <p className="text-gray-300">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-blue-400 mt-1" />
                    <div>
                      <h4 className="text-white font-semibold">Location</h4>
                      <p className="text-gray-300">San Francisco, CA</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-white font-semibold mb-4">Follow Us</h4>
                  <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                      <Facebook className="w-5 h-5 text-white" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors">
                      <Twitter className="w-5 h-5 text-white" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
                      <Linkedin className="w-5 h-5 text-white" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors">
                      <Instagram className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Consultation Booking */}
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6">Schedule Your Consultation</h3>
              <p className="text-gray-300 mb-8">
                Book a free 30-minute consultation to discuss your AI project needs and get a custom proposal.
              </p>

              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 mb-6">
                <h4 className="text-xl font-semibold text-white mb-4">What you'll get:</h4>
                <ul className="space-y-3 text-white">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    AI strategy assessment
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Custom solution recommendations
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Project timeline and pricing
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    No-obligation proposal
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <a
                  href="https://calendly.com/nex-ai/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all flex items-center justify-center gap-2 text-lg"
                >
                  <Calendar className="w-5 h-5" />
                  Book Free Consultation Now
                </a>
                
                <button 
                  onClick={() => setShowForm(true)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
                >
                  Get Custom Proposal Form
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <p className="text-center text-gray-400 text-sm mt-4">
                Usually responds within 1 hour
              </p>
            </div>  const services = [
    {
      id: 'music',
      title: 'AI Music Production',
      icon: 'music',
      description: 'Professional AI-generated music, compositions, and sound design tailored to your brand and vision.',
      features: ['Automated composition', 'Multi-genre expertise', 'Professional mastering', 'Custom soundtracks', 'Royalty-free licensing'],
      price: 'Starting at $500',
      timeline: '2-5 days'
    },
    {
      id: 'video',
      title: 'AI Video Creation',
      icon: 'video',
      description: 'Intelligent video editing, effects, and content generation that transforms your ideas into compelling visual stories.',
      features: ['Automated editing', 'Smart effects', 'Content generation', 'Multi-platform optimization', 'Brand consistency'],
      price: 'Starting at $1,000',
      timeline: '3-7 days'
    },
    {
      id: 'development',
      title: 'AI Application Development',
      icon: 'code',
      description: 'Custom AI-powered software solutions that solve complex business problems and automate processes.',
      features: ['Custom AI models', 'API integration', 'Scalable architecture', 'Cloud deployment', 'Ongoing support'],
      price: 'Starting at $5,000',
      timeline: '2-8 weeks'
    },
    {
      id: 'website',
      title: 'AI Website Development',
      icon: 'globe',
      description: 'Smart websites with AI-powered features that adapt to users and drive conversions.',
      features: ['AI chatbots', 'Personalization', 'Smart analytics', 'SEO optimization', 'Responsive design'],
      price: 'Starting at $3,000',
      timeline: '1-4 weeks'
    },
    {
      id: 'automation',
      title: 'AI Process Automation',
      icon: 'zap',
      description: 'Streamline your workflows with intelligent automation that learns and adapts to your business needs.',
      features: ['Workflow optimization', 'Document processing', 'Data automation', 'Integration setup', 'Performance monitoring'],
      price: 'Starting at $2,000',
      timeline: '1-3 weeks'
    }
  ];z