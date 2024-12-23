Add a "scroll-to-section" feature for smooth scrolling when clicking on nav bar button
Include a sticky back-to-top button for better navigation.
Light/Dark Mode Toggle
Responsive desing - mobile device support

custom cursor
glow orb follows cursor, clikc = orb (pops expands and fades away) then new orb shows


Call to action - connecting on linkedin, contact me!

## Would require React
- Typing animation for the begining section (right side)
- With a waving guy animating into frame on left side
- contact form - input validation for form
---
## Content:
Professional summary
Highlight projects (archetechure diagrams and their tech stack)
Skills Section
 - Use visual icons or logos for each skill in the tech stack to make it more recognizable and appealing.
Slow moving horizontal scrolling certs section


### To do :
- publish on aws with s3 + cloudfront
- design github actions workflow to upload main branch
- post on linkedin letting people know about the techstack and the new website. ask for feedback and critisim 

# NOTES:
When screen size is below 880 width. it becomes tooo cramped
Make nav bar conver to sandwhich mode if smaller than 720
<div class="typing-container"> needs to be centered when screen is small
<div class="illustration-container"> needs to be smaller when screen is small
<div class="buttons-container"> needs to be centered when screen is small


---
## chat box icon
`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 64 64" fill="none">
              <g filter="url(#glass-filter)">
                <!-- Speech Bubble -->
                <path
                  d="M16 16H48C51.3137 16 54 18.6863 54 22V38C54 41.3137 51.3137 44 48 44H28L18 52V44H16C12.6863 44 10 41.3137 10 38V22C10 18.6863 12.6863 16 16 16Z"
                  fill="rgba(255, 255, 255, 0.3)"
                  stroke="rgba(255, 255, 255, 0.6)"
                  stroke-width="3"
                  stroke-linejoin="round"
                />
              </g>
              <!-- Glow Effect -->
              <defs>
                <filter id="glass-filter" x="0" y="0" width="64" height="64" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feBlend mode="normal" in2="blur" in="SourceGraphic" result="effect1" />
                </filter>
              </defs>
            </svg>`


## cloud container for person:
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400">
  <defs>
    <!-- Glassmorphism gradients -->
    <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:rgba(255,255,255,0.15)" />
      <stop offset="100%" style="stop-color:rgba(255,255,255,0.05)" />
    </linearGradient>
    
    <!-- Cloud shape filter -->
    <filter id="blur">
      <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
    </filter>
    
    <!-- Particle effects -->
    <radialGradient id="particleGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:rgba(255,255,255,0.2)" />
      <stop offset="100%" style="stop-color:rgba(255,255,255,0)" />
    </radialGradient>
  </defs>

  <!-- Main cloud group with animation -->
  <g class="cloud-container">
    <!-- Base glass layer -->
    <path d="M90,200 
             C90,150 130,100 200,100
             C250,100 280,120 300,150
             C320,120 350,100 400,100
             C470,100 510,150 510,200
             C510,250 470,300 400,300
             C350,300 300,280 250,250
             C200,280 150,300 100,300
             C30,300 -10,250 90,200 Z" 
          fill="url(#glassGradient)"
          stroke="rgba(255,255,255,0.2)"
          stroke-width="1"
          filter="url(#blur)"
          opacity="0.8">
      <animate attributeName="d" 
               dur="6s" 
               repeatCount="indefinite"
               values="
                 M90,200 C90,150 130,100 200,100 C250,100 280,120 300,150 C320,120 350,100 400,100 C470,100 510,150 510,200 C510,250 470,300 400,300 C350,300 300,280 250,250 C200,280 150,300 100,300 C30,300 -10,250 90,200 Z;
                 
                 M95,205 C95,155 135,105 205,105 C255,105 285,125 305,155 C325,125 355,105 405,105 C475,105 515,155 515,205 C515,255 475,305 405,305 C355,305 305,285 255,255 C205,285 155,305 105,305 C35,305 -5,255 95,205 Z;
                 
                 M90,200 C90,150 130,100 200,100 C250,100 280,120 300,150 C320,120 350,100 400,100 C470,100 510,150 510,200 C510,250 470,300 400,300 C350,300 300,280 250,250 C200,280 150,300 100,300 C30,300 -10,250 90,200 Z"
      />
    </path>

    <!-- Particle effects -->
    <circle cx="150" cy="150" r="10" fill="url(#particleGlow)">
      <animate attributeName="opacity" 
               values="0.6;0.2;0.6" 
               dur="4s" 
               repeatCount="indefinite" />
    </circle>
    <circle cx="350" cy="150" r="8" fill="url(#particleGlow)">
      <animate attributeName="opacity" 
               values="0.4;0.1;0.4" 
               dur="3s" 
               repeatCount="indefinite" />
    </circle>
    <circle cx="250" cy="200" r="12" fill="url(#particleGlow)">
      <animate attributeName="opacity" 
               values="0.5;0.2;0.5" 
               dur="5s" 
               repeatCount="indefinite" />
    </circle>
  </g>
</svg>`