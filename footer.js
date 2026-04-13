document.getElementById('footer-placeholder').innerHTML = `
<footer class="bg-[#f6f3ea] w-full pt-16 pb-8 px-6 md:px-8 mt-8">
  <div class="max-w-7xl mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-[#c4c6d0]/30">

      <!-- Brand -->
      <div>
        <a href="index.html" class="font-headline text-2xl text-[#00234B] mb-4 flex items-center w-fit hover:opacity-80 transition-all duration-200 active:scale-95 select-none">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="inline-block mr-2 flex-shrink-0 align-middle" aria-hidden="true">
            <rect width="32" height="32" rx="8" fill="#00234B"/>
            <text x="9" y="23" font-family="Georgia, serif" font-size="20" font-style="italic" font-weight="700" fill="#ffffff">P</text>
          </svg>PureSmile
        </a>
        <p class="text-[#1c1c17]/60 leading-relaxed mb-6 text-sm">
          Delivering trusted dental care with precision and compassion in the heart of Chandigarh since 1994.
        </p>
        <div class="flex gap-4 items-center">
          <a href="tel:+911722700000" aria-label="Call us" class="w-9 h-9 rounded-full border border-[#8c4f10]/40 flex items-center justify-center text-[#8c4f10] hover:bg-[#8c4f10] hover:text-white transition-all duration-200 active:scale-95 select-none">
            <span class="material-symbols-outlined" style="font-size:18px;">call</span>
          </a>
          <a href="https://maps.google.com" target="_blank" rel="noopener" aria-label="Google Maps Reviews" class="w-9 h-9 rounded-full border border-[#8c4f10]/40 flex items-center justify-center hover:bg-[#8c4f10] transition-all duration-200 active:scale-95 select-none group">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" class="fill-[#8c4f10] group-hover:fill-white transition-colors"/>
            </svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram" class="w-9 h-9 rounded-full border border-[#8c4f10]/40 flex items-center justify-center hover:bg-[#8c4f10] transition-all duration-200 active:scale-95 select-none group">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="20" height="20" rx="5" class="stroke-[#8c4f10] group-hover:stroke-white transition-colors" stroke-width="2" fill="none"/>
              <circle cx="12" cy="12" r="4" class="stroke-[#8c4f10] group-hover:stroke-white transition-colors" stroke-width="2" fill="none"/>
              <circle cx="17.5" cy="6.5" r="1" class="fill-[#8c4f10] group-hover:fill-white transition-colors"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Links -->
      <div class="grid grid-cols-2 gap-8">
        <div>
          <h4 class="font-bold text-[#000e24] mb-5 uppercase tracking-wider text-xs">Navigation</h4>
          <ul class="space-y-3">
            <li><a href="index.html" class="text-sm text-[#1c1c17]/60 hover:text-[#8c4f10] transition-colors">Home</a></li>
            <li><a href="services.html" class="text-sm text-[#1c1c17]/60 hover:text-[#8c4f10] transition-colors">Services</a></li>
            <li><a href="contact.html" class="text-sm text-[#1c1c17]/60 hover:text-[#8c4f10] transition-colors">Book Online</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-[#000e24] mb-5 uppercase tracking-wider text-xs">Services</h4>
          <ul class="space-y-3">
            <li><a href="services.html" class="text-sm text-[#1c1c17]/60 hover:text-[#8c4f10] transition-colors">Implants</a></li>
            <li><a href="services.html" class="text-sm text-[#1c1c17]/60 hover:text-[#8c4f10] transition-colors">Invisalign</a></li>
            <li><a href="services.html" class="text-sm text-[#1c1c17]/60 hover:text-[#8c4f10] transition-colors">Whitening</a></li>
            <li><a href="services.html" class="text-sm text-[#1c1c17]/60 hover:text-[#8c4f10] transition-colors">Emergencies</a></li>
          </ul>
        </div>
      </div>

      <!-- Address -->
      <div>
        <h4 class="font-bold text-[#000e24] mb-5 uppercase tracking-wider text-xs">Visit Us</h4>
        <p class="text-[#1c1c17]/60 text-sm mb-1">SCO 145-146, Sector 17-C</p>
        <p class="text-[#1c1c17]/60 text-sm mb-5">Chandigarh, Punjab 160017</p>
        <p class="text-[#000e24] font-semibold text-sm">Mon - Fri: 08:30 - 18:00</p>
        <p class="text-[#000e24] font-semibold text-sm">Sat: By Appointment Only</p>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="flex flex-col md:flex-row justify-between items-center pt-6 gap-4 text-center md:text-left">
      <p class="text-xs text-[#1c1c17]/50 text-center">© © ${new Date().getFullYear()} PureSmile Dental Clinic. All rights reserved.</p>
      <div class="flex gap-6">
        <a href="#" class="text-xs text-[#1c1c17]/50 hover:text-[#8c4f10] transition-colors">Privacy Policy</a>
        <a href="#" class="text-xs text-[#1c1c17]/50 hover:text-[#8c4f10] transition-colors">Terms of Service</a>
        <a href="#" class="text-xs text-[#1c1c17]/50 hover:text-[#8c4f10] transition-colors">Cookie Policy</a>
      </div>
    </div>

    <!-- Designer credit -->
    <div class="flex justify-center pt-5">
      <a href="https://katwaldigital.com" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 text-[#1c1c17]/40 hover:bg-[#8c4f10] hover:text-white text-xs px-3 py-1 rounded-full transition-all duration-200 border border-[#c4c6d0]/50 hover:border-[#8c4f10]">
        ✦ Website by Katwal Digital
      </a>
    </div>

  </div>
</footer>
`;
