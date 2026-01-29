'use client'

import { useEffect } from 'react'
import './page.css'

declare global {
  interface Window {
    animationTimeline?: () => void
  }
}

export default function Home() {
  useEffect(() => {
    // Dynamic import of GSAP and SweetAlert
    const loadScripts = async () => {
      // Create and load GSAP script
      const gsapScript = document.createElement('script')
      gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js'
      gsapScript.async = true
      document.head.appendChild(gsapScript)

      // Create and load SweetAlert script
      const sweetAlertScript = document.createElement('script')
      sweetAlertScript.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11'
      sweetAlertScript.async = true
      document.head.appendChild(sweetAlertScript)

      // Wait for scripts to load then initialize
      gsapScript.onload = () => {
        sweetAlertScript.onload = () => {
          initializeAnimation()
        }
      }
    }

    loadScripts()
  }, [])

  const initializeAnimation = () => {
    // Declare Swal and gsap from external scripts
    const Swal = (window as any).Swal
    const gsap = (window as any).gsap

    if (!Swal || !gsap) return

    Swal.fire({
      title: 'Do you want to play music in the background?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result: any) => {
      if (result.isConfirmed) {
        const audio = document.querySelector('.song') as HTMLAudioElement
        audio?.play().catch((err) => console.log('Audio play failed:', err))
      }
      animationTimeline(gsap)
    })
  }

  const animationTimeline = (gsap: any) => {
    // State to track if typing is complete
    let isTypingComplete = false
    let sendMessageCallback: (() => void) | null = null

    // split chars that needs to be animated individually
    const textBoxChars = document.getElementsByClassName('hbd-chatbox')[0]
    const hbd = document.getElementsByClassName('wish-hbd')[0]

    if (textBoxChars) {
      textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
        .split('')
        .join('</span><span>')}</span>`
    }

    if (hbd) {
      hbd.innerHTML = `<span>${hbd.innerHTML.split('').join('</span><span>')}</span>`
    }

    const ideaTextTrans = {
      opacity: 0,
      y: -20,
      rotationX: 5,
      skewX: '15deg',
    }

    const ideaTextTransLeave = {
      opacity: 0,
      y: 20,
      rotationY: 5,
      skewX: '-15deg',
    }

    // timeline
    const tl = gsap.timeline()

    tl.to('.container', {
      visibility: 'visible',
      duration: 0.6,
    })
      .from('.one', {
        opacity: 0,
        y: 10,
        duration: 0.7,
      })
      .from('.two', {
        opacity: 0,
        y: 10,
        duration: 0.4,
      }, 0)
      .to('.one', {
        opacity: 0,
        y: 10,
        duration: 0.7,
      }, '+=3.5')
      .to('.two', {
        opacity: 0,
        y: 10,
        duration: 0.7,
      }, '-=1')
      .from('.three', {
        opacity: 0,
        y: 10,
        duration: 0.7,
      })
      .to('.three', {
        opacity: 0,
        y: 10,
        duration: 0.7,
      }, '+=3')
      .from('.four', {
        scale: 0.2,
        opacity: 0,
        duration: 0.7,
      })
      .from('.fake-btn', {
        scale: 0.2,
        opacity: 0,
        duration: 0.3,
      })
      .to('.hbd-chatbox span', {
        visibility: 'visible',
        duration: 1.5,
        stagger: 0.05,
        onComplete: () => {
          isTypingComplete = true
          const Swal = (window as any).Swal
          if (Swal) {
            Swal.fire({
              title: 'Please continue',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
            })
          }
        },
      })
      .to('.fake-btn', {
        backgroundColor: 'rgb(127, 206, 248)',
        duration: 0.1,
      }, '+=4')
      .to('.four', {
        scale: 0.2,
        opacity: 0,
        y: -150,
        duration: 0.5,
      }, '+=1')
      .from('.idea-1', {
        ...ideaTextTrans,
        duration: 0.7,
      })
      .to('.idea-1', {
        ...ideaTextTransLeave,
        duration: 0.7,
      }, '+=2.5')
      .from('.idea-2', {
        ...ideaTextTrans,
        duration: 0.7,
      })
      .to('.idea-2', {
        ...ideaTextTransLeave,
        duration: 0.7,
      }, '+=2.5')
      .from('.idea-3', {
        ...ideaTextTrans,
        duration: 0.7,
      })
      .to('.idea-3 strong', {
        scale: 1.2,
        x: 10,
        backgroundColor: 'rgb(21, 161, 237)',
        color: '#fff',
        duration: 0.5,
      })
      .to('.idea-3', {
        ...ideaTextTransLeave,
        duration: 0.7,
      }, '+=2.5')
      .from('.idea-4', {
        ...ideaTextTrans,
        duration: 0.7,
      })
      .to('.idea-4', {
        ...ideaTextTransLeave,
        duration: 0.7,
      }, '+=2.5')
      .from('.idea-5', {
        rotationX: 15,
        rotationZ: -10,
        skewY: '-5deg',
        y: 50,
        z: 10,
        opacity: 0,
        duration: 0.7,
      }, '+=1.5')
      .to('.idea-5', {
        scale: 0.2,
        opacity: 0,
        duration: 0.7,
      }, '+=2')
      .from('.idea-6 span', {
        scale: 3,
        opacity: 0,
        rotation: 15,
        ease: 'back.out',
        duration: 0.8,
        stagger: 0.2,
      })
      .to('.idea-6 span', {
        scale: 3,
        opacity: 0,
        rotation: -15,
        ease: 'back.out',
        duration: 0.8,
        stagger: 0.2,
      }, '+=1.5')
      .fromTo(
        '.baloons img',
        {
          opacity: 0.9,
          y: 1400,
        },
        {
          opacity: 1,
          y: -1000,
          duration: 2.5,
          stagger: 0.2,
        }
      )
      .from('.profile-picture', {
        scale: 3.5,
        opacity: 0,
        x: 25,
        y: -25,
        rotationZ: -45,
        duration: 0.5,
      }, '-=2')
      .from('.hat', {
        x: -100,
        y: 350,
        rotation: -180,
        opacity: 0,
        duration: 0.5,
      })
      .from('.wish-hbd span', {
        opacity: 0,
        y: -50,
        rotation: 150,
        skewX: '30deg',
        ease: 'elastic.out(1, 0.5)',
        duration: 0.7,
        stagger: 0.1,
      })
      .fromTo(
        '.wish-hbd span',
        {
          scale: 1.4,
          rotationY: 150,
        },
        {
          scale: 1,
          rotationY: 0,
          color: '#ff69b4',
          ease: 'back.out',
          duration: 0.7,
          stagger: 0.1,
        },
        'party'
      )
      .from(
        '.wish h5',
        {
          opacity: 0,
          y: 10,
          skewX: '-15deg',
          duration: 0.5,
        },
        'party'
      )
      .to('.eight svg', {
        visibility: 'visible',
        opacity: 0,
        scale: 80,
        repeat: 3,
        repeatDelay: 1.4,
        duration: 1.5,
        stagger: 0.3,
      })
      .to('.six', {
        opacity: 0,
        y: 30,
        zIndex: '-1',
        duration: 0.5,
      })
      .from('.nine p', {
        ...ideaTextTrans,
        duration: 1,
        stagger: 1.2,
      })
      .to('.last-smile', {
        rotation: 90,
        duration: 0.5,
      }, '+=1')
      .to(
        '.two',
        0.7,
        {
          opacity: 0,
          y: 10,
        },
        '-=1'
      )
      .from('.three', 0.7, {
        opacity: 0,
        y: 10,
      })
      .to(
        '.three',
        0.7,
        {
          opacity: 0,
          y: 10,
        },
        '+=3'
      )
      .from('.four', 0.7, {
        scale: 0.2,
        opacity: 0,
      })
      .from('.fake-btn', 0.3, {
        scale: 0.2,
        opacity: 0,
      })
      .staggerTo('.hbd-chatbox span', 1.5, {
        visibility: 'visible',
      }, 0.05)
      .to(
        '.fake-btn',
        0.1,
        {
          backgroundColor: 'rgb(127, 206, 248)',
        },
        '+=4'
      )
      .to(
        '.four',
        0.5,
        {
          scale: 0.2,
          opacity: 0,
          y: -150,
        },
        '+=1'
      )
      .from('.idea-1', 0.7, ideaTextTrans)
      .to('.idea-1', 0.7, ideaTextTransLeave, '+=2.5')
      .from('.idea-2', 0.7, ideaTextTrans)
      .to('.idea-2', 0.7, ideaTextTransLeave, '+=2.5')
      .from('.idea-3', 0.7, ideaTextTrans)
      .to('.idea-3 strong', 0.5, {
        scale: 1.2,
        x: 10,
        backgroundColor: 'rgb(21, 161, 237)',
        color: '#fff',
      })
      .to('.idea-3', 0.7, ideaTextTransLeave, '+=2.5')
      .from('.idea-4', 0.7, ideaTextTrans)
      .to('.idea-4', 0.7, ideaTextTransLeave, '+=2.5')
      .from(
        '.idea-5',
        0.7,
        {
          rotationX: 15,
          rotationZ: -10,
          skewY: '-5deg',
          y: 50,
          z: 10,
          opacity: 0,
        },
        '+=1.5'
      )
      .to(
        '.idea-5 span',
        0.7,
        {
          rotation: 90,
          x: 8,
        },
        '+=1.4'
      )
      .to(
        '.idea-5',
        0.7,
        {
          scale: 0.2,
          opacity: 0,
        },
        '+=2'
      )
      .staggerFrom(
        '.idea-6 span',
        0.8,
        {
          scale: 3,
          opacity: 0,
          rotation: 15,
          ease: Expo.easeOut,
        },
        0.2
      )
      .staggerTo(
        '.idea-6 span',
        0.8,
        {
          scale: 3,
          opacity: 0,
          rotation: -15,
          ease: Expo.easeOut,
        },
        0.2,
        '+=1.5'
      )
      .staggerFromTo(
        '.baloons img',
        2.5,
        {
          opacity: 0.9,
          y: 1400,
        },
        {
          opacity: 1,
          y: -1000,
        },
        0.2
      )
      .from(
        '.profile-picture',
        0.5,
        {
          scale: 3.5,
          opacity: 0,
          x: 25,
          y: -25,
          rotationZ: -45,
        },
        '-=2'
      )
      .from('.hat', 0.5, {
        x: -100,
        y: 350,
        rotation: -180,
        opacity: 0,
      })
      .staggerFrom(
        '.wish-hbd span',
        0.7,
        {
          opacity: 0,
          y: -50,
          rotation: 150,
          skewX: '30deg',
          ease: Elastic.easeOut.config(1, 0.5),
        },
        0.1
      )
      .staggerFromTo(
        '.wish-hbd span',
        0.7,
        {
          scale: 1.4,
          rotationY: 150,
        },
        {
          scale: 1,
          rotationY: 0,
          color: '#ff69b4',
          ease: Expo.easeOut,
        },
        0.1,
        'party'
      )
      .from(
        '.wish h5',
        0.5,
        {
          opacity: 0,
          y: 10,
          skewX: '-15deg',
        },
        'party'
      )
      .staggerTo(
        '.eight svg',
        1.5,
        {
          visibility: 'visible',
          opacity: 0,
          scale: 80,
          repeat: 3,
          repeatDelay: 1.4,
        },
        0.3
      )
      .to('.six', 0.5, {
        opacity: 0,
        y: 30,
        zIndex: '-1',
      })
      .staggerFrom('.nine p', 1, ideaTextTrans, 1.2)
      .to(
        '.last-smile',
        0.5,
        {
          rotation: 90,
        },
        '+=1'
      )

    // Restart Animation on click
    const replyBtn = document.getElementById('replay')
    if (replyBtn) {
      replyBtn.onclick = () => {
        tl.restart()
      }
    }

    // Send button handler with monkey popup
    const sendBtn = document.querySelector('.fake-btn') as HTMLElement
    if (sendBtn) {
      sendBtn.style.cursor = 'pointer'
      sendBtn.onclick = () => {
        const Swal = (window as any).Swal
        if (!Swal) return

        if (!isTypingComplete) {
          // Show monkey saying "please wait"
          Swal.fire({
            title: 'Please wait...',
            icon: 'info',
            iconColor: '#8B4513',
            html: '<div style="font-size: 48px;">🐵</div><p style="margin-top: 10px;">The message is still being typed!</p>',
            showConfirmButton: false,
            timer: 2000,
          })
        } else {
          // Typing is complete, proceed with sending
          if (sendMessageCallback) {
            sendMessageCallback()
          }
          // Optional: Show success message
          Swal.fire({
            title: 'Message sent!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          })
        }
      }
    }
  }

  return (
    <>
      <audio className="song" loop>
        <source src="/music/hbd.mpeg" />
        Your browser isn't invited for super fun audio time.
      </audio>

      <div className="container">
        <div className="one">
          <h1 className="one">
            Hi
            <span id="name">Angel</span>
          </h1>
          <p className="two" id="greetingText">
            Keerthana, I really like your name btw!
          </p>
        </div>

        <div className="three">
          <p>It's your birthday!! :D</p>
        </div>

        <div className="four">
          <div className="text-box">
            <p className="hbd-chatbox">
              Happy birthday to youu!! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Consequuntur quisquam amet ipsam vitae,
              voluptatum architecto aliquid id quo error tempora quos aperiam
              magni necessitatibus quas ut, possimus nesciunt nam ad.
            </p>
            <p className="fake-btn">Send</p>
          </div>
        </div>

        <div className="five">
          <p className="idea-1">That's what I was going to do.</p>
          <p className="idea-2">But then I stopped.</p>
          <p className="idea-3">
            I realised, I wanted to do something<br />
            <strong>special</strong>.
          </p>
          <p className="idea-4">Because,</p>
          <p className="idea-5">
            You are Special<span>:)</span>
          </p>
          <p className="idea-6">
            <span>S</span>
            <span>O</span>
          </p>
        </div>

        <div className="six">
          <img src="/img/angel.jpg" alt="profile" className="profile-picture" id="imagePath" />
          <img src="/img/hat.svg" alt="hat" className="hat" />
          <div className="wish">
            <h3 className="wish-hbd">Happy Birthday!</h3>
            <h5 id="wishText">Wishing you a magical day filled with joy and laughter! 🎉</h5>
          </div>
        </div>

        <div className="seven">
          <div className="baloons">
            <img src="/img/ballon2.svg" alt="" />
            <img src="/img/ballon1.svg" alt="" />
            <img src="/img/ballon3.svg" alt="" />
            <img src="/img/ballon1.svg" alt="" />
            <img src="/img/ballon2.svg" alt="" />
            <img src="/img/ballon3.svg" alt="" />
            <img src="/img/ballon2.svg" alt="" />
            <img src="/img/ballon3.svg" alt="" />
            <img src="/img/ballon1.svg" alt="" />
            <img src="/img/ballon2.svg" alt="" />
            <img src="/img/ballon3.svg" alt="" />
            <img src="/img/ballon2.svg" alt="" />
            <img src="/img/ballon1.svg" alt="" />
            <img src="/img/ballon3.svg" alt="" />
            <img src="/img/ballon2.svg" alt="" />
            <img src="/img/ballon3.svg" alt="" />
            <img src="/img/ballon1.svg" alt="" />
            <img src="/img/ballon2.svg" alt="" />
            <img src="/img/ballon1.svg" alt="" />
            <img src="/img/ballon3.svg" alt="" />
            <img src="/img/ballon3.svg" alt="" />
            <img src="/img/ballon1.svg" alt="" />
            <img src="/img/ballon2.svg" alt="" />
            <img src="/img/ballon3.svg" alt="" />
            <img src="/img/ballon2.svg" alt="" />
            <img src="/img/ballon1.svg" alt="" />
            <img src="/img/ballon3.svg" alt="" />
            <img src="/img/ballon2.svg" alt="" />
            <img src="/img/ballon3.svg" alt="" />
            <img src="/img/ballon1.svg" alt="" />
            <img src="/img/ballon2.svg" alt="" />
            <img src="/img/ballon1.svg" alt="" />
            <img src="/img/ballon3.svg" alt="" />
          </div>
        </div>

        <div className="eight">
          <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" />
          </svg>
          <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" />
          </svg>
          <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" />
          </svg>
          <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" />
          </svg>
          <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" />
          </svg>
          <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" />
          </svg>
          <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" />
          </svg>
          <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" />
          </svg>
          <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" />
          </svg>
        </div>

        <div className="nine">
          <p>Okay, now come back and tell me if you liked it.</p>
          <p id="replay">Or click, if you want to watch it again.</p>
          <p className="last-smile">:)</p>
        </div>
      </div>
    </>
  )
}
