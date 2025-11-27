import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-cithi-dark flex flex-col items-center justify-start overflow-hidden text-white">
      {/* Top curved section */}
      <div className="w-full h-[45vh] bg-cithi-purple rounded-b-[50%] flex justify-center items-center">
        <div className="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180" fill="none">
            <path d="M165 93.7508C165 90.0653 164.96 82.629 164.881 78.933C164.392 55.9415 164.147 44.4457 155.663 35.93C147.179 27.4142 135.373 27.1176 111.759 26.5243C97.2053 26.1586 82.7947 26.1586 68.2411 26.5242C44.6275 27.1175 32.8206 27.4141 24.3371 35.9299C15.8537 44.4456 15.6085 55.9414 15.1182 78.933C14.9605 86.3258 14.9606 93.6743 15.1183 101.067C15.6086 124.059 15.8537 135.554 24.3372 144.071C32.8206 152.586 44.6275 152.882 68.2412 153.476C74.2619 153.627 80.2582 153.716 86.25 153.742" stroke="#EEEEEE" strokeWidth="11.25" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 45L66.8477 74.4346C85.7903 85.1887 94.2097 85.1887 113.152 74.4346L165 45" stroke="#EEEEEE" strokeWidth="11.25" strokeLinejoin="round"/>
            <path d="M165 131.25H105M165 131.25C165 125.998 150.043 116.186 146.25 112.5M165 131.25C165 136.502 150.043 146.314 146.25 150" stroke="#2F0328" strokeWidth="11.25" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Welcome Text */}
      <div className="text-center mt-10">
        <div className="text-[26px] font-bold mb-1">CITHI Desktop</div>
        <div className="text-[#c7c7c7] text-sm leading-relaxed">
          Welcome to official CITHI Desktop app.<br />
          It&apos;s fast & secure.
        </div>
      </div>

      {/* Button */}
      <Link href="/auth">
        <button className="mt-[106px] w-[270px] h-14 bg-cithi-light rounded-[10px] text-white font-semibold text-base hover:bg-opacity-90 transition-all">
          Start Messaging
        </button>
      </Link>
    </div>
  )
}
