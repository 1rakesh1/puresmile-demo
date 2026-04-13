document.getElementById('header-placeholder').innerHTML = `
<nav class="fixed top-0 w-full z-50 bg-[#fcf9f0]/80 backdrop-blur-md shadow-sm">
  <div class="max-w-7xl mx-auto px-6 md:px-8">
    <div class="flex justify-between items-center py-4">

      <!-- Logo -->
      <a href="index.html" class="flex items-center text-xl font-headline italic text-[#00234B] hover:opacity-80 transition-all duration-200 active:scale-95 select-none">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="inline-block mr-2 flex-shrink-0" aria-hidden="true">
          <rect width="32" height="32" rx="8" fill="#00234B"/>
          <text x="9" y="23" font-family="Georgia, serif" font-size="20" font-style="italic" font-weight="700" fill="#ffffff">P</text>
        </svg>PureSmile
      </a>

      <!-- Desktop Nav -->
      <div class="hidden md:flex items-center space-x-10">
        <a href="index.html" data-nav="index" class="nav-link font-headline font-semibold tracking-tight text-[#1c1c17] hover:text-[#8c4f10] transition-colors">Home</a>
        <a href="services.html" data-nav="services" class="nav-link font-headline font-semibold tracking-tight text-[#1c1c17] hover:text-[#8c4f10] transition-colors">Services</a>
        <a href="contact.html" data-nav="contact" class="nav-link font-headline font-semibold tracking-tight text-[#1c1c17] hover:text-[#8c4f10] transition-colors">Contact</a>
      </div>

      <div class="flex items-center gap-4">
        <a href="contact.html" class="hidden md:inline-block bg-[#000e24] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-[#00234b] transition-all duration-200 active:scale-95 select-none">
          Book Consultation
        </a>
        <button id="hamburger" class="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 focus:outline-none" aria-label="Toggle menu">
        <span class="hamburger-line block h-[2px] w-6 bg-[#000e24] transform-gpu transition-all duration-300"></span>
          <span class="hamburger-line block h-[2px] w-6 bg-[#000e24] transform-gpu transition-all duration-300"></span>
          <span class="hamburger-line block h-[2px] w-6 bg-[#000e24] transform-gpu transition-all duration-300"></span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div id="mobile-menu">
      <div class="py-8 flex flex-col gap-10 ">
        <a href="index.html" data-nav="index" class="mobile-nav-link  font-headline font-semibold text-[#1c1c17] hover:text-[#8c4f10] transition-colors">Home</a>
        <a href="services.html" data-nav="services" class="mobile-nav-link font-headline font-semibold text-[#1c1c17] hover:text-[#8c4f10] transition-colors">Services</a>
        <a href="contact.html" data-nav="contact" class="mobile-nav-link font-headline font-semibold text-[#1c1c17] hover:text-[#8c4f10] transition-colors">Contact</a>
        <a href="contact.html" class="inline-block bg-[#000e24] text-white px-6 py-2.5 rounded-xl font-medium text-center hover:bg-[#00234b] transition-all duration-200 active:scale-95 select-none">
          Book Consultation
        </a>
      </div>
    </div>
  </div>
</nav>
`;
