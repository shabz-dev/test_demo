import { useState, useEffect, useRef } from 'react'
import { Heart, Sparkles, Gift, Camera, Star, Music, X, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import './App.css'

// ============================================
// 💝 VALENTINE'S DAY WEB APP - EASY TO CUSTOMIZE
// ============================================
// Edit the values below to personalize this for your loved one!

const VALENTINE_CONFIG = {
  // Main title
  title: "Happy Valentine's Day My Love",
  
  // Your personal love message (edit this!)
  loveMessage: `My dearest love,

Every moment with you feels like a beautiful dream I never want to wake up from. 
Your smile brightens my darkest days, and your laugh is my favorite melody.

You are my sunshine, my moonlight, and every star in between.
I am so grateful to have you in my life.

Forever yours,
[Your Name]`,

  // Surprise message when they click the button
  surpriseMessage: "You are the most amazing person I've ever met! 💕\n\nI fall in love with you more every single day.\nYou make my heart skip a beat! 💓",

  // Reasons why you love them (edit these!)
  reasons: [
    "Your beautiful smile lights up my world ✨",
    "The way you laugh makes my heart melt 🥰",
    "You're always there for me, no matter what 🤗",
    "You make every day feel special 💫",
    "Your kindness inspires me to be better 💖",
    "The way you look at me makes me feel loved 💕",
    "You understand me like no one else ever could 💗",
    "Your hugs feel like home 🏠💝",
    "You make me laugh even on my worst days 😄",
    "I love you just the way you are 💘"
  ],

  // Photo placeholders - Replace these URLs with your own photos!
  photos: [
    { url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=400&fit=crop", caption: "Our first date 💕" },
    { url: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400&h=400&fit=crop", caption: "That special moment ✨" },
    { url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=400&fit=crop", caption: "Together forever 💖" },
    { url: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=400&h=400&fit=crop", caption: "My favorite person 🥰" },
  ],

  // Final proposal message
  proposalMessage: "Will you be my Valentine?",
  
  // Success message when they say yes
  successMessage: "Yay! You made me the happiest person alive! 💘🎉",
}

// Floating Heart Component
function FloatingHeart({ delay, size, left, duration }: { delay: number; size: number; left: string; duration: number }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left,
        bottom: '-50px',
        animation: `float-up ${duration}s linear infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <Heart
        size={size}
        className="text-pink-400/40 fill-pink-400/40"
        style={{
          animation: `sway 3s ease-in-out infinite`,
          animationDelay: `${delay * 0.5}s`,
        }}
      />
    </div>
  )
}

// Sparkle Component
function Sparkle({ delay, top, left }: { delay: number; top: string; left: string }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top,
        left,
        animation: `sparkle 2s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <Sparkles size={16} className="text-yellow-300" />
    </div>
  )
}

// Main App Component
function App() {
  const [showSurprise, setShowSurprise] = useState(false)
  const [showProposal, setShowProposal] = useState(false)
  const [saidYes, setSaidYes] = useState(false)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [hearts, setHearts] = useState<Array<{ id: number; delay: number; size: number; left: string; duration: number }>>([])
  const noButtonRef = useRef<HTMLButtonElement>(null)
  const proposalRef = useRef<HTMLDivElement>(null)

  // Generate floating hearts on mount
  useEffect(() => {
    const newHearts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      delay: Math.random() * 10,
      size: 15 + Math.random() * 25,
      left: `${Math.random() * 100}%`,
      duration: 8 + Math.random() * 7,
    }))
    setHearts(newHearts)
  }, [])

  // Handle No button escape
  const handleNoButtonHover = () => {
    const maxX = 200
    const maxY = 150
    const newX = (Math.random() - 0.5) * maxX * 2
    const newY = (Math.random() - 0.5) * maxY * 2
    setNoButtonPosition({ x: newX, y: newY })
  }

  // Scroll to proposal section
  const scrollToProposal = () => {
    proposalRef.current?.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => setShowProposal(true), 800)
  }

  // Handle Yes click
  const handleYesClick = () => {
    setSaidYes(true)
    setShowProposal(false)
    // Create celebration effect
    const celebrationHearts = Array.from({ length: 50 }, (_, i) => ({
      id: Date.now() + i,
      delay: Math.random() * 2,
      size: 20 + Math.random() * 30,
      left: `${Math.random() * 100}%`,
      duration: 5 + Math.random() * 5,
    }))
    setHearts(prev => [...prev, ...celebrationHearts])
  }

  return (
    <div className="min-h-screen animated-gradient relative overflow-hidden">
      {/* Add custom keyframes */}
      <style>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes sway {
          0%, 100% { transform: translateX(-10px); }
          50% { transform: translateX(10px); }
        }
      `}</style>

      {/* Floating Hearts Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {hearts.map((heart) => (
          <FloatingHeart
            key={heart.id}
            delay={heart.delay}
            size={heart.size}
            left={heart.left}
            duration={heart.duration}
          />
        ))}
      </div>

      {/* Sparkles */}
      <Sparkle delay={0} top="10%" left="10%" />
      <Sparkle delay={0.5} top="20%" left="85%" />
      <Sparkle delay={1} top="60%" left="5%" />
      <Sparkle delay={1.5} top="80%" left="90%" />
      <Sparkle delay={2} top="40%" left="95%" />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        
        {/* ==================== HERO SECTION ==================== */}
        <section className="text-center py-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-red-500 fill-red-500 animate-pulse-heart" />
            <Heart className="w-10 h-10 text-pink-500 fill-pink-500 animate-pulse-heart" style={{ animationDelay: '0.2s' }} />
            <Heart className="w-8 h-8 text-red-500 fill-red-500 animate-pulse-heart" style={{ animationDelay: '0.4s' }} />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 via-red-500 to-pink-600 bg-clip-text text-transparent mb-4 drop-shadow-sm">
            {VALENTINE_CONFIG.title}
          </h1>
          
          <p className="text-lg md:text-xl text-pink-700/80 mt-4 font-medium">
            Made with 💖 just for you
          </p>
        </section>

        {/* ==================== LOVE MESSAGE SECTION ==================== */}
        <section className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-pink-200 hover:border-pink-300 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-red-400 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-pink-700">A Letter For You</h2>
            </div>
            
            <div className="prose prose-pink max-w-none">
              <p className="text-pink-800/90 whitespace-pre-line text-lg leading-relaxed font-medium">
                {VALENTINE_CONFIG.loveMessage}
              </p>
            </div>
          </div>
        </section>

        {/* ==================== PHOTO GALLERY SECTION ==================== */}
        <section className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-2">
              <Camera className="w-6 h-6 text-pink-500" />
              <h2 className="text-2xl md:text-3xl font-bold text-pink-700">Our Memories</h2>
              <Camera className="w-6 h-6 text-pink-500" />
            </div>
            <p className="text-pink-600/70">Replace these with your own photos in the code!</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {VALENTINE_CONFIG.photos.map((photo, index) => (
              <div
                key={index}
                className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-white"
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <p className="text-white text-sm font-medium text-center w-full">{photo.caption}</p>
                </div>
                <div className="absolute top-2 right-2">
                  <Heart className="w-5 h-5 text-white fill-pink-500/80" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==================== SURPRISE BUTTON SECTION ==================== */}
        <section className="mb-12 text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <Button
            onClick={() => setShowSurprise(true)}
            className="bg-gradient-to-r from-pink-500 via-red-500 to-pink-500 hover:from-pink-600 hover:via-red-600 hover:to-pink-600 text-white text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-bounce-gentle group"
          >
            <Gift className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
            Click for a Surprise
            <Sparkles className="w-5 h-5 ml-2 group-hover:scale-125 transition-transform" />
          </Button>
        </section>

        {/* Surprise Dialog */}
        <Dialog open={showSurprise} onOpenChange={setShowSurprise}>
          <DialogContent className="bg-gradient-to-br from-pink-100 to-red-100 border-2 border-pink-300 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-bold text-pink-700 flex items-center justify-center gap-2">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                Surprise!
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              </DialogTitle>
            </DialogHeader>
            <div className="text-center py-4">
              <div className="text-6xl mb-4">💝</div>
              <p className="text-pink-800 whitespace-pre-line text-lg leading-relaxed">
                {VALENTINE_CONFIG.surpriseMessage}
              </p>
              <div className="flex justify-center gap-2 mt-6">
                <Heart className="w-6 h-6 text-red-500 fill-red-500 animate-pulse-heart" />
                <Heart className="w-8 h-8 text-pink-500 fill-pink-500 animate-pulse-heart" style={{ animationDelay: '0.2s' }} />
                <Heart className="w-6 h-6 text-red-500 fill-red-500 animate-pulse-heart" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* ==================== REASONS WHY I LOVE YOU ==================== */}
        <section className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-pink-200">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                <h2 className="text-2xl md:text-3xl font-bold text-pink-700">Reasons Why I Love You</h2>
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {VALENTINE_CONFIG.reasons.map((reason, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-gradient-to-r from-pink-50 to-red-50 rounded-xl hover:from-pink-100 hover:to-red-100 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-red-400 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Heart className="w-4 h-4 text-white fill-white" />
                  </div>
                  <p className="text-pink-800 font-medium">{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== FINAL PROPOSAL SECTION ==================== */}
        <section ref={proposalRef} className="text-center py-12 animate-fade-in-up" style={{ animationDelay: '1s' }}>
          {!saidYes ? (
            <Button
              onClick={scrollToProposal}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white text-xl px-10 py-8 rounded-full shadow-2xl hover:shadow-pink-500/30 transition-all duration-300 hover:scale-110 group"
            >
              <Music className="w-6 h-6 mr-3 group-hover:animate-bounce" />
              There's something I want to ask you...
              <Heart className="w-6 h-6 ml-3 fill-white animate-pulse-heart" />
            </Button>
          ) : (
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border-4 border-pink-300 animate-fade-in-up">
              <div className="text-8xl mb-4">🎉💘🎉</div>
              <h2 className="text-3xl md:text-4xl font-bold text-pink-700 mb-4">
                {VALENTINE_CONFIG.successMessage}
              </h2>
              <div className="flex justify-center gap-3 mt-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Heart
                    key={i}
                    className="w-8 h-8 text-red-500 fill-red-500 animate-pulse-heart"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Proposal Dialog */}
        <Dialog open={showProposal} onOpenChange={setShowProposal}>
          <DialogContent className="bg-gradient-to-br from-pink-100 via-red-50 to-pink-100 border-4 border-pink-300 max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-center">
                <div className="text-6xl mb-4 animate-bounce">💘</div>
                <span className="text-2xl md:text-3xl font-bold text-pink-700">
                  {VALENTINE_CONFIG.proposalMessage}
                </span>
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center gap-6 py-6">
              <div className="flex gap-4 items-center">
                <Button
                  onClick={handleYesClick}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-xl px-10 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110"
                >
                  <Check className="w-6 h-6 mr-2" />
                  YES!
                </Button>
                
                <Button
                  ref={noButtonRef}
                  onMouseEnter={handleNoButtonHover}
                  onClick={handleNoButtonHover}
                  className="bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white text-xl px-8 py-6 rounded-full shadow-lg transition-all duration-200"
                  style={{
                    transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
                  }}
                >
                  <X className="w-5 h-5 mr-2" />
                  No
                </Button>
              </div>
              <p className="text-pink-600/70 text-sm">(Try clicking &quot;No&quot; 😉)</p>
            </div>
          </DialogContent>
        </Dialog>

        {/* Footer */}
        <footer className="text-center py-8 text-pink-600/60">
          <div className="flex justify-center gap-2 mb-2">
            <Heart className="w-4 h-4 fill-current" />
            <Heart className="w-4 h-4 fill-current" />
            <Heart className="w-4 h-4 fill-current" />
          </div>
          <p className="text-sm">Made with love for you 💕</p>
        </footer>
      </div>
    </div>
  )
}

export default App
