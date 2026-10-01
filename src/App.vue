<script setup>
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const page = computed(() => route.path)
const lightMode = ref(localStorage.getItem('portfolio-theme') === 'light')
function toggleTheme() {
  lightMode.value = !lightMode.value
  localStorage.setItem('portfolio-theme', lightMode.value ? 'light' : 'dark')
}
const sent = ref(false)
const sending = ref(false)
const submitError = ref('')
const form = reactive({ name: '', email: '', subject: '', message: '' })
async function submitContact(event) {
  sending.value = true
  submitError.value = ''

  try {
    const response = await fetch(event.currentTarget.action, {
      method: 'POST',
      body: new FormData(event.currentTarget),
      headers: { Accept: 'application/json' },
    })

    if (!response.ok) throw new Error('Formspree did not accept the message.')
    sent.value = true
  } catch {
    submitError.value = 'Your message could not be sent. Please try again or email me directly.'
  } finally {
    sending.value = false
  }
}
const projects = [
  ['EventEase','https://i.ibb.co/XRyjsJC/Screenshot-2026-09-30-095657.png', 'Event planning and booking platform for students and young professionals. A website that provides a platform to plan, book, and join events.','https://totoseahlumile-dot.github.io/EventEase/', true],
  ['ModernTech Solutions — Frontend','https://i.ibb.co/9kbwbGNr/Screenshot-2026-09-29-124847.png','Frontend for an HR platform that helps manage employee information and HR workflows.','https://ihtishaamj63-web.github.io/Project-1-ModernTech-Solutions/'],
  ['ModernTech Solutions — Backend','https://i.ibb.co/Kvxz7m1/Screenshot-2026-09-30-094449.png','Built the payroll functionality for ModernTech HR, supporting employee pay processing.','https://hr-project-2-moderntech-solutions-1.onrender.com'],
  ['LocalCart','https://i.ibb.co/TM8WM6Lj/Screenshot-2026-09-23-114516.png','Built the main dashboard, About page, and vendor dashboard, plus the routes and APIs used across all pages.','https://module-3-core-project-e-commerce.onrender.com'],
  ['Portfolio Website','https://i.ibb.co/PvhdvsPw/Screenshot-2026-06-08-111843.png','A personal portfolio website built with HTML and CSS to showcase my skills, projects, and contact information.','/'],
  ['TechHub','https://i.ibb.co/HTTvnqC4/Screenshot-2026-06-05-114144.png','A platform for tech enthusiasts to get hardware knowledge and shop for the latest tech gadgets.','https://migcobomacilikishe.github.io/TachHubexrecise3/'],
  ['Gallery Website','https://i.ibb.co/4RPGbLc9/Screenshot-2026-06-05-114055.png','A responsive gallery website showcasing architecture and imagery in different formats.','https://migcobomacilikishe.github.io/gallery-website/'],
  ['The Cricket Store','https://i.ibb.co/C5NgjPTb/Screenshot-2026-06-08-112805.png','A Bootstrap e-commerce concept with product listings and a checkout experience.','https://migcobomacilikishe.github.io/BootstrapExe4/']
]
const skills = [['HTML & CSS','6 months','VS Code, Figma, Bootstrap'],['JavaScript','6 months','VS Code, Node.js'],['Node.js','6 months','VS Code'],['SQL','6 months','VS Code, MySQL, XAMPP'],['PHP','6 months','VS Code, MySQL'],['Python','6 months','VS Code']]
const interests = [['fa-trophy','Cricket','Passionate about the sport, I follow local and international matches closely.'],['fa-code','Coding','Love building things for the web and learning new technologies every day.'],['fa-tv','True Crime Documentaries','Enjoy watching true crime documentaries to learn about different cases and solve mysteries.'],['fa-music','Music','Big fan of local and international artists across a wide range of genres.'],['fa-film','Anime and Manga','Enjoy watching anime and reading manga, especially action and fantasy genres.']]
</script>

<template>
  <div class="site-shell" :class="{ 'light-mode': lightMode }">
    <nav class="navbar" aria-label="Primary navigation"><RouterLink class="logo full" to="/">Migcobo Macilikishe</RouterLink><RouterLink class="logo short" to="/">MM</RouterLink><div class="nav-links"><RouterLink to="/">Home</RouterLink><RouterLink to="/about">About</RouterLink><RouterLink to="/projects">Projects</RouterLink><RouterLink to="/skills">Skills</RouterLink><RouterLink to="/interests">Interests</RouterLink><RouterLink to="/contact">Contact</RouterLink></div><button class="theme-toggle" type="button" @click="toggleTheme" :aria-label="lightMode ? 'Switch to dark mode' : 'Switch to light mode'" :title="lightMode ? 'Switch to dark mode' : 'Switch to light mode'"><i :class="lightMode ? 'fa-solid fa-moon' : 'fa-solid fa-sun'" /></button></nav>
    <main>
      <section v-if="page === '/'" class="hero enter"><p class="eyebrow">Frontend developer in training</p><h1>I'm Migcobo Macilikishe</h1><p>Welcome to my personal portfolio website!</p><RouterLink class="button" to="/projects">View My Work <i class="fa-solid fa-arrow-right" /></RouterLink></section>
      <template v-else-if="page === '/about'"><header class="heading"><p class="eyebrow">Get to know me</p><h1>About Me</h1></header><section class="about enter"><img src="https://i.ibb.co/TMsK1bnB/IMG-2230.jpg" alt="Migcobo Macilikishe" /><div><h2>Migcobo Macilikishe</h2><p class="accent">I'm a student trainee based in Cape Town, currently training with Youth Code Cohort 18 at Life Choices Academy.</p><p>I have a passion for web development and enjoy building websites and apps, and understanding how the things we use daily work. I work with HTML, CSS and JavaScript.</p><p>I got into coding because I've always been curious about how websites work and I want to solve real problems with technology. My goal is to grow into a frontend developer, build my own projects, and contribute to real-world applications.</p></div></section></template>
      <template v-else-if="page === '/projects'"><header class="heading"><p class="eyebrow">Selected work</p><h1>My Projects</h1><p>Here are some of the projects I've worked on thus far.</p></header><section class="grid enter"><article v-for="project in projects" :key="project[0]" class="card"><img :src="project[1]" :alt="`${project[0]} project preview`" loading="lazy" /><div><h2>{{ project[0] }}</h2><p>{{ project[2] }}</p><a v-if="project[3].startsWith('http')" class="project-link" :href="project[3]" target="_blank" rel="noreferrer">View Project <i class="fa-solid fa-arrow-up-right-from-square" /></a><RouterLink v-else-if="project[3]" class="project-link" :to="project[3]">View Project <i class="fa-solid fa-arrow-right" /></RouterLink></div></article></section></template>
      <template v-else-if="page === '/skills'"><header class="heading"><p class="eyebrow">My toolkit</p><h1>My Skills</h1><p>I've been building experience with these tools for about six months.</p></header><section class="table-wrap enter"><table><thead><tr><th>Language</th><th>Experience</th><th>Tools used</th><th>Current level</th></tr></thead><tbody><tr v-for="skill in skills" :key="skill[0]"><td>{{ skill[0] }}</td><td>{{ skill[1] }}</td><td>{{ skill[2] }}</td><td><div class="bar"><span role="progressbar" aria-label="Developing skill level" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" /><b>Developing</b></div></td></tr></tbody></table></section></template>
      <template v-else-if="page === '/contact'"><header class="heading"><p class="eyebrow">Let's connect</p><h1>Contact Me</h1></header><form v-if="!sent" class="contact enter" action="https://formspree.io/f/mbdelbnr" method="POST" @submit.prevent="submitContact"><div class="form-row"><label>Full name<input v-model="form.name" name="name" placeholder="Enter your full name" required /></label><label>Email address<input v-model="form.email" name="email" type="email" placeholder="your.email@example.com" required /></label></div><label>Subject<input v-model="form.subject" name="subject" placeholder="What's this about?" required /></label><label>Message<textarea v-model="form.message" name="message" placeholder="Write your message here..." required></textarea></label><input type="hidden" name="_subject" value="New message from your portfolio!" /><p v-if="submitError" class="form-error" role="alert">{{ submitError }}</p><button :disabled="sending">{{ sending ? 'Sending…' : 'Send message' }}</button></form><section v-else class="confirmation enter"><i class="fa-solid fa-circle-check" /><h2>Thank you for reaching out!</h2><p>Your message was sent successfully.</p><button @click="sent = false">Send another message</button></section></template>
      <template v-else-if="page === '/interests'"><header class="heading"><p class="eyebrow">Beyond the code</p><h1>My Interests</h1></header><section class="grid interests enter"><article v-for="interest in interests" :key="interest[1]" class="interest"><i :class="['fa-solid', interest[0]]" /><h2>{{ interest[1] }}</h2><p>{{ interest[2] }}</p></article></section></template>
    </main>
    <footer><p>Â© 2026 Migcobo Macilikishe. All rights reserved.</p><div><a href="https://github.com/MigcoboMacilikishe" target="_blank" rel="noreferrer" aria-label="GitHub"><i class="fa-brands fa-github" /></a><a href="https://www.linkedin.com/in/migcobo-macilikishe-1354111b5/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><i class="fa-brands fa-linkedin" /></a><a href="mailto:migcob73@gmail.com" aria-label="Email"><i class="fa-solid fa-envelope" /></a></div></footer>
  </div>
</template>
