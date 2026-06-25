import { ports } from '../../data/mockPorts'

interface MapMarker {
  id: string
  x: number
  y: number
  color: string
  labelDx: number
  labelDy: number
  anchor: 'start' | 'middle' | 'end'
}

const markers: MapMarker[] = [
  { id: 'barcelona', x: 252, y: 218, color: '#F9B000', labelDx: 0, labelDy: -14, anchor: 'middle' },
  { id: 'marseille', x: 298, y: 158, color: '#DE252A', labelDx: 0, labelDy: -14, anchor: 'middle' },
  { id: 'sete', x: 318, y: 188, color: '#28367B', labelDx: 12, labelDy: 4, anchor: 'start' },
  { id: 'genoa', x: 392, y: 148, color: '#F9B000', labelDx: 0, labelDy: -14, anchor: 'middle' },
  { id: 'civitavecchia', x: 428, y: 210, color: '#28367B', labelDx: 14, labelDy: 0, anchor: 'start' },
  { id: 'palermo', x: 468, y: 292, color: '#DE252A', labelDx: 0, labelDy: 16, anchor: 'middle' },
  { id: 'algeciras', x: 188, y: 332, color: '#DE252A', labelDx: -12, labelDy: 4, anchor: 'end' },
  { id: 'ceuta', x: 204, y: 358, color: '#28367B', labelDx: 12, labelDy: 4, anchor: 'start' },
  { id: 'tarifa', x: 168, y: 348, color: '#F9B000', labelDx: -12, labelDy: 4, anchor: 'end' },
  { id: 'tanger', x: 178, y: 378, color: '#F9B000', labelDx: -12, labelDy: 4, anchor: 'end' },
  { id: 'motril', x: 228, y: 308, color: '#28367B', labelDx: 12, labelDy: 0, anchor: 'start' },
  { id: 'nador', x: 262, y: 368, color: '#DE252A', labelDx: 12, labelDy: 4, anchor: 'start' },
  { id: 'alhoceima', x: 248, y: 348, color: '#28367B', labelDx: -12, labelDy: -10, anchor: 'end' },
]

export function MediterraneanMap() {
  return (
    <div className="absolute inset-0 bg-[#e8f0f8]">
      <svg
        viewBox="0 0 800 480"
        className="w-full h-full"
        preserveAspectRatio="xMaxYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id="seaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6eb5e0" />
            <stop offset="100%" stopColor="#4a94c8" />
          </linearGradient>
        </defs>

        <rect width="800" height="480" fill="url(#seaGrad)" />

        {/* Spain & Portugal */}
        <path
          fill="#f5f7fa"
          d="M0,0 L0,480 L270,480
             C265,440 255,400 240,370
             C225,345 210,335 195,330
             C180,325 165,318 155,305
             C145,290 140,270 138,250
             C136,220 132,190 125,165
             C118,140 110,115 105,90
             C100,65 95,40 90,20
             C70,10 40,5 0,0 Z"
        />

        {/* France */}
        <path
          fill="#f5f7fa"
          d="M90,20 C120,8 180,0 280,0
             L500,0 C490,30 470,55 445,75
             C420,95 395,110 370,118
             C345,126 320,130 295,132
             C270,134 245,132 220,125
             C195,118 170,105 150,88
             C130,71 110,48 90,20 Z"
        />

        {/* Italy boot */}
        <path
          fill="#f5f7fa"
          d="M370,118
             C395,115 420,125 440,145
             C460,165 475,190 485,218
             C495,246 502,276 508,306
             C514,336 522,366 535,395
             C548,420 568,440 595,455
             C615,465 640,472 670,476
             L800,480 L800,120
             C760,115 720,112 680,115
             C640,118 600,120 560,118
             C520,116 480,115 440,115
             C415,116 390,117 370,118 Z"
        />

        {/* North Africa coast */}
        <path
          fill="#f5f7fa"
          d="M0,400
             C100,392 200,388 300,390
             C400,392 500,398 600,405
             C700,412 750,418 800,422
             L800,480 L0,480 Z"
        />

        {/* Islands */}
        <ellipse cx="410" cy="218" rx="9" ry="20" fill="#f5f7fa" />
        <ellipse cx="438" cy="256" rx="14" ry="22" fill="#f5f7fa" />
        <ellipse cx="464" cy="296" rx="20" ry="12" fill="#f5f7fa" />
        <circle cx="296" cy="236" r="5" fill="#f5f7fa" />
        <circle cx="306" cy="246" r="3.5" fill="#f5f7fa" />

        {/* Strait of Gibraltar water gap */}
        <path
          fill="url(#seaGrad)"
          d="M168,322 C178,318 192,318 202,324
             C208,330 205,342 195,350
             C185,356 172,352 165,342
             C162,334 164,326 168,322 Z"
        />

        {markers.map((m) => {
          const port = ports.find((p) => p.id === m.id)
          if (!port) return null
          return (
            <g key={m.id}>
              <circle cx={m.x} cy={m.y} r="5.5" fill={m.color} stroke="white" strokeWidth="2" />
              <text
                x={m.x + m.labelDx}
                y={m.y + m.labelDy}
                textAnchor={m.anchor}
                fontSize="12.5"
                fontWeight="500"
                fill="#1e2a4a"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                {port.name}
              </text>
            </g>
          )
        })}
      </svg>

      <div className="absolute inset-y-0 left-0 w-28 md:w-40 bg-gradient-to-r from-white via-white/90 to-transparent pointer-events-none" />
    </div>
  )
}
