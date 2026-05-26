import { useEffect, useRef } from 'react'

let audioInstance = null

export default function BackgroundMusic() {
  const audioRef = useRef(null)
  const isInitialized = useRef(false)

  useEffect(() => {
    // Chỉ khởi tạo 1 lần
    if (isInitialized.current) return
    isInitialized.current = true

    // Nếu đã tồn tại, dùng lại - không tạo mới
    if (!audioInstance) {
      audioInstance = new Audio('/music/background.mp3')
      audioInstance.loop = true // Tự động lặp lại
      audioInstance.volume = 0.5 // Âm lượng vừa phải (0-1)
    }

    const audio = audioInstance
    audioRef.current = audio

    // Hàm phát nhạc
    const playAudio = () => {
      audio.play().catch(err => {
        console.log('Trình duyệt không cho phép tự động phát nhạc')
      })
      // Xóa listener sau khi phát lần đầu
      document.removeEventListener('click', playAudio)
      document.removeEventListener('scroll', playAudio)
      document.removeEventListener('touchstart', playAudio)
    }

    // Thử phát ngay
    audio.play().catch(() => {
      // Nếu không được, đợi tương tác của user
      document.addEventListener('click', playAudio)
      document.addEventListener('scroll', playAudio)
      document.addEventListener('touchstart', playAudio)
    })

    // Cleanup
    return () => {
      document.removeEventListener('click', playAudio)
      document.removeEventListener('scroll', playAudio)
      document.removeEventListener('touchstart', playAudio)
    }
  }, [])

  return null // Component này không render gì cả
}
