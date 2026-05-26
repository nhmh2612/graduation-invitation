import './App.css'
import { useState, useEffect } from 'react'
import { db } from './firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

function App() {

  const [guestName, setGuestName] = useState("")

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const [rsvpData, setRsvpData] = useState({
    name: '',
    attending: null,
    guests: '1'
  })

  const [guestbookData, setGuestbookData] = useState({
    name: '',
    message: ''
  })

  useEffect(() => {

    const params = new URLSearchParams(window.location.search)
    const guest = params.get("guest")

    if (guest) {
      setGuestName(decodeURIComponent(guest))
    }

    const timer = setInterval(() => {
      const graduationDate = new Date('2026-05-31T10:30:00').getTime()
      const now = new Date().getTime()
      const distance = graduationDate - now

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }, 1000)

    return () => clearInterval(timer)

  }, [])

const handleRsvpSubmit = async (e) => {
  e.preventDefault()

  if (rsvpData.attending === null) {
    alert("Bạn nhớ chọn có tham dự hay không nha 💕")
    return
  }

  try {

    await addDoc(collection(db, "rsvp"), {
      name: rsvpData.name,
      attending: rsvpData.attending,
      guests: rsvpData.guests,
      createdAt: serverTimestamp()
    })

    alert(`Mình đã nhận được phản hồi từ ${rsvpData.name} rồi nha 💕`)

    setRsvpData({
      name: '',
      attending: null,
      guests: '1'
    })

  } catch (error) {
    console.error(error)
    alert("Có lỗi xảy ra")
  }
}

const handleGuestbookSubmit = async (e) => {
  e.preventDefault()

  try {

    await addDoc(collection(db, "guestbook"), {
      name: guestbookData.name,
      message: guestbookData.message,
      createdAt: serverTimestamp()
    })

    alert(`Cảm ơn ${guestbookData.name} đã để lại lời chúc nhea 💕`)

    setGuestbookData({
      name: '',
      message: ''
    })

  } catch (error) {
    console.error(error)
    alert("Có lỗi xảy ra")
  }
}

  return (
    <div className="min-h-screen bg-[#FFEAF4] text-[#7D5A67] relative overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-pink-300 opacity-30 blur-3xl rounded-full"></div>

      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-rose-300 opacity-30 blur-3xl rounded-full"></div>

      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 text-center relative z-10">

        <div className="p-3 rounded-full bg-[#FFF5FA] shadow-[0_10px_50px_rgba(255,183,213,0.5)]">
          <img
            src="/images/hachang.png"
            alt="Hà Trang"
            className="w-56 h-56 md:w-64 md:h-64 rounded-full object-cover"
          />
        </div>

        <p className="mt-8 uppercase tracking-[0.2em] text-4xl md:text-6xl font-extrabold text-[#F58AB0]">
          Thiệp mời tốt nghiệp
        </p>

    {guestName && (
      <div className="mt-8 text-center">
        
        <p className="text-[#C97B9D] text-lg">
          Thân mời
        </p>

        <h2 className="mt-2 text-4xl md:text-5xl font-bold text-[#F58AB0]">
          {guestName}
        </h2>

        <p className="mt-5 text-[#9C7382] text-lg leading-8">
          đến tham dự lễ tốt nghiệp của
        </p>

      </div>
    )}

    <h1 className="mt-6 text-4xl md:text-5xl font-bold text-[#F58AB0]">
      Hà Trang
    </h1>

      </section>

      {/* LETTER */}
      <section className="px-4 sm:px-6 pb-24 relative z-10">

        <div className="max-w-3xl mx-auto bg-[#FFF5FA]/90 backdrop-blur-xl rounded-[40px] p-6 sm:p-8 md:p-12 border border-pink-200 shadow-[0_10px_50px_rgba(255,183,213,0.35)]">

          <h2 className="text-center text-4xl font-bold text-[#F58AB0]">
            Gửi bạn bè và gia đình
          </h2>
            <p className="mt-10 text-center leading-8 text-lg text-[#8D6977]">
            Ngày này đã tới, Hà Trang tốt nghiệp rồiii 🎓
            <br /><br />
            3 năm rưỡi vừa qua là một quãng thời gian thật đẹp với mình. Có rất nhiều kỷ niệm, những niềm vui rất nhỏ nhưng nhớ rất lâu, và cũng có những trải nghiệm giúp mình trưởng thành hơn từng ngày.
            <br /><br />
            Mình biết ơn tất cả những điều đã đến trong hành trình ấy - những cuộc gặp gỡ, những người đồng hành, những kỷ niệm cũ, và cả những điều tưởng chừng rất bình thường nhưng khi nhìn lại đều trở nên đáng nhớ 🤍
            <br /><br />
            Vì vậy mình muốn gửi lời mời này đến mọi người - những người đã từng gặp mình, đồng hành cùng mình, hoặc đơn giản là đã đi ngang qua một đoạn thanh xuân của mình.
            <br /><br />
            Rất mong sẽ được gặp mọi người trong ngày đặc biệt ấy.
            <br /><br />
            Cùng nhau gặp mặt, chụp vài tấm hình xinh xắn và lưu lại một kỷ niệm thật đẹp 
          </p>

          <div className="mt-12 text-center">
            <p className="text-[#F58AB0]">
              Thân mến ♡
            </p>

            <h3 className="mt-2 text-2xl font-bold">
              Hà Trang
            </h3>
          </div>

        </div>

      </section>

      {/* EVENT */}
      <section className="px-4 sm:px-6 pb-24 relative z-10">

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-4 sm:gap-6">

          <div className="bg-[#FFF5FA]/90 backdrop-blur-xl rounded-[35px] p-8 text-center border border-pink-200 shadow-[0_10px_40px_rgba(255,183,213,0.3)]">

            <h3 className="text-[#F58AB0] text-2xl font-semibold">
              Ngày
            </h3>

            <p className="mt-4 text-lg">
              31/05/2026
            </p>

          </div>

          <div className="bg-[#FFF5FA]/90 backdrop-blur-xl rounded-[35px] p-8 text-center border border-pink-200 shadow-[0_10px_40px_rgba(255,183,213,0.3)]">

            <h3 className="text-[#F58AB0] text-2xl font-semibold">
              Thời gian
            </h3>

            <p className="mt-4 text-lg">
              10:30 - 12:00
            </p>

          </div>

          <div className="bg-[#FFF5FA]/90 backdrop-blur-xl rounded-[35px] p-8 text-center border border-pink-200 shadow-[0_10px_40px_rgba(255,183,213,0.3)]">

            <h3 className="text-[#F58AB0] text-2xl font-semibold">
              Địa điểm
            </h3>

            <p className="mt-4 text-lg">
              Trường Đại học Ngân hàng TP.HCM - Cơ sở Hoàng Diệu 2
            </p>

          </div>

        </div>

      </section>

      {/* COUNTDOWN */}
      <section className="px-4 sm:px-6 pb-24 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#FFF5FA]/90 backdrop-blur-xl rounded-[40px] p-6 sm:p-8 md:p-12 border border-pink-200 shadow-[0_10px_50px_rgba(255,183,213,0.35)]">
            <h2 className="text-center text-4xl font-bold text-[#F58AB0] mb-12">
              Cùng đếm ngược thời gian !
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-12">
              <div className="countdown-box">
                <div className="countdown-value">{countdown.days}</div>
                <div className="countdown-label">Ngày</div>
              </div>
              <div className="countdown-box">
                <div className="countdown-value">{countdown.hours}</div>
                <div className="countdown-label">Giờ</div>
              </div>
              <div className="countdown-box">
                <div className="countdown-value">{countdown.minutes}</div>
                <div className="countdown-label">Phút</div>
              </div>
              <div className="countdown-box">
                <div className="countdown-value">{countdown.seconds}</div>
                <div className="countdown-label">Giây</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <div className="calendar-container">
                <h3 className="text-2xl font-bold text-[#F58AB0] text-center mb-6"> Lịch</h3>
                <div className="calendar-grid">
                  <div className="calendar-day-name">T2</div>
                  <div className="calendar-day-name">T3</div>
                  <div className="calendar-day-name">T4</div>
                  <div className="calendar-day-name">T5</div>
                  <div className="calendar-day-name">T6</div>
                  <div className="calendar-day-name">T7</div>
                  <div className="calendar-day-name">CN</div>
                  
                  {[...Array(4)].map((_, i) => <div key={`empty-${i}`} className="calendar-empty"></div>)}
                  {[...Array(31)].map((_, i) => (
                    <div key={i} className={`calendar-date ${i + 1 === 31 ? 'calendar-highlight' : ''}`}>
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center flex flex-col justify-center">
                <p className="text-lg text-[#8D6977] mb-6">
                   Ngày tốt nghiệp 
                </p>
                <p className="text-5xl font-bold text-[#F58AB0]">31/05</p>
                <p className="text-2xl font-semibold text-[#9C7382] mt-4">2026</p>
                <p className="text-lg text-[#8D6977] mt-8">
                  Hẹn gặp mọi người vào ngày đặc biệt này nhé!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NOTES */}
      <section className="px-4 sm:px-6 pb-24 relative z-10">
        <div className="max-w-4xl mx-auto bg-[#FFF5FA]/90 backdrop-blur-xl rounded-[40px] p-6 sm:p-8 md:p-12 border border-pink-200 shadow-[0_10px_50px_rgba(255,183,213,0.35)]">
          <h2 className="text-center text-4xl font-bold text-[#F58AB0]">
            Một vài lưu ý nhỏ nhỏ xinh xinh
          </h2>

          <div className="mt-10 space-y-6 text-lg leading-8 text-[#8D6977]">
            <p>Thời tiết Sài Gòn khá nóng nên hãy mang theo nước và quạt nha.</p>
            <p>Lưu sẵn thư mời trong điện thoại hoặc bật 4G/mạng để gọi video lúc ra vào cổng khi bảo vệ hỏi.</p>
            <div className="rounded-3xl bg-[#FFEAF4] p-5 border border-pink-200">
              <p className="font-semibold text-[#7D5A67]">Nếu bị lạc giữa biển người thì gọi ngay hotline để được hỗ trợ nhoé:</p>
              <p className="mt-3">0865060329 (Trang)</p>
              <p>0826356356 (Hoàng)</p>
            </div>
            <p>Hôm đó khá đông nên giữ đồ cá nhân cẩn thận.</p>
            <p>Và chuẩn bị thật xinh thật đẹp vì kiểu gì cũng sẽ có kha khá ảnh mang về đó hehe.</p>
          </div>
        </div>
      </section>

{/* LOCATION & GUIDE */}
<section className="px-4 sm:px-6 pb-32 relative z-10">
  <div className="max-w-6xl mx-auto bg-[#FFF5FA]/90 backdrop-blur-xl rounded-[40px] p-6 sm:p-8 md:p-12 border border-pink-200 shadow-[0_10px_50px_rgba(255,183,213,0.35)]">
    
    {/* TITLE */}
    <div className="text-center mb-10">
      <h2 className="text-4xl font-bold text-[#F58AB0]">
        Vị trí sự kiện
      </h2>
    </div>
    {/* GOOGLE MAP */}
    <div className="rounded-[30px] overflow-hidden border border-pink-200 shadow-[0_10px_30px_rgba(255,183,213,0.2)]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1959.1914980477889!2d106.7627419!3d10.8584466!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752758ae86dee5%3A0x4e061cbc97977ab8!2zRGggTmfDom4gSMOgbmc!5e0!3m2!1svi!2s!4v1779783192116!5m2!1svi!2s"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-[450px] border-0 block"
      ></iframe>
    </div>

    {/* INFO */}
    <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr]">

      {/* GUIDE */}
      <div className="bg-white/70 rounded-[32px] p-6 sm:p-8 border border-pink-100 shadow-[0_10px_30px_rgba(255,183,213,0.2)]">
        <h3 className="text-2xl sm:text-3xl font-bold text-[#F58AB0] mb-6">
          Hướng dẫn thông hành
        </h3>

        <div className="space-y-4 sm:space-y-5 text-base sm:text-lg leading-8 text-[#7D5A67]">
          <p>
             Đi xe công nghệ ưu tiên cổng chính (Hoàng Diệu 2) để đỡ đi bộ nhìu.
          </p>

          <p>
             Đi xe máy vào cổng 16 hoặc cổng 17.
          </p>

          <p>
             Đi ô tô vào cổng 17.
          </p>
        </div>
      </div>


        <div className="rounded-[24px] overflow-hidden border border-[#F5D5E2] shadow-[0_10px_30px_rgba(255,183,213,0.2)]">
          <img
            src="/images/map.jpg"
            alt="Bản đồ trường"
            className="block w-full h-auto object-contain max-h-[720px]"
          />
        </div>
    </div>
  </div>
</section>

{/* RSVP & GUESTBOOK */}
<section className="px-4 sm:px-6 pb-24 relative z-10">
  <div className="max-w-6xl mx-auto bg-[#FFF5FA]/90 backdrop-blur-xl rounded-[40px] p-6 sm:p-8 md:p-12 border border-pink-200 shadow-[0_10px_50px_rgba(255,183,213,0.35)]">

    {/* HEADER */}
    <div className="grid gap-4 sm:gap-6 md:gap-8 lg:grid-cols-[1.1fr_0.9fr]">

      {/* RSVP */}
      <div className="bg-white/70 rounded-[32px] p-6 sm:p-8 border border-pink-100 shadow-[0_10px_30px_rgba(255,183,213,0.15)]">

        <div className="mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#F58AB0]">
            Xác nhận tham dự
          </h3>

          <p className="mt-2 text-[#8D6977]">
            Điền thông tin để mình chuẩn bị chu đáo hơn nè
          </p>
        </div>

        <form onSubmit={handleRsvpSubmit} className="space-y-6">

          {/* NAME */}
          <div>
            <label className="block text-[#F58AB0] font-semibold mb-3">
              Tên của bạn
            </label>

            <input
              type="text"
              required
              value={rsvpData.name}
              onChange={(e) =>
                setRsvpData({
                  ...rsvpData,
                  name: e.target.value,
                })
              }
              placeholder="Nhập tên của bạn"
              className="w-full p-4 rounded-2xl bg-white border-2 border-pink-200 outline-none focus:border-[#F58AB0] text-[#7D5A67] placeholder-[#C9A3B3]"
            />
          </div>

          {/* ATTENDING */}
          <div>
            <label className="block text-[#F58AB0] font-semibold mb-3">
              Bạn có thể tham dự không?
            </label>

            <div className="grid grid-cols-2 gap-3">

              <button
                type="button"
                onClick={() =>
                  setRsvpData({
                    ...rsvpData,
                    attending: true,
                  })
                }
                className={`py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  rsvpData.attending === true
                    ? "bg-[#F58AB0] text-white shadow-[0_10px_30px_rgba(245,138,176,0.4)]"
                    : "bg-white text-[#F58AB0] border-2 border-pink-200 hover:bg-[#FFF5FA]"
                }`}
              >
                Có, mình sẽ đến! ♡
              </button>

              <button
                type="button"
                onClick={() =>
                  setRsvpData({
                    ...rsvpData,
                    attending: false,
                  })
                }
                className={`py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  rsvpData.attending === false
                    ? "bg-[#F9A8CB] text-white shadow-[0_10px_30px_rgba(249,168,203,0.4)]"
                    : "bg-white text-[#F58AB0] border-2 border-pink-200 hover:bg-[#FFF5FA]"
                }`}
              >
                Không, mình rất tiếc :((
              </button>

            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FFB7D5] to-[#F9A8CB] hover:shadow-[0_15px_40px_rgba(255,183,213,0.5)] hover:scale-[1.02] transition-all duration-300 text-white font-bold shadow-[0_10px_30px_rgba(255,183,213,0.4)]"
          >
            Gửi xác nhận
          </button>
        </form>
      </div>

      {/* GUESTBOOK */}
      <div className="bg-white/70 rounded-[32px] p-6 sm:p-8 border border-pink-100 shadow-[0_10px_30px_rgba(255,183,213,0.15)]">

        <div className="mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#F58AB0]">
            Lời chúc
          </h3>

          <p className="mt-2 text-[#8D6977]">
            Một vài lời mún gửi tới mình
          </p>
        </div>

        <form
          onSubmit={handleGuestbookSubmit}
          className="space-y-6"
        >

          {/* NAME */}
          <div>
            <label className="block text-[#F58AB0] font-semibold mb-3">
              Tên của bạn
            </label>

            <input
              type="text"
              required
              value={guestbookData.name}
              onChange={(e) =>
                setGuestbookData({
                  ...guestbookData,
                  name: e.target.value,
                })
              }
              placeholder="Tên của bạn"
              className="w-full p-4 rounded-2xl bg-white border-2 border-pink-200 outline-none focus:border-[#F58AB0] text-[#7D5A67]"
            />
          </div>

          {/* MESSAGE */}
          <div>
            <label className="block text-[#F58AB0] font-semibold mb-3">
              Lời chúc
            </label>

            <textarea
              rows="7"
              required
              value={guestbookData.message}
              onChange={(e) =>
                setGuestbookData({
                  ...guestbookData,
                  message: e.target.value,
                })
              }
              placeholder="Viết lời chúc ở đây..."
              className="w-full p-4 rounded-2xl bg-white border-2 border-pink-200 outline-none resize-none focus:border-[#F58AB0] text-[#7D5A67] placeholder-[#C9A3B3]"
            ></textarea>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FFB7D5] to-[#F9A8CB] hover:shadow-[0_15px_40px_rgba(255,183,213,0.5)] hover:scale-[1.02] transition-all duration-300 text-white font-bold shadow-[0_10px_30px_rgba(255,183,213,0.4)]"
          >
            Gửi lời chúc ♡
          </button>

        </form>
      </div>

    </div>
  </div>
</section>

{/* ENDING */}
<section className="px-4 sm:px-6 pb-24 relative z-10">
  <div className="max-w-3xl mx-auto text-center">

    <div className="bg-[#FFF5FA]/70 backdrop-blur-xl rounded-[40px] p-6 sm:p-8 md:p-12 border border-pink-200 shadow-[0_10px_40px_rgba(255,183,213,0.25)]">

      <p className="text-2xl md:text-3xl leading-[1.8] text-[#9C7382] italic">
        Cảm ơn vì đã trở thành
        <br />
        một phần thật đẹp
        <br />
        trong hành trình của mình 
      </p>

      <div className="mt-10">
        <p className="text-[#F58AB0] text-lg">
          With love ♡
        </p>

        <h3 className="mt-2 text-3xl font-bold text-[#F58AB0]">
          Hà Trang
        </h3>
      </div>

    </div>
  </div>
</section>

    </div>
  )
}

export default App