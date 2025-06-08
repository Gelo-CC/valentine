const flame = document.querySelector('.flame');
    const relightButton = document.getElementById('relight-button');
    const birthdayMessage = document.getElementById('birthday-message');
    const fireworks = document.querySelectorAll('.firework');
    const candle = document.querySelector('.candle');

    // Function to "blow out" the flame
    function blowOutCandle() {
      flame.style.animation = 'none';
      flame.style.opacity = '0';
      relightButton.style.display = "block";
      
      // Show birthday message with animation
      setTimeout(() => {
        birthdayMessage.classList.add('visible');
        createConfetti();
      }, 500);
    }

    // Function to relight the flame
    function relightCandle() {
      flame.style.animation = "flicker 1s ease-in-out alternate infinite";
      flame.style.opacity = '1';
      relightButton.style.display = "none";
      birthdayMessage.classList.remove('visible');
      
      // Hide all fireworks
      fireworks.forEach(fw => {
        fw.style.opacity = '0';
        fw.style.transform = 'translate(0, 0)';
      });
    }

    // Function to create fireworks
    function createFireworks() {
      fireworks.forEach(fw => {
        // Reset position and opacity
        fw.style.opacity = '1';
        fw.style.transform = 'translate(0, 0)';
        
        // Random direction and distance
        const angle = Math.random() * Math.PI * 2;
        const distance = 30 + Math.random() * 50;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        // Random color
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        fw.style.backgroundColor = color;
        
        // Animate
        setTimeout(() => {
          fw.style.transform = `translate(${x}px, ${y}px)`;
          fw.style.opacity = '0';
          fw.style.transition = 'all 0.5s ease-out';
        }, 10);
      });
    }

    // Function to create confetti
    function createConfetti() {
      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Random properties
        const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 10 + 5;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 3 + 2;
        
        confetti.style.backgroundColor = color;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.left = `${left}vw`;
        confetti.style.top = '-10px';
        confetti.style.position = 'fixed';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.zIndex = '1000';
        
        document.body.appendChild(confetti);
        
        // Animate
        setTimeout(() => {
          confetti.style.transform = `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`;
          confetti.style.opacity = '1';
          confetti.style.transition = `all ${animationDuration}s linear`;
        }, 10);
        
        // Remove after animation
        setTimeout(() => {
          confetti.remove();
        }, animationDuration * 1000);
      }
    }

    // Attach relight button click listener
    relightButton.addEventListener('click', relightCandle);

    // Set up candle click to blow out
    candle.addEventListener('click', () => {
      if (flame.style.opacity !== '0') {
        blowOutCandle();
        createFireworks();
      }
    });

    // Set up sound detection
    async function setupSoundDetection() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(stream);

        analyser.fftSize = 256;
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        source.connect(analyser);

        function detectBlow() {
          analyser.getByteFrequencyData(dataArray);
          const volume = dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length;

          if (volume > 20 && flame.style.opacity !== '0') {
            blowOutCandle();
            createFireworks();
          }

          requestAnimationFrame(detectBlow);
        }

        detectBlow();
      } catch (error) {
        console.error("Error accessing the microphone:", error);
        // Fallback to click if microphone access is denied
        candle.style.cursor = 'pointer';
      }
    }

    // Initialize sound detection
    setupSoundDetection();  
