
export default function SDKImportSnippet() {
  return (
    <div 
      className="bg-[#0B132B] rounded-2xl p-6 font-mono text-sm sm:text-base text-[#F8F9FA] border w-full
     md:w-172 md:h-137 max-w-full border-gray-800 flex flex-col justify-between overflow-x-auto mx-auto select-text"
    >
      {/* Smippet  Header */}
      <div>
        <div className="flex items-center gap-2 pb-4 border-b border-gray-800 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
          </div>
          <span className="text-gray-400 text-xs sm:text-sm pr-2">agent.py</span>
        </div>

        {/* Code Content */}
        <div className="space-y-6 leading-relaxed text-left">
          <div>
            <span className="text-[#FF4A5A]">from</span>{' '}
            <span className="text-white">meetmind</span>{' '}
            <span className="text-[#FF4A5A]">import</span>{' '}
            <span className="text-[#E0AAFF]">Session</span>,{' '}
            <span className="text-[#E0AAFF]">Persona</span>
          </div>

          <div>
            <div className="text-gray-500 text-sm"># Configure the agent persona</div>
            <div>
              <span className="text-white">persona = </span>
              <span className="text-[#C77DFF]">Persona</span>(
              <span className="text-white">name=</span><span className="text-[#72EFDD]">&quot;Alex&quot;</span>,{' '}
              <span className="text-white">tone=</span><span className="text-[#72EFDD]">&quot;professional&quot;</span>,{' '}
              <span className="text-white">mode=</span><span className="text-[#72EFDD]">&quot;standard&quot;</span>)
            </div>
          </div>

          <div>
            <div className="text-gray-500 text-sm"># Create a session with full context</div>
            <div>
              <span className="text-white">session = </span>
              <span className="text-[#C77DFF]">Session</span>(
              <div className="pl-6 text-white">
                platform=<span className="text-[#72EFDD]">&quot;zoom&quot;</span>,{' '}
                meeting_link=&quot;meeting_url&quot;,
              </div>
              <div className="pl-6 text-white">
                persona=persona,
              </div>
              <div className="pl-6">
                <span className="text-white">context=</span>
                <span className="text-[#C77DFF]">load_docs</span>([
                <span className="text-[#72EFDD]">&quot;jd.pdf&quot;</span>,{' '}
                <span className="text-[#72EFDD]">&quot;candidate.pdf&quot;</span>])
              </div>
              )
            </div>
          </div>

          <div className="pt-2">
            <div className="text-gray-500 text-sm"># Agent joins, listens, speaks, captures</div>
            <div>
              <span className="text-white">result = </span>
              <span className="text-[#FF4A5A]">await</span>{' '}
              <span className="text-white">session.</span>
              <span className="text-[#C77DFF]">run</span>()
            </div>
            <div>
              <span className="text-[#4EA8DE]">print</span>(result.scorecard, result.summary)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}