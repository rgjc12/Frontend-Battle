gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});





// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function loader() {
  let count = 0;
  const loaderText = document.querySelector("#loadertext h1");
  const loaderBar1 = document.getElementById("loaderbar1");
  const loaderBar2 = document.getElementById("loaderbar2");
  const loaderBar = document.getElementById("loaderbar");

  let interval = setInterval(() => {
    if (count <= 67) {
      loaderText.textContent = count.toString().padStart(3, "0");
      loaderBar1.style.width = `${(count / 67) * 12}vw`;
    } else if (count <= 100) {
      loaderText.textContent = count.toString().padStart(3, "0");
      loaderBar2.style.width = `${((count - 67) / (100 - 67)) * 6}vw`;
    } else {
      clearInterval(interval);

      let tl = gsap.timeline();
      tl.to(loaderBar, {
        duration: 0.4,
        backgroundColor: "#151515",
        ease: "power1.inOut"
      });      
      tl.to(loaderBar1, {
        duration: 1.2,
        rotate: 90,
        ease: "power2.inOut"
      });     
      tl.to(loaderBar, {
        duration: 1,
        scale: 1.65,
        ease: "power3.out"
      });
      tl.to("#loader", {
        opacity: 0,
        duration: 1.5
      }, "<"); 
      
     
      tl.to("#loader", {
        display: "none",
        opacity:0
      });
    }
    count++;
  }, 30);
}

loader();

function page1(locoScroll) {
  const images = [
    { url: "/Images/i2.png", top: "50%", left: "39%", threshold: 10 },
    { url: "/Images/i3.png", top: "56%", left: "43%", threshold: 55 },
    { url: "/Images/i4.png", top: "45%", left: "56%", threshold: 89 },
    { url: "/Images/i5.png", top: "60%", left: "65%", threshold: 100 },
    { url: "/Images/i6.png", top: "43%", left: "40%", threshold: 150 },
    { url: "/Images/i7.png", top: "63%", left: "55%", threshold: 180 },
  ];

  const p1img = document.getElementById("p1img");

  const imageElements = images.map((imgData) => {
    const img = document.createElement("img");
    img.src = imgData.url;
    img.style.top = imgData.top;
    img.style.left = imgData.left;
    img.style.opacity = "0";
    img.style.position = "absolute";
    img.style.transition = "opacity 0.5s ease";
    img.style.transform = "translate(-50%, -50%)";
    img.style.height = "18vw";
    img.style.width = "18vw";
    img.style.borderRadius = "5px";

    p1img.appendChild(img);
    return { el: img, threshold: imgData.threshold };
  });

  // ✅ Use Locomotive Scroll tracking
  locoScroll.on("scroll", (args) => {
    const scrollY = args.scroll.y;
    imageElements.forEach(({ el, threshold }) => {
      if (scrollY > threshold) {
        el.style.opacity = "1";
      } else {
        el.style.opacity = "0";
      }
    });
  });
}
window.addEventListener("DOMContentLoaded", () => {
  page1(locoScroll);
});


function page2(){

  gsap.from("#f1 h1,#f2 h2", {
      y: 10,
      rotate: 10,
      opacity: 0,
      scrollTrigger:{
        trigger:"#page2",
        scroller:"#main",
        start:"top 75%",
        end:"top 39%",
        scrub:2,        
      }
  })


  
let frame1=document.querySelectorAll("#f1")[0];
let frame2=document.querySelectorAll("#f2")[0];

frame1.addEventListener("mouseenter",()=>{
 
  gsap.to("#f1 h1",{
    y:"-16.8vh",
    duration:0.3,
    color:"yellow",
    ease: "expo.out",
    });
});
frame1.addEventListener("mouseleave",()=>{
  gsap.to("#f1 h1",{
    y:"0",
    duration:0.3,
    color:"#fff",
    ease: "expo.out",
    });
});
frame2.addEventListener("mouseenter",()=>{
 
  gsap.to("#f2 h2",{
    y:"-16.8vh",
    duration:0.3,
    color:"yellow",
    ease: "expo.out",
    });
});
frame2.addEventListener("mouseleave",()=>{
  gsap.to("#f2 h2",{
    y:"0",
    duration:0.3,
     color:"#fff",
    ease: "expo.out",
    });
});

gsap.to("#f1",{
  x:-180,
  opacity:0.3,
  scrollTrigger:{
    trigger:"#f1 h1",
      scroller:"#main",
      start:"top 32%",
      end:"top 5%",
        scrub:2,
    
  } 
});
gsap.to("#f2",{
  x:180,
  opacity:0.3,
  scrollTrigger:{
    trigger:"#f1 h1",
      scroller:"#main",
      start:"top 32%",
      end:"top 5%",
        scrub:2,
    
  } 
});
gsap.to("#vid",{
  width:"90vw",
  left:"5vw",
  scrollTrigger:{
    trigger:"#f1 h1",
      scroller:"#main",
      start:"top 32%",
      end:"top 5%",
        scrub:2,
    
  } 
  
});
}
page2();






gsap.to("#main",{
  backgroundColor:"whitesmoke",  
  ease:"expo.out",
  scrollTrigger:{
    trigger:"#page3",
    scroller:"#main",
    start:"top 60%",
    end:"top 25%",
    scrub:true,    
  }
})





function setupDarkLightToggle() {
  const circle1 = document.getElementById("circle1");
  const body = document.body;
  const nav = document.getElementById("nav");
  const text = document.querySelector("#text h1");
  const headings = document.querySelectorAll("h1, h2, h4, h6");

  circle1.addEventListener("click", () => {
    body.classList.toggle("light-mode");

    // You can adjust what changes in JS here or rely on CSS
    if (body.classList.contains("light-mode")) {
      // Optional: JS changes (only if not using CSS for all)
      nav.style.mixBlendMode = "normal";
      text.style.color = "#111";
      headings.forEach(h => h.style.color = "#111");
    } else {
      nav.style.mixBlendMode = "difference";
      text.style.color = "whitesmoke";
      headings.forEach(h => h.style.color = "whitesmoke");
    }
    circle1.style.backgroundColor = body.classList.contains("light-mode") ? "#000" : "whitesmoke";
  });
}

setupDarkLightToggle();


